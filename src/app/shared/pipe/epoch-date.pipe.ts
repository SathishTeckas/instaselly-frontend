import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'millisecondsToDate' })
export class MillisecondsToDatePipe implements PipeTransform {
  transform(value: number): string {
    // Check if the input value is a valid number (milliseconds)
    if (isNaN(value) || value <= 0) {
      return 'Invalid Date';
    }

    // Convert milliseconds to Date object
    const date = new Date(value);

    // Check if the conversion resulted in an invalid date
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Format the date using the desired format "3 Apr 2023, 12:05 PM"
    const day = date.getDate();
    const month = this.getMonthName(date.getMonth());
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = this.padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedDate = `${day} ${month} ${year} at ${hours % 12 || 12}:${minutes} ${ampm}`;

    return formattedDate;
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month];
  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }
}
