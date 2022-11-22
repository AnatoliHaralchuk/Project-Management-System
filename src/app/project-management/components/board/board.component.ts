import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../models/management.models';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;

  @Input() id!: number;

  @Output() curBoard: EventEmitter<Board> = new EventEmitter<Board>();

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  deleteBoard(id: string) {
    this.model.deleteBoard(id).subscribe();
    this.service.boards = this.service.boards.filter((board) => board.id !== id);
  }

  editBoard(board: Board) {
    this.service.isEditBoard = true;
    this.curBoard.emit(board);
    this.service.currentBoard = board;
  }

  toBoard(event: any, board: Board) {
    if (!(event.target.tagName === 'MAT-ICON')) {
      this.router.navigate([
        '/main/board',
        board.id,
        'column',
      ]);
    }
  }
}
