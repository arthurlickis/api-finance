import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.post("/", UserController.store);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;