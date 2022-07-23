// ./middlewares/books.middleware.ts
import { NextFunction, Request, Response } from 'express';
import ILogin from '../interfaces/login.interface';
import HttpException from '../shared/http.exception';
import { StatusCodes } from 'http-status-codes';

function validateUsername(username: string) {
  if (!username) {
    throw new HttpException(StatusCodes.BAD_REQUEST, '"username" is required');
  }

  if (typeof username !== 'string') {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Username or password invalid');
  }
}

function validatePassword(password: string) {
  if (!password) {
    throw new HttpException(StatusCodes.BAD_REQUEST, '"password" is required');
  }

  if (typeof password !== 'string') {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Username or password invalid');
  }
}

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body as ILogin;

  validateUsername(username);
  validatePassword(password);

  next();
}