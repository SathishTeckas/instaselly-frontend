import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DashboardService } from 'src/app/shared/controller/dashboard/dashboard.service';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';
import { iOrderResponse, iOrders } from 'src/app/shared/interface/order/order.interface';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../stocks/stocks.component.scss']
})
export class OrdersComponent implements AfterViewInit {

  public orders: iOrders[]  = [];
  public pageNumber: number = 0;
  public pageSize: number = 10;
  public totalOrders: number = 0;
  public orderStats: Partial<iOrderStats> = {};
  public filter: iStockFilters | undefined = undefined;
 
  constructor(
    private os: OrderService,
    private cdRef: ChangeDetectorRef,
    private dashboard: DashboardService
  ) {}

  public ngAfterViewInit(): void {
    this.getOrders();
    this.getOrderStats();
    this.cdRef.detectChanges();
  }

  public getOrders(filter: iStockFilters | undefined = undefined): void {
    this.os.getOrders(this.pageNumber, this.pageSize, filter).subscribe({
      next: (res: iOrderResponse) => {
        
        if (!res || !res.data || res.data.length <= 0) {
          this.orders = [];
          this.totalOrders = 0;
        };

        this.orders = res.data;
        this.totalOrders = res.totalPage * res.pageSize;
      },
      error: () => {
        this.orders = [];
        this.totalOrders = 0;
      }
    });
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getOrders(this.filter);
  }

  public getOrderStats(): void {
    this.dashboard.getOrderStats().subscribe({
      next: (res: iOrderStats) => {
        this.orderStats = res;
      }
    })
  }

  public onFilter(event: iStockFilters): void {
    this.filter = event;
    this.getOrders(this.filter);
  }
}
