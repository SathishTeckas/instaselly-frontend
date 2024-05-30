import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AdminComponent
  },
  {
    path: 'category',
    loadChildren: () => import('./category-mgmt/category-mgmt.module').then(m => m.CategoryMgmtModule),
    data: {
      breadcrumb: 'Category'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
