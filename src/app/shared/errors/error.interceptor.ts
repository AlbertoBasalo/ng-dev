import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalState } from '../state/global.state';
import { HandledError } from './handled-error.class';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalState);
  return next(req).pipe(
    catchError((err) => {
      let error = new HandledError(err);
      if (error.name === 'Auth Error') {
        globalStore.removeUserToken();
      }
      globalStore.handleError(error);
      return throwError(() => error);
    })
  );
};
