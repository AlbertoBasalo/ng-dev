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
  get message(): string {
    return this.getErrorData().message;
  }
  get name(): string {
    return this.getErrorData().name;
  }
  get code(): number {
    return this.getErrorData().code;
  }
  get icon(): string {
    return this.getErrorData().icon;
  }
  get stack(): string | undefined {
    return this.error.stack;
  }
  constructor(private readonly error: any) {}

  private getErrorData() {
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
