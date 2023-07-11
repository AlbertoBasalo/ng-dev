import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'lab-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog id="error-dialog" [open]="isOpen()">
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            class="close"
            (click)="isOpen.set(false)"></a>
          <h4>{{ error?.icon }} {{ error?.name }}</h4>
        </header>
        <p>
          {{ error?.message }}
        </p>
      </article>
    </dialog>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialog {
  @Input() error: any | null = null;

  isOpen = signal(true);
  constructor() {
    setTimeout(() => this.isOpen.set(false), 3000);
  }
}
