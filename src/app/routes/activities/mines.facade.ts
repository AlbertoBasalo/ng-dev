import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommandState } from 'src/app/core/command.state';

@Injectable()
export class MinesFacade {
  #api = 'http://localhost:3000/activities/mines';
  #http = inject(HttpClient);
  getMyActivitiesState = new CommandState<any[]>();

  getMyActivities(): void {
    const url = `${this.#api}`;
    const command$ = this.#http.get<any[]>(url);
    this.getMyActivitiesState.execute(command$);
  }
}
