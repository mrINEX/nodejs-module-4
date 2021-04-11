import { v4 as uuid } from 'uuid';

interface OutputUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type InputUser = Pick<OutputUser, 'login' | 'password' | 'age'>;

type ToResponseUser = Pick<OutputUser, 'id' | 'login' | 'age'>;

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
    const { id, login, age } = user;
    return { id, login, age };
  }
}

export { User, OutputUser, InputUser };
