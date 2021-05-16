import { Request, Response } from 'express';
import * as api from '../src/modules/users/user.controllers';

const mock = {
  request: {
    body: { login: 'robo', password: 'passrobo', age: 1000 }
  } as Request,
  response: {} as Response
};

describe('user controllers testing', () => {
  test('postMethodHandler:', () => {
    expect(api.postMethodHandler(mock.request, mock.response)).toBeTruthy();
  });
});