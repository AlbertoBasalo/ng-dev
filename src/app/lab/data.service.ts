import { Observable, of } from 'rxjs';

export class DataService {
  #activities = [
    {
      id: 1,
      title: 'Activity 1',
      description: 'Activity 1 description',
      date: new Date(),
      price: 0,
      currency: 'EUR',
      capacity: 10,
      quorum: 5,
      status: 'published',
      slug: 'activity-1',
    },
  ];
  getActivities(): Observable<object[]> {
    return of(this.#activities);
  }
  getActivityById(id: number): Observable<object> {
    const activity = this.#activities.find((a) => a.id === 1);
    return of(activity || {});
  }

  bookActivity(id: number, participants: number) {
    const activity = this.#activities.find(
      (a) => a.id === id && a.status === 'published'
    );
    if (activity && activity.capacity >= participants) {
      activity.capacity -= participants;
    }
  }
}
