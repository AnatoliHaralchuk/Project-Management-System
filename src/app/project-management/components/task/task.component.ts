import { Component, Input, OnInit } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Board, BoardColumns } from '../../models/management.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() column!: BoardColumns;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  deleteTask(id: string) {
    this.model.deleteBoard(id).subscribe();
    this.service.boards = this.service.boards.filter((board) => board.id !== id);
  }

  editTask(id: string) {
    // this.service.isEditBoard = true;
    // this.service.currentBoard = board;
  }

  toTask(event: any, board: BoardColumns) {
    if (!(event.target.tagName === 'MAT-ICON')) {
      this.route.params
        .pipe(
          tap((params) => {
            this.service.curBoardId = params['id'];
            this.router.navigate([
              '/main/board',
              board.id,
              'column',
            ]);
          }),
        )
        .subscribe();
    }
  }
}
