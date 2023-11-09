import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../shared/domain/models/activity.interface';

@Component({
  selector: 'lab-presenter',
  standalone: true,
  template: `
    <div>
      <h2>{{ activity.title }}</h2>
      <p>{{ activity.capacity }} places</p>
      <button (click)="bookActivity.emit(1)">Book Activity</button>
    </div>
  `,
})
export class PresenterComponent {
  @Input({ required: true }) activity!: Partial<Activity>;
  @Output() bookActivity = new EventEmitter<number>();
}
