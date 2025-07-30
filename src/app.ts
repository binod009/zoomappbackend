import express, { application, urlencoded } from "express";
import AppRoutes from "./route/index";
import GlobalErrorHandler from "./controllers/error.controller";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(AppRoutes);
app.use(GlobalErrorHandler);

export default app;
