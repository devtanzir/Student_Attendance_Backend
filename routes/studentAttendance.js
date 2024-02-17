import { Router } from "express";
import {
  getAttendance,
  getAttendanceStatus,
} from "../controller/Student_Attendance.js";

const router = Router();

router.get("/status", getAttendanceStatus);
router.get("/:id", getAttendance);

export default router;
