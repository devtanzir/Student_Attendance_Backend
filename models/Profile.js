import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", ProfileSchema);

module.exports = Profile;
