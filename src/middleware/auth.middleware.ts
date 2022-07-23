import { NextFunction, Request, Response } from 'express';
import { authenticateToken } from '../utils/jwt';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found' });

  try {
    const user = authenticateToken(token);
    res.locals.user = user;
  } catch (error) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: 'Invalid token' });
  }

  return next();
};