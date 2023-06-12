import { HttpErrorResponse } from '@angular/common/http';

export class HandledError extends Error {
  constructor(
    public override readonly message: string = 'Unexpected exception in our code.',
    public override readonly name: string = 'App Error',
    public readonly code: number = 0,
    public readonly icon: string = '🤷‍♀️'
  ) {
    super(message);
    super.name = name;
  }
}
export function getHandledError(err: any): HandledError {
  let error = UNKNOWN_ERROR;
  if (err instanceof HttpErrorResponse) {
    error = ERRORS.find((error) => error.code === err.status) || UNKNOWN_ERROR;
  } else {
    error = new HandledError(err.message);
  }
  return error;
}

const ERRORS: HandledError[] = [
  {
    message: 'Bad Request, review your data.',
    name: 'Client Error',
    code: 400,
    icon: '🤔',
  },
  {
    message: 'Unauthorized, proceed to log in.',
    name: 'Auth Error',
    code: 401,
    icon: '🔒',
  },
  {
    message: 'Forbidden, you need permissions.',
    name: 'Auth Error',
    code: 403,
    icon: '🔒',
  },
  {
    message: 'Not Found, review or notify.',
    name: 'Client Error',
    code: 404,
    icon: '🔍',
  },
  {
    message: 'Not available, retry in a moment.',
    name: 'Server Error',
    code: 500,
    icon: '🤖',
  },
];
const UNKNOWN_ERROR: HandledError = new HandledError();
