import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Board} from "../../../models/management.models";
import {ModelHttpService} from "../../../model-http/model-http.service";
import {CommonService} from "../../../../core/services/common.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit-column-form',
  templateUrl: './edit-column-form.component.html',
  styleUrls: ['./edit-column-form.component.scss'],
})
export class EditColumnFormComponent implements OnInit {
  form!: FormGroup;

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
