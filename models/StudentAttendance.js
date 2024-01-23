import { Schema, model } from "mongoose";

const studentAttendanceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "adminAttendance",
  },
});

const studentAttendance = model("studentAttendance", studentAttendanceSchema);

module.exports = studentAttendance;
