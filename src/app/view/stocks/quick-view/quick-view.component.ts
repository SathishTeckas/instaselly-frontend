import { Component, Input } from '@angular/core';
import { iStockDetails, iStocks } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss', '../stock-details/stock-details.component.scss']
})
export class QuickViewComponent {

  @Input() stockDetails: Partial<iStocks> = {};

}
