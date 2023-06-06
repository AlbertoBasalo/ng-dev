import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommandSignal } from 'src/app/core/command.signal';

@Injectable()
export class HomeFacade {
  #api = 'http://localhost:3000/activities';
  #http = inject(HttpClient);
  getActivitiesSignal = new CommandSignal<object[]>();

  getActivities(): void {
    const publishedUrl = `${this.#api}?state=published`;
    const command$ = this.#http.get<object[]>(publishedUrl);
    this.getActivitiesSignal.execute(command$);
  }
}
