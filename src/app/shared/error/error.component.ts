import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog [open]="open">
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            class="close"
            (click)="open = false"
          ></a>
          Error message
        </header>
        <p>
          Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
          facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend a
          dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
          ullamcorper.
        </p>
      </article>
    </dialog>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  open = true;
}
