const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../../utils");
const crypto = require("crypto");

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUserById(id) {
  return await User.findById(id);
}

async function checkUserPassword(email, password) {
  const user = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  return await bcrypt.compare(password, user.password);
}

async function createJwtToken(email) {
  const user = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  // Create token
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "5h",
  });

  user.token = token;
  return user;
}

async function createUser(email, password) {
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
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "5h",
  });
  // save user token
  user.token = token;
  return user;
}

async function sendPasswordResetLink(email) {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10);
  const hashedResetToken = await bcrypt.hash(resetToken, salt);
  const oldUser = await getUserByEmail(email);
  

  await User.updateOne({ email }, { resettoken: hashedResetToken });
  const resetLink = `http://localhost:3000/resetpassword?token=${resetToken}&user=${oldUser.id}`;
  const emailBody = `
        <html>
        <head> </head>
        <body>
          <p>
            Please click <a href="${resetLink}">here</a> to reset your password. If this doesn't
            work, please copy paste the following link in your browser.
          </p>
      
          <p>${resetLink}</p>
        </body>
      </html>
        `;
  utils.sendEmail("ratnamraju22@gmail.com", "Reset Password Link", emailBody);
}

async function resetPassword(id, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.updateOne(
    {
      _id: id,
    },
    {
      password: hashedPassword,
      resettoken: "",
    }
  );
}

async function validateResetToken(id, token) {
  const user = await getUserById(id);
  return await bcrypt.compare(token, user.resettoken);
}

module.exports = {
  getUserByEmail,
  getUserById,
  checkUserPassword,
  createJwtToken,
  createUser,
  sendPasswordResetLink,
  resetPassword,
  validateResetToken,
};
