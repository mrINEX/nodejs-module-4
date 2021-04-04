import { OutputUser, InputUser } from './user.model';
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

const getAllFromMemory = async (loginSubstring = '', limit: number = memoryUsers.length): Promise<OutputUser[]> => {
  return getAutoSuggestUsers(memoryUsers, loginSubstring, limit);
}

const updateInMemory = async (id: string, property: InputUser): Promise<OutputUser> => {
  memoryUsers.forEach((userInMemory) => {
    if (id === userInMemory.id) {
      Object.assign(userInMemory, property);
    }
  });
  return getFromMemory(id);
}

const softDeleteInMemory = async (id: string): Promise<boolean> => {
  let isSoftDeleted = false;
  memoryUsers.forEach((userInMemory) => {
    if (id === userInMemory.id) {
      Object.assign(userInMemory, { isDeleted: true });
      isSoftDeleted = userInMemory.isDeleted;
    }
  });
  return isSoftDeleted;
}

export { createInMemory, getFromMemory, getAllFromMemory, updateInMemory, softDeleteInMemory };
