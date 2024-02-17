import { adminAttendance } from "../models/AdminAttendance.js";

const enableAttendance = () => {
  const attendance = new adminAttendance();

  return attendance.save();
};

const runningStatus = () => {
  return adminAttendance.findOne({ status: "RUNNING" });
};

export { enableAttendance, runningStatus };
