import { Injectable } from '@angular/core';
import { CrudService } from '../common/crud/crud.service';
import { iOrderRequest, iOrderResponse, iOrders, iUpdateOrderDetails } from '../../interface/order/order.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { OrderEndpoint } from '../../endpoints/order/order.endpoint';
import { iCommonResponse } from '../../interface/common/common-response.interface';
import { iCustomerAddress } from '../../interface/customer/address.interface';
import { iStockFilters } from '../../interface/stock/stock.filter.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private crudService: CrudService
  ) { }

  public createOrder(orderRequest: iOrderRequest): Observable<iCommonResponse> {
    return this.crudService.create(
      environment.api,
      OrderEndpoint.index,
      orderRequest,
      true
    )
  }

  public getOrders(pageNumber: number = 0, pageSize: number = 10, filter: iStockFilters | undefined = undefined): Observable<iOrderResponse> {

    let filterString: string = '';

    if (filter) {

      filterString += filter.sortby ? ('&sort=' + filter.sortby) : '';      
      filterString += filter.searchKey ? ('&query=' + filter.searchKey) : '';
      filterString += filter.status ? ('&status=' + filter.status) : '';
      
    }

    return this.crudService.read(
      environment.api, 
      OrderEndpoint.index + '?fetchAll=' + (filterString ? false: true) + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + filterString,
      true
    );
  }

  public getOrderById(id: string): Observable<iOrders> {
    return this.crudService.read(
      environment.api, 
      OrderEndpoint.getOrderById + id,
      true
    );
  }

  /**
   * To update the order details
   * @param orderId order id
   * @param updateDetails update order details
   * @returns common response as observable
  */
  public updateOrder(orderId: string, updateDetails: iUpdateOrderDetails): Observable<iCommonResponse> {
    
    let filter: string = '';

    Object.keys(updateDetails).forEach((key: string, index: number) => {
      if (index === 0) {
        filter = '?' + key + '=' + (updateDetails as any)[key];
      } else {
        filter = filter + ('&' + key + '=' + (updateDetails as any)[key]);
      }
    });
    
    return this.crudService.update(
      environment.api,
      OrderEndpoint.index + '/' + orderId + filter,
      null,
      true
    );
  }


  public updateCustomerAddress(id: string, addressDetails: iCustomerAddress): Observable<iCommonResponse> {
    return this.crudService.update(
      environment.api,
      OrderEndpoint.updateCustomerDetails + id,
      addressDetails,
      false
    )
  }

  // public updateOrder(orderRequest: iOrderRequest): Observable<iCommonResponse> {
  //   return this.crudService.update(
  //     environment.api, 
  //     ProductEndpoint.index,
  //     product,
  //     true
  //   );
  // }

  // public deleteProduct(ids: string[]): Observable<iCommonResponse> {
  //   return this.crudService.delete(
  //     environment.api, 
  //     ProductEndpoint.index,
  //     { productIdList: ids },
  //     true
  //   );
  // }
}
