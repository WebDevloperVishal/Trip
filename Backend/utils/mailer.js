
import nodemailer from "nodemailer";

export const sendResetEmail = async (email, resetLink) => {
  try {
    console.log("Attempting to send reset email...");
    console.log("SMTP user:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP connection successful.");

    const html = `
      <h2>VitalTrip Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
    `;

    await transporter.sendMail({
      from: `"VitalTrip Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your VitalTrip password",
      html,
    });

    console.log(`Reset email sent to ${email}`);
  } catch (err) {
    console.error("Error sending reset email:", err);
    throw new Error("Email could not be sent");
  }
};
