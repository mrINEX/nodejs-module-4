import * as usersRepository from './user.memory.repository';
import { OutputUser, InputUser } from './user.model';

const create = (properties: InputUser): Promise<{ isCreated: boolean, status?: number, message?: string}> => {
  return usersRepository.createInMemory(properties);
};

const get = (id: string): Promise<OutputUser | undefined> => {
  return usersRepository.getFromMemory(id);
};

const getAll = (loginSubstring: string, limit: number): Promise<OutputUser[]> => {
  return usersRepository.getAllFromMemory(loginSubstring, limit);
};

const update = (id: string, properties: InputUser): Promise<{ isUpdated: boolean, message?: string}> => {
  return usersRepository.updateInMemory(id, properties);
};

const remove = (id: string): Promise<boolean> => {
  return usersRepository.softDeleteInMemory(id);
};

export { create, get, getAll, update, remove };
