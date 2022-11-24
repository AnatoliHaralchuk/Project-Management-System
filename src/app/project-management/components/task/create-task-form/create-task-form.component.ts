import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BoardColumns } from '../../../models/management.models';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent implements OnInit {
  @Input() curColumn!: BoardColumns;

  form!: FormGroup;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  createBoard(form: FormGroup) {
    this.model
      .createBoard(form.value)
      .pipe(
        tap((board) => {
          this.service.isCreateBoard = false;
          this.service.boards.push(board);
          form.reset();
        }),
      )
      .subscribe();
  }

  createTask(form: FormGroup) {
    this.service.isCreateTask = false;
    // this.route.params
    //   .pipe(
    //     mergeMap((params) => this.model.createTask(params['id'], this.curColumn.id!,{
    //       title: form.value.title,
    //       description: form.value.description,
    //       userId:
    //     }))
    //   )
    //   .subscribe()
  }
}
