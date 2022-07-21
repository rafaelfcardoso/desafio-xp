import { Request, Response, Router } from 'express';
import assetService from '../services/asset.service';
import investmentsService from '../services/investments.service';


const investmentController = Router();

investmentController
  .post('/comprar', async (req: Request, res: Response): Promise<Response> => {
    const order = req.body;

    const brokerAsset = await assetService.getByCodeAsset(order.codAtivo);

    if (brokerAsset.qtdeAtivo < order.qtdeAtivo) {
      return res.status(400).json({ message: 'Quantidade indisponível!' });
    }

    const investment = await investmentsService.newBuyOrder(order);

    return res.status(201).json(investment);
});

investmentController
  .post('/vender', async (req: Request, res: Response): Promise<Response> => {
    const order = req.body;
    
    const investment = await investmentsService.newSellOrder(order);

    return res.status(201).json(investment);
});

export default investmentController;