import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelHttpService } from '../../../model-http/model-http.service';
import { CommonService } from '../../../../core/services/common.service';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-column-form',
  templateUrl: './create-column-form.component.html',
  styleUrls: ['./create-column-form.component.scss'],
})
export class CreateColumnFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  createColumn(form: FormGroup) {
    this.route.params
      .pipe(
        tap(() => {
          this.service.isCreateColumn = false;
        }),
        mergeMap((params) => this.model.createColumn(params['id'], form.value.title)),
        tap((column) => {
          this.service.columns.push(column);
        }),
      )
      .subscribe();
  }
}
