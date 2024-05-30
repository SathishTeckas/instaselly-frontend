import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { FilterComponent } from './filter/filter.component';
import { OrderStatsComponent } from './order-stats/order-stats.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PrintAddressComponent } from './print-address/print-address.component';
import { CreateOrderModule } from '../stocks/create-order/create-order.module';
import { AddTrackingDetailsComponent } from './add-tracking-details/add-tracking-details.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    FilterComponent,
    OrderStatsComponent,
    OrderDetailsComponent,
    PrintAddressComponent,
    AddTrackingDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    LibraryModule,
    ComponentsModule,
    CreateOrderModule
  ]
})
export class OrdersModule { }
