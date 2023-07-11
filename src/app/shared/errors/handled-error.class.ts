export interface HandledErrorData {
  message: string;
  name: string;
  code: number;
  icon: string;
  stack?: string;
}

export class HandledError implements HandledErrorData {
  private static readonly ERRORS: HandledErrorData[] = [
    {
      message: 'Bad Request, review your data.',
      name: 'Data Error',
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
      name: 'Data Error',
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
  readonly message: string = '';
  readonly name: string = '';
  readonly code: number = 0;
  readonly icon: string = '';
  readonly stack: string = '';
  constructor(private readonly error: any) {
    const errorData = this.getErrorData();
    this.message = errorData.message;
    this.name = errorData.name;
    this.code = errorData.code;
    this.icon = errorData.icon;
    this.stack = this.getStack();
  }

  private getStack() {
    let stack = '';
    if (this.error.stack) {
      const stackMethods = this.error.stack.split('\n');
      stackMethods.forEach((method: string) => {
        stack += method.trim() + '\n';
      });
    }
    return stack;
  }

  private getErrorData(): HandledErrorData {
    const defaultError = {
      message: this.error.message,
      name: 'App Error',
      code: 0,
      icon: '🤷‍♀️',
    };
    const errorCode = this.error.status || 0;
    return (
      HandledError.ERRORS.find((error) => error.code === errorCode) ||
      defaultError
    );
  }
}
