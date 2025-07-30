import { Request, Response } from "express";
import zoom_svc from "../services/zoom.service";
import asyncHandler from "../utils/asyncHandler";
import { join } from "path";

const createMeeting = asyncHandler(async (req: Request, res: Response) => {
  const access_token = await zoom_svc.getAccessToken();
  console.log(access_token, "access_token");
  const { topic, start_time, duration, timezone } = req.body;
  const meetingData = {
    topic,
    start_time,
    duration,
    timezone,
  };
  const meeting = await zoom_svc.createZoomMeeting(meetingData, access_token);
  res.status(200).json({
    status: 200,
    message: "Created successfully",
    result: {
      start_url: meeting.start_url,
      join_url: meeting.join_url,
      meeting_id: meeting.id,
      topic: meeting.topic,
    },
  });
});

export { createMeeting };
