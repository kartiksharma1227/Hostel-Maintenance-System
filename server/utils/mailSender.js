const brevo = require("@getbrevo/brevo");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("📧 Attempting to send email to:", email);

    if (!process.env.BREVO_API_KEY) {
      throw new Error(
        "Brevo API key not configured. Please set BREVO_API_KEY environment variable."
      );
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = {
      name: "Hostel Maintenance System",
      email: process.env.BREVO_SENDER_EMAIL || "noreply@example.com",
    };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = title;
    sendSmtpEmail.htmlContent = body;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully. Message ID:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

module.exports = mailSender;
