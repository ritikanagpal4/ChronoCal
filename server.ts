import express from "express";
import { google } from "googleapis";

const app = express();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

app.get("/auth", (req: any, res: any) => {
    const scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events"
    ];
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: 'consent',
        scope: scopes,
    });
    res.redirect(authUrl);
});

app.get("/callback", async (req: any, res: any) => {
    const code = req.query.code;
    // Exchange code for access token
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    // oauth2Client.setCredentials(tokens);
    res.send("Connected to Google Calendar! You can now use the app to manage your calendar events.");
}); 

app.listen(3600, () => {
    console.log("Server is running on http://localhost:3600");
    console.log("Visit http://localhost:3600/auth to connect your Google Calendar");
});