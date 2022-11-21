import { Injectable } from '@angular/core';
import { Board } from '../../project-management/models/management.models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isBoard = true;

  boards: Board[] = [];
}
