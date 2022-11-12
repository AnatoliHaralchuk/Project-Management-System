import { Component, OnInit } from '@angular/core';
import { ModelHttpService } from "./project-management/model-http/model-http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private model: ModelHttpService) {
  }
  ngOnInit(): void {
    // this.model.getAllUsers().subscribe(res => console.log('users', res))
  }
  title = 'Project-Management-System';
}
