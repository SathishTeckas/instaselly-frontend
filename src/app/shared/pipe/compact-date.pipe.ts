import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compactDate'
})
export class CompactDatePipe implements PipeTransform {

  private months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  transform(value: any): string {
    if (!value) {
      throw new Error('Invalid date. Date is required.');
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format.');
    }

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthName = this.getMonthName(monthIndex);
    const formattedDate = `${day}${this.getOrdinalSuffix(day)} ${monthName}, ${year}`;
    return formattedDate;
  }

  private getOrdinalSuffix(day: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  private getMonthName(monthIndex: number): string {
    if (monthIndex >= 0 && monthIndex < this.months.length) {
      return this.months[monthIndex];
    }
    throw new Error('Invalid month index.');
  }

}
