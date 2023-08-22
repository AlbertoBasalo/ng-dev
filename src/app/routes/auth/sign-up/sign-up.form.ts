import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegistration } from 'src/app/shared/domain/models/user-token.interface';
import {
  getError,
  markError,
  mismatch,
  passwordValidations,
} from 'src/app/shared/ui/form.functions';

@Component({
  selector: 'lab-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <label for="username">
        <span for="username">👤 Username </span>
        <sub *ngIf="markError('username')" data-test="username.error">
          <i>{{ getError('username') }}</i>
        </sub>
        <input
          id="username"
          name="username"
          type="text"
          formControlName="username"
          [attr.aria-invalid]="markError('username')" />
      </label>
      <label for="email">
        <span>📧 Email</span>
        <sub *ngIf="markError('email')">
          <i>{{ getError('email') }}</i>
        </sub>
        <input
          id="email"
          name="email"
          type="email"
          formControlName="email"
          [attr.aria-invalid]="markError('email')" />
      </label>
      <section class="grid">
        <label for="password">
          <span>🤫 Password</span>
          <sub *ngIf="markError('password')">
            <i>{{ getError('password') }}</i>
          </sub>
          <input
            id="password"
            type="password"
            name="password"
            formControlName="password"
            [attr.aria-invalid]="markError('password')" />
        </label>
        <label for="repeatPassword">
          <span>🤫 Repeat password</span>
          <sub *ngIf="markError('repeatPassword')">
            <i>{{ getError('repeatPassword') }}</i>
          </sub>
          <input
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            formControlName="repeatPassword"
            [attr.aria-invalid]="markError('repeatPassword')" />
        </label>
      </section>
      <section class="grid">
        <section>
          <a role="button" class="contrast outline">Go to log-in page</a>
        </section>
        <section>
          <button class="contrast outline" (click)="form.reset()">Reset</button>
        </section>
        <section>
          <button
            type="submit"
            (click)="onSingUpClick()"
            [disabled]="form.invalid">
            Sign up
          </button>
        </section>
      </section>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpForm {
  @Output() singUp = new EventEmitter<UserRegistration>();
  form: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', passwordValidations),
      repeatPassword: new FormControl('', passwordValidations),
    },
    {
      validators: [mismatch('password', 'repeatPassword')],
    }
  );

  onSingUpClick(): void {
    const { repeatPassword, ...userRegistration } = this.form.value;
    this.singUp.emit(userRegistration);
  }

  markError(controlName: string): boolean | null {
    return markError(this.form, controlName);
  }

  getError(controlName: string): string {
    return getError(this.form, controlName);
  }
}
