import { Request, Response, Router } from "express";
import clientService from "../services/client.service";
import transactionService from "../services/transaction.service";

const accountController = Router();

accountController.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const codeClient = parseInt(req.params.id);
  const clients = await clientService.getByCodeClient(codeClient);

  return res.status(200).json(clients);
})

accountController.post("/deposito", async (req: Request, res: Response): Promise<Response> => {
  const transaction = await transactionService.createDeposit(req.body);
  
  return res.status(201).json(transaction);
})

accountController.post("/saque", async (req: Request, res: Response): Promise<Response> => {
  const transaction = await transactionService.createWithdraw(req.body);

  return res.status(201).json(transaction);
})

export default accountController;