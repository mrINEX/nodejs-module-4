import { v4 as uuid } from 'uuid';

type InputUser = {
  login: string,
  password: string,
  age: number,
}

type ToResponseUser = {
  id: string;
  login: string;
  age: number;
  isDeleted: boolean;
}

interface OutputUser {
  id: string,
  login: string,
  password: string,
  age: number,
  isDeleted: boolean
}

class User implements OutputUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  toResponse: (user: OutputUser) => ToResponseUser;

  constructor({ login, password, age }: InputUser) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  static toResponse(user: OutputUser): ToResponseUser {
    const { id, login, isDeleted, age } = user;
    return { id, login, age, isDeleted };
  }
}

export { User, OutputUser };
