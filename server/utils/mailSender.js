const { Resend } = require("resend");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("📧 Attempting to send email to:", email);
    console.log(
      "API Key:",
      process.env.RESEND_API_KEY
        ? "Set (length: " + process.env.RESEND_API_KEY.length + ")"
        : "NOT SET"
    );

    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "Resend API key not configured. Please set RESEND_API_KEY environment variable."
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Hostel Maintenance System <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw new Error(
        `Email send failed: ${error.message || JSON.stringify(error)}`
      );
    }

    console.log("✅ Email sent successfully. Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

module.exports = mailSender;
