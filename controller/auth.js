import { resisterService, loginService } from "../service/auth.js";

export const resisterController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validation

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    const user = await resisterService({ name, email, password });

    return res.status(200).json({ message: "user Created Successfully", user });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });

    return res.status(200).json({ message: "login successful", token });
  } catch (error) {
    next(error);
  }
};
