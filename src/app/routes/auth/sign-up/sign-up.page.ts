import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lab-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <label for="username">
        <span for="username">Username </span>
        <sub *ngIf="markError('username')">
          <i>{{ getError('username') }}</i>
        </sub>
        <input
          id="username"
          type="text"
          formControlName="username"
          [attr.aria-invalid]="markError('username')"
        />
      </label>
      <label for="email">
        <span>Email</span>
        <sub *ngIf="markError('email')">
          <i>{{ getError('email') }}</i>
        </sub>
        <input
          id="email"
          type="email"
          formControlName="email"
          [attr.aria-invalid]="markError('email')"
        />
      </label>
      <label for="password">
        <span>Password</span>
        <sub *ngIf="markError('password')">
          <i>{{ getError('password') }}</i>
        </sub>
        <input
          id="password"
          type="password"
          formControlName="password"
          [attr.aria-invalid]="markError('password')"
        />
      </label>
      <label for="repeatPassword">
        <span>Repeat password</span>
        <sub *ngIf="markError('repeatPassword')">
          <i>{{ getError('repeatPassword') }}</i>
        </sub>
        <input
          id="repeatPassword"
          type="password"
          formControlName="repeatPassword"
          [attr.aria-invalid]="markError('repeatPassword')"
        />
      </label>
      <section class="grid">
        <section>
          <a role="button" class="contrast outline">Go to log-in page</a>
        </section>
        <section>
          <button
            type="submit"
            (click)="onSingUpClick()"
            [disabled]="form.invalid"
          >
            Sign up
          </button>
        </section>
      </section>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  form = new FormGroup(
    {
      username: new FormControl('a', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('a@b.c', [Validators.required, Validators.email]),
      password: new FormControl('', passwordValidations),
      repeatPassword: new FormControl('', passwordValidations),
    },
    {
      validators: [mismatch('password', 'repeatPassword')],
    }
  );

  onSingUpClick(): void {
    console.log(this.form.value);
  }

  markError(controlName: string): boolean | null {
    const control = this.form.get(controlName);
    if (!control) return null;
    if (!(control.touched || control.dirty)) return null;
    return control.invalid && (control.touched || control.dirty);
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';
    if (!(control.touched || control.dirty)) return '';
    return JSON.stringify(control.errors);
  }
}

const passwordValidations = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(8),
  Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
];

function mismatch(target: string, repeat: string): ValidatorFn {
  return (form: AbstractControl): null | ValidationErrors => {
    const password = form.get(target)?.value;
    const repeatPassword = form.get(repeat)?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };
}
