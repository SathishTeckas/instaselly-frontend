import { Component, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/controller/admin/category/category.service';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { ProductService } from 'src/app/shared/controller/product/product.service';
import { formatProductInformation } from 'src/app/shared/helper/product.helper';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { iProductImages } from 'src/app/shared/interface/common/product-image.interface';
import { iStockDetails, iStockResponse, iStocks } from 'src/app/shared/interface/stock/stock.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements AfterViewInit {

  public height: number = 400;

  public productGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    instagramCaption: new FormControl(''),
    shareToInsta: new FormControl(false)
  });

  private productDetails: iStockDetails[] = [];
  public availableProducts: iStockDetails[] = [];
  private productImages: iProductImages[] = [];
  public availableImages: iProductImages[] = [];

  public shareOnInstagram: boolean = false;
  public invalidDetails: boolean = false;
  public categories: iCategory[] = [];
  public params: string[] = [];

  private productId: string = '';
  public isMobile: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private cs: CategoryService,
    private ps: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private helper: HelperService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.getCategories();
  }

  public ngAfterViewInit(): void {
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        if (param && param['id']) {
          this.productId = param['id'];
          this.getProductDetails(this.productId);
        }
      }
    });

    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
    });

    this.onResize();
    this.cdRef.detectChanges();
  }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const spacing: number = 140;
    const availableHeight: number = window.innerHeight - spacing;
    this.height = availableHeight;
  }

  private getProductDetails(id: string): void {
    this.ps.getProductById(id).subscribe({
      next: (res: iStockResponse) => {
        if (!res?.data || !res?.data?.products[0]) return;
        let stockDetails: iStocks = res.data.products[0];
        
        if (res.data.images) {
          stockDetails.images = res.data.images[stockDetails.productId];
          this.availableImages = [];
          if (stockDetails.images && stockDetails.images.length > 0) {
            stockDetails.images.forEach((url: string, index: number) => {
              this.availableImages.push({
                file: new File([], url),
                isPrimary: index == 0 ? true: false,
                thumb: url
              });
            });
          }
        }

        this.productGroup.setValue({
          name: stockDetails.name,
          categoryId: stockDetails.categoryId,
          instagramCaption: stockDetails.instagramCaption,
          shareToInsta: stockDetails.shareToInsta
        });

        setTimeout(() => {
          this.onCategoryChange({ value: stockDetails.categoryId } as any);
          this.availableProducts = stockDetails.variants;
          this.productDetails = this.availableProducts;
        }, 10);

      }
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productGroup.controls[controlName].hasError(errorName);
  }

  private getCategories(): void {
    this.cs.getCategories().subscribe({
      next: (res: iCategory[]) => {
        if (!res) return;
        this.categories = res;
      }
    })
  }

  public onCategoryChange(event: MatSelectChange): void {
    if (!event?.value) return;
    const params: string[] | undefined = this.categories.find((cat: iCategory) => cat.categoryId === event.value)?.params;
    if (!params) return;
    this.params = params;
  }

  public onDetailChange(event: Observable<iStockDetails[]>): void {
    event.subscribe({
      next: (value: iStockDetails[]) => {
        this.productDetails = value.filter((details: any) => details['purchaseAmount'] !== null);
        if (this.productDetails.length > 0) {
          this.invalidDetails = false;
        }
      }
    });
  }

  public onImageChanges(event: iProductImages[]): void {
    this.productImages = event;
  }

  public schedule(): void { }

  public save(): void {
    
    if (!this.productDetails || this.productDetails.length <= 0) {
      this.invalidDetails = true;
      return;
    }

    if (this.productGroup.invalid) return;
    this.invalidDetails = false;

    if (this.availableProducts.length > 0 && JSON.stringify(this.availableProducts) === JSON.stringify(this.productDetails)) {
      this.productDetails = this.productDetails;
    } else {
      this.productDetails = formatProductInformation(this.productDetails, this.params);
    }


    this.ps.saveProduct(this.productGroup.value, this.productDetails, this.makePrimaryAsFirst(this.productImages), this.availableImages, this.productId).subscribe({
      next: (res: iCommonResponse) => {
        if (!res) return;
        this.helper.showToaster('Stock saved successfully', 'success');
        this.goBack();
      }
    })
  }

  public goBack(): void {
    this.router.navigate(['/stock']);
  }

  private makePrimaryAsFirst(images: iProductImages[]): iProductImages[] {
    if (!images || images.length <= 0) return [];
    const index: number = images.findIndex(img => img.isPrimary);
    if (index === -1 || index === 0) return images;
    const movedObject: iProductImages = images.splice(index, 1)[0];
    images.unshift(movedObject);
    return images;
  }
}
