import { Component, OnInit } from '@angular/core';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  styleUrls: ['./column-page.component.scss'],
})
export class ColumnPageComponent implements OnInit {
  constructor(
    private model: ModelHttpService,
    public service: CommonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.service.columns.length) {
      this.route.params
        .pipe(
          mergeMap((params) => this.model.getAllColumns(params['id'])),
          tap((columns) => {
            this.service.columns = this.service.columns.concat(columns);
          }),
        )
        .subscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.columns, event.previousIndex, event.currentIndex);
  }
}
