import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (prop) => `Invalid email ${prop.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "PassWord is too Short it must be 6 character"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },
});

export const User = model("User", userSchema);
