import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-date',
  standalone: true,
  imports: [CommonModule],
  template: `<time [attr.datetime]="date" [attr.data-tooltip]="date"> 📅 {{ date | date : 'dd-MMM-yyyy' }} </time>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateBlock {
  @Input() date: Date = new Date();
}
