import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalToken } from './auth/models/auth.models';

Injectable({
  providedIn: 'root',
});
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // @ts-ignore
  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): boolean | void {
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
      }
      return true;
    }
    console.log('hf,jnftn');
    this.router.navigate([
      'auth',
      'login',
    ]);
  }
}
