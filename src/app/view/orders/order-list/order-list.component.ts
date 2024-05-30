import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { iOrders } from 'src/app/shared/interface/order/order.interface';
import { AddTrackingDetailsComponent } from '../add-tracking-details/add-tracking-details.component';
import { iNameValue } from 'src/app/shared/interface/common/name-value.interface';
import { OrderFilter } from 'src/app/shared/configurations/filters/order.filter';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss', '../../stocks/stock-details/stock-details.component.scss']
})
export class OrderListComponent {

  @Input() orders: iOrders[] = [];
  @Output() reloadOrders: EventEmitter<void> = new EventEmitter<void>();

  public orderStatus: iNameValue[] = OrderFilter;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private os: OrderService,
    private helper: HelperService
  ) { }

  public goto(id: string): void {
    this.router.navigate(['order/details'], { queryParams: { id } });
  }


  public addTrackingDetails(id: string): void {
    this.dialog.open(AddTrackingDetailsComponent, {
      width: '450px',
      height: 'auto',
      data: {
        id
      }
    }).afterClosed().subscribe({
      next: () => {
        this.reloadOrders.emit();
      }
    })
  }

  public onStatusChange(event: string, id: string): void {
    this.os.updateOrder(id, { orderStatus: event }).subscribe({
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
}
