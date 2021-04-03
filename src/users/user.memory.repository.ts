import { OutputUser } from './user.model';

const memoryUsers: OutputUser[] = [];

const createInMemory = async (user: OutputUser): Promise<OutputUser> => {
  memoryUsers.push(user);
  return getFromMemory(user.id);
}

const getFromMemory = async (id: string): Promise<OutputUser> => {
  const [ user ] = memoryUsers.filter((user) => user.id === id);
  return user;
}

export { createInMemory, getFromMemory };
