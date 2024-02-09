import Jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export default async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    token = token.split(" ")[1];
    const decoded = Jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid token" });
  }
}
