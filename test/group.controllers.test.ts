import { Request, Response } from 'express';

import { Group } from '../src/modules/groups/group.model';
import * as api from '../src/modules/groups/group.controllers';

const group = {} as Group;
const groups = [{} as Group];

jest.mock('../src/modules/groups/group.service', () => {
  return {
    create: ({ name : testIs }) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(null);
      }
      if (testIs === 'happy') {
        return Promise.resolve(group);
      }
    },
    get: (testIs) => {
      if (testIs === 'unhappy') {
        return Promise.resolve(null);
      }
      if (testIs === 'happy') {
        return Promise.resolve(group);
      }
    },
    getAll: () => Promise.resolve(groups),
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
        return Promise.resolve(group);
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

describe('group controllers testing', () => {
  describe('POST method:', () => {
    test('if group was not created and already exists:', async () => {
      mock.request.body.name = 'unhappy';
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(400);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual(
        `Group with this "${mock.request.body.name}" name exist`
      );
    });
  
    test('if group was created:', async () => {
      mock.request.body.name = 'happy';
      await api.postMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(group);
    });
  });

  describe('GET by ID method:', () => {
    test('if group with ID does not exist:', async () => {
      mock.request.params.id = 'unhappy';
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('Group not found');
    });
  
    test('if group with ID exists:', async () => {
      mock.request.params.id = 'happy';
      await api.getMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(group);
    });
  });

  describe('GET by ALL method:', () => {
    test('groups were returned:', async () => {
      await api.getAllMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].groups).toBe(groups);
    });
  })

  describe('PUT method:', () => {
    test('if group not updated:', async () => {
      mock.request.params.id = 'unhappy';
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('Group not found');
    });
  
    test('if group updated:', async () => {
      mock.request.params.id = 'happy';
      await api.putMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0].affected).toBeGreaterThan(0);
    });
  });

  describe('DELETE method:', () => {
    test('if group does not exist:', async () => {
      mock.request.params.id = 'unhappy';
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.status.mock.calls[0][0]).toBe(404);
      expect(mock.response.json.mock.calls[0][0].message).toStrictEqual('Group not found');
    });
  
    test('if group exists:', async () => {
      mock.request.params.id = 'happy';
      await api.deleteMethodHandler(mock.request, mock.response as unknown as Response);
  
      expect(mock.response.json.mock.calls[0][0]).toBe(group);
    });
  });
});
