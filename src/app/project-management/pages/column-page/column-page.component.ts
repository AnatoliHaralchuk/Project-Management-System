import {Component, OnInit } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BoardColumns, BoardTasks } from '../../models/management.models';

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  styleUrls: ['./column-page.component.scss'],
})
export class ColumnPageComponent implements OnInit {
  curColumn!: BoardColumns;

  curTask!: BoardTasks;

  currentTask!: BoardTasks;

  currentTaskFromEdit!: BoardTasks;

  deleteTaskId!: string;

  boardId!:string;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.service.columns.length) {
      this.route.params
        .pipe(
          mergeMap((params) => this.model.getAllColumns(params['id'])),
          tap((columns) => {
            const col = columns.sort((a,b) => a.order - b.order)
            this.service.columns = this.service.columns.concat(col);
          }),
        )
        .subscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.columns, event.previousIndex, event.currentIndex);
    this.route.params
      .pipe(
        tap((params) => this.boardId = params['id']),
      )
      .subscribe()
    for (let i = 0; i < this.service.columns.length; i++) {
      let column = this.service.columns[i]
      if (i + 1 !== column.order) {
        this.model.updateColumn(this.boardId, column.id!, {
          title: column.title,
          order: i + 1
        }).subscribe()
      }
    }
  }

  sentData(event: BoardColumns) {
    this.curColumn = event;
  }

  sendTaskToColumn(event: BoardTasks) {
    this.curTask = event;
  }

  sentTaskToEdit(event: BoardTasks) {
    this.currentTask = event;
  }

  editTaskFromEdit(event: BoardTasks) {
    this.currentTaskFromEdit = event;
  }

  sentDeleteTaskId(event: string) {
    this.deleteTaskId = event;
  }
}
