import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iRevenue } from 'src/app/shared/interface/dashboard/revenue.interface';
import { iStatsData } from 'src/app/shared/interface/dashboard/stats.interface';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';
import { iTopBuyers } from 'src/app/shared/interface/dashboard/top-buyer.interface';
import { iProfitAnalysis } from 'src/app/shared/interface/dashboard/profit-loss.interface';
import { iDailySaleReport } from 'src/app/shared/interface/dashboard/daily-sale-report.interface';
import { iStocks } from 'src/app/shared/interface/stock/stock.interface';
import { iStockDetails } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // Static data for stats (revenue and order statistics)
  public stats: {
    orderStats: Partial<iOrderStats>;
    revenue: Partial<iRevenue>;
    stockStats: Partial<iStatsData>;
  } = {
    orderStats: {
      total: 100,
      created: 120,
      placed: 110,
      dispatched: 95,
      delivered: 85
    },
    revenue: {
      revenueAmount: 50000,
      totalStocks: 1000,
      soldStocks: 700
    },
    stockStats: {
      totalProducts: 50,
      totalStocks: 1000,
      inStock: 500,
      lowStock: 100,
      outOfStock: 200
    }
  };

  // Static date range
  public fromDate: string = '2024-10-01';
  public toDate: string = '2024-10-31';

  // Static data for products, top buyers, sale report, and profit analysis
  public products: iStocks[] = [
    {
      category: 'Electronics',
      categoryId: 'cat-001',
      createdOrders: 30,
      favourite: true,
      instagramCaption: 'Best electronics in the market!',
      name: 'Smartphone',
      placedOrders: 25,
      productId: 'prod-001',
      revenueAmount: 15000,
      revenuePercentage: 15,
      shareToInsta: true,
      status: 'In Stock',
      stocksAvailable: 100,
      totalStocks: 200,
      images: ['https://via.placeholder.com/150'],
      variants: [
        {
          purchaseAmount: 200,
          properties: [{ name: 'Color', value: 'Black' }],
          minimumOrderQuantity: 1,
          minimumStocks: 10,
          sellingPrice: 250,
          totalStocks: 50
        },
        {
          purchaseAmount: 180,
          properties: [{ name: 'Color', value: 'White' }],
          minimumOrderQuantity: 1,
          minimumStocks: 10,
          sellingPrice: 240,
          totalStocks: 50
        }
      ]
    },
    {
      category: 'Home Appliances',
      categoryId: 'cat-002',
      createdOrders: 50,
      favourite: false,
      instagramCaption: 'Top-rated home appliances!',
      name: 'Washing Machine',
      placedOrders: 45,
      productId: 'prod-002',
      revenueAmount: 25000,
      revenuePercentage: 20,
      shareToInsta: true,
      status: 'In Stock',
      stocksAvailable: 70,
      totalStocks: 150,
      images: ['https://via.placeholder.com/150'],
      variants: [
        {
          purchaseAmount: 500,
          properties: [{ name: 'Color', value: 'Silver' }],
          minimumOrderQuantity: 1,
          minimumStocks: 5,
          sellingPrice: 600,
          totalStocks: 70
        }
      ]
    }
  ];

  public topBuyers: iTopBuyers[] = [
    {
      phoneNumber: '1234567890',
      name: 'Buyer 1',
      totalPurchaseAmount: 1000,
      totalOrders: 5,
      totalItems: 10
    },
    {
      phoneNumber: '0987654321',
      name: 'Buyer 2',
      totalPurchaseAmount: 750,
      totalOrders: 4,
      totalItems: 8
    }
  ];

  public saleReport: iDailySaleReport[] = [
    {
      date: '2024-10-01',
      amount: 200
    },
    {
      date: '2024-10-02',
      amount: 180
    }
  ];

  public profitAnalysis: iProfitAnalysis[] = [
    {
      date: '2024-10-01',
      expense: 1000,
      loss: 200,
      profit: 800
    },
    {
      date: '2024-10-02',
      expense: 1200,
      loss: 150,
      profit: 1050
    }
  ];

  constructor(private router: Router) { }

  // Static method to simulate filter change
  public onFilterChange(event: { start: string, end: string }): void {
    this.fromDate = event.start;
    this.toDate = event.end;
    this.getStats();
    this.getDailySalesReport();
    this.getProfitLossData();
    this.getStocks();
    this.getTopBuyers();
  }

  // Static method to get stats data
  private getStats(): void {
    // The stats data is already static, no need to fetch it
  }

  // Static method to get products data
  private getStocks(): void {
    // The products data is already static, no need to fetch it
  }

  // Static method to get top buyers data
  private getTopBuyers(): void {
    // The top buyers data is already static, no need to fetch it
  }

  // Static method to get profit/loss data
  private getProfitLossData(): void {
    // The profit analysis data is already static, no need to fetch it
  }

  // Static method to get daily sales report data
  private getDailySalesReport(): void {
    // The daily sales report data is already static, no need to fetch it
  }

  // Navigation to stock page (without making any API calls)
  public goto(): void {
    this.router.navigate(['stock']);
  }
}
