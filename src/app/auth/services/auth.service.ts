import { Injectable } from '@angular/core';
import {LocalToken, User} from "../models/auth.models";
import {Router} from "@angular/router";
import {ModelHttpService} from "../../project-management/model-http/model-http.service";
import {filter, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    // const userLogin: string | null= localStorage.getItem('userLogin');
    // if (userLogin) this.model.getAllUsers().pipe(
    //   tap((user) => console.log(user))
    // )
  }
  isLoading = false;
  isToken = (localStorage.getItem('token'))? true : false;
  user: User = {
    name: '',
    login: '',
    password: '',
  }

logIn(token: string){
  this.isLoading = false;
  const fourHour: number = 4*3600*1000;
  const date: number = new Date().getTime()
  const localToken: LocalToken = {
    value: token,
    expiry: date + fourHour,
  }
  localStorage.setItem('token', JSON.stringify(localToken));
  this.isToken = true;
  this.router.navigate(['main'])
}

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userLocal')
    this.isToken = false;
    this.router.navigate([''])
  }
}
