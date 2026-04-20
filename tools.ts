import { tool } from "@langchain/core/tools";
import { google } from "googleapis";
import { z } from "zod";

const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

auth.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth });

// Get current timezone
const getTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const createEventTool = tool(
  async ({ query, timeMin, timeMax, attendees }) => {
    const currentTimeZone = getTimeZone();
    const event = {
      summary: query,
      start: {
        dateTime: timeMin,
        timeZone: currentTimeZone,
      },
      end: {
        dateTime: timeMax,
        timeZone: currentTimeZone,
      },
      attendees,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendNotifications: true,
      sendUpdates: 'all',
    });

    return 'The meeting has been created';
  },
  {
    name: 'create-event',
    description: "Use this tool to set calendar events based on a query. The query will be a natural language description of the events you want to retrieve. The tool should return a list of events that match the query.",
    schema: z.object({
        query: z.string().describe("A natural language description of the event to create in google calendar. For example, 'Create a meeting with John tomorrow at 3pm' or 'Schedule a dentist appointment for next Monday at 10am'"),
        timeMin: z.string().describe("The start time of the event in ISO 8601 format (e.g., 2024-04-20T15:00:00). Will be interpreted in your current timezone."),
        timeMax: z.string().describe("The end time of the event in ISO 8601 format (e.g., 2024-04-20T16:00:00). Will be interpreted in your current timezone."),
        attendees: z.array(z.object({
            email: z.string().describe("The email of the attendee to invite to the event.")
        })).optional().describe("An optional list of attendees to invite to the event, each with an email field."),
    }),
  })

  export const getEventsTool = tool(
  async ({ query, timeMin, timeMax }) => {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin || (new Date()).toISOString(),
      timeMax: timeMax,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return JSON.stringify(response.data.items);
  },
  {
    name: 'get-events',
    description: "Use this tool to get calendar events based on a query. The query will be a natural language description of the events you want to retrieve. The tool should return a list of events that match the query.",
    schema: z.object({
      query: z.string().describe("A natural language description of the events to retrieve from google calendar. For example, 'Get all events for next week' or 'What events do I have on April 20th?'"),
      timeMin: z.string().optional().describe("The start time to retrieve events from in ISO 8601 format (e.g., 2024-04-20T00:00:00). Optional, defaults to current time. Will be interpreted in your current timezone."),
      timeMax: z.string().optional().describe("The end time to retrieve events until in ISO 8601 format (e.g., 2024-04-20T23:59:59). Optional. Will be interpreted in your current timezone."),
    }),
  })