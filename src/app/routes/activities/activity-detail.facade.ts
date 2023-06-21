import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Mark from 'marked';
import { map, tap } from 'rxjs';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { Booking, DEFAULT_BOOKING } from 'src/app/core/booking.interface';
import { CommandStore } from 'src/app/core/command.store';
@Injectable()
export class ActivityDetailFacade {
  #http = inject(HttpClient);
  getActivityStore = new CommandStore<Activity>(DEFAULT_ACTIVITY);
  postBookingStore = new CommandStore<Booking>(DEFAULT_BOOKING);
  getActivity(slug: string): void {
    const api = 'http://localhost:3000/activities';
    const url = `${api}?slug=${slug}`;
    const command$ = this.#http.get<Activity[]>(url).pipe(
      map((list) => list[0]),
      tap((activity) => console.log(activity))
    );
    this.getActivityStore.execute(command$);
  }
  getDescription(activity: Activity) {
    if (!activity) return '';
    return Mark.marked(activity.description);
  }

  bookActivity(activity: Activity) {
    const url = `http://localhost:3000/bookings`;
    const command$ = this.#http.post<Booking>(url, {
      id: new Date().getMilliseconds(),
      activityId: activity.id,
      userId: activity.userId,
      date: new Date().toISOString(),
      participants: 1,
      state: 'booked',
    });
    this.postBookingStore.execute(command$);
  }
}
