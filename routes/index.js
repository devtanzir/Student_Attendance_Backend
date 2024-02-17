import { Router } from "express";
import authRoute from "./auth.js";
import userRoute from "./users.js";
import adminAttendance from "./adminAttendance.js";
import authenticate from "../middleware/authenticate.js";
import studentAttendances from "./studentAttendance.js";

export const router = Router();

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);
router.use("/api/v1/admin/attendance", authenticate, adminAttendance);
router.use("/api/v1/student/attendance", authenticate, studentAttendances);

export default router;
