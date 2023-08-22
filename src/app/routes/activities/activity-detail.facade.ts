import { Injectable, inject } from '@angular/core';
import * as Mark from 'marked';
import { tap } from 'rxjs';
import { ActivitiesService } from 'src/app/shared/data/activities.service';
import { BookingsService } from 'src/app/shared/data/bookings.service';
import {
  Activity,
  DEFAULT_ACTIVITY,
} from 'src/app/shared/domain/models/activity.interface';
import {
  Booking,
  DEFAULT_BOOKING,
} from 'src/app/shared/domain/models/booking.interface';
import { getNewId } from 'src/app/shared/domain/utils/identifier.functions';
import { CommandStore } from 'src/app/shared/state/command.store';

@Injectable()
export class ActivityDetailFacade {
  #activitiesService = inject(ActivitiesService);
  #bookingService = inject(BookingsService);
  getActivityStore = new CommandStore<Activity>(DEFAULT_ACTIVITY);
  postBookingStore = new CommandStore<Booking>(DEFAULT_BOOKING);
  getActivity(slug: string): void {
    const command$ = this.#activitiesService
      .getBySlug(slug)
      .pipe(tap((activity) => console.log(activity)));
    this.getActivityStore.execute(command$);
  }
  getDescription(activity: Activity) {
    if (!activity) return '';
    return Mark.marked(activity.description);
  }

  bookActivity(activity: Activity) {
    const activityBooking: Booking = {
      id: getNewId(),
      activityId: activity.id,
      userId: activity.userId,
      date: new Date().toISOString(),
      participants: 1,
      state: 'booked',
    };
    const command$ = this.#bookingService.postBooking(activityBooking);
    this.postBookingStore.execute(command$);
  }
}
