import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { InformationComponent } from './information/information.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
