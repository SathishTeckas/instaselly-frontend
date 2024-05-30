import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { iProductInformation } from 'src/app/shared/interface/product/product.interface';
import { iStockDetails } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit, OnChanges {

  public productFormGroup: FormGroup;
  private isPropertyAdded: boolean = false;

  @Input() isError: boolean = false;
  @Input() fields: string[] = [];
  @Input() productDetails: iStockDetails[] = [];

  @Output() productDetailChange: EventEmitter<Observable<iStockDetails[]>> = new EventEmitter<Observable<iStockDetails[]>>();

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
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

    if (changes && changes['productDetails'] && changes['productDetails'].currentValue) {
      this.reset();
      this.populateProducts();
    } 
    
    if (changes && changes['fields'] && changes['fields'].currentValue && !this.isPropertyAdded) {
      this.reset();
      this.addProduct();
    }
  }

  public populateProducts(): void {
    this.productDetails.forEach((product: any) => {
      this.addProduct(product);
      this.isPropertyAdded = true;
    });
  }

  public addProduct(details?: iProductInformation): void {
    if (details) {
      this.products.push(this.updateGroup(details));
    } else {
      this.products.push(this.createGroup());
    }
  }

  public removeProduct(index: number): void {
    this.products.removeAt(index);

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

    if (this.fields?.length > 0) {
      this.fields.forEach((param: string) => {
        control?.addControl(param, new FormControl(this.products?.controls[index]?.value[param]));
      });
    }

    return this.fb.group({
      ...control.controls,
      totalStocks: new FormControl(this.products?.controls[index]?.value['totalStocks'], [Validators.required]),
      minimumStocks: new FormControl(this.products?.controls[index]?.value['minimumStocks'], [Validators.required]),
      minimumOrderQuantity: new FormControl(this.products?.controls[index]?.value['minimumOrderQuantity'], [Validators.required]),
      purchaseAmount: new FormControl(this.products?.controls[index]?.value['purchaseAmount'], [Validators.required]),
      sellingPrice: new FormControl(this.products?.controls[index]?.value['sellingPrice'], [Validators.required]),
      variantId: new FormControl(undefined)
    });
  }

  private updateGroup(details: iProductInformation): FormGroup {

    let control: FormGroup = new FormGroup({});

    if (this.fields?.length > 0) {
      this.fields.forEach((param: string, index: number) => {
        control?.addControl(param, new FormControl(
          details.properties.find(val => val.name === param)?.value
        ));
      });
    }

    return this.fb.group({
      ...control.controls,
      totalStocks: new FormControl(details.totalStocks, [Validators.required]),
      minimumStocks: new FormControl(details.minimumStocks, [Validators.required]),
      minimumOrderQuantity: new FormControl(details.minimumOrderQuantity, [Validators.required]),
      purchaseAmount: new FormControl(details.purchaseAmount, [Validators.required]),
      sellingPrice: new FormControl(details.sellingPrice, [Validators.required]),
      variantId: new FormControl(details.variantId)
    });
  }

  private reset(): void {
    this.productFormGroup = this.fb.group({
      products: this.fb.array([])
    });
  }


  /**
   * listen for every form changes and emit the event
  */
  public listenFormChanges(): void {
    this.productDetailChange.emit(this.products.valueChanges);
  }
}
