import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js";
import SummaryController from "../controllers/SummaryController.js";

const router = new Router();

router.get("/", loginRequired, SummaryController.index);

export default router;