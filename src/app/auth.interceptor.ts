import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cloned = req.clone({
      withCredentials: true, // Ensures cookies are sent
    });
    return next.handle(cloned);
  }
}
