import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModelHttpService } from '../../model-http/model-http.service';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(private model: ModelHttpService, public service: CommonService) {}

  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.model
      .getAllBoards()
      .pipe(
        tap((boards) => {
          this.service.boards = this.service.boards.concat(boards);
        }),
      )
      .subscribe();
  }

  addBoard() {
    this.service.isBoard = false;
    // this.form.reset();
  }
}
