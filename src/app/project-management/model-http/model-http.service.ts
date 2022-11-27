import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Login, Token, User } from '../../auth/models/auth.models';
import { Board, BoardColumns, BoardTasks, Task } from '../models/management.models';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModelHttpService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  message: string = '';

  backend: string = 'https://dry-reaches-22710.herokuapp.com/';

  //START USERS//////////////////////////////////////////////
  getAllUsers(): Observable<Array<User> | null> {
    return this.http.get<Array<User>>(`${this.backend}users`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  getUserById(id: string): Observable<User> | null {
    return this.http.get<User>(`${this.backend}users/${id}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backend}users/${id}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  updateUser(id: string, user: User): Observable<User> | null {
    return this.http
      .put<User>(`${this.backend}users/${id}`, {
        name: user.name,
        login: user.login,
        password: user.password,
      })
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  //START Authorization//////////////////////////////////////////////
  loginCreateToken(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.backend}signin`, { ...login }).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  signUpCreatAccount(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.backend}signup`, {
        name: user.name,
        login: user.login,
        password: user.password,
      })
      .pipe(
        catchError((err) => {
          this.authService.isLoading = false;
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  // START BOARDS//////////////////////////////////////////////////
  getAllBoards(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>(`${this.backend}boards`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  createBoard(board: Board): Observable<Board> {
    return this.http
      .post<Board>(`${this.backend}boards`, {
        title: board.title,
        description: board.description,
      })
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.backend}boards/${id}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backend}boards/${id}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  updateBoard(id: string, board: Board): Observable<Board> {
    return this.http
      .put<Board>(`${this.backend}boards/${id}`, {
        title: board.title,
        description: board.description,
      })
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  // START COLUMNS//////////////////////////////////////////////////
  getAllColumns(boardId: string): Observable<Array<BoardColumns>> {
    return this.http.get<Array<BoardColumns>>(`${this.backend}boards/${boardId}/columns`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  createColumn(boardId: string, title: string): Observable<BoardColumns> {
    return this.http
      .post<BoardColumns>(`${this.backend}boards/${boardId}/columns`, {
        title: title,
      })
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  getColumnById(boardId: string, columnId: string): Observable<BoardColumns> {
    return this.http.get<BoardColumns>(`${this.backend}boards/${boardId}/columns/${columnId}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  deleteColumn(boardId: string, columnId: string): Observable<void> {
    return this.http.delete<void>(`${this.backend}boards/${boardId}/columns/${columnId}`).pipe(
      catchError((err) => {
        switch (err.status) {
          case 403:
            this.message = 'Неправильный логин или пароль!';
            break;
          default:
            this.message = 'Произошла ошибка, попробуйте снова.';
        }
        this.authService.message = this.message;
        return EMPTY;
      }),
    );
  }

  updateColumn(boardId: string, columnId: string, column: BoardColumns): Observable<BoardColumns> {
    return this.http
      .put<BoardColumns>(`${this.backend}boards/${boardId}/columns/${columnId}`, {
        title: column.title,
        order: column.order,
      })
      .pipe(
        catchError(() => {
          return EMPTY;
        }),
      );
  }

  // START TASKS//////////////////////////////////////////////////
  getAllTasks(boardId: string, columnId: string): Observable<Array<BoardTasks>> {
    return this.http
      .get<Array<BoardTasks>>(`${this.backend}boards/${boardId}/columns/${columnId}/tasks`)
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  createTask(boardId: string, columnId: string, task: Task): Observable<BoardTasks> {
    return this.http
      .post<BoardTasks>(`${this.backend}boards/${boardId}/columns/${columnId}/tasks`, {
        title: task.title,
        description: task.description,
        userId: task.userId,
      })
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  getTaskById(boardId: string, columnId: string, taskId: string): Observable<BoardTasks> {
    return this.http
      .get<BoardTasks>(`${this.backend}boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.backend}boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 403:
              this.message = 'Неправильный логин или пароль!';
              break;
            default:
              this.message = 'Произошла ошибка, попробуйте снова.';
          }
          this.authService.message = this.message;
          return EMPTY;
        }),
      );
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: BoardTasks,
  ): Observable<BoardTasks> {
    return this.http
      .put<BoardTasks>(`${this.backend}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        title: task.title,
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId: task.boardId,
        columnId: task.columnId,
      })
      .pipe(
        catchError(() => {
          return EMPTY;
        }),
      );
  }
}
