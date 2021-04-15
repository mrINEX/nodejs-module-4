import { InputUser, User } from './user.model';

export const createInPostgreDB = async (properties: InputUser): Promise<User> => {
  const user = new User();
  Object.assign(user, properties);
  return await user.save();
};

export const getByIdPostgreDB = async (id: string): Promise<User | null> => {
  try {
    return await User.findOne({ id });
  } catch(err) {
    return null;
  }
};

export const getByAllPostgreDB = async (
  loginSubstring: string | undefined,
  limit: number | undefined
): Promise<User[]> => {
  if (!loginSubstring && !limit) {
    return await User.find();
  }
  return await User.getAutoSuggest(loginSubstring, limit);
};

export const updateInPostgreDB = async (
  id: string,
  properties: InputUser
): Promise<number>  => {
  const user = await User.update({ id }, properties);
  return user.affected;
};

export const deleteInPostgreDB = async (id: string): Promise<User | null> => {
  try {
    const user = await User.findOne({ id });
    return await User.softRemove(user);
  } catch(err) {
    return null;
  }
};
