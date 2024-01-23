import { Schema, model } from "mongoose";

const adminAttendanceSchema = new Schema({
  timeLimit: Number,
  status: String,
  createdAt: Date,
});

const adminAttendance = model("adminAttendance", adminAttendanceSchema);

module.exports = adminAttendance;
