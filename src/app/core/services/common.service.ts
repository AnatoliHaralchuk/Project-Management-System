import { Injectable } from '@angular/core';
import {Board, BoardColumns} from '../../project-management/models/management.models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isCreateBoard = false;

  isEditBoard = false;

  isCreateColumn = false;

  isEditColumn = false;

  boards: Board[] = [];

  columns: BoardColumns[] = []

  currentBoard!: Board;
}
