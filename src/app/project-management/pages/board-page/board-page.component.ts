import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { Board } from '../../models/management.models';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    public data: DataService,
  ) {}

  sub!: Subscription;

  currentBoard: Board = {
    id: '',
    title: '',
    description: '',
  };

  ngOnInit(): void {
    this.service.columns = [];
    this.sub = this.model
      .getAllBoards()
      .pipe(
        tap((boards) => {
          if (!this.service.boards.length) this.service.boards = this.service.boards.concat(boards);
        }),
      )
      .subscribe();
  }

  changeForm(board: Board) {
    this.currentBoard = board;
  }
}
