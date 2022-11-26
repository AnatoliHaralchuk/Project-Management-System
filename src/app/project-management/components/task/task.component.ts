import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardTasks } from '../../models/management.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: BoardTasks;

  @Output() currentTask: EventEmitter<BoardTasks> = new EventEmitter<BoardTasks>();

  userName!: string;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.model.getUserById(this.task.userId)?.subscribe((user) => (this.userName = user.login));
  }

  isDeleteTask(idColumn: string) {
    this.service.isDeleteFormTask = true;
    this.service.deleteData = {
      idBoard: this.task.boardId!,
      idColumn: this.task.columnId!,
      idTask: idColumn,
      idUser: '',
    };
  }

  editTask(task: BoardTasks) {
    this.service.isEditTask = true;
    this.model.getAllUsers().subscribe((users) => {
      if (!this.service.allUsers.length && users !== null)
        this.service.allUsers = this.service.allUsers.concat(users);
    });
    this.currentTask.emit(task);
  }
}
