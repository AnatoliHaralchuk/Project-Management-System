import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../../auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ModelHttpService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<User> | null> {
    return this.http.get<Array<User>>('users').pipe(
      catchError(err => {
        if (err.status === 401) console.log('что-то делаем при ошибке')
        return EMPTY
      }),
    )
  }
}
