import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalToken } from '../models/auth.models';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})

export class LoginGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {

    }

    canActivate(
    ): boolean | UrlTree | Observable<boolean> | Promise<boolean> {
        const tokenStr: string | null = localStorage.getItem('token');
        if (tokenStr) {
            const now = new Date().getTime();
            const token: LocalToken = JSON.parse(tokenStr);
            if (now > token.expiry) {
                localStorage.removeItem('token');
                this.router.navigate(['/auth/login'])
              }
            return true;
        } else {
            this.router.navigate(['/auth/login'], {
                queryParams: {
                    auth: false,
                },
            });
            return false;
        }
    }
}