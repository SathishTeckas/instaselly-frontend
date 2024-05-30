import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iCustomerAddress } from 'src/app/shared/interface/customer/address.interface';

@Component({
  selector: 'shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss', '../information/information.component.scss']
})
export class ShippingDetailsComponent {

  @Input() address: Partial<iCustomerAddress> = {};
  @Output() makePayment: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeAddress: EventEmitter<void> = new EventEmitter<void>();

  public save(): void {
    this.makePayment.emit();
  }

  public change(): void {
    this.changeAddress.emit();
  }
}
