import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalStore } from './global.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalStore);
  return next(req).pipe(
    catchError((err) => {
      let errorKind = getErrorKind(err);
      if (errorKind.kind === 'Auth Error') {
        globalStore.removeUserToken();
      }
      console.error(err);
      return throwError(() => new Error(errorKind.kind + ': ' + errorKind.message));
    })
  );
};

// a lookup table for common HTTP status codes
const ERROR_KINDS = [
  { code: 400, message: 'Bad Request', kind: 'Client Error' },
  { code: 401, message: 'Unauthorized', kind: 'Auth Error' },
  { code: 403, message: 'Forbidden', kind: 'Auth Error' },
  { code: 404, message: 'Not Found', kind: 'Client Error' },
  { code: 500, message: 'Internal Server Error', kind: 'Server Error' },
];
const UNKNOWN_ERROR = { code: 0, message: 'Unknown Error', kind: 'Application Error' };

function getErrorKind(err: any) {
  let errorKind = UNKNOWN_ERROR;
  if (err instanceof HttpErrorResponse) {
    errorKind = ERROR_KINDS.find((errorKind) => errorKind.code === err.status) || UNKNOWN_ERROR;
  }
  return errorKind;
}
