import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { CommonService } from './core/services/common.service';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private data: DataService,
    private translateService: TranslateService
  ) { 
    this.translateService.use(this.data.lang!) 
  }

  title = 'Project-Management-System';

  ngOnInit() {
    this.translateService.use(this.data.lang!);
  }
}
