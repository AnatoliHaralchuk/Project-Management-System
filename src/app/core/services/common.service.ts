import { Injectable } from '@angular/core';
import { Board, BoardColumns, DeleteData } from '../../project-management/models/management.models';
import { User } from '../../auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isDeleteForm = false;

  isDeleteFormTask = false;

  deleteData: DeleteData = {
    idBoard: '',
    idColumn: '',
    idTask: '',
    idUser: '',
  };

  isCreateBoard = false;

  isEditBoard = false;

  isCreateColumn = false;

  isCreateTask = false;

  isEditTask = false;

  curBoardId: string = '';

  boards: Board[] = [];

  columns: BoardColumns[] = [];

  currentBoard!: Board;

  allUsers: User[] = [];
}
