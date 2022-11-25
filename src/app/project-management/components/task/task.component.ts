import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Board, BoardColumns, BoardTasks} from '../../models/management.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: BoardTasks;

  @Output() deleteTaskId: EventEmitter<string> = new EventEmitter<string>()

  @Output() currentTask: EventEmitter<BoardTasks> = new EventEmitter<BoardTasks>()



  userName!: string;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.model.getUserById(this.task.userId)?.subscribe((user) => this.userName = user.login)
  }

  deleteTask(id: string) {
    this.model.deleteTask(this.task.boardId!, this.task.columnId!, id)
      .pipe(
        tap(() => {
          this.deleteTaskId.emit(id);
        })
      )
      .subscribe()
    // this.service.boards = this.service.boards.filter((board) => board.id !== id);
  }

  editTask(task: BoardTasks) {
    this.service.isEditTask = true;
    this.model.getAllUsers()
      .subscribe((users) => {
        if (!this.service.allUsers.length && users !== null)
          this.service.allUsers = this.service.allUsers.concat(users)
      })
    this.currentTask.emit(task);
  }
}
