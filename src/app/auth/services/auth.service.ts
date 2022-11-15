import { Injectable } from '@angular/core';
import {User} from "../models/auth.models";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isLoading = false;
  token!: string;
  user: User = {
    name: '',
    login: '',
    password: '',
  }
}
