import { OutputUser, InputUser, User } from './user.model';
import getAutoSuggestUsers from '../utils/getAutoSuggestUsers';
import Joi from 'joi';

const schemaInputUser = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
  age: Joi.number().min(3).max(130).required(),
});

const memoryUsers: OutputUser[] = [];

const createInMemory = async (properties: InputUser): Promise<{ isCreated: boolean, message?: string}> => {
  try {
    const value = await schemaInputUser.validateAsync(properties);
    memoryUsers.push(new User(value));
    return { isCreated: true };
  } catch (err) {
    const [details] = err.details;
    return { isCreated: false, message: details.message };
  }
};

const getFromMemory = async (id: string): Promise<OutputUser | undefined> => {
  const [isUser] = memoryUsers.filter((user) => user.id === id && !user.isDeleted);
  return isUser;
};

const getAllFromMemory = async (loginSubstring = '', limit: number = memoryUsers.length): Promise<OutputUser[]> => {
  return getAutoSuggestUsers(memoryUsers, loginSubstring, limit);
};

const updateInMemory = async (id: string, properties: InputUser): Promise<{ isUpdated: boolean, message?: string}> => {
  try {
    const validatedProperties = await schemaInputUser.validateAsync(properties);

    let isUpdated = false;
    memoryUsers.forEach((user) => {
      if (id === user.id && !user.isDeleted) {
        Object.assign(user, validatedProperties);
        isUpdated = !isUpdated;
      }
    });
    return { isUpdated };
  } catch(err) {
    const [details] = err.details;
    return { isUpdated: false, message: details.message };
  }
};

const softDeleteInMemory = async (id: string): Promise<boolean> => {
  let isSoftDeleted = false;
  memoryUsers.forEach((user) => {
    if (id === user.id && !user.isDeleted) {
      Object.assign(user, { isDeleted: true });
      isSoftDeleted = !isSoftDeleted;
    }
  });
  return isSoftDeleted;
};

export { createInMemory, getFromMemory, getAllFromMemory, updateInMemory, softDeleteInMemory };
