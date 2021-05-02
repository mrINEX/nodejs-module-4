import * as usersRepository from './user.DB';
import { InputUser, User } from './user.model';

export const create = (properties: InputUser): Promise<User | null> => {
  return usersRepository.createInDB(properties);
};

export const get = (id: string): Promise<User | null> => {
  return usersRepository.getByIdDB(id);
};

export const getAll = (loginSubstring: string, limit: number): Promise<User[]> => {
  return usersRepository.getByAllDB(loginSubstring, limit);
};

export const update = (id: string, properties: InputUser): Promise<number> => {
  return usersRepository.updateInDB(id, properties);
};

export const remove = (id: string): Promise<User | null> => {
  return usersRepository.deleteInDB(id);
};
