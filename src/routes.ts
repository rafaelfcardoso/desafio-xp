import { Router } from "express";
import accountController from "./controllers/client.controller";
import investmentController from "./controllers/investments.controller";

const router = Router();

router.use('/investimentos', investmentController);
router.use('/conta', accountController);

export default router;