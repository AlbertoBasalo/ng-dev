import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 30,
    ellipsis: string = '...'
  ): unknown {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + ellipsis;
  }
}
