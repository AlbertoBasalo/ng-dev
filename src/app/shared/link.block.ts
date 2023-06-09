import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'lab-link',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe],
  template: ` <a [routerLink]="routerLink" [title]="caption"> {{ icon }} {{ caption | truncate }} </a> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBlock {
  @Input() routerLink: string[] = [];
  @Input() icon: string = '➡️';
  @Input() caption: string = '';
}
