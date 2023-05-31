import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { HomeFacade } from './home.facade';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorComponent, ListComponent],
  template: `
    <lab-loading *ngIf="loading()" />
    <lab-error *ngIf="hasError()" [errorMessage]="errorMessage()" />
    <lab-list
      *ngIf="showData()"
      [items]="activities()"
      caption="Activity list"
    />
  `,
  styles: [],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  #homeFacade: HomeFacade = inject(HomeFacade);
  loading = this.#homeFacade.loading;
  hasError = this.#homeFacade.hasError;
  activities = this.#homeFacade.activities;
  errorMessage = this.#homeFacade.errorMessage;
  showData = this.#homeFacade.showData;
  constructor() {
    this.#homeFacade.getActivities();
  }
}
