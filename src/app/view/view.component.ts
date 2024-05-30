import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {

  public isMobile: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
  ) {}

  public ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
    this.cdRef.detectChanges();
  }
}
