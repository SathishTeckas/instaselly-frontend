import { Injectable } from '@angular/core';
import { CrudService } from '../common/crud/crud.service';
import { Observable } from 'rxjs';
import { iOrders } from '../../interface/order/order.interface';
import { environment } from 'src/environment/environment';
import { OrderEndpoint } from '../../endpoints/order/order.endpoint';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(
    private crudService: CrudService
  ) { }

  public getOrderById(id: string): Observable<iOrders> {
    return this.crudService.read(
      environment.api, 
      OrderEndpoint.getOrderById + id,
      false
    );
  }
}
