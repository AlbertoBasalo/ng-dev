import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lab-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article [attr.name]="caption">
      <header>
        <h3>📋 {{ caption }}</h3>
      </header>
      <ul *ngIf="items.length > 0">
        <li *ngFor="let item of items">{{ item | json }}</li>
      </ul>
      <aside *ngIf="items.length === 0">🕳️ No data yet!</aside>
    </article>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() caption: string = 'List';
  @Input() items: any[] = [];
}
