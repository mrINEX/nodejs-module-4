import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';

export function checkToken(req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers;

  if (authorization) {
    const [, token] = authorization.split(' ');

    jwt.verify(token, config.JWT_SECRET_KEY, function (err) {
      if (err) {
        res.status(403).json({ message: 'Failed to authenticate token.' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
}
