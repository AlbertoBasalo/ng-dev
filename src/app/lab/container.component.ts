import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from './data.service';
import { PresenterComponent } from './presenter.component';
@Component({
  selector: 'lab-container',
  standalone: true,
  imports: [CommonModule, PresenterComponent],
  providers: [DataService],
  template: `
    <lab-presenter
      [activity]="activity()"
      (bookActivity)="bookActivity($event)"></lab-presenter>
  `,
})
export class ContainerComponent implements OnInit {
  #dataService = inject(DataService);
  activity = toSignal(this.#dataService.getActivityById(1), {
    initialValue: {},
  });
  ngOnInit() {
    // this.#dataService.getActivities().subscribe((activities) => {
    //   console.log(activities);
    // });
  }
  bookActivity(participants: number) {
    this.#dataService.bookActivity(1, participants);
  }
}
