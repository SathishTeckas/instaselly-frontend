import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderComponent } from './create-order.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    CreateOrderComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    LibraryModule,
    ComponentsModule
  ],
  exports: [
    ProductDetailsComponent
  ]
})
export class CreateOrderModule { }
