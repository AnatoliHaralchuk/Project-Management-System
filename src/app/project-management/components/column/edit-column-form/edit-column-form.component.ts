import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board, BoardColumns } from '../../../models/management.models';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-column-form',
  templateUrl: './edit-column-form.component.html',
  styleUrls: ['./edit-column-form.component.scss'],
})
export class EditColumnFormComponent implements OnInit {
  form!: FormGroup;

  @Output() isEdit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() column!: BoardColumns;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.column.title, [Validators.required]),
    });
  }

  // editBoard(id: string, form: Board) {
  //   this.model
  //     .updateBoard(id, form)
  //     .pipe(
  //       tap((res) => {
  //         const i = this.service.boards.findIndex((board) => id === board.id);
  //         this.service.boards[i].title = res.title;
  //         this.service.boards[i].description = res.description;
  //         this.service.isEditBoard = false;
  //       }),
  //     )
  //     .subscribe();
  // }

  editColumn(obj: { title: string }) {
    this.isEdit.emit(false);
    console.log('asdasd');
    this.route.params.pipe(
      tap(() => {
        const id = this.service.columns.findIndex((column) => column.title === obj.title);
        this.service.columns[id].title = obj.title;
      }),
      mergeMap((params) =>
        this.model.updateColumn(params['id'], this.column.id!, {
          title: obj.title,
          order: this.column.order,
        }),
      ),
    );
  }
}
