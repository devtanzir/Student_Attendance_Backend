import { User } from "../models/User.js";

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};

export { findUserByProperty, createNewUser };
