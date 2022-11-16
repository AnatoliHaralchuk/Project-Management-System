import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StrongPassValidator } from '../../strongpass.validator';
import { ModelHttpService } from "../../../project-management/model-http/model-http.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  hidePass = true;

  constructor(private model: ModelHttpService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(this.authService.user.login, [Validators.required]),
      password: new FormControl(this.authService.user.password, [
        Validators.required,
        StrongPassValidator.strongPassword,
      ]),
    });
  }

  createToken(form: FormGroup) {
    this.model.loginCreateToken(form.value).pipe(
      tap(() => {
        this.authService.isLoading = true;
      })
    ).subscribe((result) => {
        // this.model.getAllUsers().subscribe(
        //   r => console.log(r)
        // )
        localStorage.setItem('userLogin', form.value.login)
        this.authService.logIn(result.token)
      })
  }
}
