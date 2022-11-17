import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router
    ) {}

    close() {
      this.auth.message = '';
      this.auth.isLoading = false;
      this.router.navigate(['/login']);
    }  

  ngOnInit(): void {}
}
