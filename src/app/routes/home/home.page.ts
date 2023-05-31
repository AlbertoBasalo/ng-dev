import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorComponent, ListComponent],
  template: `
    <lab-loading *ngIf="loading()" />
    <lab-error *ngIf="errorMessage()" />
    <lab-list *ngIf="!loading() && !errorMessage()" [items]="activities()" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  #http = inject(HttpClient);
  loading = signal(false);
  errorMessage = signal('');
  activities = signal<object[]>([]);
  constructor() {
    this.loading.set(true);
    this.#http.get<object[]>('http://localhost:3000/activities').subscribe({
      next: (body) => {
        this.activities.set(body);
        this.loading.set(false);
      },
      error: (e) => {
        this.errorMessage.set(e.message);
        this.loading.set(false);
      },
    });
  }
}
