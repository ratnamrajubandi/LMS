require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// importing user context
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); //Newly added
const app = express();
app.use(cors()); // Newly added

app.use(express.json({ limit: "50mb" }));

//==========================================================================================================================
// Register
app.post("/signup", async (req, res) => {
  // register logic starts here
  try {
    // Get user input

    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const salt = await bcrypt.genSalt(10);

    encryptedUserPassword = await bcrypt.hash(password, salt);

    // Create user in our database
    const user = await User.create({
      email: email.toLowerCase(), // sanitize
      email: email,
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {}
  //register logic ends here
});
//==========================================================================================================
// Login
app.post("/login", async (req, res) => {
  //login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    //=============
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    //=============
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    //==================
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    //==========================
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome Home");
});

module.exports = app;
