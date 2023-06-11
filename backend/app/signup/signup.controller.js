const userService = require("../user/user.service");

async function create(req, res) {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await userService.getUserByEmail(email);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await userService.createUser(email, password);
    await userService.sendEmailVerificationLink(email);
    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log("error in signing up: ", err);
    return res.status(500).status("Error in signing up. Please try again");
  }
}

module.exports = {
  create,
};
