import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalState } from '../../shared/state/global.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalState);
  const apiToken = globalStore.apiToken();
  if (!apiToken) return next(req);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return next(req);
};
