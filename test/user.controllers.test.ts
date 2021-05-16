import { Request, Response } from 'express';

import { User } from '../src/modules/users/user.model';
import * as api from '../src/modules/users/user.controllers';
import * as usersService from '../src/modules/users/user.service';

const mock = {
  request: {
    body: {},
    params: {},
    query: {},
  } as Request,
  response: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  }
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('user controllers testing', () => {
  describe('POST method:', () => {
    test('if user was not created and already exists:', async () => {
      const mockCreate = jest.spyOn(usersService, 'create');
      mockCreate.mockImplementation(() => Promise.resolve(null));
  
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(400);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual(
        `User with this "${mock.request.body.login}" login exist`
      );
    });
  
    test('if user was created:', async () => {
      const user = {} as User;
  
      const mockCreate = jest.spyOn(usersService, 'create');
      mockCreate.mockImplementation(() => Promise.resolve(user));
  
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });

  describe('GET by ID method:', () => {
    test('if user with ID does not exist:', async () => {
      const mockCreate = jest.spyOn(usersService, 'get');
      mockCreate.mockImplementation(() => Promise.resolve(null));
  
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user with ID exists:', async () => {
      const user = {} as User;
  
      const mockCreate = jest.spyOn(usersService, 'get');
      mockCreate.mockImplementation(() => Promise.resolve(user));
  
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });

  describe('GET by ALL method:', () => {
    test('users were returned:', async () => {
      const users = [{} as User];
  
      const mockCreate = jest.spyOn(usersService, 'getAll');
      mockCreate.mockImplementation(() => Promise.resolve(users));
  
      await api.getAllMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].users).toBe(users);
    });
  })

  describe('PUT method:', () => {
    test('if user not updated:', async () => {
      const mockCreate = jest.spyOn(usersService, 'update');
      mockCreate.mockImplementation(() => Promise.resolve(0));
  
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user updated:', async () => {
      const mockCreate = jest.spyOn(usersService, 'update');
      mockCreate.mockImplementation(() => Promise.resolve(1));
  
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].affected).toBeGreaterThan(0);
    });
  });

  describe('DELETE method:', () => {
    test('if user does not exist:', async () => {
      const mockCreate = jest.spyOn(usersService, 'remove');
      mockCreate.mockImplementation(() => Promise.resolve(null));
  
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user exists:', async () => {
      const user = {} as User;
  
      const mockCreate = jest.spyOn(usersService, 'remove');
      mockCreate.mockImplementation(() => Promise.resolve(user));
  
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });
});
