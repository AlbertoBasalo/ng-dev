import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Mark from 'marked';
import { map } from 'rxjs';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { CommandStore } from 'src/app/core/command.store';
@Injectable()
export class ActivityDetailFacade {
  #http = inject(HttpClient);
  getActivityStore = new CommandStore<Activity>(DEFAULT_ACTIVITY);

  getActivity(slug: string): void {
    const api = 'http://localhost:3000/activities';
    const url = `${api}?slug=${slug}`;
    const command$ = this.#http
      .get<Activity[]>(url)
      .pipe(map((list) => list[0]));
    this.getActivityStore.execute(command$);
  }
  getDescription(activity: Activity) {
    if (!activity) return '';
    return Mark.marked(activity.description);
  }
}
