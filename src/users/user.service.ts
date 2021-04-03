import * as usersRepository from './user.memory.repository';
import { OutputUser } from './user.model';

const create = (user: OutputUser): Promise<OutputUser> => {
  return usersRepository.createInMemory(user);
};

const get = (id: string): Promise<OutputUser> => {
  return usersRepository.getFromMemory(id);
}

export { create, get };
