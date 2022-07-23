import { Request, Response, Router } from 'express';
// import httpErrorMiddleware from '../middleware/error.middleware';
import { StatusCodes } from 'http-status-codes';
import assetService from '../services/asset.service';
import investmentsService from '../services/investments.service';


const investmentController = Router();

investmentController
  .post('/comprar', async (req: Request, res: Response): Promise<Response> => {
    const order = req.body;

    const brokerAsset = await assetService.getByCodeAsset(order.codAtivo);

    if (brokerAsset.qtdeAtivo < order.qtdeAtivo) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Quantidade indisponível na Corretora!' });
    }

    const investment = await investmentsService.newBuyOrder(order);

    return res.status(StatusCodes.CREATED).json(investment);
});

investmentController
  .post('/vender', (async (req: Request, res: Response): Promise<Response> => {
    const order = req.body;
    
    const investment = await investmentsService.newSellOrder(order);

    if (investment.message) {
      console.log(investment.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: investment.message});
    } else {
      return res.status(StatusCodes.CREATED).json(investment);
    }
}));

export default investmentController;