import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { StatsComponent } from './stats/stats.component';
import { FilterComponent } from './filter/filter.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { StockDetailsCompactComponent } from './stock-details-compact/stock-details-compact.component';


@NgModule({
  declarations: [
    StocksComponent,
    StatsComponent,
    FilterComponent,
    StockDetailsComponent,
    QuickViewComponent,
    StockDetailsCompactComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    LibraryModule,
    ComponentsModule
  ],
  exports: [
    StockDetailsComponent
  ]
})
export class StocksModule { }
