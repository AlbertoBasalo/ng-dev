import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CommandState } from 'src/app/core/command.state';

import { ErrorDialog } from 'src/app/shared/error.dialog';
import { SignUpForm } from './sign-up.form';

@Component({
  selector: 'lab-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpForm, ErrorDialog],
  template: `
    <lab-sign-up-form (singUp)="onSingUp($event)" />
    <lab-error *ngIf="postRegister.hasError()" [errorMessage]="postRegister.errorMessage()" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  #api = 'http://localhost:3000/register';
  #http = inject(HttpClient);
  #router = inject(Router);
  postRegister = new CommandState<object>();

  onSingUp(newCredentials: object): void {
    const command$ = this.#http.post<object>(this.#api, newCredentials).pipe(
      tap((response) => {
        localStorage.setItem('user-access-token', JSON.stringify(response));
        this.#router.navigate(['/']);
      })
    );
    this.postRegister.execute(command$);
  }
}
