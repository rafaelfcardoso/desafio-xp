import { Request, Response, Router } from 'express';
import investmentsService from '../services/investments.service';


const investmentController = Router();

investmentController
  .post('/comprar', async (req: Request, res: Response): Promise<Response> => {
    const order = req.body;
    
    const investment = await investmentsService.newBuyOrder(order);

    return res.status(201).json(investment);
});

export default investmentController;