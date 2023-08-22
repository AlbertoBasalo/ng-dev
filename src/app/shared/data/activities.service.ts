import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from '../domain/models/activity.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  #endpoint = 'http://localhost:3000/activities';
  #http = inject(HttpClient);

  getActivities(): Observable<Activity[]> {
    return this.#http.get<Activity[]>(this.#endpoint);
  }
  getByUserId(userId: string): Observable<Activity[]> {
    const url = `${this.#endpoint}?userId=${userId}`;
    return this.#http.get<Activity[]>(url);
  }
  getBySlug(slug: string): Observable<Activity> {
    const url = `${this.#endpoint}?slug=${slug}`;
    return this.#http.get<Activity[]>(url).pipe(map((result) => result[0]));
  }
  getByState(state: string): Observable<Activity[]> {
    const url = `${this.#endpoint}?state=${state}`;
    return this.#http.get<Activity[]>(url);
  }
  postActivity(activity: Activity): Observable<Activity> {
    return this.#http.post<Activity>(this.#endpoint, activity);
  }
  putActivity(activity: Activity): Observable<Activity> {
    const url = `${this.#endpoint}/${activity.id}`;
    return this.#http.put<Activity>(url, activity);
  }
}
