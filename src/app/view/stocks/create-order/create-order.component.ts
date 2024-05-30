import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderLinkComponent } from 'src/app/shared/components/order-link/order-link.component';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { iOrderRequest } from 'src/app/shared/interface/order/order.interface';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements AfterViewInit {

  public orderQty: Array<number> = new Array();
  public orderTotal: Array<number> = new Array();
  public orderDetails: Array<any[]> = new Array();

  public selectedProductIds: string[] = []; 

  public shippingCost: number = 0;
  public total: number = 0;
  public totalQuantity: number = 0;

  constructor(
    private cdRef: ChangeDetectorRef,
    private os: OrderService,
    private location: Location,
    private helper: HelperService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        if (!params || !params['id']) {
          this.location.back();
          return;
        } 

        this.selectedProductIds = params['id'].split(',');
        this.orderDetails = new Array(this.selectedProductIds.length);
        this.orderQty = new Array(this.selectedProductIds.length);
        this.orderTotal = new Array(this.selectedProductIds.length);
      }
    });
  }
  
  public ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

   public onDetailsChanges(event: Observable<any[]>, i: number): void {
    
    event.subscribe({
      next: (value: any[]) => {

        this.orderQty[i] = 0;
        this.orderTotal[i] = 0;
        
        if (value && value.length > 0) {
          value.forEach((val: any) => {
                
            if (val['qty']) {
              this.orderQty[i] = this.orderQty[i] + (val['qty'] ?? 0);
              this.orderTotal[i] = this.orderTotal[i] + (val['price'] ?? 0);
            }

          });
        }

        this.orderDetails[i] = value;
        this.total = this.count(this.orderTotal) + this.shippingCost;
        this.totalQuantity = this.count(this.orderQty);
      }
    });

  }

  public createOrder(): void {
    if (!this.orderDetails || this.orderDetails.length <= 0) return;

    console.log('order details', this.orderDetails, this.orderTotal, this.orderQty);

    let orderRequest: iOrderRequest = {
      products: [],
      shippingCharge: this.shippingCost,
      totalAmount: this.total
    };

    this.orderDetails.forEach((orders: any[]) => {
      orders.forEach((order: any) => {

        if (order['productId'] && order['qty'] && order['varientId']) {
          orderRequest.products.push({
            productId: order['productId'],
            quantity: order['qty'],
            variantId: order['varientId']
          });
        }

      });
    });

    if (!orderRequest || !orderRequest.products || orderRequest.products.length <= 0) {
      this.helper.showToaster('Please add valid order details', 'error');
      return;
    }

    this.os.createOrder(orderRequest).subscribe({
      next: (res: iCommonResponse) => {
        if (!res || res.status !== 'Successful') {
          this.helper.showToaster(res?.description ?? 'Something went wrong. Please tryagain later', 'error');
          return;
        }

        this.dialog.open(OrderLinkComponent, {
          panelClass: 'full-page-dialog',
          maxWidth: '100vw',
          maxHeight: '100vh',
          width: '100%',
          height: '100%',
          autoFocus: false,
          data: {
            id: res.description
          }
        });

      }, error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    })
  }

  public goBack(): void {
    this.location.back();
  }

  private count(arr: number[]): number {
    let count: number = 0;
    arr.forEach((val: number) => count += val);
    return count;
  }
}
