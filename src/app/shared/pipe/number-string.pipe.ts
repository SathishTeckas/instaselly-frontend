import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToString'
})
export class NumberStringPipe implements PipeTransform {

  transform(numberToConvert: number): string {
    let convertedNumber: string = '';

    if (numberToConvert >= 1000) {
      const suffixes: string[] = ["", "K", "M", "B", "T"];
      const suffixNum: number = Math.floor(("" + numberToConvert).length / 3);
      let shortValue: any = '';

      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? (numberToConvert / Math.pow(1000, suffixNum)) : numberToConvert).toPrecision(precision));
        const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
      }
      convertedNumber = shortValue + suffixes[suffixNum];
    } else {
      convertedNumber = numberToConvert ? numberToConvert.toString() : '0';
    }

    return convertedNumber;
  }

}
