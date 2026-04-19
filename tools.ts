import { tool } from "@langchain/core/tools";
import { google } from "googleapis";
import { z } from "zod";
import tokens from "./tokens.json";

const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

auth.setCredentials(tokens);

const calendar = google.calendar({ version: 'v3', auth });

export const createEventTool = tool(
  async ({ query, timeMin, timeMax }) => {
    const event = {
      summary: query,
      start: {
        dateTime: timeMin,
        timeZone: 'UTC',
      },
      end: {
        dateTime: timeMax,
        timeZone: 'UTC',
      },
    };

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return 'The meeting has been created';
  },
  {
    name: 'create-event',
    description: "Use this tool to set calendar events based on a query. The query will be a natural language description of the events you want to retrieve. The tool should return a list of events that match the query.",
    schema: z.object({
        query: z.string().describe("A natural language description of the event to create in google calendar. For example, 'Create a meeting with John tomorrow at 3pm' or 'Schedule a dentist appointment for next Monday at 10am'"),
        timeMin: z.string().describe("The minimum start time of the events to retrieve in UTC format."),
        timeMax: z.string().describe("The maximum end time of the events to retrieve in UTC format."),
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
      query: z.string().describe("A natural language description of the events to retrieve from google calendar. For example, 'Get all events for next week' or 'What events do I have on July 1st?'"),
      timeMin: z.string().optional().describe("The minimum start time of the events to retrieve in UTC format. Optional, defaults to current time."),
      timeMax: z.string().optional().describe("The maximum end time of the events to retrieve in UTC format. Optional."),
    }),
  })