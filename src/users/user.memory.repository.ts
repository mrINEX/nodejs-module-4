import { OutputUser, InputUser, User } from './user.model';
import getAutoSuggestUsers from './utils/get-specific-users';
import { schemaInputUser, errorToResponse } from './utils/validate-schema';

const memoryUsers: OutputUser[] = [];

const createInMemory = async (
  properties: InputUser,
): Promise<{ isCreated: boolean; status?: number; message?: Array<string> }> => {
  try {
    const validatedProperties = await schemaInputUser.validateAsync(properties, { abortEarly: false });

    const existUser: OutputUser | undefined = memoryUsers.find((user: OutputUser) => {
      return user.login === validatedProperties.login;
    });
    if (existUser) {
      return {
        isCreated: false,
        status: 403,
        message: [`User with this [${validatedProperties.login}] login already exist`],
      };
    }

    const user = new User(validatedProperties);
    memoryUsers.push(user);
    return { isCreated: true };
  } catch (err) {
    return { isCreated: false, status: 400, message: errorToResponse(err.details) };
  }
};

const getFromMemory = async (id: string): Promise<OutputUser | undefined> => {
  const [isUser] = memoryUsers.filter((user) => user.id === id && !user.isDeleted);
  return isUser;
};

const getAllFromMemory = async (loginSubstring = '', limit: number = memoryUsers.length): Promise<OutputUser[]> => {
  return getAutoSuggestUsers(memoryUsers, loginSubstring, limit);
};

const updateInMemory = async (
  id: string,
  properties: InputUser,
): Promise<{ isUpdated: boolean; message?: Array<string> }> => {
  try {
    const validatedProperties = await schemaInputUser.validateAsync(properties, { abortEarly: false });

    let isUpdated = false;
    memoryUsers.forEach((user) => {
      if (id === user.id && !user.isDeleted) {
        Object.assign(user, validatedProperties);
        isUpdated = !isUpdated;
      }
    });
    return { isUpdated };
  } catch (err) {
    return { isUpdated: false, message: errorToResponse(err.details) };
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
