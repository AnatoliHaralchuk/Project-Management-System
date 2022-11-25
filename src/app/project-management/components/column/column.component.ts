import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardColumns } from '../../models/management.models';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: BoardColumns;

  @Output() curColumn: EventEmitter<BoardColumns> = new EventEmitter<BoardColumns>();

  isEditColumn = false;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteColumn(columnId: string) {
    this.route.params
      .pipe(
        tap(
          () =>
            (this.service.columns = this.service.columns.filter(
              (column) => column.id !== columnId,
            )),
        ),
        mergeMap((params) => this.model.deleteColumn(params['id'], columnId)),
      )
      .subscribe();
  }

  editColumnTitle(event: any, column: BoardColumns) {
    this.isEditColumn = true;
    // this.route.params
    //   .pipe(
    //     tap(
    //       () =>
    //         (this.service.columns = this.service.columns.filter(
    //           (column) => column.id !== columnId,
    //         )),
    //     ),
    //     mergeMap((params) => this.model.deleteColumn(params['id'], columnId)),
    //   )
    //   .subscribe();
  }

  addTask(column: BoardColumns) {
    this.service.isCreateTask = true;
    console.log(column);
    this.curColumn.emit(column);
  }
}
