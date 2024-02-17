import { Schema, model } from "mongoose";

const studentAttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "adminAttendance",
      required: true,
    },
  },
  { timestamps: true }
);

export const studentAttendance = model(
  "studentAttendance",
  studentAttendanceSchema
);
