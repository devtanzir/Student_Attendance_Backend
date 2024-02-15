import { Router } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  patchUserById,
  postUser,
  putUserById,
} from "../controller/user.js";

export const router = Router();

/**
 * Get user by id
 * @method GET
 */
router.get("/:userId", getUserById);
/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", patchUserById);
/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", putUserById);
/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", deleteUserById);

/**
 * get all users, include
 * filter
 * sort
 * pagination
 * select properties
 * @route /api/users?sort= ['by','name']
 * @method GET
 * @visibility Private
 */

router.get("/", getUsers);

/**
 * Create users
 * @method POST
 */
router.post("/", postUser);

export default router;
