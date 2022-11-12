import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import {Login, Token, User} from '../../auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ModelHttpService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<User> | null> {
    return this.http.get<Array<User>>('users').pipe(
      catchError(err => {
        if (err.status === 404) console.log('что-то делаем если users не найден')
        return EMPTY
      }),
    )
  }

  getUserById(id: string): Observable<User> | null {
    return this.http.get<User>(`users/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) console.log('что-то делаем если user не найден')
        return EMPTY
      }),
    )
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`users/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) console.log('что-то делаем если user не найден')
        return EMPTY
      }),
    )
  }

  updateUser(id: string, user: User): Observable<User> | null {
    return this.http.put<User>(`users/${id}`, {
      name: user.name,
      login: user.login,
      password: user.password,
    }).pipe(
      catchError(err => {
        if (err.status === 404) console.log('что-то делаем если user не найден')
        return EMPTY
      }),
    )
  }

  loginCreateToken(login: Login): Observable<Token> {
    return this.http.post<Token>('signin', {...login})
  }

  signUpCreatAccount(user: User): Observable<User> {
    return this.http.post<User>('signup', {
      name: user.name,
      login: user.login,
      password: user.password,
    })
  }
}
