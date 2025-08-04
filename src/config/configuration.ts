import dotenv from "dotenv";
dotenv.config();

const config = {
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
  ZOOM_ACCOUNT_ID: process.env.ZOOM_ACCOUNT_ID,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  MAIL_PORT: Number(process.env.MAIL_PORT) || 587,
  NODEMAILER_SECURE: process.env.NODEMAILER_SECURE === "true",
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
};

export default config;
