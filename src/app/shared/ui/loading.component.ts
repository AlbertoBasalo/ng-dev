import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-loading',
  standalone: true,
  imports: [CommonModule],
  template: ` <aside aria-busy="true">Loading...</aside> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
