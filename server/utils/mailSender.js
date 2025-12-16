const nodemailer = require("nodemailer");
require("dotenv").config();


const mailSender = async (email, title, body) => {
  try {
    console.log("📧 Attempting to send email to:", email);
    console.log("Email config:", {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS,
      from: process.env.EMAIL
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // since we're using Gmail's App Password
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
      },
    });

    const mailOptions = {
      from: `"Hostel Maintenance System" <${process.env.EMAIL}>`, 
      to: email,
      subject: title,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("Full error:", error);
    throw error; // Re-throw so caller knows it failed
  }
};

module.exports = mailSender;
