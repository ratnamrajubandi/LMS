const Payment = require("./paymentModel");
const UserOrder = require("../user/userOrderModel");
const User = require("../user/user.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../course/course.model");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZOYPAY_API_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.price * 100),
      currency: "INR",
      notes: {
        email: req.body.email,
        courseID: req.body.ordered_course,
        price: Number(req.body.price * 100),
      },
    };

    const order = await instance.orders.create(options);

    //////
    // UserOrder.create({
    //   razorpay_user_email: req.body.email,
    //   order_id: order.id,
    //   razorpay_courseName: req.body.ordered_course,
    //   status: order.status,
    //   price: req.body.price,
    // });
    ///////
    // order;

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).send(err);
  }
};
////////////////////////////////////////////////////////////////////////////
const paymentVerification = async (req, res) => {
  console.log("rq.body: ", JSON.stringify(req.body));
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    // razorpay_user_id,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOYPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // razorpay_user_id,
    });

    const order = await instance.orders.fetch(razorpay_order_id);
    const course = await Course.findOne({
      courseID: order?.notes?.courseID,
    });

    console.log("order?.notes.courseID: ", order.notes.courseID);
    console.log("course: ", course);
    console.log("order?.notes.email: ", order.notes.email);

    const user = await User.findOne({
      email: order?.notes?.email,
    });

    console.log("couser id: ", course._id);

    user.purchasedCourses.push(course._id);
    user.save();

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { checkout, paymentVerification };
