import { Router } from "express";
import { loginController, resisterController } from "../controller/auth.js";

const router = Router();

router.post("/resister", resisterController);
router.post("/login", loginController);

export default router;
