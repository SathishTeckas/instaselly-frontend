import { Pipe, PipeTransform } from '@angular/core';
import { convertNumber } from '../helper/number.helper';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any, above: number = 99999): unknown {
    if (!value || typeof value !== 'number') return '0';

    if (value > above) return convertNumber(value);
    
    const options = { 
        style: 'decimal', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
        currency: 'INR' 
    };

    return value.toLocaleString('en-IN', options);
  }

}
