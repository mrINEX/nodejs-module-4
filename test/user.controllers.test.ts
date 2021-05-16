import { Request, Response } from 'express';
import { User } from '../src/modules/users/user.model';
import * as api from '../src/modules/users/user.controllers';
import * as usersService from '../src/modules/users/user.service';

function createData() {
  return {
    request: {
      body: {},
      params: {},
      query: {},
    } as Request,
    response: {
      json: jest.fn(),
      status: jest.fn(() => mock.response)
    } as unknown as Response
  }
}

let mock;

beforeEach(() => {
  mock = createData();
});

describe('user controllers testing', () => {
  describe('POST method:', () => {
    test('if user was not created and already exists:', async () => {
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
  
    test('if user was created:', async () => {
      const user = {} as User;
  
      const mockCreate = jest.spyOn(usersService, 'create');
      mockCreate.mockImplementation(() => Promise.resolve(user));
  
      await api.postMethodHandler(mock.request, mock.response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
      
      mockCreate.mockReset();
      mockCreate.mockRestore();
    });
  });

  describe('GET by ID method:', () => {
    test('if user with this ID does not exist:', async () => {
      const mockCreate = jest.spyOn(usersService, 'get');
      mockCreate.mockImplementation(() => Promise.resolve(null));
  
      await api.getMethodHandler(mock.request, mock.response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0]).toStrictEqual(
        { message: 'User not found' }
      );
  
      mockCreate.mockReset();
      mockCreate.mockRestore();
    });
  
    test('if user with this ID exists:', async () => {
      const user = {} as User;
  
      const mockCreate = jest.spyOn(usersService, 'get');
      mockCreate.mockImplementation(() => Promise.resolve(user));
  
      await api.getMethodHandler(mock.request, mock.response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
      
      mockCreate.mockReset();
      mockCreate.mockRestore();
    });
  });

  describe('GET by ALL method:', () => {
    test('users were returned:', async () => {
      const users = [{} as User];
  
      const mockCreate = jest.spyOn(usersService, 'getAll');
      mockCreate.mockImplementation(() => Promise.resolve(users));
  
      await api.getAllMethodHandler(mock.request, mock.response);
  
      expect(mock.response.json.mock.calls[0][0].users).toBe(users);
      
      mockCreate.mockReset();
      mockCreate.mockRestore();
    });
  })
});
