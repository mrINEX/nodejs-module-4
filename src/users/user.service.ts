import * as usersRepository from './user.memory.repository';
import { OutputUser } from './user.model';

const create = (user: OutputUser): Promise<OutputUser> => {
  return usersRepository.createInMemory(user);
};

export { create };
