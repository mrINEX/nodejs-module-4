import { OutputUser } from './user.model';
import getAutoSuggestUsers from '../utils/getAutoSuggestUsers';

const memoryUsers: OutputUser[] = [];

const createInMemory = async (user: OutputUser): Promise<OutputUser> => {
  memoryUsers.push(user);
  return getFromMemory(user.id);
}

const getFromMemory = async (id: string): Promise<OutputUser> => {
  const [ user ] = memoryUsers.filter((user) => user.id === id);
  return user;
}

const getAllFromMemory = async (loginSubstring?: string, limit?: number): Promise<OutputUser[]> => {
  return getAutoSuggestUsers(memoryUsers, loginSubstring, limit);
}

export { createInMemory, getFromMemory, getAllFromMemory };
