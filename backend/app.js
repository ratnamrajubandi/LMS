require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const loginRouter = require("./app/login/login.routes");
const signupRouter = require("./app/signup/signup.routes");
const userRouter = require("./app/user/user.routes");
// importing user context
const User = require("./app/user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); //Newly added
const app = express();
app.use(cors()); // Newly added

app.use(express.json({ limit: "50mb" }));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);

//==========================================================================================================================
// Register
// app.post("/signup", async (req, res) => {
//   // register logic starts here
//   try {
//     // Get user input

//     const { email, password } = req.body;

//     // Validate user input
//     if (!(email && password)) {
//       return res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     const salt = await bcrypt.genSalt(10);

//     encryptedUserPassword = await bcrypt.hash(password, salt);

//     // Create user in our database
//     const user = await User.create({
//       email: email.toLowerCase(), // sanitize
//       email: email,
//       password: encryptedUserPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "5h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {}
//   //register logic ends here
// });
//==========================================================================================================
// Login
// app.post("/login", async (req, res) => {
//   //login logic starts here
//   try {
//     // Get user input
//     const { email, password } = req.body;

//     //=============
//     // Validate user input
//     if (!(email && password)) {
//       return res.status(400).send("All input is required");
//     }
//     //=============
//     // Validate if user exist in our database
//     const user = await User.findOne({ email });

//     //==================
//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Create token
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "5h",
//         }
//       );

//       // save user token
//       user.token = token;

//       // user
//       return res.status(200).json(user);
//     }
//     //==========================
//     return res.status(400).send("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   }
//   // Our login logic ends here
// });

const auth = require("./middleware/auth");
// const sendEmail = require("./utils/sendEmail");
// const { application } = require("express");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome Home");
});

//==========================================================================================================
// Forgot Password

// app.post("/forgotpassword", async (req, res) => {
//   // forgot password logic starts here
//   try {
//     // Get user input

//     const { email } = req.body;

//     console.log("req.body: ", req.body);

//     // Validate user input
//     if (!email) {
//       return res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });

//     if (!oldUser) {
//       return res.status(404).send("Email is not registered");
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const salt = await bcrypt.genSalt(10);
//     const hashedResetToken = await bcrypt.hash(resetToken, salt);

//     await User.updateOne({ email }, { resettoken: hashedResetToken });
//     const resetLink = `http://localhost:3000/resetpassword?token=${resetToken}&user=${oldUser.id}`;
//     const emailBody = `
//     <html>
//     <head> </head>
//     <body>
//       <p>
//         Please click <a href="${resetLink}">here</a> to reset your password. If this doesn't
//         work, please copy paste the following link in your browser.
//       </p>

//       <p>${resetLink}</p>
//     </body>
//   </html>
//     `;
//     sendEmail("ratnamraju22@gmail.com", "Reset Password Link", emailBody);
//     console.log("reset link: ", resetLink);

//     return res.status(200).send("Reset link sent successfully");
//   } catch (err) {}
//   //forgot password logic ends here
// });
//==========================================================================================================

// app.post("/resetpassword", async (req, res) => {
//   const { id, token, password } = req.body;

//   if (!token || !id) {
//     return res.status(400).send("Invalid token or id");
//   }

//   if (!password) {
//     return res.status(400).send("Invalid password");
//   }

//   const user = await User.findById(id);

//   if (!user) {
//     return res.status(400).send("User not found");
//   }

//   if (!user.resettoken) {
//     return res.status(400).send("Token not found");
//   }

//   const isTokenSame = await bcrypt.compare(token, user.resettoken);

//   if (!isTokenSame) {
//     return res.status(400).send("Invalid token");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   await User.updateOne(
//     {
//       _id: id,
//     },
//     {
//       password: hashedPassword,
//       resettoken: "",
//     }
//   );
//   return res.status(200).send("successfully reset password");
// });
module.exports = app;
