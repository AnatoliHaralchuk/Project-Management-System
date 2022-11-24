import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelHttpService} from "../../../model-http/model-http.service";
import {CommonService} from "../../../../core/services/common.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private model: ModelHttpService, public service: CommonService) {}

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
}
