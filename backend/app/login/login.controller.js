const login = require("./login.service");
async function create(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await login.getUserWithToken(email, password);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("An unexpected error has occured");
  }
}

module.exports = {
  create,
};
