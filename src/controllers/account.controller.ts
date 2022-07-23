import { Request, Response, Router } from "express";
import clientService from "../services/client.service";
import accountService from "../services/account.service";
import { StatusCodes } from "http-status-codes";

const accountController = Router();

accountController.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const codeClient = parseInt(req.params.id);
  const clients = await clientService.getByCodeClient(codeClient);

  return res.status(StatusCodes.OK).json(clients);
})

accountController.post("/deposito", async (req: Request, res: Response): Promise<Response> => {
  const transaction = await accountService.createDeposit(req.body);
  
  return res.status(StatusCodes.CREATED).json(transaction);
})

accountController.post("/saque", async (req: Request, res: Response): Promise<Response> => {
  const transaction = await accountService.createWithdraw(req.body);

  return res.status(StatusCodes.CREATED).json(transaction);
})

export default accountController;