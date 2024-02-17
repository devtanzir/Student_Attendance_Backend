import { Router } from "express";
import {
  getDisable,
  getEnable,
  getStatus,
} from "../controller/Admin_Attendance.js";

const router = Router();

router.get("/enable", getEnable);
router.get("/disable", getDisable);
router.get("/status", getStatus);

export default router;
