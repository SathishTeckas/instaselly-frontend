import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iOrders } from 'src/app/shared/interface/order/order.interface';
import { PrintAddressComponent } from '../print-address/print-address.component';
import { AddTrackingDetailsComponent } from '../add-tracking-details/add-tracking-details.component';
import { OrderFilter } from 'src/app/shared/configurations/filters/order.filter';
import { iNameValue } from 'src/app/shared/interface/common/name-value.interface';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { OrderLinkComponent } from 'src/app/shared/components/order-link/order-link.component';
import { DOCUMENT } from '@angular/common';
import { iCustomerAddress } from 'src/app/shared/interface/customer/address.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  public id: string = '';
  public orderDetails: Partial<iOrders> = {};
  public orderStatus: iNameValue[] = OrderFilter;

  constructor(
    private route: ActivatedRoute,
    private os: OrderService,
    private dialog: MatDialog,
    private helper: HelperService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.id = params['id'];
        this.getOrderById(this.id);
      }
    })
  }


  private getOrderById(id: string): void {
    this.os.getOrderById(id).subscribe({
      next: (res: iOrders) => {
        if (!res) return;
        this.orderDetails = res;
      }
    })
  }

  public printAddress(address: iCustomerAddress, customerName: string): void {
    this.dialog.open(PrintAddressComponent, {
      width: '50vw',
      height: 'auto',
      data: {
        address,
        customerName
      }
    });
  }

  public addTrackingDetails(): void {
    this.dialog.open(AddTrackingDetailsComponent, {
      width: '450px',
      height: 'auto',
      data: {
        id: this.id
      }
    }).afterClosed().subscribe({
      next: () => {
        this.getOrderById(this.id);
      }
    })
  }

  public onStatusChange(event: string): void {
    this.os.updateOrder(this.id, { orderStatus: event }).subscribe({
      next: (res: iCommonResponse) => {
        
        if (!res || !res.description) {
          this.helper.showToaster(res.status ?? 'Something went wrong. Please tryagain later', 'error');
          return;
        }

        this.helper.showToaster('Order status updated successfully', 'success');
      },
      error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    })
  }

  public openOrderLink(): void {
    const url: string = this.document.location.origin + '/customer/checkout?id=' + this.id + '&preview=true';
    window.open(url, '_blank');
  }

}
