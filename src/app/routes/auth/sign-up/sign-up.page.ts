import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { CommandStore } from 'src/app/core/command.store';

import { GlobalStore } from 'src/app/core/global.store';
import {
  DEFAULT_USER_TOKEN,
  UserRegistration,
  UserToken,
} from 'src/app/core/user-token.interface';
import { ErrorDialog } from 'src/app/shared/error.dialog';
import { SignUpForm } from './sign-up.form';

@Component({
  selector: 'lab-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpForm, ErrorDialog],
  template: `
    <lab-sign-up-form (singUp)="onSingUp($event)" />
    <lab-error *ngIf="postRegister.hasError()" [error]="postRegister.error()" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  #api = 'http://localhost:3000/register';
  #http = inject(HttpClient);
  #globalStore = inject(GlobalStore);

  postRegister = new CommandStore<UserToken>(DEFAULT_USER_TOKEN);

  onSingUp(newCredentials: UserRegistration): void {
    const command$ = this.#http
      .post<UserToken>(this.#api, newCredentials)
      .pipe(tap((userToken) => this.#globalStore.setUserToken(userToken)));
    this.postRegister.execute(command$);
  }
}
