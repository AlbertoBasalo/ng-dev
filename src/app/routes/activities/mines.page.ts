import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorDialog } from 'src/app/shared/error.dialog';
import { ListComponent } from 'src/app/shared/list.component';
import { LoadingComponent } from 'src/app/shared/loading.component';
import { MinesFacade } from './mines.facade';

@Component({
  selector: 'lab-mines',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorDialog, ListComponent],
  template: `
    My activities
    <lab-loading *ngIf="getMyActivities.isWorking()" />
    <lab-error *ngIf="getMyActivities.hasError()" [errorMessage]="getMyActivities.errorMessage()" />
    <lab-list
      *ngIf="getMyActivities.isCompleted()"
      [items]="getMyActivities.result() ?? []"
      caption="Published activities" />
  `,
  styles: [],
  providers: [MinesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MinesPage {
  #minesFacade: MinesFacade = inject(MinesFacade);
  getMyActivities = this.#minesFacade.getMyActivitiesState;
  constructor() {
    this.#minesFacade.getMyActivities();
  }
}
