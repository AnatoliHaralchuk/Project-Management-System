import { Injectable } from '@angular/core';
import { LocalToken, User } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isLoading = false;

  isToken = localStorage.getItem('token') ? true : false;

  localUser: string | null = localStorage.getItem('user');

  user: User = this.localUser ? { ...JSON.parse(this.localUser) } : {};

  message: string = '';

  logIn(token: string) {
    this.isLoading = false;
    const fourHour: number = 4 * 3600 * 1000;
    const date: number = new Date().getTime();
    const localToken: LocalToken = {
      value: token,
      expiry: date + fourHour,
    };
    localStorage.setItem('token', JSON.stringify(localToken));
    this.isToken = true;
    this.router.navigate(['main']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isToken = false;
    this.router.navigate(['']);
  }
}
