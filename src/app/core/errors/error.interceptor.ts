import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalStore } from '../global.store';
import { getHandledError } from './handled-error.class';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalStore);
  return next(req).pipe(
    catchError((err) => {
      let error = getHandledError(err);
      if (error.name === 'Auth Error') {
        globalStore.removeUserToken();
      }
      globalStore.handleError(error);
      return throwError(() => error);
    })
  );
};
