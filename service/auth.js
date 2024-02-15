import error from "../utils/error.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { findUserByProperty, createNewUser } from "./user.js";

const resisterService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("user already exist", 400);

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("invalid Credential", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw error("invalid Credential", 400);
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  delete user._doc.password;

  return Jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

export { resisterService, loginService };
