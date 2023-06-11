import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalStore } from './global.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalStore);
  return next(req).pipe(
    catchError((err) => {
      let exception = getException(err);
      if (exception.name === 'Auth Error') {
        globalStore.removeUserToken();
      }
      console.error(err);
      return throwError(
        () =>
          new HandledError(
            exception.message,
            exception.name,
            exception.code,
            exception.icon
          )
      );
    })
  );
};

// a lookup table for common HTTP status codes
const EXCEPTIONS: HandledError[] = [
  { code: 400, message: 'Bad Request', name: 'Client Error', icon: '🤔' },
  { code: 401, message: 'Unauthorized', name: 'Auth Error', icon: '🔒' },
  { code: 403, message: 'Forbidden', name: 'Auth Error', icon: '🔒' },
  { code: 404, message: 'Not Found', name: 'Client Error', icon: '🔍' },
  {
    code: 500,
    message: 'Internal Server Error',
    name: 'Server Error',
    icon: '🤖',
  },
];
const UNKNOWN_ERROR: HandledError = {
  name: 'Application Error',
  message: 'Unknown Error',
  code: 0,
  icon: '🤷‍♀️',
};

export class HandledError extends Error {
  constructor(
    public override readonly message: string = 'Unknown Error',
    public override readonly name: string = 'Application Error',
    public readonly code: number = 0,
    public readonly icon: string = '🤷‍♀️'
  ) {
    super(message);
    super.name = name;
  }
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
