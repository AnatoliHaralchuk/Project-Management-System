import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-delete-form-task',
  templateUrl: './delete-form-task.component.html',
  styleUrls: ['./delete-form-task.component.scss'],
})
export class DeleteFormTaskComponent implements OnInit {
  @Output() deleteTaskId: EventEmitter<string> = new EventEmitter<string>();

  constructor(private model: ModelHttpService, public service: CommonService) {}

  ngOnInit(): void {}

  deleteTask(boardId: string, columnId: string, taskId: string) {
    this.model
      .deleteTask(boardId, columnId, taskId)
      .pipe(
        tap(() => {
          this.deleteTaskId.emit(taskId);
          this.service.isDeleteFormTask = false;
        }),
      )
      .subscribe();
  }

  checkDelete() {
    const del = this.service.deleteData;
    if (del.idBoard && del.idColumn && del.idTask && !del.idUser) {
      this.deleteTask(del.idBoard, del.idColumn, del.idTask);
    }
    this.service.isDeleteForm = false;
  }
}
