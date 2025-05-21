import nodemailer from 'nodemailer';

export default async function sendResetPasswordEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log("resetLink:",resetLink);

  const emailContent = HTML_TEMPLATE(resetLink);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: emailContent,
  };

  try {
    console.log("reset link sent:",resetLink);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error.message); 
    throw new Error('Failed to send email');
  }
}

const HTML_TEMPLATE = (resetLink) => `
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #333;">Password Reset Request</h1>
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. A link, expiring in 12 hours, has been generated. Click the button below to proceed:
      </p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">
        Reset Password
      </a>
      <p style="font-size: 12px; color: #777; margin-top: 20px;">
        If you did not request this, please ignore this email.
      </p>
      <p style="font-size: 12px; color: #777;">
        Notes WebApp Team
      </p>
    </div>
  </body>
</html>
`;
