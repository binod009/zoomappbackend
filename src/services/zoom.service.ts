import config from "../config/configuration";
import axios from "axios";
import normalizeAlternativeHosts from "../utils/helper";
export class ZoomService {
  async getAccessToken() {
    const client_id = config.ZOOM_CLIENT_ID; // Your Client ID
    const client_secret = config.ZOOM_CLIENT_SECRET; // Your Client Secret
    const account_id = config.ZOOM_ACCOUNT_ID as string;
    const token = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );

    try {
      const response = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${account_id}`,
        null,
        {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const zoom_access_token = response.data.access_token;
      return zoom_access_token;
    } catch (error: any) {
      console.log("zoom accesstoken error", error);
      if (error.response) {
        console.error("Error response from Zoom API:", error.response.data);
      } else {
        console.error("Error in API request:", error.message);
      }
    }
  }

  async createSingleZoomMeeting(zoom_meeting_data: any, access_token: string) {
    let meetingData: any = {
      topic: zoom_meeting_data.topic || "One-Time Meeting",
      type: 2,
      start_time: zoom_meeting_data.start_time,
      duration: 40,
      timezone: zoom_meeting_data.timezone || "Asia/Kathmandu",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        approval_type: 0,
        waiting_room: false,
      },
    };

    try {
      const createMeeting = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        zoom_meeting_data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Meeting created successfully:", createMeeting.data);
      return createMeeting.data;
    } catch (err) {
      console.log("========>Error creation zoom meeting", err);
    }
  }

  async createZoomMeetingWithAlternativeHosts(zoom_meeting_data, access_token) {
    let meetingData: any = {
      topic: zoom_meeting_data.topic || "One-Time Meeting",
      type: 2,
      start_time: zoom_meeting_data.start_time,
      duration: 40,
      timezone: zoom_meeting_data.timezone || "Asia/Kathmandu",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        approval_type: 0,
        waiting_room: false,
        alternative_hosts: normalizeAlternativeHosts(
          zoom_meeting_data.alternative_hosts
        ),
        alternative_hosts_email_notification: true,
      },
    };
    try {
      const createMeeting = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        zoom_meeting_data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Meeting created successfully:", createMeeting.data);
      return createMeeting.data;
    } catch (err) {
      console.log("========>Error creation zoom meeting", err);
    }
  }
}

export default new ZoomService();
