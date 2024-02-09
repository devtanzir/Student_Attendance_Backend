import { Router } from "express";
import authRoute from "./auth.js";

export const router = Router();

router.use("/api/v1/auth", authRoute);

export default router;
