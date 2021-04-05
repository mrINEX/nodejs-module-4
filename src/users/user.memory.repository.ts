import { OutputUser, InputUser } from './user.model';
import getAutoSuggestUsers from '../utils/getAutoSuggestUsers';

const memoryUsers: OutputUser[] = [];

const createInMemory = async (user: OutputUser): Promise<OutputUser> => {
  memoryUsers.push(user);
  return getFromMemory(user.id);
}

const getFromMemory = async (id: string): Promise<OutputUser> => {
  const [ user ] = memoryUsers.filter((user) => user.id === id && !user.isDeleted);
  return user;
}

const getAllFromMemory = async (loginSubstring = '', limit: number = memoryUsers.length): Promise<OutputUser[]> => {
  return getAutoSuggestUsers(memoryUsers, loginSubstring, limit);
}

const updateInMemory = async (id: string, property: InputUser): Promise<boolean> => {
  let isUpdated = false;
  memoryUsers.forEach((user) => {
    if (id === user.id && !user.isDeleted) {
      Object.assign(user, property);
      isUpdated = !isUpdated;
    }
  });
  return isUpdated;
}

const softDeleteInMemory = async (id: string): Promise<boolean> => {
  let isSoftDeleted = false;
  memoryUsers.forEach((user) => {
    if (id === user.id && !user.isDeleted) {
      Object.assign(user, { isDeleted: true });
      isSoftDeleted = !isSoftDeleted;
    }
  });
  return isSoftDeleted;
}

export { createInMemory, getFromMemory, getAllFromMemory, updateInMemory, softDeleteInMemory };
