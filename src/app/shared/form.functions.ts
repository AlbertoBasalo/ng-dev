import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const passwordValidations = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(8),
  Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
];

export function mismatch(target: string, repeat: string): ValidatorFn {
  return (form: AbstractControl): null | ValidationErrors => {
    const password = form.get(target)?.value;
    const repeatPassword = form.get(repeat)?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };
}

export function markError(
  form: FormGroup,
  controlName: string
): boolean | null {
  const control = form.get(controlName);
  return markControlError(control);
}

export function markControlError(
  control: AbstractControl | null
): boolean | null {
  if (!control) return null;
  // if (!(control.touched || control.dirty)) return null;
  return control.invalid;
}

export function getError(form: FormGroup, controlName: string): string {
  return getControlError(form.get(controlName));
}

export function getControlError(control: AbstractControl | null): string {
  if (!control) return '';
  if (!(control.touched || control.dirty)) return '';
  return JSON.stringify(control.errors);
}
