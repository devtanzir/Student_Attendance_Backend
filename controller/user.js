import { resisterService } from "../service/auth.js";
import { findUserByProperty, findUsers, updateUser } from "../service/user.js";
import error from "../utils/error.js";

const getUsers = async (_req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  try {
    const users = await findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      throw error("User Not Found", 404);
    }
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await resisterService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};
const putUserById = async (req, res, next) => {
  const { userId } = req.params;

  const { name, roles, accountStatus, email } = req.body;

  try {
    const user = await updateUser(userId, {
      name,
      roles,
      accountStatus,
      email,
    });
    if (!user) {
      throw error("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const patchUserById = async (req, res, next) => {
  const { userId } = req.params;

  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;

    user.roles = roles ?? user.roles;

    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);


    if (!user) {
      throw error("User not Found", 404);
    }
    await user.deleteOne(user);
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
