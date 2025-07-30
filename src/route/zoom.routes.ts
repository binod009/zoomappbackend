import Router from "express";
import {
  createMeeting,
  createMeetingWithAlternativeHostsController,
} from "../controllers/zoom.controller";
const zoom_router = Router();
zoom_router.post("/create/meeting", createMeeting);
zoom_router.post(
  "/create/meetings/alternative-hosts",
  createMeetingWithAlternativeHostsController
);

export default zoom_router;
