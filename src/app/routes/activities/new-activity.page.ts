import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Activity } from 'src/app/shared/domain/models/activity.interface';
import { NewActivityFacade } from './new-activity.facade';
import { NewActivityForm } from './new-activity.form';

type ActivityForm = Omit<Activity, 'id' | 'slug' | 'userId' | 'state'>;

@Component({
  selector: 'lab-new-activity',
  standalone: true,
  imports: [CommonModule, NewActivityForm],
  template: ` <lab-new-activity-form (create)="onCreate($event)" /> `,
  styles: [],
  providers: [NewActivityFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewActivityPage {
  #facade = inject(NewActivityFacade);

  onCreate(activity: ActivityForm) {
    this.#facade.postActivity(activity).subscribe();
  }
}
