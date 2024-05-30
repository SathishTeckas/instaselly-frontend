import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { LibraryModule } from '../shared/library/library.module';
import { ComponentsModule } from '../shared/components/components.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    LibraryModule,
    ComponentsModule
  ]
})
export class ViewModule { }
