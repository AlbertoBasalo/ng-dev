import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { CommandStore } from 'src/app/shared/state/command.store';

import {
  DEFAULT_USER_TOKEN,
  UserRegistration,
  UserToken,
} from 'src/app/shared/domain/models/user-token.interface';
import { GlobalStore } from 'src/app/shared/state/global.store';
import { SignUpForm } from './sign-up.form';

@Component({
  selector: 'lab-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpForm],
  template: ` <lab-sign-up-form (singUp)="onSingUp($event)" /> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);

  postRegisterStore = new CommandStore<UserToken>(DEFAULT_USER_TOKEN);

  onSingUp(newCredentials: UserRegistration): void {
    const api = 'http://localhost:3000/register';
    const command$ = this.#http
      .post<UserToken>(api, newCredentials)
      .pipe(tap((userToken) => this.#globalStore.setUserToken(userToken)));
    this.postRegisterStore.execute(command$);
  }
}
