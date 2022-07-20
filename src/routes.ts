import { Router } from "express";
import assetController from "./controllers/asset.controller";
import accountController from "./controllers/account.controller";
import investmentController from "./controllers/investments.controller";

const router = Router();

router.use('/investimentos', investmentController);
router.use('/conta', accountController);
router.use('/ativos', assetController);

export default router;