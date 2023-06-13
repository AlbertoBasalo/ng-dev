import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getControlError, markControlError } from '../core/form.functions';

@Component({
  selector: 'lab-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [for]="controlName">
      <span>{{ caption }} </span>
      <sub *ngIf="hasError()" [attr.data-test]="controlName + '.error'">
        <i>{{ error() }}</i>
      </sub>
      <ng-content></ng-content>
    </label>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlBlock {
  @Input({ required: true }) set control(value: AbstractControl) {
    this._control = value;
    this._control.valueChanges.subscribe(() => {
      this.markError();
      this.getError();
    });
  }
  @Input() caption: string = '';
  @Input() controlName: string = '';
  error = signal<string>('');
  hasError = signal<boolean>(false);
  _control: AbstractControl | null = null;
  markError(): void {
    this.hasError.set(markControlError(this._control) || false);
  }

  getError(): void {
    this.error.set(getControlError(this._control) || '');
  }
}
