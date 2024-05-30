import { Component, Input } from '@angular/core';
import { iTopBuyers } from 'src/app/shared/interface/dashboard/top-buyer.interface';

@Component({
  selector: 'buyer-widget',
  templateUrl: './buyer-widget.component.html',
  styleUrls: ['./buyer-widget.component.scss']
})
export class BuyerWidgetComponent {

  @Input() buyers: iTopBuyers[] = [];

}
