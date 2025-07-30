import Router from "express";
import { createMeeting } from "../controllers/zoom.controller";
const zoom_router = Router();
zoom_router.post("/create", createMeeting);

export default zoom_router;
