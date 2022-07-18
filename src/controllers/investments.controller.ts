import { Request, Response, Router } from 'express';
import investmentsService from '../services/investments.service';


const investmentController = Router();

investmentController
  .post('/comprar', async (req: Request, res: Response): Promise<Response> => {
    const investment = await investmentsService.newInvestment(req.body);
    return res.status(201).json(investment);
  });

export default investmentController;