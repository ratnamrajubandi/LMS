const userService = require("./user.service");

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await userService.getUserByEmail(email);

    if (!oldUser) {
      return res.status(404).send("Email is not registered");
    }

    await userService.sendPasswordResetLink(email);

    return res.status(200).send("Reset link sent successfully");
  } catch (err) {
    return res
      .status(500)
      .send("Error in reseting your password. Please try later");
  }
}

async function resetPassword(req, res) {
  const { id, token, password } = req.body;

  if (!token || !id) {
    return res.status(400).send("Invalid token or id");
  }

  if (!password) {
    return res.status(400).send("Invalid password");
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (!user.resettoken) {
    return res.status(400).send("Token not found");
  }

  if (await userService.checkUserPassword(user.email, password)) {
    return res
      .status(400)
      .send("New Password Cannot Be Same As The Old Password");
  }

  if (!(await userService.validateResetToken(id, token))) {
    return res.status(400).send("Invalid token");
  }

  await userService.resetPassword(id, password);
  return res.status(200).send("successfully reset password");
}

async function toggleUserRole(req, res) {
  console.log("body in toggle user role: ", req.body);
  if (req.body.userId) {
    await userService.toggleUserRoleByEmail(req.body.userId);
  }

  return res.status(200).json({ data: "success" });
}

module.exports = {
  forgotPassword,
  resetPassword,
  toggleUserRole,
};
