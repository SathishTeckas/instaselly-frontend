import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { ProductService } from 'src/app/shared/controller/product/product.service';
import { iNameValue } from 'src/app/shared/interface/common/name-value.interface';
import { iOrderVariants } from 'src/app/shared/interface/order/order.interface';
import { iStockDetails, iStockResponse, iStocks } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss', '../../manage/product-details/product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit, OnChanges {

  public productFormGroup: FormGroup;
  public params: iNameValue[] = [];
  private filters: any[] = [];
  public minMaxStocks: { min: number; max: number; quantity: number; price: number; available: number; }[] = [];

  public options: {
    [name: string]: Set<string>;
  } = {};
  public stockDetails: Partial<iStocks> = {};

  @Input() isError: boolean = false;
  @Input() productId: string = '';
  @Input() variants: Partial<iOrderVariants> = {};
  @Input() editable: boolean = true;

  @Output() productDetailChange: EventEmitter<Observable<any[]>> = new EventEmitter<Observable<any[]>>();


  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private helper: HelperService,
    private ps: ProductService
  ) {
    this.productFormGroup = this.fb.group({
      products: this.fb.array([])
    });
  }

  public ngAfterViewInit(): void {
    this.listenFormChanges();
    this.cdRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['productId'] && changes['productId'].currentValue) {
      this.getStockDetails();
    }

    if (changes && changes['variants'] && changes['variants'].currentValue && this.variants) {
      this.setStocksByVariant(this.variants);
    }
  }

  private getStockDetails(): void {
    this.ps.getProductById(this.productId).subscribe({
      next: (res: iStockResponse) => {
        if (!res || !res.data || res.data.products.length <= 0) return;
        this.stockDetails = res.data.products[0];
        
        if (res.data.images) {
          this.stockDetails.images = res.data.images[this.productId];
        }
        
        this.setStockDetails();
      }
    });
  }


  public setStockDetails(): void {
    if (this.stockDetails?.variants && this.stockDetails?.variants.length > 0) {
      this.params = this.stockDetails.variants[0].properties;
      this.stockDetails.variants.forEach((variants: iStockDetails) => {
        variants.properties.forEach((att: iNameValue) => {
          if (this.options[att.name]) {
            this.options[att.name].add(att.value);
          } else {
            this.options[att.name] = new Set<string>([att.value]);
          }
        });
      });
    }

    this.addProduct();
  }

  private setStocksByVariant(variant: Partial<iOrderVariants>): void {

    this.params = variant.attributes as any;
    this.stockDetails.name = variant.productName;
    this.stockDetails.images = variant.images;

    variant.attributes?.forEach((att: iNameValue) => {
      if (this.options[att.name]) {
        this.options[att.name].add(att.value);
      } else {
        this.options[att.name] = new Set<string>([att.value]);
      }
    });

    this.params.forEach((param: iNameValue) => {
      this.filters.push({
        [param.name]: param.value
      });
    });

    this.minMaxStocks.push({
      min: 1,
      max: variant.quantity ?? 10,
      quantity: variant.quantity ?? 0,
      price: variant.sellingPrice ?? 0,
      available: 10000
    });

    this.addProduct();

    this.products.controls[0].get('price')?.setValue(variant.sellingPrice);
    this.products.controls[0].get('qty')?.setValue(variant.quantity ?? 1);

    this.params.forEach((param: iNameValue) => {
      
      this.products.controls[0].get(param.name)?.setValue(param.value);
      if (!this.editable) this.products.controls[0].get(param.name)?.disable();
    });

  }

  public addProduct(): void {
    this.products.push(this.createGroup(-1));
  }

  public removeProduct(index: number): void {
    this.products.removeAt(index);
    this.filters.splice(index, 1);
    this.minMaxStocks.splice(index, 1);

    if (this.products.controls.length <= 0) {
      this.addProduct();
    }
  }

  public duplicateProduct(index: number): void {
    this.products.push(this.createGroup(index));
  }

  public get products(): FormArray {
    return this.productFormGroup.controls['products'] as FormArray;
  }

  private createGroup(index: number = -1): FormGroup {

    let control: FormGroup = new FormGroup({});

    if (this.params?.length > 0) {

      const filterObject: any = {};

      this.params.forEach((param: iNameValue) => {
        control?.addControl(param.name, new FormControl(this.products?.controls[index]?.value[param.name]));
        if (param.name !== 'attributeId') {
          filterObject[param.name] = '';
        }
      });

      this.filters.push(filterObject);
    }

    this.minMaxStocks.push({
      min: 1,
      max: 2,
      quantity: 1,
      price: 0,
      available: 2
    });

    return this.fb.group({
      ...control.controls,
      qty: new FormControl(this.products?.controls[index]?.value['qty']),
      price: new FormControl(this.products?.controls[index]?.value['price']),
      varientId: new FormControl(this.products?.controls[index]?.value['varientId'], [Validators.required]),
      productId: new FormControl(this.stockDetails.productId)
    });
  }

  public onQtyChange(event: any, index: number): void {
    const qty: number = event.target.value;
    const price: number = this.minMaxStocks[index].price;
    if (!qty || !price) return;
    this.products.controls[index].get('price')?.setValue(qty * price);
  }

  public filterProductByParameters(event: MatSelectChange, index: number, param: string): void {
    this.filters[index][param] = event.value;
    const readyToFilter: boolean = Object.values(this.filters[index]).every((value: any) => value.trim() !== '');


    if (readyToFilter) {
      const validFilters: any[] = this.filters.filter(filter => Object.values(filter).every(value => value !== ''));
      if (this.isRepeated(validFilters.map(value => JSON.stringify(value)))) {
        this.helper.showToaster('This product already added. Please update the respective product', 'info');
        this.products.controls[index].get(param)?.setValue('');
        return;
      }

      const filteredItems: iStockDetails[] | undefined = this.stockDetails.variants?.filter((item: iStockDetails) => {
        for (const key in this.filters[index]) {
          const attribute = item.properties.find(attr => attr.name === key);
          if (!attribute || attribute.value !== this.filters[index][key]) {
            return false;
          }
        }
        return true;
      });

      if (filteredItems && filteredItems.length > 0) {
        const filteredValue: iStockDetails = filteredItems[0];
        let minQty: number = filteredValue.minimumOrderQuantity;
        let price: number = (minQty ?? 1) * filteredValue.sellingPrice;

        this.minMaxStocks[index] = {
          max: filteredValue.totalStocks,
          min: minQty ?? 1,
          quantity: minQty ?? 1,
          price: filteredValue.sellingPrice,
          available: filteredValue.availableStocks ?? 0
        }

        this.products.controls[index].get('price')?.setValue(price);
        this.products.controls[index].get('qty')?.setValue(minQty ?? 1);
        this.products.controls[index].get('varientId')?.setValue(filteredValue.variantId);
        this.cdRef.detectChanges();
      }
    }
  }

  /**
   * listen for every form changes and emit the event
  */
  public listenFormChanges(): void {
    this.productDetailChange.emit(this.products.valueChanges)
  }

  private isRepeated(filter: string[] = []): boolean {
    const occurrences: any = {};

    for (let i = 0; i < filter.length; i++) {
      const element = filter[i];
      if (occurrences[element]) {
        console.log('occ', element)
        return true;
      } else {
        occurrences[element] = true;
      }
    }

    return false;
  }
}
