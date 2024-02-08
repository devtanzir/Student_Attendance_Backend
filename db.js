import mongoose from "mongoose";

export function connectDb(connectionStr) {
  return mongoose.connect(connectionStr);
}
