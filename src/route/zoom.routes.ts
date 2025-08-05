import Router from "express";
import {
  createMeeting,
  createMeetingJoinBeforeHostController,
  createMeetingWithAlternativeHostsController,
} from "../controllers/zoom.controller";
const zoom_router = Router();

zoom_router.post("/create/meeting", createMeeting);

zoom_router.post(
  "/create/meetings/alternative-hosts",
  createMeetingWithAlternativeHostsController
);

zoom_router.post(
  "/create/meetings/join-before-host",
  createMeetingJoinBeforeHostController
);

export default zoom_router;
