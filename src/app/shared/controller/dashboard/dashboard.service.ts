import { Injectable } from '@angular/core';
import { CrudService } from '../common/crud/crud.service';
import { environment } from 'src/environment/environment';
import { DashboardEndpoint } from '../../endpoints/dashboard/dashboard.endpoint';
import { Observable } from 'rxjs';
import { iOrderStats, iStatsData } from '../../interface/dashboard/stats.interface';
import { iDailySaleReport } from '../../interface/dashboard/daily-sale-report.interface';
import { iRevenue } from '../../interface/dashboard/revenue.interface';
import { iTopBuyers } from '../../interface/dashboard/top-buyer.interface';
import { iProfitAnalysis } from '../../interface/dashboard/profit-loss.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private crudService: CrudService
  ) { }


  public getStats(): Observable<iStatsData> {
    return this.crudService.read(
      environment.api,
      DashboardEndpoint.stats,
      true
    )
  }

  public getOrderStats(fromDate: string = '', toDate: string = ''): Observable<iOrderStats> {

    let filter: string = '';

    if (fromDate && toDate) {
      filter = '?fromDate=' + fromDate + '&toDate=' + toDate;
    }

    return this.crudService.read(
      environment.api,
      DashboardEndpoint.getOrders + filter,
      true
    )
  }

  public getRevenue(fromDate: string = '', toDate: string = ''): Observable<iRevenue> {
    let filter: string = '';

    if (fromDate && toDate) {
      filter = '?fromDate=' + fromDate + '&toDate=' + toDate;
    }

    return this.crudService.read(
      environment.api,
      DashboardEndpoint.getRevenue + filter,
      true
    );
  }

  public getTopBuyers(size: number = 7): Observable<iTopBuyers[]> {
    return this.crudService.read(
      environment.api,
      DashboardEndpoint.getTopBuyers + size,
      true
    );
  }

  /**
   * To get the daily sale report data
   * @param fromDate from date
   * @param toDate to date
   * @returns Observable
   */
  public getDailySalesReport(fromDate: string = '', toDate: string = ''): Observable<iDailySaleReport[]> {

    let filter: string = '';

    if (fromDate && toDate) {
      filter = '?fromDate=' + fromDate + '&toDate=' + toDate;
    }

    return this.crudService.read(
      environment.api,
      DashboardEndpoint.getDailySales + filter,
      true
    )
  }

  public getProfitReport(fromDate: string = '', toDate: string = ''): Observable<iProfitAnalysis[]> {

    let filter: string = '';

    if (fromDate && toDate) {
      filter = '?fromDate=' + fromDate + '&toDate=' + toDate;
    }

    return this.crudService.read(
      environment.api,
      DashboardEndpoint.getProfitLoss + filter,
      true
    )
  }

  public getOrderedProducts(categoryId: string = '', fromDate: string = '', toDate: string = '', productId: string = '', status: string = ''): Observable<any> {
    return new Observable();
  }
}
