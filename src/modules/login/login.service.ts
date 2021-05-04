import jwt from 'jsonwebtoken';
import config from '../../config';
import { getByLoginDB } from './login.DB';

export async function login(username: string, password: string): Promise<string | null> {
  const user = await getByLoginDB(username);

  if (!user) {
    return null;
  }

  if (user.login === username && user.password === password) {
    const token = jwt.sign({ login: username, id: user.id }, config.JWT_SECRET_KEY, { expiresIn: '1m' });
    return token;
  } else {
    return null;
  }
}
