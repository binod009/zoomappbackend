import { NextFunction, Request, Response } from "express";
import zoom_svc from "../services/zoom.service";
import asyncHandler from "../utils/asyncHandler";
import { notifyAlternativeHost } from "../services/email.service";
import { normalizeAlternativeHosts } from "../utils/helper";

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
  const meeting = await zoom_svc.createSingleZoomMeeting(
    meetingData,
    access_token
  );
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

const createMeetingWithAlternativeHostsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = await zoom_svc.getAccessToken();
    const { topic, start_time, duration, timezone, alternative_hosts } =
      req.body;
    const meetingData = {
      topic,
      start_time,
      duration,
      timezone,
      alternative_hosts,
    };
    const meeting = await zoom_svc.createZoomMeetingWithAlternativeHosts(
      meetingData,
      access_token
    );
    if (meeting !== null) {
      await notifyAlternativeHost(
        alternative_hosts,
        meeting.join_url,
        meeting.topic
      );
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
    }
  }
);

// participants screen sharing can be done through zoom dashboard only through api is not available
const createMeetingJoinBeforeHostController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { start_time, duration, topic, timezone, alternative_hosts } =
      req.body;
    const access_token = await zoom_svc.getAccessToken();
  
    const response = await zoom_svc.createSingleZoomMeeting(
     {start_time,duration,topic,timezone,alternative_hosts},
      access_token
    );

    res.status(200).json({
      status: 200,
      message: "Meeting created with screen sharing enabled",
      result: {
        start_url: response.start_url,
        join_url: response.join_url,
        meeting_id: response.id,
        topic: response.topic,
      },
    });
  }
);

export {
  createMeeting,
  createMeetingWithAlternativeHostsController,
  createMeetingJoinBeforeHostController,
};
