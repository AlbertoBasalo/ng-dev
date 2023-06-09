import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lab-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article [attr.name]="caption">
      <header class="headings">
        <h2>📋 {{ caption }}</h2>
        <p>
          Showing <b name="items-count">{{ items.length }}</b> items
        </p>
      </header>
      <main *ngIf="items.length > 0" name="list-content">
        <ng-container *ngFor="let item of items">
          <ng-container *ngTemplateOutlet="itemTemplate ? itemTemplate : defaultItem; context: { $implicit: item }" />
        </ng-container>
      </main>
      <aside *ngIf="items.length === 0">🕳️ No data yet!</aside>
    </article>
    <ng-template #defaultItem let-item>
      <div name="item">{{ item | json }}</div>
    </ng-template>
  `,
  styles: [
    `
      main {
        font-family: monospace;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() caption: string = 'List';
  @Input() items: any[] = [];
}
