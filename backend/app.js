require("dotenv").config();
require("./config/database").connect();
const User = require("./app/user/user.model");
const express = require("express");
const loginRouter = require("./app/login/login.routes");
const signupRouter = require("./app/signup/signup.routes");
const userRouter = require("./app/user/user.routes");
const courseRouter = require("./app/course/course.routes");
const paymentRouter = require("./app/payment/payment.routes");
const courseOrderRouter = require("./app/orders/courseorder.routes");
const toggleRouter = require("./app/roleToggle/toggleRoleRoute");

const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/api", paymentRouter);
app.use("/items", courseOrderRouter);

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome Home");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

////////////////
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "superadmin" } },
      { password: 0 }
    );

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
///////////////

app.use("/api", toggleRouter);

module.exports = app;
