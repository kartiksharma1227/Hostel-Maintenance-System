const { Resend } = require("resend");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("📧 Attempting to send email to:", email);

    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "Resend API key not configured. Please set RESEND_API_KEY environment variable."
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: "Hostel Maintenance System <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", data.id);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

module.exports = mailSender;
