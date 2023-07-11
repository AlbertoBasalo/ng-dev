import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlBlock } from 'src/app/shared/control.block';
import { Activity } from 'src/app/shared/models/activity.interface';

@Component({
  selector: 'lab-new-activity-form-signal',
  standalone: true,
  imports: [CommonModule, FormsModule, ControlBlock],
  template: `
    <form name="form" #f="ngForm" novalidate (ngSubmit)="onSubmit()">
      <fieldset>
        <label for="title">
          <span for="title">📝 Title </span>
          <sub *ngIf="title.errors && title.touched" data-test="title.error">
            <i>{{ title.errors | json }}</i>
          </sub>
          <input
            id="title"
            name="title"
            type="text"
            [(ngModel)]="form.title"
            #title="ngModel"
            required
            [attr.aria-invalid]="title.invalid" />
        </label>
        <label for="description">
          <span>📝 Description</span>
          <sub
            *ngIf="description.errors && description.touched"
            data-test="description.error">
            <i>{{ description.errors | json }}</i>
          </sub>
          <textarea
            id="description"
            name="description"
            [(ngModel)]="form.description"
            #description="ngModel"
            required
            [attr.aria-invalid]="description.invalid">
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
              [(ngModel)]="form.location"
              required
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
              [(ngModel)]="form.country"
              required
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
            [(ngModel)]="form.date"
            required
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
              name="price"
              type="number"
              [(ngModel)]="form.price"
              required
              [attr.aria-invalid]="markError('price')" />
          </label>
          <label for="currency">
            <span>💱 Currency</span>
            <sub *ngIf="markError('currency')">
              <i>{{ getError('currency') }}</i>
            </sub>
            <input
              id="currency"
              name="currency"
              type="text"
              [(ngModel)]="form.currency"
              required
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
              name="capacity"
              type="number"
              [(ngModel)]="form.capacity"
              required
              [attr.aria-invalid]="markError('capacity')" />
          </label>
          <label for="quorum">
            <span>⏮️ Quorum</span>
            <sub *ngIf="markError('quorum')">
              <i>{{ getError('quorum') }}</i>
            </sub>
            <input
              id="quorum"
              name="quorum"
              type="number"
              [(ngModel)]="form.quorum"
              required
              [attr.aria-invalid]="markError('quorum')" />
          </label>
        </section>
        <span>👶 Age category</span>
        <section class="grid">
          <label for="family">
            <input
              id="family"
              name="ageCategory"
              type="radio"
              value="family"
              [(ngModel)]="form.ageCategory" />
            Family
          </label>
          <label for="adults">
            <input
              id="adults"
              name="ageCategory"
              type="radio"
              value="adults"
              [(ngModel)]="form.ageCategory" />
            Adults
          </label>
          <label for="kids">
            <input
              id="kids"
              name="ageCategory"
              type="radio"
              value="kids"
              [(ngModel)]="form.ageCategory" />
            Kids
          </label>
        </section>
      </fieldset>
      <button type="submit" [disabled]="!f.valid" (click)="onSubmit()"
        >Create</button
      >
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewActivityFormSignal {
  //https://stackblitz.com/edit/angular-ugjyrg?

  @Output() create = new EventEmitter<Partial<Activity>>();
  #today = new Date().toISOString().substring(0, 10);

  form: Partial<Activity> = {
    title: '',
    description: '',
    location: '',
    country: '',
    date: this.#today,
    price: 0,
    currency: 'EUR',
    capacity: 0,
    quorum: 0,
    ageCategory: 'adult',
  };

  onSubmit() {
    this.create.emit(this.form);
  }

  markError(controlName: string): boolean | null {
    return false;
    // return markError(this.form, controlName);
  }

  getError(controlName: string): string {
    return '';
    // return getError(this.form, controlName);
  }
}
