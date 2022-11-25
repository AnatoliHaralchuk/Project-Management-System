import { Injectable } from '@angular/core';
import { Board, BoardColumns, BoardTasks } from '../../project-management/models/management.models';
import {User} from "../../auth/models/auth.models";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

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

  allUsers: User[] = [];
}
