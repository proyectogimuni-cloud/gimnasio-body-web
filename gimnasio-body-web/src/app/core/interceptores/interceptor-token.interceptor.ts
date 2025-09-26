import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
