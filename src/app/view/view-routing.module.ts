import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'stock',
        loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule),
        data: { breadcrumb: 'Stocks' }
      },
      {
        path: 'order',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
        data: { breadcrumb: 'Orders' }
      },
      {
        path: 'rules',
        loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule),
        data: { breadcrumb: 'Shipping Rule' }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { breadcrumb: 'Admin' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
