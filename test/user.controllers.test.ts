import { Request, Response } from 'express';
import * as api from '../src/modules/users/user.controllers';
import { User } from '../src/modules/users/user.model';
import * as usersService from '../src/modules/users/user.service';

const mock = {
  request: {
    body: { login: 'robo', password: 'passrobo', age: 100 }
  } as Request,
  response: {
    json: jest.fn(),
    status: jest.fn(() => mock.response)
  } as unknown as Response
};

describe('user controllers testing', () => {
  test('if the user was not created and already exists:', async () => {
    const mockCreate = jest.spyOn(usersService, 'create');
    mockCreate.mockImplementation(() => Promise.resolve(null));

    await api.postMethodHandler(mock.request, mock.response);

    expect(mock.response.status.mock.calls[0][0]).toBe(400);
    expect(mock.response.json.mock.calls[0][0]).toStrictEqual(
      { message: `User with this "${mock.request.body.login}" login exist` }
    );

    mockCreate.mockReset();
    mockCreate.mockRestore();
  });

  test('if the user was created:', async () => {
    const user = {} as User;

    const mockCreate = jest.spyOn(usersService, 'create');
    mockCreate.mockImplementation(() => Promise.resolve(user));

    await api.postMethodHandler(mock.request, mock.response);

    expect(mock.response.json.mock.calls[1][0]).toBe(user);
    
    mockCreate.mockReset();
    mockCreate.mockRestore();
  });
});
