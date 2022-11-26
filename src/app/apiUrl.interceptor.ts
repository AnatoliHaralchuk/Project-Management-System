import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const backend: string = 'https://dry-reaches-22710.herokuapp.com/';
    const localToken: string | null = localStorage.getItem('token');
    const token: string = localToken ? JSON.parse(localToken).value : '';
    const clone = req.clone({
      // url: backend + req.url,
      headers: req.headers.append('authorization', `Bearer ${token}`),
    });
    return next.handle(clone);
  }
}
