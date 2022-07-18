import { Router } from "express";
import investmentController from "./controllers/investments.controller";

const router = Router();

router.use('/investimentos', investmentController);

export default router;