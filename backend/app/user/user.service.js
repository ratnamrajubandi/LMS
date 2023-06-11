const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../../utils");
const crypto = require("crypto");

async function getUserByEmail(email) {
  return await User.findOne({ email }).populate("purchasedCourses");
}

async function getUserById(id) {
  return await User.findById(id).populate("purchasedCourses");
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
  console.log("user in createjwttoken: ", user);
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

/////////
async function sendEmailVerificationLink(email) {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10);
  const hashedVerificationToken = await bcrypt.hash(verificationToken, salt);
  const oldUser = await getUserByEmail(email);

  await User.updateOne(
    { email },
    { emailVerificationLink: hashedVerificationToken }
  );
  const verificationLink = `http://localhost:3000/emailverification?token=${verificationToken}&user=${oldUser.id}`;
  const emailBody = `
        <html>
        <head> </head>
        <body>
          <p>
            Please click <a href="${verificationLink}">here</a> to verify your Email. If this doesn't
            work, please copy paste the following link in your browser.
          </p>
      
          <p>${verificationLink}</p>
        </body>
      </html>
        `;

  utils.sendEmail(
    "ratnamraju22@gmail.com",
    "Verify Your Email Link",
    emailBody
  );
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
  return bcrypt.compare(token, user.resettoken);
}

async function updateVerifiedEmail(id) {
  return await User.updateOne(
    {
      _id: id,
    },
    {
      verifiedEmail: true,
      emailVerificationLink: "",
    }
  );
}

async function validateVerficationToken(id, token) {
  const user = await getUserById(id);
  console.log("user: ", user);
  return  bcrypt.compare(token, user.emailVerificationLink);
}

async function toggleUserRoleByEmail(email) {
  const user = await User.findOne({ email });
  let roleToBeUpdated = "user";
  if (user.role === "user") {
    roleToBeUpdated = "admin";
  }
  await User.updateOne({ email }, { role: roleToBeUpdated });
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
  toggleUserRoleByEmail,
  validateVerficationToken,
  sendEmailVerificationLink,
  updateVerifiedEmail,
};
