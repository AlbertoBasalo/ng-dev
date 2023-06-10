import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalStore } from './global.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalStore);
  return next(req).pipe(
    catchError((err) => {
      let errorKind = getException(err);
      if (errorKind.kind === 'Auth Error') {
        globalStore.removeUserToken();
      }
      console.error(err);
      return throwError(
        () =>
          new Exception(
            errorKind.code,
            errorKind.message,
            errorKind.kind,
            errorKind.icon
          )
      );
    })
  );
};

// a lookup table for common HTTP status codes
const EXCEPTIONS: Exception[] = [
  { code: 400, message: 'Bad Request', kind: 'Client Error', icon: '🤔' },
  { code: 401, message: 'Unauthorized', kind: 'Auth Error', icon: '🔒' },
  { code: 403, message: 'Forbidden', kind: 'Auth Error', icon: '🔒' },
  { code: 404, message: 'Not Found', kind: 'Client Error', icon: '🔍' },
  {
    code: 500,
    message: 'Internal Server Error',
    kind: 'Server Error',
    icon: '🤖',
  },
];
const UNKNOWN_ERROR: Exception = {
  code: 0,
  message: 'Unknown Error',
  kind: 'Application Error',
  icon: '🤷‍♀️',
};

export class Exception {
  constructor(
    public readonly code: number = 0,
    public readonly message: string = 'Unknown Error',
    public readonly kind: string = 'Application Error',
    public readonly icon: string = '🤷‍♀️'
  ) {}
}

function getException(err: any) {
  let errorKind = UNKNOWN_ERROR;
  if (err instanceof HttpErrorResponse) {
    errorKind =
      EXCEPTIONS.find((errorKind) => errorKind.code === err.status) ||
      UNKNOWN_ERROR;
  }
  return errorKind;
}
