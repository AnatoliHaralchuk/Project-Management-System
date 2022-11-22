import { Injectable } from '@angular/core';
import { Board } from '../../project-management/models/management.models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isCreateBoard = false;

  isEditBoard = false;

  boards: Board[] = [];

  currentBoard!: Board;
}
