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
import { Activity } from 'src/app/shared/domain/models/activity.interface';
import { ControlBlock } from 'src/app/shared/ui/control.block';
import { getError, markError } from 'src/app/shared/ui/form.functions';

@Component({
  selector: 'lab-new-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlBlock],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <label for="title">
          <span for="title">📝 Title </span>
          <sub *ngIf="markError('title')" data-test="title.error">
            <i>{{ getError('title') }}</i>
          </sub>
          <input
            id="title"
            name="title"
            type="text"
            formControlName="title"
            [attr.aria-invalid]="markError('title')" />
        </label>
        <label for="description">
          <span>📝 Description</span>
          <sub *ngIf="markError('description')">
            <i>{{ getError('description') }}</i>
          </sub>
          <textarea
            id="description"
            name="description"
            formControlName="description"
            [attr.aria-invalid]="markError('description')">
          </textarea>
        </label>
        <section class="grid">
          <label for="location">
            <span>📍 Location</span>
            <sub *ngIf="markError('location')">
              <i>{{ getError('location') }}</i>
            </sub>
            <input
              id="location"
              name="location"
              type="text"
              formControlName="location"
              [attr.aria-invalid]="markError('location')" />
          </label>
          <label for="country">
            <span>🌍 Country</span>
            <sub *ngIf="markError('country')">
              <i>{{ getError('country') }}</i>
            </sub>
            <input
              id="country"
              name="country"
              type="text"
              formControlName="country"
              [attr.aria-invalid]="markError('country')" />
          </label>
        </section>
        <label for="date">
          <span>📅 Date</span>
          <sub *ngIf="markError('date')">
            <i>{{ getError('date') }}</i>
          </sub>
          <input
            id="date"
            name="date"
            type="date"
            formControlName="date"
            [attr.aria-invalid]="markError('date')" />
        </label>
        <section class="grid">
          <label for="price">
            <span>💰 Price</span>
            <sub *ngIf="markError('price')">
              <i>{{ getError('price') }}</i>
            </sub>
            <input
              id="price"
              type="number"
              formControlName="price"
              [attr.aria-invalid]="markError('price')" />
          </label>
          <label for="currency">
            <span>💱 Currency</span>
            <sub *ngIf="markError('currency')">
              <i>{{ getError('currency') }}</i>
            </sub>
            <input
              id="currency"
              type="text"
              formControlName="currency"
              [attr.aria-invalid]="markError('currency')" />
          </label>
        </section>
        <section class="grid">
          <label for="capacity">
            <span>⏭️ Capacity</span>
            <sub *ngIf="markError('capacity')">
              <i>{{ getError('capacity') }}</i>
            </sub>
            <input
              id="capacity"
              type="number"
              formControlName="capacity"
              [attr.aria-invalid]="markError('capacity')" />
          </label>
          <label for="quorum">
            <span>⏮️ Quorum</span>
            <sub *ngIf="markError('quorum')">
              <i>{{ getError('quorum') }}</i>
            </sub>
            <input
              id="quorum"
              type="number"
              formControlName="quorum"
              [attr.aria-invalid]="markError('quorum')" />
          </label>
        </section>
        <span>👶 Age category</span>
        <section class="grid">
          <label for="family">
            <input
              id="family"
              type="radio"
              value="family"
              formControlName="ageCategory" />
            Family
          </label>
          <label for="adults">
            <input
              id="adults"
              type="radio"
              value="adults"
              formControlName="ageCategory" />
            Adults
          </label>
          <label for="kids">
            <input
              id="kids"
              type="radio"
              value="kids"
              formControlName="ageCategory" />
            Kids
          </label>
        </section>
      </fieldset>
      <button type="submit" [disabled]="!form.valid" (click)="onCreateClick()"
        >Create</button
      >
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewActivityForm {
  @Output() create = new EventEmitter<
    Omit<Activity, 'id' | 'slug' | 'userId' | 'state'>
  >();
  #today = new Date().toISOString().substring(0, 10);

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    location: new FormControl('', [Validators.required]),
    country: new FormControl(''),
    countryCode: new FormControl(''),
    date: new FormControl(this.#today, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    currency: new FormControl('EUR', [Validators.required]),
    capacity: new FormControl(10, [Validators.required]),
    quorum: new FormControl(5, [Validators.required]),
    ageCategory: new FormControl('family', [Validators.required]),
  });

  onCreateClick() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  markError(controlName: string): boolean | null {
    return markError(this.form, controlName);
  }

  getError(controlName: string): string {
    return getError(this.form, controlName);
  }
}
