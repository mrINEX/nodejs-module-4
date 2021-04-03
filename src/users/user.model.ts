import uuid from 'uuid';

type InputUser = {
  login: string,
  password: string,
  age: number,
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
  constructor({ login, password, age }: InputUser) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }
}

// const user = new User({ login: '1', password: '2', age: 4 });
// console.log(user);

export { User };
