import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toNumber } from 'ng-zorro-antd/core/util';
import { iCustomerAddress } from 'src/app/shared/interface/customer/address.interface';
import { iOrders } from 'src/app/shared/interface/order/order.interface';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnChanges {

  public sameAsDelivery: boolean = true;
  public shipping: boolean = false;

  @Input() orderDeatails: Partial<iOrders> = {};
  @Input() preview: boolean = false;
  
  @Output() billingDetails: EventEmitter<Partial<iCustomerAddress>> = new EventEmitter<Partial<iCustomerAddress>>();

  public informationForm: FormGroup = new FormGroup({
    shippingAddress: new FormGroup({
      country: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      addressId: new FormControl(undefined)
    }),
    billingAddress: new FormGroup({
      country: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      addressId: new FormControl(undefined)
    }),
    email: new FormControl('', [Validators.required]),
    trackupdate: new FormControl(false)
  });
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderDeatails'] && changes['orderDeatails'].currentValue && this.orderDeatails.customer && this.orderDeatails.customerName) {
      this.informationForm.setValue({
        email: this.orderDeatails.customer.email,
        trackupdate: false,
        billingAddress: { ...this.orderDeatails.customer.billingAddress, country: 'India' },
        shippingAddress: { ...this.orderDeatails.customer.shippingAddress, country: 'India' }
      });

      this.sameAsDelivery = this.orderDeatails.customer.sameAddress;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.informationForm.controls[controlName].hasError(errorName);
  }

  public hasShippingFormError = (controlName: string, errorName: string) => {
    return this.informationForm.get('shippingAddress')?.get(controlName)?.hasError(errorName);
  }

  public hasBillingFormError = (controlName: string, errorName: string) => {
    return this.informationForm.get('billingAddress')?.get(controlName)?.hasError(errorName);
  }

  public onTypeChange(event: boolean): void {
    if (event) { 
      this.updateBillingAddress(); 
    }
    else {
      this.informationForm.get('billingAddress')?.reset();
    }
  }

  public updateBillingAddress(): void {
    this.informationForm.get('billingAddress')?.setValue(this.informationForm.value['shippingAddress']);
  }

  public save(): void {

    if (this.sameAsDelivery) {
      this.updateBillingAddress();
    }

    if (this.informationForm.valid) {

      const address: Partial<iCustomerAddress> = {};
      address.shippingAddress = this.informationForm.value['shippingAddress'];
      address.billingAddress = this.informationForm.value['billingAddress'];
      
      const email: any = this.informationForm.value['email'];

      if (toNumber(email)) {
        address.phoneNumber = this.informationForm.value['email'];
        address.email = '';
      } else {
        address.email = this.informationForm.value['email'];
        address.phoneNumber = address.shippingAddress?.phoneNumber;
      }

      address.sameAddress = this.sameAsDelivery;
      
      if (this.sameAsDelivery) {
        address.billingAddress = address.shippingAddress;
      } else {
        address.shippingAddress 
      }


      console.log('address details', address);

      this.billingDetails.emit(address);
    }
  }
}
