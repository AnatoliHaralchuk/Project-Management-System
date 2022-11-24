import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModelHttpService} from "../../model-http/model-http.service";
import {CommonService} from "../../../core/services/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Board} from "../../models/management.models";
import {tap} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() board!: Board;

  @Input() id!: number;

  @Output() curBoard: EventEmitter<Board> = new EventEmitter<Board>();

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute
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
      this.route.params.pipe(
        tap((params) => {
          this.service.curBoardId = params['id']
          this.router.navigate([
            '/main/board',
            board.id,
            'column',
          ]);
        })
      ).subscribe()
    }
  }
}
