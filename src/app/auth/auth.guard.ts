import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {LocalToken} from "./models/auth.models";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // @ts-ignore
  canActivate(): boolean | void {
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
    this.router.navigate([
      'auth',
      'login',
    ]);
  }
}
