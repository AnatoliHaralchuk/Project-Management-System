import { Component, OnInit } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss'],
})
export class DeleteFormComponent implements OnInit {
  constructor(private model: ModelHttpService, public service: CommonService) {}

  ngOnInit(): void {}

  deleteBoard(id: string) {
    this.model.deleteBoard(id).subscribe();
    this.service.boards = this.service.boards.filter((board) => board.id !== id);
  }

  deleteColumn(boardId: string, columnId: string) {
    this.service.columns = this.service.columns.filter((column) => column.id !== columnId);
    this.model.deleteColumn(boardId, columnId).subscribe();
  }

  checkDelete() {
    const del = this.service.deleteData;
    if (del.idBoard && !del.idColumn && !del.idTask && !del.idUser) {
      this.deleteBoard(del.idBoard);
    }
    if (del.idBoard && del.idColumn && !del.idTask && !del.idUser) {
      this.deleteColumn(del.idBoard, del.idColumn);
    }
    this.service.isDeleteForm = false;
  }
}
