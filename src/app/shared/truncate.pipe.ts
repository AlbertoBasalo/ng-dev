import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 30, ellipsis: string = '...'): unknown {
    if (value.length <= length) {
      return value;
    } else {
      return value.substring(0, length) + ellipsis;
    }
  }
}
