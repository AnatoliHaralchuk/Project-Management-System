import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalToken } from './models/auth.models';

Injectable({
  providedIn: 'root',
});
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokenStr: string | null = localStorage.getItem('token');
    if (tokenStr) {
      const now = new Date().getTime();
      const token: LocalToken = JSON.parse(tokenStr);
      if (now > token.expiry) {
        localStorage.removeItem('token');
        this.router.navigate([
          'auth',
          'login',
        ]);
        return false;
      }
      return true;
    }
    this.router.navigate([
      'auth',
      'login',
    ]);
    return false;
  }
}
