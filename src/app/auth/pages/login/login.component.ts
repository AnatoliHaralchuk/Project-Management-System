import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StrongPassValidator } from '../../strongpass.validator';
import { ModelHttpService } from '../../../project-management/model-http/model-http.service';
import { AuthService } from '../../services/auth.service';
import { map, mergeMap, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  hidePass = true;

  sub!: Subscription;

  constructor(private model: ModelHttpService, private authService: AuthService) {}

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
    this.authService.isLoading = true;
    this.sub = this.model
      .loginCreateToken(form.value)
      .pipe(
        tap((result) => {
          this.authService.isLoading = false;
          localStorage.setItem('userLogin', form.value.login);
          this.authService.logIn(result.token);
        }),
        mergeMap(() => this.model.getAllUsers()),
        map((users) => users?.find((user) => user.login === form.value.login)),
        tap((res) => {
          const user = { ...res };
          localStorage.setItem('user', JSON.stringify(user));
          Object.assign(this.authService.user, user);
        }),
      )
      .subscribe();
  }
}
