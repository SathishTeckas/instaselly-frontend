import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryMgmtRoutingModule } from './category-mgmt-routing.module';
import { CategoryMgmtComponent } from './category-mgmt.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AddCategoryComponent } from './add-category/add-category.component';


@NgModule({
  declarations: [
    CategoryMgmtComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryMgmtRoutingModule,
    LibraryModule,
    ComponentsModule
  ]
})
export class CategoryMgmtModule { }
