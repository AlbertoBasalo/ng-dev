import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './shared/auth.interceptor';
import { ErrorHandlerService } from './shared/errors/error-handler.service';
import { errorInterceptor } from './shared/errors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: NgZone, useValue: new ɵNoopNgZone() },
  ],
};
