import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Login, Token, User } from '../../auth/models/auth.models';
import { Board, BoardColumns } from '../models/management.models';

@Injectable({
  providedIn: 'root',
})
export class ModelHttpService {
  constructor(private http: HttpClient) {}

  //START USERS//////////////////////////////////////////////
  getAllUsers(): Observable<Array<User> | null> {
    return this.http.get<Array<User>>('users').pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если users не найден');
        return EMPTY;
      }),
    );
  }

  getUserById(id: string): Observable<User> | null {
    return this.http.get<User>(`users/${id}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если user не найден');
        return EMPTY;
      }),
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`users/${id}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если user не найден');
        return EMPTY;
      }),
    );
  }

  updateUser(id: string, user: User): Observable<User> | null {
    return this.http
      .put<User>(`users/${id}`, {
        name: user.name,
        login: user.login,
        password: user.password,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 404) console.log('что-то делаем если user не найден');
          return EMPTY;
        }),
      );
  }

  //START Authorization//////////////////////////////////////////////
  loginCreateToken(login: Login): Observable<Token> {
    return this.http.post<Token>('signin', { ...login });
  }

  signUpCreatAccount(user: User): Observable<User> {
    return this.http.post<User>('signup', {
      name: user.name,
      login: user.login,
      password: user.password,
    });
  }

  // START BOARDS//////////////////////////////////////////////////
  getAllBoards(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>('boards').pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  createBoard(board: Board): Observable<Board> {
    return this.http
      .post<Board>('boards', {
        title: board.title,
        description: board.description,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 404) console.log('что-то делаем если boards не найден');
          return EMPTY;
        }),
      );
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`boards/${id}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`boards/${id}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  updateBoard(id: string, board: Board): Observable<Board> {
    return this.http
      .put<Board>(`boards/${id}`, {
        title: board.title,
        description: board.description,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 404) console.log('что-то делаем если boards не найден');
          return EMPTY;
        }),
      );
  }

  // START COLUMNS//////////////////////////////////////////////////
  getAllColumns(boardId: string): Observable<Array<BoardColumns>> {
    return this.http.get<Array<BoardColumns>>(`boards/${boardId}/columns`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  createColumn(boardId: string, title: string): Observable<BoardColumns> {
    return this.http
      .post<BoardColumns>('boards', {
        title: title,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 404) console.log('что-то делаем если boards не найден');
          return EMPTY;
        }),
      );
  }

  getColumnById(boardId: string, columnId: string): Observable<BoardColumns> {
    return this.http.get<BoardColumns>(`boards/${boardId}/columns/${columnId}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  deleteColumn(boardId: string, columnId: string): Observable<void> {
    return this.http.delete<void>(`boards/${boardId}/columns/${columnId}`).pipe(
      catchError((err) => {
        if (err.status === 404) console.log('что-то делаем если boards не найден');
        return EMPTY;
      }),
    );
  }

  updateColumn(boardId: string, columnId: string, column: BoardColumns): Observable<BoardColumns> {
    return this.http
      .put<BoardColumns>(`boards/${boardId}/columns/${columnId}`, {
        title: column.title,
        order: column.order,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 404) console.log('что-то делаем если boards не найден');
          return EMPTY;
        }),
      );
  }
}
