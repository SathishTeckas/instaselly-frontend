import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DashboardService } from 'src/app/shared/controller/dashboard/dashboard.service';
import { ProductService } from 'src/app/shared/controller/product/product.service';
import { iDailySaleReport } from 'src/app/shared/interface/dashboard/daily-sale-report.interface';
import { iProfitAnalysis } from 'src/app/shared/interface/dashboard/profit-loss.interface';
import { iRevenue } from 'src/app/shared/interface/dashboard/revenue.interface';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';
import { iTopBuyers } from 'src/app/shared/interface/dashboard/top-buyer.interface';
import { iStockResponse, iStocks } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public stats: {
    orderStats: Partial<iOrderStats>;
    revenue: Partial<iRevenue>;
  } = {
    orderStats: {},
    revenue: {}
  };

  public fromDate: string = '';
  public toDate: string = '';

  public products: iStocks[] = [];
  public topBuyers: iTopBuyers[] = [];
  public saleReport: iDailySaleReport[] = [];
  public profitAnalysis: iProfitAnalysis[] = [];

  constructor(
    private ds: DashboardService,
    private ps: ProductService,
    private router: Router
  ) { }

  public onFilterChange(event: { start: string, end: string }): void {
    this.fromDate = event.start;
    this.toDate = event.end;
    this.getStats();
    this.getDailySalesReport();
    this.getProfitLossData();
    this.getStocks();
    this.getTopBuyers();
    
  }

  private async getStats(): Promise<void> {
    this.stats.orderStats = await lastValueFrom(this.ds.getOrderStats(this.fromDate, this.toDate));
    this.stats.revenue = await lastValueFrom(this.ds.getRevenue(this.fromDate, this.toDate));
  }

  private getStocks(): void {
    this.ps.getProducts(0, 5, { sortby: 'TopSelling' } as any).subscribe({
      next: (res: iStockResponse) => {
        if (!res || !res.data) return;
        this.products = res.data.products;
        
        if (res.data.images) {
          this.products.forEach((product: iStocks) => {
            product.images = res.data.images[product.productId];
          });
        }
      }
    })
  }

  private async getTopBuyers(): Promise<void> {
    this.topBuyers = await lastValueFrom(this.ds.getTopBuyers(7));
  }

  private async getProfitLossData(): Promise<void> {
    this.profitAnalysis = await lastValueFrom(this.ds.getProfitReport(this.fromDate, this.toDate));
  }

  private async getDailySalesReport(): Promise<void> {
    this.saleReport = await lastValueFrom(this.ds.getDailySalesReport(this.fromDate, this.toDate));
  }

  public goto(): void {
    this.router.navigate(['stock']);
  }
}
