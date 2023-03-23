const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const user = require("../../model/user");
// const User = require("../user/user.model");
const userService = require("../user/user.service");

async function getUserWithToken(email, password) {
  if (await userService.checkUserPassword(email, password)) {
    return await userService.createJwtToken(email);
  }
}

module.exports = {
  getUserWithToken,
};
