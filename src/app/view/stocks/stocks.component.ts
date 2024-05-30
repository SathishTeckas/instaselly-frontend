import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { ProductService } from 'src/app/shared/controller/product/product.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';
import { iStockResponse, iStocks } from 'src/app/shared/interface/stock/stock.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements AfterViewInit {

  public products: iStocks[] = [];
  public totalProducts: number = 0;
  public selectedProducts: iStocks[] = [];
  public clearSelection: string = '';
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public filter: iStockFilters | undefined = undefined;
  
  public isMobile: boolean = false;
  public showFilter: boolean = false;

  constructor(
    private ps: ProductService,
    private router: Router,
    private helper: HelperService,
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
      this.getProducts();
    this.cdRef.detectChanges();
  }

  private getProducts(filter: iStockFilters | undefined = undefined): void {
    this.ps.getProducts(this.pageNumber, this.pageSize, filter).subscribe({
      next: (res: iStockResponse) => {
        
        if (!res || !res.data) {
          this.products = [];
          this.totalProducts = 0;
          return;
        };

        this.products = res.data.products;
        
        if (res.data.images) {
          this.products.forEach((product: iStocks) => {
            product.images = res.data.images[product.productId];
          });
        }
        
        this.totalProducts = res.totalPage * res.pageSize;
      },
      error: () => {
        this.products = [];
        this.totalProducts = 0;
      }
    })
  }

  public updateFavorite(event: { id: string, isFav: boolean }): void {
    this.ps.markAsFavorite(event.id, event.isFav).subscribe({
      next: (res: iCommonResponse) => {
        if (!res || res.status !== 'Successful') {
          this.helper.showToaster(res?.description ?? 'Something went wrong. Please tryagain later', 'error');
          return;
        }

        this.helper.showToaster('Product ' + (event.isFav ? 'marked': 'unmarked') + ' as favourite', 'success');
        this.getProducts(this.filter);

      }, error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    });
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getProducts(this.filter);
  }

  public onStockSelectionChange(event: iStocks[]): void {
    this.selectedProducts = event;
  }

  public onFilter(event: iStockFilters): void {
    this.filter = event;
    this.getProducts(this.filter);
  }

  public deleteStocks(): void {
    
    this.ps.deleteProduct(this.selectedProducts.map(val => val.productId)).subscribe({
      next: (res: iCommonResponse) => {
        if (!res || res.status !== 'Successful') {
          this.helper.showToaster(res?.description ?? 'Something went wrong. Please tryagain later', 'error');
          return;
        }

        this.helper.showToaster('Stock deleted successfully', 'success');
        this.selectedProducts = [];
        this.clearSelections();

        this.selectedProducts.forEach((products: iStocks) => {
          if (products && products.index) {
            this.products.splice(products.index, 1);
          }
        });
        
      }, error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    });
  }

  public clearSelections(): void {
    this.clearSelection = new Date().getTime().toString();
  }

  public clearFilter(): void {
    this.filter = {
      category: '',
      searchKey: '',
      showOnlyFavorites: false,
      sortby: '',
      status: ''
    }
    this.showFilter = false;
  }

  public createOrder(): void {
    this.router.navigate(['stock/create-order'], { queryParams: { id: this.selectedProducts.map(prod => prod.productId).toString() } });
  }
}
