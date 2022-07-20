import { Request, Response, Router } from "express";
import clientService from "../services/client.service";

const accountController = Router();

accountController.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const codeClient = parseInt(req.params.id);
  const clients = await clientService.getByCodeClient(codeClient);

  return res.status(200).json(clients);
})

export default accountController;