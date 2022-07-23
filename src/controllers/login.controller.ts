import { Request, Response, Router } from 'express';
import validateLogin from '../middlewares/validateLogin.middleware';
import clientService from '../services/client.service';
import { generateJWTToken } from '../utils/jwt';
import { StatusCodes } from 'http-status-codes';

const loginController = Router();

loginController
  .post('/', validateLogin, async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const [user] = await clientService.getByUsername(username);

    if (!user || user.password !== password) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Username or password invalid' });
    }

    const token = generateJWTToken({ codCliente: user.codCliente, username: user.username });
    
    return res.status(200).json({ token });
  });

export default loginController;