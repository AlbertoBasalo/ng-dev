import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lab-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` <a [routerLink]="routerLink"> {{ icon }} {{ caption }} </a> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBlock {
  @Input() routerLink: string[] = [];
  @Input() icon: string = '➡️';
  @Input() caption: string = '';
}
