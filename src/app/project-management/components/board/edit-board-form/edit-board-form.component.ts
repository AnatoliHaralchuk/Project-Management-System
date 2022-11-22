import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { Board } from '../../../models/management.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-board-form',
  templateUrl: './edit-board-form.component.html',
  styleUrls: ['./edit-board-form.component.scss'],
})
export class EditBoardFormComponent implements OnInit, OnChanges {
  form!: FormGroup;

  @Input() curBoard!: Board;

  constructor(private model: ModelHttpService, public service: CommonService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnChanges(): void {
    if (this.form) {
      this.form.get('title')!.setValue(this.curBoard.title);
      this.form.get('description')!.setValue(this.curBoard.description);
    }
  }

  editBoard(id: string, form: Board) {
    this.model
      .updateBoard(id, form)
      .pipe(
        tap((res) => {
          const i = this.service.boards.findIndex((board) => id === board.id);
          this.service.boards[i].title = res.title;
          this.service.boards[i].description = res.description;
          this.service.isEditBoard = false;
        }),
      )
      .subscribe();
  }
}
