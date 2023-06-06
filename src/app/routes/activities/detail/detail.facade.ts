import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Mark from 'marked';
import { map } from 'rxjs';
import { CommandSignal } from 'src/app/core/command.signal';
@Injectable()
export class DetailFacade {
  #api = 'http://localhost:3000/activities?slug=';
  #http = inject(HttpClient);
  getActivitySignal = new CommandSignal<any>();

  getActivity(slug: string): void {
    const url = `${this.#api}${slug}`;
    const command$ = this.#http.get<any[]>(url).pipe(map((list) => list[0]));
    this.getActivitySignal.execute(command$);
  }
  getDescription(activity: any) {
    if (!activity) return '';
    return Mark.marked(activity.description);
  }
}
