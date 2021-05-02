// import { getConnection } from 'typeorm';
import { InputUser, User } from './user.model';

export const createInDB = async (properties: InputUser): Promise<User | null> => {
  const userExist = await User.findOne({ login: properties.login });
  if (userExist) return null;

  const user = new User();
  Object.assign(user, properties);
  return await user.save();
};

export const getByIdDB = async (id: string): Promise<User | null> => {
  try {
    return await User.findOne({ id });
  } catch (err) {
    return null;
  }
};

export const getByAllDB = async (loginSubstring: string | undefined, limit: number | undefined): Promise<User[]> => {
  if (!loginSubstring && !limit) {
    return await User.find();
  }
  return await User.getAutoSuggest(loginSubstring, limit);
};

export const updateInDB = async (id: string, properties: InputUser): Promise<number> => {
  const user = await User.update({ id }, properties);
  return user.affected;
};

export const deleteInDB = async (id: string): Promise<User | null> => {
  try {
    const user = await User.findOne({ id });

    return await user.softRemove();
  } catch (err) {
    return null;
  }
};
