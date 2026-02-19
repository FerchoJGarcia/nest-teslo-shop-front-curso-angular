import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const token = inject(AuthService).token();
  if (!token) return next(req);
  if (req.headers.has('Authorization')) return next(req);

  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
