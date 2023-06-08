import { Routes } from '@angular/router';
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
    loadComponent: () => import('./routes/activities/mines.page'),
  },
  {
    path: 'activities/:slug',
    loadComponent: () => import('./routes/activities/detail.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
