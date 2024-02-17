import Express from "express";
import { connectDb } from "./db.js";
import authenticate from "./middleware/authenticate.js";
import router from "./routes/index.js";

const app = Express();
app.use(Express.json());
app.use(router);

app.get("/private", authenticate, async (req, res) => {
  console.log("I am the user", req.user);
  return res.status(200).json({ message: "I am a privet route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
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

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});

connectDb("mongodb://localhost:27017/attendance-db").then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

const PORT = 5000;
