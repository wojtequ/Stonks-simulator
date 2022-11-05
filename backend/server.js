const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRegExp = /.{5,}/;
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

app.use(express.json());
app.use(cors());

//database connection
async function connect() {
  try {
    await mongoose.connect(process.env.uri);
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
}
connect();

app.post("/api/register", async (req, res) => {
  try {
    const isUserNameValid = await loginRegExp.test(req.body.userName);
    const isPasswordValid = await passwordRegExp.test(req.body.password);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    if (isPasswordValid && isUserNameValid) {
      const user = await User.create({
        userName: req.body.userName,
        password: newPassword,
      });
      const token = jwt.sign(
        {
          userName: user.userName,
        },
        process.env.jwtkey
      );
      res.json({ status: "ok", token: token });
    }
    if (!isUserNameValid) {
      res.status(400).json({ message: "wrong username" });
    }
    if (!isPasswordValid) {
      res.status(400).json({ message: "wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "user already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    userName: req.body.userName,
  });
  if (!user) {
    return res.json({ status: "error", error: "user not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        userName: user.userName,
      },
      process.env.jwtkey
    );

    return res.json({ status: "ok", token: token });
  } else {
    return res.json({ status: "error", error: "wrong password" });
  }
});

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
