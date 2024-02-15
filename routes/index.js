import { Router } from "express";
import authRoute from "./auth.js";
import userRoute from "./users.js";
import authenticate from "../middleware/authenticate.js";

export const router = Router();

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);

export default router;
