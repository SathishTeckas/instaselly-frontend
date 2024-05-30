import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMgmtComponent } from './category-mgmt.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryMgmtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryMgmtRoutingModule { }
