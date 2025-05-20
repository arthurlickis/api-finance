import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js";
import TransactionController from "../controllers/TransactionController.js"

const router = new Router();

router.post("/", loginRequired, TransactionController.store);
router.get("/", loginRequired, TransactionController.index);
router.get("/:id", loginRequired, TransactionController.show);
router.put("/:id", loginRequired, TransactionController.update);
router.delete("/:id", loginRequired, TransactionController.delete);

export default router;