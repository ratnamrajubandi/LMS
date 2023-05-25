const { getUserByEmail } = require("../user/user.service");
// const Courseorders = require("./courseorder.model");

async function courseorderByEmail(req, res) {
  try {
    const email = req.params.email;

    const user = await getUserByEmail(email);
    return res.json(user.purchasedCourses || []);

    // // Find items that match the email
    // const items = await Courseorders.find({ email });

    // res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  courseorderByEmail,
};
