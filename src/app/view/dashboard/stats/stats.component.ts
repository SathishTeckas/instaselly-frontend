import { Component, Input } from '@angular/core';
import { iRevenue } from 'src/app/shared/interface/dashboard/revenue.interface';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';

@Component({
  selector: 'dashboard-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  // Input property to receive stats data
  @Input() stats: {
    orderStats: Partial<iOrderStats>;
    revenue: Partial<iRevenue>;
  } = {
    orderStats: {},
    revenue: {}
  };

  // Local variable to hold the current date
  public date: Date = new Date();
}
