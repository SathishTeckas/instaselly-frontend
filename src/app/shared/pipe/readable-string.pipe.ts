import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableString'
})
export class ReadableStringPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return 'N/A';

    try {
      const convertedString = value.toLowerCase().replace('_', ' ');
      const finalString = convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
      return finalString;
    } catch (error) {
      console.error('Error occurred while transforming stock status:', error);
      return value;
    }

  }

}
