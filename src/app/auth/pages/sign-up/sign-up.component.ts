import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StrongPassValidator } from '../../strongpass.validator';
import { ConfirmPassValidator } from '../../confirmpass.validator';
import { ModelHttpService } from '../../../project-management/model-http/model-http.service';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  hidePass = true;

  hideConfirmPass = true;

  sub!: Subscription;

  constructor(
    private model: ModelHttpService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        StrongPassValidator.strongPassword,
      ]),
      confirmpassword: new FormControl(null, [
        Validators.required,
        ConfirmPassValidator.confirmPassword,
      ]),
    });
  }

  signUp(form: FormGroup) {
    this.sub = this.model
      .signUpCreatAccount(form.value)
      .pipe(
        tap(() => {
          this.authService.isLoading = true;
        }),
      )
      .subscribe((user) => {
        this.authService.isLoading = false;
        this.authService.user = { password: form.value.password, ...user };
        this.router.navigate([
          'auth',
          'login',
        ]);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
