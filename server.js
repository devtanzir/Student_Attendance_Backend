// const Express = require("express");

// const app = Express();

// app.listen(4000, () => {
//   console.log("i am lis");
// });

import Express from "express";

const app = Express();

app.get("/", (_, res) => {
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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
