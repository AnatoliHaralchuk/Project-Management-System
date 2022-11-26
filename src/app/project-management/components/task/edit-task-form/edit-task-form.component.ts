import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Board, BoardTasks} from '../../../models/management.models';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
})
export class EditTaskFormComponent implements OnInit, OnChanges {
  form!: FormGroup;

  @Input() task!: BoardTasks;

  @Input() curBoard!: Board;

  @Output() editTaskFromEdit: EventEmitter<BoardTasks> = new EventEmitter<BoardTasks>();

  constructor(private model: ModelHttpService, public service: CommonService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      user: new FormControl('', [Validators.required])
    });
  }

  ngOnChanges(): void {
    if (this.form && this.task) {
      this.model.getUserById(this.task.userId)
        ?.pipe(
          tap((user) => {
            this.form.get('title')!.setValue(this.task.title);
            this.form.get('description')!.setValue(this.task.description);
            this.form.get('user')!.setValue(user.login);
          })
        )
        .subscribe()

    }
  }

  editTask(form: FormGroup) {
    this.service.isEditTask = false;
    // @ts-ignore
    const userId: string = this.service.allUsers.find((user) => user.login === form.value.user)!.id
    this.model
      .updateTask(this.task.boardId!, this.task.columnId!, this.task.id!, {
      title: form.value.title,
      order: 1,
      description: form.value.description,
      userId: userId,
      boardId: this.task.boardId!,
      columnId: this.task.columnId!
      })
      .pipe(
        tap((task) => {
          this.editTaskFromEdit.emit(task)
        }),
      )
      .subscribe();
  }
}
