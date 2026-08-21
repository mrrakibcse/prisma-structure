import nodemailer from "nodemailer";
import { config } from "../../config";
import { getVerificationEmailTemplate } from "./email-templates";

type EmailParams = {
  to: string;
  name: string;
  url: string;
};

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendVerificationEmail = async (params: EmailParams): Promise<void> => {
  const { to, name, url } = params;

  try {
    const { subject, html, text } = getVerificationEmailTemplate(url, name);

    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject,
      text,
      html,
    });

    console.log(`✉️ Verification email sent successfully to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};


