import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {BoardColumns, BoardTasks} from '../../../models/management.models';
import {User} from "../../../../auth/models/auth.models";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent implements OnInit {
  @Input() curColumn!: BoardColumns;

  @Output() curTask: EventEmitter<BoardTasks> = new EventEmitter<BoardTasks>()

  form!: FormGroup;

  boardId!: string;

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
      user: new FormControl('', [Validators.required])
    });
  }

  createTask(form: FormGroup) {
    const userId: any = this.service.allUsers.find((user) => user.login === form.value.user)
    this.service.isCreateTask = false;
    this.route.params
      .pipe(
        tap((params) => this.boardId = params['id']),
        mergeMap((params) => this.model.createTask(params['id'], this.curColumn.id!,{
          title: form.value.title,
          description: form.value.description,
          userId: userId.id
        })),
        mergeMap((task) => this.model.getTaskById(this.boardId, this.curColumn.id!, task.id!)),
        tap((task) => {
          this.curTask.emit(task)
        })
      )
      .subscribe()
  }
}
