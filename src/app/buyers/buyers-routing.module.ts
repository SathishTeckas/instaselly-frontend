import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyersComponent } from './buyers.component';

const routes: Routes = [
  {
    path: '',
    component: BuyersComponent,
    children: [
      {
        path: '',
        redirectTo: 'checkout',
        pathMatch: 'full'
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
        data: {
          breadcrumb: { skip: true }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyersRoutingModule { }
