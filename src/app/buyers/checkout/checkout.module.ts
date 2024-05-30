import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { InformationComponent } from './information/information.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    InformationComponent,
    ShippingDetailsComponent,
    SuccessPaymentComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    LibraryModule,
    ComponentsModule
  ]
})
export class CheckoutModule { }
