import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardColumns } from '../../../models/management.models';
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

  editColumn(obj: { title: string }) {
    this.isEdit.emit(false);
    this.route.params
      .pipe(
        tap(() => {
          const id = this.service.columns.findIndex((column) => column.title === this.column.title);
          this.service.columns[id].title = obj.title;
        }),
        mergeMap((params) =>
          this.model.updateColumn(params['id'], this.column.id!, {
            title: obj.title,
            order: this.column.order,
          }),
        ),
      )
      .subscribe();
  }
}
