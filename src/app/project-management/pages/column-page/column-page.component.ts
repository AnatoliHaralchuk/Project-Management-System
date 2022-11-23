import { Component, OnInit } from '@angular/core';
import {ModelHttpService} from "../../model-http/model-http.service";
import {CommonService} from "../../../core/services/common.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  styleUrls: ['./column-page.component.scss'],
})
export class ColumnPageComponent implements OnInit {
  constructor(private model: ModelHttpService, public service: CommonService) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.columns, event.previousIndex, event.currentIndex);
  }
}
