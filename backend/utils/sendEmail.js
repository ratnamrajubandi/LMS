const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  console.log("user, pass: ");
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_TOKEN,
      },
    });

    await transporter.sendMail({
      from: "ratnamfullstack1@gmail.com",
      to: email,
      subject: subject,
      html: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
