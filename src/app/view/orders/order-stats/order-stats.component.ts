import { Component, Input } from '@angular/core';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';

@Component({
  selector: 'order-stats',
  templateUrl: './order-stats.component.html',
  styleUrls: ['./order-stats.component.scss', '../../stocks/stats/stats.component.scss']
})
export class OrderStatsComponent {

  @Input() stats: Partial<iOrderStats> = {};

}
