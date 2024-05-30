import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LibraryModule } from '../library/library.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { NgxPhotoEditorModule, NgxPhotoEditorService } from 'ngx-photo-editor';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { RouterModule } from '@angular/router';
import { ToasterComponent } from './toaster/toaster.component';
import { NumberFormatPipe } from '../pipe/number-format.pipe';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ReadableStringPipe } from '../pipe/readable-string.pipe';
import { OrderLinkComponent } from './order-link/order-link.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { NumberStringPipe } from '../pipe/number-string.pipe';
import { MillisecondsToDatePipe } from '../pipe/epoch-date.pipe';
import { CompactDatePipe } from '../pipe/compact-date.pipe';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

const declarations = [
  NavbarComponent,
  BreadcrumbComponent,
  ImageUploadComponent,
  ToasterComponent,
  ProductInfoComponent,
  OrderLinkComponent,
  DateRangePickerComponent,
  BottomNavComponent
];

const pipes = [
  NumberFormatPipe,
  ReadableStringPipe,
  NumberStringPipe,
  MillisecondsToDatePipe,
  CompactDatePipe
];

@NgModule({
  declarations: [
    ...declarations,
    ...pipes
  ],
  imports: [
    CommonModule,
    LibraryModule,
    BreadcrumbModule,
    NgxPhotoEditorModule,
    RouterModule
  ],
  providers: [
    BreadcrumbService,
    NgxPhotoEditorService
  ],
  exports: [
    ...declarations,
    ...pipes
  ],
  entryComponents: [
    OrderLinkComponent
  ]
})
export class ComponentsModule { }
