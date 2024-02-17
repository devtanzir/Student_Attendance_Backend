import { Schema, model } from "mongoose";

const adminAttendanceSchema = new Schema(
  {
    timeLimit: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["RUNNING", "COMPLETED"],
      default: "RUNNING",
    },
  },
  { timestamps: true }
);

export const adminAttendance = model("adminAttendance", adminAttendanceSchema);
