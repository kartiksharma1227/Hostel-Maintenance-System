const nodemailer = require("nodemailer");
require("dotenv").config();


const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // since you're using Gmail's App Password
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
      },
    });

    const mailOptions = {
      from: `"Hostel Maintenance System" <${process.env.EMAIL}>`, // this is how to set the sender's display name
      to: email,
      subject: title,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = mailSender;
