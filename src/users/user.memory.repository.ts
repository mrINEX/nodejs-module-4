import { OutputUser } from './user.model';

const memoryUsers: OutputUser[] = [];

const createInMemory = async (user: OutputUser): Promise<OutputUser> => {
  memoryUsers.push(user);
  return user; // will remade on get method
}

export { createInMemory };
