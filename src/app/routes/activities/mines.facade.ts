import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommandState } from 'src/app/core/command.state';
import { GlobalStore } from 'src/app/core/global.store';

@Injectable()
export class MinesFacade {
  #api = 'http://localhost:3000/activities/?userId=';
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);
  getMyActivitiesState = new CommandState<any[]>();

  getMyActivities(): void {
    const userId = this.#globalStore.userId();
    const url = `${this.#api}${userId}`;
    const command$ = this.#http.get<any[]>(url);
    this.getMyActivitiesState.execute(command$);
  }
}
