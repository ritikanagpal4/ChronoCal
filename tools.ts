import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const createEventTool = tool(
  async ({query}) => {
    return 'The meeting has been created';
  },
  {
    name: 'create-event',
    description: "Use this tool to set calendar events based on a query. The query will be a natural language description of the events you want to retrieve. The tool should return a list of events that match the query.",
    schema: z.object({
        query: z.string().describe("A natural language description of the event to create in google calendar. For example, 'Create a meeting with John tomorrow at 3pm' or 'Schedule a dentist appointment for next Monday at 10am'")
    }),
  })

  export const getEventsTool = tool(
  async ({query}) => {
    return JSON.stringify([
      {
        title: "Team Meeting",
        date: "2024-07-01T10:00:00Z",
        description: "Monthly team sync-up meeting."
      },
      {
        title: "Project Deadline",
        date: "2024-07-05T23:59:59Z",
        description: "Deadline for submitting the project report."
      }
    ]);
  },
  {
    name: 'get-events',
    description: "Use this tool to get calendar events based on a query. The query will be a natural language description of the events you want to retrieve. The tool should return a list of events that match the query.",
    schema: z.object({
        query: z.string().describe("A natural language description of the events to retrieve from google calendar. For example, 'Get all events for next week' or 'What events do I have on July 1st?'")
    }),
  })