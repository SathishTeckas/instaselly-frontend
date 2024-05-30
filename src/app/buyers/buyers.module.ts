import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyersRoutingModule } from './buyers-routing.module';
import { BuyersComponent } from './buyers.component';
import { LibraryModule } from '../shared/library/library.module';

@NgModule({
  declarations: [
    BuyersComponent
  ],
  imports: [
    CommonModule,
    BuyersRoutingModule,
    LibraryModule
  ]
})
export class BuyersModule { }
