import { ActivityState } from 'src/app/core/activity.interface';

export interface ActivityTransition {
  caption: string;
  to: ActivityState;
  from: ActivityState[];
  class: string;
}
export const ACTIVITY_TRANSITIONS: ActivityTransition[] = [
  {
    caption: 'Return to Draft',
    to: 'draft',
    from: ['published'],
    class: 'outline primary',
  },
  { caption: 'Publish', to: 'published', from: ['draft'], class: 'primary' },
  {
    caption: 'Cancel',
    to: 'cancelled',
    from: ['draft', 'published'],
    class: 'secondary',
  },
  {
    caption: 'Mark as Finished',
    to: 'finished',
    from: ['published'],
    class: 'contrast',
  },
];
