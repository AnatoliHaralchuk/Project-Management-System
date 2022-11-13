import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StrongPassValidator } from '../../strongpass.validator';
import { ConfirmPassValidator } from '../../confirmpass.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  hidePass = true;

  hideConfirmPass = true;

  constructor() {}

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
}
