import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalStore } from '../../shared/state/global.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStore = inject(GlobalStore);
  const apiToken = globalStore.apiToken();
  if (!apiToken) return next(req);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return next(req);
};
