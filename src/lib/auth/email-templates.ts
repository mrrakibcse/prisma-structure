export const getVerificationEmailTemplate = (url: string, name: string): { subject: string; html: string; text: string } => {
  const subject = "Verify your email address";
  const text = `Hello ${name || "User"},\n\nPlease verify your email address by clicking the link below:\n${url}\n\nThank you!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
          .container { max-width: 550px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
          .header { font-size: 22px; font-weight: bold; color: #333333; margin-bottom: 20px; text-align: center; }
          .content { font-size: 15px; color: #555555; line-height: 1.6; margin-bottom: 25px; }
          .btn-container { text-align: center; margin: 30px 0; }
          .btn { background-color: #2563eb; color: #ffffff !important; padding: 12px 28px; text-decoration: none; font-weight: 600; border-radius: 6px; display: inline-block; }
          .footer { font-size: 12px; color: #999999; text-align: center; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 15px; }
          .link-box { word-break: break-all; color: #2563eb; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Confirm Your Email Address</div>
          <div class="content">
            <p>Hello ${name || "there"},</p>
            <p>Thank you for registering! Please click the button below to verify your email address and activate your account.</p>
          </div>
          <div class="btn-container">
            <a href="${url}" class="btn" target="_blank">Verify Email Address</a>
          </div>
          <div class="content">
            <p>If the button above does not work, copy and paste this link into your browser:</p>
            <p class="link-box"><a href="${url}">${url}</a></p>
          </div>
          <div class="footer">
            If you did not request this email, please ignore it.
          </div>
        </div>
      </body>
    </html>
  `;

  return { subject, html, text };
};
