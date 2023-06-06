import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommandState } from 'src/app/core/command.state';

@Injectable()
export class HomeFacade {
  #api = 'http://localhost:3000/activities';
  #http = inject(HttpClient);
  getActivitiesState = new CommandState<object[]>();

  getActivities(): void {
    const publishedUrl = `${this.#api}?state=published`;
    const command$ = this.#http.get<object[]>(publishedUrl);
    this.getActivitiesState.execute(command$);
  }
}
