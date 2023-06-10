import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Mark from 'marked';
import { map } from 'rxjs';
import { Activity, DEFAULT_ACTIVITY } from 'src/app/core/activity.interface';
import { CommandState } from 'src/app/core/command.state';
@Injectable()
export class DetailFacade {
  #http = inject(HttpClient);
  getActivityState = new CommandState<Activity>(DEFAULT_ACTIVITY);

  getActivity(slug: string): void {
    const api = 'http://localhost:3000/activities?slug=';
    const url = `${api}${slug}`;
    const command$ = this.#http
      .get<Activity[]>(url)
      .pipe(map((list) => list[0]));
    this.getActivityState.execute(command$);
  }
  getDescription(activity: Activity) {
    if (!activity) return '';
    return Mark.marked(activity.description);
  }
}
