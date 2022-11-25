import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Board, BoardColumns, BoardTasks } from '../../project-management/models/management.models';
import {User} from "../../auth/models/auth.models";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private translateService: TranslateService
  ) {}

  isCreateBoard = false;

  isEditBoard = false;

  isCreateColumn = false;

  isCreateTask = false;

  isEditTask = false;

  curBoardId: string = '';

  boards: Board[] = [];

  columns: BoardColumns[] = [];

  tasks: BoardTasks[] = [];

  taskTitle: string[] = [];

  currentBoard!: Board;

  lang: string | null = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';

  setLanguage(languageCode: string) {
    this.translateService.use(languageCode);
    this.lang = languageCode;
    localStorage.setItem('lang', this.lang);
  }

  allUsers: User[] = [];

}
