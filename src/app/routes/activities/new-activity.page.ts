import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NewActivityForm } from './new-activity.form';

@Component({
  selector: 'lab-new-activity',
  standalone: true,
  imports: [CommonModule, NewActivityForm],
  template: ` <lab-new-activity-form (create)="onCreate($event)" /> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewActivityPage {
  #http = inject(HttpClient);
  // ToDO: use a facade
  onCreate(activity: any) {
    const url = 'http://localhost:3000/activities';
    // To do: add id, slug, userId and status
    this.#http.post(url, activity).subscribe((response) => {
      console.log(response);
    });
  }
}
