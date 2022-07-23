import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import HttpException from '../shared/http.exception';
import IPayload from '../interfaces/payload.interface';
import { StatusCodes } from 'http-status-codes';

const TOKEN_SECRET = process.env.TOKEN_SECRET || ('secret' as string);

const jwtConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};
const generateJWTToken = (payload: IPayload) => 
  sign({ payload }, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  if (!token) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'jwt malformed');
  }

  try {
    const validate = verify(token, TOKEN_SECRET);
    return validate;
  } catch (error) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'jwt malformed');
  }
};

export { generateJWTToken, authenticateToken };