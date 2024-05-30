import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { StatsComponent } from './stats/stats.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BuyerWidgetComponent } from './buyer-widget/buyer-widget.component';
import { StocksModule } from '../stocks/stocks.module';


@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    SalesAnalyticsComponent,
    ProfitLossComponent,
    BuyerWidgetComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LibraryModule,
    ComponentsModule,
    StocksModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class DashboardModule { }
