import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dl>
      <dt class="left-align">{{ term }}</dt>
      <dd class="right-align">{{ data }}</dd>
    </dl>
  `,
  styles: [
    `
      dt,
      dd {
        display: inline;
      }
      dd {
        font-weight: bold;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataBlock {
  @Input() term: string = '';
  @Input() data: string = '';
}
