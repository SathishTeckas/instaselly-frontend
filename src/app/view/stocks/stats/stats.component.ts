import { AfterViewInit, Component } from '@angular/core';
import { DashboardService } from 'src/app/shared/controller/dashboard/dashboard.service';
import { iStatsData } from 'src/app/shared/interface/dashboard/stats.interface';

@Component({
  selector: 'stock-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {

  public stats: Partial<iStatsData> = {};

  constructor (private ds: DashboardService) { }

  public ngAfterViewInit(): void {
    this.getStats();
  }

  private getStats(): void {
    this.ds.getStats().subscribe({
      next: (res: iStatsData) => {
        this.stats = res;
      }
    })
  }
}
