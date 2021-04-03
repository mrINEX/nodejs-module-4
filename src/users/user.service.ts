import * as usersRepository from './user.memory.repository';
import { OutputUser } from './user.model';

const create = (user: OutputUser): Promise<OutputUser> => {
  return usersRepository.createInMemory(user);
};

const get = (id: string): Promise<OutputUser> => {
  return usersRepository.getFromMemory(id);
}

const getAll = (loginSubstring: string, limit: number): Promise<OutputUser[]> => {
  return usersRepository.getAllFromMemory(loginSubstring, limit);
}

export { create, get, getAll };
