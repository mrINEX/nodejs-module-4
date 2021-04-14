import { OutputUser, InputUser, User } from './user.model';

export const createInPostgreDB = async (properties: InputUser): Promise<OutputUser> => {
  const user = new User();
  Object.assign(user, properties);
  return await user.save();
};

export const getByIdPostgreDB = async (id: string): Promise<OutputUser | undefined> => {
  return await User.findOne({ id });
};

export const getByAllPostgreDB = async (
  loginSubstring = '',
  limit = 20
): Promise<OutputUser[]> => {
  return await User.getAutoSuggestUsers(loginSubstring, limit);
};

// export const updateInMemory = async (id: string, properties: InputUser)=> {};

// export const softDeleteInMemory = async (id: string) => {};
