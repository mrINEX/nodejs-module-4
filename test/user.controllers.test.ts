import { Request, Response } from 'express';
// import { request, response } from 'express';

import { User } from '../src/modules/users/user.model';
import * as api from '../src/modules/users/user.controllers';

// const json = response.json as jest.Mocked<typeof response.json>;
const user = {} as User;
const users = [{} as User];

jest.mock('../src/modules/users/user.service', () => {
  return {
    create: ({ password : testIs }) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(null);
      }
      if (testIs === 'happy') {
        return Promise.resolve(user);
      }
    },
    get: (testIs) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(null);
      }
      if (testIs === 'happy') {
        return Promise.resolve(user);
      }
    },
    getAll: () => Promise.resolve(users),
    update: (testIs) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(0);
      }
      if (testIs === 'happy') {
        return Promise.resolve(1);
      }
    },
    remove: (testIs) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(null);
      }
      if (testIs === 'happy') {
        return Promise.resolve(user);
      }
    },
  };
});

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
      mock.request.body.password = 'unhappy';
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(400);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual(
        `User with this "${mock.request.body.login}" login exist`
      );
    });
  
    test('if user was created:', async () => {
      mock.request.body.password = 'happy';
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });

  describe('GET by ID method:', () => {
    test('if user with ID does not exist:', async () => {
      mock.request.params.id = 'unhappy';
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user with ID exists:', async () => {
      mock.request.params.id = 'happy';
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });

  describe('GET by ALL method:', () => {
    test('users were returned:', async () => {
      await api.getAllMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].users).toBe(users);
    });
  })

  describe('PUT method:', () => {
    test('if user not updated:', async () => {
      mock.request.params.id = 'unhappy';
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user updated:', async () => {
      mock.request.params.id = 'happy';
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].affected).toBeGreaterThan(0);
    });
  });

  describe('DELETE method:', () => {
    test('if user does not exist:', async () => {
      mock.request.params.id = 'unhappy';
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('User not found');
    });
  
    test('if user exists:', async () => {
      mock.request.params.id = 'happy';
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(user);
    });
  });
});
