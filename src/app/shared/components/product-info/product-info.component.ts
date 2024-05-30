import { Component, Input } from '@angular/core';
import { iStockDetails } from '../../interface/stock/stock.interface';
import { iOrderVariants } from '../../interface/order/order.interface';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  @Input() variants: Partial<iOrderVariants> = {};


}
