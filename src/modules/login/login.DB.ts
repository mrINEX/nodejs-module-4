import { User } from '../users/user.model';

export const getByLoginAndPasswordDB = async (login: string, password: string): Promise<User | null> => {
  try {
    const user = await User.findOneOrFail({ login, password });
    return user;
  } catch (err) {
    return null;
  }
};
