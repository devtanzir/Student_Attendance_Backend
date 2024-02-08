import Express from "express";
import { User } from "./models/User.js";
import bcrypt from "bcrypt";
import { connectDb } from "./db.js";

const app = Express();
app.use(Express.json());

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(password, email);

    const user = await User.find({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, user._doc.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid Credential" });
    }

    delete user._doc.password;

    return res.status(200).json({ message: "login successful", user });
  } catch (error) {
    next(error);
  }
});

app.post("/resister", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid data" });
    }
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    user.password = hash;

    await user.save();

    return res.status(200).json({ message: "user Created Successfully", user });
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res) => {
  const obj = {
    name: "tanzir",
    email: "tanzir@example.com",
    post: 3711,
    address: {
      house: 15,
      road: "04",
      area: "rupnagar R/A",
    },
  };
  res.json(obj);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "server err " });
});

connectDb("mongodb://localhost:27017/attendance-db").then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

const PORT = 5000;
