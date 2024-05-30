import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ManageComponent,
    ImgUploadComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    LibraryModule,
    ComponentsModule,
    CarouselModule
  ]
})
export class ManageModule { }
