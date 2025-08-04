import Router from "express";
import {
  createMeeting,
  createMeetingWithAlternativeHostsController,
  createMeetingWithScreenSharingController,
} from "../controllers/zoom.controller";
const zoom_router = Router();


zoom_router.post("/create/meeting", createMeeting);



zoom_router.post(
  "/create/meetings/alternative-hosts",
  createMeetingWithAlternativeHostsController
);


zoom_router.post(
  "/create/meeting/join-before-host",
  createMeetingWithScreenSharingController
);

export default zoom_router;
