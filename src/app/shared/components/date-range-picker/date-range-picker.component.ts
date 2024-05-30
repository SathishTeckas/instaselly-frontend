import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { startOfDay, endOfDay } from 'date-fns';
import { formatDate } from '../../helper/date.helper';

const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMMM, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DateRangePickerComponent implements AfterViewInit {
  
  private lastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());

  public range: FormGroup = new FormGroup({
    start: new FormControl(moment(this.lastMonth)),
    end: new FormControl(moment()),
  });

  @Output() onRangeChange: EventEmitter<{start: string, end: string}> = new EventEmitter<{start: string, end: string}>();

  public ngAfterViewInit(): void {
    this.onRangeChange.emit({
      start: formatDate(startOfDay(new Date(this.range.value['start']))),
      end: formatDate(endOfDay(new Date(this.range.value['end'])))
    });
  }

  public onDateChange(event: any): void {
    if (!event || !event.value) return;
    this.onRangeChange.emit({
      start: formatDate(startOfDay(new Date(this.range.value['start']))),
      end: formatDate(endOfDay(new Date(this.range.value['end'])))
    });
  }
}
