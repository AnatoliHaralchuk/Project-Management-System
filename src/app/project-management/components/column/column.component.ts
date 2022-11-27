import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardColumns, BoardTasks } from '../../models/management.models';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnChanges {
  @Input() column!: BoardColumns;

  @Input() curTask!: BoardTasks;

  @Input() deleteTaskId!: string;

  @Input() currentTaskFromEdit!: BoardTasks;

  @Output() curColumn: EventEmitter<BoardColumns> = new EventEmitter<BoardColumns>();

  @Output() currentTask: EventEmitter<BoardTasks> = new EventEmitter<BoardTasks>();

  isEditColumn = false;

  tasks: BoardTasks[] = [];

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) => this.model.getAllTasks(params['id'], this.column.id!)),
        tap((tasks) => {
          const t = tasks.sort((a, b) => a.order! - b.order!);
          if (!this.tasks.length) {
            this.tasks = this.tasks.concat(t);
          }
        }),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deleteTaskId']) {
      if (this.deleteTaskId) {
        const id: number = this.tasks.findIndex((task) => task.id === this.deleteTaskId);
        if (id !== -1) {
          this.tasks.splice(id, 1);
        }
      }
    }
    if (changes['curTask']) {
      if (this.curTask) {
        if (this.curTask.columnId === this.column.id) this.tasks.push(this.curTask);
      }
    }
    if (changes['currentTaskFromEdit']) {
      if (this.currentTaskFromEdit) {
        const id: number = this.tasks.findIndex((task) => task.id === this.currentTaskFromEdit.id);
        if (id !== -1) {
          this.tasks.splice(id, 1, this.currentTaskFromEdit);
        }
      }
    }
  }

  drop(event: CdkDragDrop<BoardTasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      for (let i = 0; i < event.container.data.length; i++) {
        let task = event.container.data[i];
        if (i + 1 !== task.order) {
          this.model
            .updateTask(task.boardId!, task.columnId!, task.id!, {
              title: task.title,
              order: i + 1,
              description: task.description,
              userId: task.userId,
              boardId: task.boardId,
              columnId: task.columnId,
            })
            .subscribe();
        }
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      for (let i = 0; i < event.container.data.length; i++) {
        let task = event.container.data[i];
        if (i + 1 !== task.order || task.columnId !== this.column.id) {
          this.model
            .updateTask(task.boardId!, task.columnId!, task.id!, {
              title: task.title,
              order: i + 1,
              description: task.description,
              userId: task.userId,
              boardId: task.boardId,
              columnId: this.column.id,
            })
            .subscribe();
        }
      }
      for (let i = 0; i < event.previousContainer.data.length; i++) {
        let task = event.previousContainer.data[i];
        if (i + 1 !== task.order || task.columnId !== this.column.id) {
          this.model
            .updateTask(task.boardId!, task.columnId!, task.id!, {
              title: task.title,
              order: i + 1,
              description: task.description,
              userId: task.userId,
              boardId: task.boardId,
              columnId: task.columnId!,
            })
            .subscribe();
        }
      }
    }
  }

  isDeleteColumn(idColumn: string) {
    this.service.isDeleteForm = true;
    this.route.params
      .pipe(
        tap(
          (params) =>
            (this.service.deleteData = {
              idBoard: params['id'],
              idColumn: idColumn,
              idTask: '',
              idUser: '',
            }),
        ),
      )
      .subscribe();
  }

  addTask(column: BoardColumns) {
    this.service.isCreateTask = true;
    this.curColumn.emit(column);
    this.model.getAllUsers().subscribe((users) => {
      if (!this.service.allUsers.length && users !== null)
        this.service.allUsers = this.service.allUsers.concat(users);
    });
  }

  editTask(event: BoardTasks) {
    this.currentTask.emit(event);
  }
}
