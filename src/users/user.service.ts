import * as usersRepository from './user.postgreDB.repository';
import { OutputUser, InputUser } from './user.model';

export const create = (properties: InputUser): Promise<OutputUser> => {
  return usersRepository.createInPostgreDB(properties);
};

export const get = (id: string): Promise<OutputUser | undefined> => {
  return usersRepository.getByIdPostgreDB(id);
};

export const getAll = (loginSubstring: string, limit: number): Promise<OutputUser[]> => {
  return usersRepository.getByAllPostgreDB(loginSubstring, limit);
};

// const update = (id: string, properties: InputUser): Promise<{ isUpdated: boolean; message?: Array<string> }> => {
//   return usersRepository.updateInMemory(id, properties);
// };

// const remove = (id: string): Promise<boolean> => {
//   return usersRepository.softDeleteInMemory(id);
// };
