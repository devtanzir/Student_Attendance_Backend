import { User } from "../models/User.js";
import error from "../utils/error.js";

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("email is already in use");
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

export { findUserByProperty, createNewUser, findUsers, updateUser };
