import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks.component';

const routes: Routes = [
  {
    path: '',
    component: StocksComponent
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
  },
  {
    path: 'create-order',
    loadChildren: () => import('./create-order/create-order.module').then(m => m.CreateOrderModule),
    data: {
      breadcrumb: 'Create Order'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
