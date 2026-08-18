import nodemailer from "nodemailer";
import { getVerificationEmailTemplate } from "./email-templates";

const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

export const sendVerificationEmail = async ({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}): Promise<void> => {
  const transporter = createTransporter();
  const { subject, html, text } = getVerificationEmailTemplate(url, name);

  if (transporter) {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"My Blog App" <noreply@blogapp.com>',
      to,
      subject,
      text,
      html,
    });
    console.log(`✉️ Verification email sent to ${to}`);
  } else {
    // Development fallback logger
    console.log("\n=======================================================");
    console.log(`✉️  [DEV EMAIL VERIFICATION] To: ${to}`);
    console.log(`🔗  Verification URL: ${url}`);
    console.log("=======================================================\n");
  }
};
