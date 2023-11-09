import { Routes } from '@angular/router';
import { ContainerComponent } from './lab/container.component';
import { HomePage } from './routes/home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'auth/sign-up',
    loadComponent: () => import('./routes/auth/sign-up/sign-up.page'),
  },
  {
    path: 'activities/mines',
    loadComponent: () => import('./routes/activities/my-activities.page'),
  },
  {
    path: 'activities/new',
    loadComponent: () => import('./routes/activities/new-activity.page'),
  },
  {
    path: 'activities/:slug',
    loadComponent: () => import('./routes/activities/activity-detail.page'),
  },
  {
    path: 'labs',
    component: ContainerComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
