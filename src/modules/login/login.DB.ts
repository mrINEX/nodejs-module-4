import { User } from '../users/user.model';

export const getByLoginDB = async (login: string): Promise<User | null> => {
  try {
    const user = await User.findOne({ login });
    return user;
  } catch (err) {
    return null;
  }
};
