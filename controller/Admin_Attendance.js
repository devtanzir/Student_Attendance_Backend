import { enableAttendance, runningStatus } from "../service/adminAttendance.js";
import error from "../utils/error.js";
import { addMinutes, isAfter } from "date-fns";

const getEnable = async (_req, res, next) => {
  try {
    const isRunning = await runningStatus();
    if (isRunning) {
      throw error("Already Running", 400);
    }
    const getAttendance = await enableAttendance();
    return res.status(201).json({ message: "Success", getAttendance });
  } catch (e) {
    next(e);
  }
};
const getStatus = async (_req, res, next) => {
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
const getDisable = async (_req, res, next) => {
  try {
    const isRunning = await runningStatus();
    if (!isRunning) {
      throw error("Not Running", 400);
    }
    isRunning.status = "COMPLETED";
    await isRunning.save();

    return res.status(200).json(isRunning);
  } catch (e) {
    next(e);
  }
};

export { getEnable, getDisable, getStatus };
