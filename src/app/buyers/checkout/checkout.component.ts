import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuyerService } from 'src/app/shared/controller/buyer/buyer.service';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { iCustomerAddress } from 'src/app/shared/interface/customer/address.interface';
import { iOrders } from 'src/app/shared/interface/order/order.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public orderId: string = '';
  public orderDeatails: Partial<iOrders> = {};
  public height: number = 400;
  public disableShippingDetails: boolean = true;
  public disablePayment: boolean = true;
  public currentTab: number = 0;

  public addressDetails: any;

  public onlyPreview: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private bs: BuyerService,
    private os: OrderService,
    private helper: HelperService
  ) {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        if (params && params['id']) {
          let param: string =  params['id'];
          if (param.includes('/')) {
            this.orderId = param.split('/')[1];
          } else {
            this.orderId = param;
          }

          this.loadOrderDetails(this.orderId);
        }

        if (params && params['preview']) {
          this.onlyPreview = true;
        }
      }
    });

    this.onResize();
  }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const spacing: number = 60;
    const availableHeight: number = window.innerHeight - spacing;
    this.height = availableHeight;
  }


  private loadOrderDetails(orderId: string): void {
    this.bs.getOrderById(orderId).subscribe({
      next: (res: iOrders) => {
        if (!res) return;
        this.orderDeatails = res;
      }
    });
  }

  public onAddressChange(event: Partial<iCustomerAddress>): void {

    this.os.updateCustomerAddress(this.orderId, event as any).subscribe({
      next: (res: iCommonResponse) => {
        
        if (!res || !res.description) {
          this.helper.showToaster(res.status ?? 'Something went wrong. Please tryagain later', 'error');
          return;
        }

        this.disableShippingDetails = false;
        this.currentTab = 1;
        this.addressDetails = event;
      },
      error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    });
  }

  public gotoPayment(): void {
    this.disablePayment = false;
    this.currentTab = 2;
  }

  public onChangeAddress(): void {
    this.currentTab = 0;
    this.disablePayment = true;
    this.disableShippingDetails = true;
  }
}
