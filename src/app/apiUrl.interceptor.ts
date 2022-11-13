import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const backend: string = 'https://dry-reaches-22710.herokuapp.com/';
    const clone = req.clone({
      url: backend + req.url,
    });
    return next.handle(clone);
  }
}
