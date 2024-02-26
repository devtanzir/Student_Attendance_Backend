import { studentAttendance } from "../models/StudentAttendance.js";
import { studentFindById } from "../service/studentAttendance.js";
import { runningStatus } from "../service/adminAttendance.js";
import error from "../utils/error.js";
import { addMinutes, isAfter } from "date-fns";

const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendance = await studentFindById(id);
    if (!adminAttendance) {
      throw error("Invalid Attendance ", 400);
    }
    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance Already Completed");
    }
    let attendance = await studentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });

    if (attendance) {
      throw error("Already Register", 400);
    }

    attendance = new studentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};
const getAttendanceStatus = async (_req, res, next) => {
  try {
    const isRunning = await runningStatus();
    if (!isRunning) {
      throw error("Not Running", 400);
    }
    const started = addMinutes(
      new Date(isRunning.createdAt),
      isRunning.timeLimit
    );
    if (isAfter(new Date(), started)) {
      isRunning.status = "COMPLETED";
      await isRunning.save();
    }

    return res.status(200).json(isRunning);
  } catch (e) {
    next(e);
  }
};

export { getAttendance, getAttendanceStatus };
