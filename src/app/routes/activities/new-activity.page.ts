import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewActivityForm } from './new-activity.form';

@Component({
  selector: 'lab-new-activity',
  standalone: true,
  imports: [CommonModule, NewActivityForm],
  template: ` <lab-new-activity-form /> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewActivityPage {}
