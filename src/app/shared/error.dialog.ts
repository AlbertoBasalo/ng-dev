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
          <h3>💣 Error</h3>
        </header>
        <p>
          {{ errorMessage }}
        </p>
      </article>
    </dialog>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialog {
  @Input() errorMessage = '';
  isOpen = signal(true);
  constructor() {
    setTimeout(() => this.isOpen.set(false), 3000);
  }
}
