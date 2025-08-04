import nodemailer from "nodemailer";

import config from "../config/configuration";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  //   icsContent: string;
}

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: config.NODEMAILER_HOST,
  port: config.MAIL_PORT,
  secure: config.NODEMAILER_SECURE,
  auth: {
    user: config.NODEMAILER_USER,
    pass: config.NODEMAILER_PASS,
  },
});

// Send email with .ics file
export const sendMailAsync = async ({
  to,
  subject,
  html,
  text = "Please find your calendar invite attached.",
}: EmailOptions) => {
  const mailOptions = {
    from: config.NODEMAILER_USER,
    to,
    subject,
    html,
    text,
    // attachments: [
    //   {
    //     filename: "meeting-invite.ics",
    //     // content: icsContent,
    //     contentType: "text/calendar",
    //   },
    // ],
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    if (info) return true;
  } catch (error) {
    console.error("Failed to send mail:", error);
  }
};

export const notifyAlternativeHost = async (
  alternativeHostEmail: string | string[],
  joinUrl: string
) => {
  const subject = "Zoom Meeting Invitation";
  const htmlContent = `
    <p>Hello,</p>
    <p>You have been added as an alternative host for a Zoom meeting.</p>
    <p>Join the meeting using this link: <a href="${joinUrl}">${joinUrl}</a></p>
    <p>Best regards,<br/>Your Team</p>
  `;

  if (Array.isArray(alternativeHostEmail)) {
    // Send mail to each recipient separately
    await Promise.all(
      alternativeHostEmail.map((email) =>
        sendMailAsync({
          to: email,
          subject,
          html: htmlContent,
          text: `Hello,\nYou have been added as an alternative host for a Zoom meeting.\nJoin the meeting using this link: ${joinUrl}\nBest regards,\nYour Team`,
        })
      )
    );
  } else {
    // Single recipient
    await sendMailAsync({
      to: alternativeHostEmail,
      subject,
      html: htmlContent,
      text: `Hello,\nYou have been added as an alternative host for a Zoom meeting.\nJoin the meeting using this link: ${joinUrl}\nBest regards,\nYour Team`,
    });
  }
};
