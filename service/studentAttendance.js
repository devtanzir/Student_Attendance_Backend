import { adminAttendance } from "../models/AdminAttendance.js";

const studentFindById = (id) => {
  return adminAttendance.findById(id);
};

export { studentFindById };
