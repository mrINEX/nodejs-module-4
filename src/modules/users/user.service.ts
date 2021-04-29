import * as usersRepository from './user.DB';
import { InputUser, User } from './user.model';

export const create = (properties: InputUser): Promise<User | null> => {
  return usersRepository.createInPostgreDB(properties);
};

export const get = (id: string): Promise<User | null> => {
  return usersRepository.getByIdPostgreDB(id);
};

export const getAll = (loginSubstring: string, limit: number): Promise<User[]> => {
  return usersRepository.getByAllPostgreDB(loginSubstring, limit);
};

export const update = (id: string, properties: InputUser): Promise<number> => {
  return usersRepository.updateInPostgreDB(id, properties);
};

export const remove = (id: string): Promise<User | null> => {
  return usersRepository.deleteInPostgreDB(id);
};
