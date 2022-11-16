export interface User {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface Login {
  login: string;
  password: string;
}

export interface Token {
  token: string;
}
export interface Error {
  statusCode: number;
  message: string;
}

export interface LocalToken {
  value: string;
  expiry: number
}
