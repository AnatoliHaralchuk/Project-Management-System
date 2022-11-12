export interface User {
  id?: string;
  name: string;
  login: string;
}

export interface Error {
  statusCode: number;
  message: string;
}
