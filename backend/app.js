require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const loginRouter = require("./app/login/login.routes");
const signupRouter = require("./app/signup/signup.routes");
const userRouter = require("./app/user/user.routes");
const courseRouter = require("./app/course/course.routes");

const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome Home");
});

module.exports = app;
