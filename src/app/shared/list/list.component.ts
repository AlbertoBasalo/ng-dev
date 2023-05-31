import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="items.length > 0">
      <li *ngFor="let item of items">{{ item | json }}</li>
    </ul>
    <aside *ngIf="items.length === 0">No data!</aside>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() items: any[] = [];
}
