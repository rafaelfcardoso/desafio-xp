import { Request, Response, Router } from 'express';
import investmentsService from '../services/investments.service';


const investmentController = Router();

investmentController
  .post('/', async (req: Request, res: Response): Promise<Response> => {
    const investment = await investmentsService.newInvestment(req.body);
    return res.status(201).json(investment);
  });

export default investmentController;