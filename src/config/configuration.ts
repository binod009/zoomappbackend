import dotenv from "dotenv";
dotenv.config();

const config = {
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
  ZOOM_ACCOUNT_ID: process.env.ZOOM_ACCOUNT_ID,
};

export default config;
