import jwt from 'jsonwebtoken';
import config from '../../config';
import { getByLoginAndPasswordDB } from './login.DB';

export async function login(username: string, password: string): Promise<string | null> {
  const user = await getByLoginAndPasswordDB(username, password);

  if (user) {
    const token = jwt.sign({ login: user.login, id: user.id }, config.JWT_SECRET_KEY, { expiresIn: '1m' });
    return token;
  } else {
    return null;
  }
}
