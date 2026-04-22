# ChronoCal

An intelligent TypeScript-based calendar agent for Google Calendar integration with advanced LLM capabilities using LangGraph and Groq.

ChronoCal is a multi-tool calendar agent that understands natural language commands and manages your Google Calendar events through conversational interactions. Built with LangChain's agent framework and optimized with ChatGroq, it provides a seamless experience for calendar management.

## ✨ Features

- 🤖 **AI Agent Architecture**: Multi-tool agent using LangGraph with memory persistence
- 📅 **Complete Calendar Management**: Create, retrieve, update, and cancel events
- 🗣️ **Natural Language Processing**: Understand and execute calendar queries in plain English
- 🤝 **Google Meet Integration**: Automatically generates Google Meet/Hangouts links for meetings
- 👥 **Attendee Management**: Add multiple attendees with email notifications
- 🌍 **Timezone Aware**: Respects user's local timezone for all operations
- ⚡ **Lightning Fast**: Built with Bun for exceptional performance
- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 💾 **Conversation Memory**: Maintains conversation history and context

## 🚀 Quick Start

### Prerequisites

- Bun v1.3.11+ ([Install Bun](https://bun.sh))
- Groq API Key ([Get API Key](https://console.groq.com))
- Google Calendar API credentials
- Google OAuth2 tokens

### 1. Installation

```bash
git clone https://github.com/ritikanagpal4/ChronoCal.git
cd ChronoCal
bun install
```

### 2. Environment Configuration

Create a `.env` file with the following variables:

```bash
# Groq API
GROQ_API_KEY=your_groq_api_key_here

# Google Calendar API
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URL=http://localhost:3000/callback

# Google OAuth2 Tokens
GOOGLE_ACCESS_TOKEN=your_access_token
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

See `.env.example` for a template.

### 3. Run the Agent

```bash
bun run index.ts
```

## 💬 Usage Examples

Once the agent is running, you can interact with it naturally:

### Create Events
```
You: Create a meeting with John tomorrow at 3pm
Agent: I'll create a meeting with John tomorrow at 3pm with a Google Meet link.

You: Schedule a dentist appointment next Monday at 10am
Agent: Meeting scheduled for next Monday at 10am.
```

### Retrieve Events
```
You: Show me my events for next week
Agent: Here are your events for next week...

You: What meetings do I have today?
Agent: You have the following events today...
```

### Update Events
```
You: Reschedule my meeting with Sarah to 4pm
Agent: I'll update that meeting to 4pm.

You: Add Mike to tomorrow's standup
Agent: Mike has been added to the event.
```

### Cancel Events
```
You: Cancel my 2pm meeting
Agent: Your 2pm meeting has been cancelled.

You: Remove the dentist appointment
Agent: The dentist appointment has been cancelled.
```

## 🛠️ Available Tools

| Tool | Function | Input |
|------|----------|-------|
| **create-event** | Create calendar events with attendees and Meet links | query, timeMin, timeMax, attendees |
| **get-events** | Retrieve calendar events within a time range | query, timeMin, timeMax |
| **update-event** | Modify existing event details | eventId, updates |
| **cancel-event** | Delete calendar events | eventId |
| **search** | Search for specific events | query |

## 📁 Project Structure

```
ChronoCal/
├── index.ts                    # Main agent orchestration & CLI
├── tools.ts                    # Calendar tools & API integration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── tokens.json                 # Google OAuth2 tokens (not committed)
├── .env                        # Environment variables (not committed)
├── .env.example                # Environment template
├── README.md                   # This file
├── TIMEZONE_UPDATE.md          # Timezone handling documentation
├── GOOGLE_MEET_FIX.md          # Meet link generation details
├── GIT_WORKFLOW.md             # Git operations guide
└── bun.lock                    # Dependency lock file
```

## 🏗️ Architecture

### Agent Flow
```
User Input → LLM Processing → Tool Selection → Tool Execution → Response
                   ↓
            Memory/Context Management
```

### Tech Stack
- **LLM**: ChatGroq (Groq API)
- **Agent Framework**: LangGraph (LangChain)
- **Calendar API**: Google Calendar v3
- **Runtime**: Bun
- **Language**: TypeScript
- **Validation**: Zod schemas

### Key Components

1. **State Graph**: LangGraph-powered agent with multi-step reasoning
2. **Tool Node**: Executes calendar operations with proper error handling
3. **Message History**: Maintains conversation context across turns
4. **Memory Saver**: Persists conversation state for continuity

## 🔄 Agent Flow

```typescript
User Message
    ↓
Model Decision (Which tool to use?)
    ↓
Tool Execution (Create/Get/Update/Cancel events)
    ↓
Model Reasoning (Process results & formulate response)
    ↓
User Response
```

## 📝 Configuration

### Timezone Handling
The agent automatically detects and uses your system timezone:
```typescript
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Example: "Asia/Kolkata"
```

### LLM Model
Default model: `openai/gpt-oss-120b` (via Groq)
Configurable in `index.ts`

### Temperature & Parameters
- Temperature: 0.7 (balanced for both accuracy and creativity)
- Max tokens: Varies by tool requirement

## 📚 Documentation

- **[TIMEZONE_UPDATE.md](./TIMEZONE_UPDATE.md)** - Timezone implementation details
- **[GOOGLE_MEET_FIX.md](./GOOGLE_MEET_FIX.md)** - Meet link generation guide
- **[GIT_WORKFLOW.md](./GIT_WORKFLOW.md)** - Repository workflow guide
- **[CHATGROQ_OPTIMIZATION.md](./CHATGROQ_OPTIMIZATION.md)** - Code optimization notes

## 🔐 Security Considerations

- Never commit `.env` files containing sensitive credentials
- Store tokens securely (use environment variables or secrets manager)
- Validate all user inputs before calendar operations
- Use appropriate OAuth2 scopes for Google Calendar API
- Implement rate limiting for production deployments

## ⚙️ Requirements

- **Bun**: v1.3.11 or higher
- **Node.js**: v18+ (compatible runtime)
- **TypeScript**: 5.0+
- **Google Account**: With Calendar API enabled
- **Groq Account**: For LLM API access

## 🚦 Running Tests

```bash
# Check TypeScript compilation
bun run build

# Run the agent in interactive mode
bun run index.ts
```

## 🐛 Troubleshooting

### Google Meet Link Not Generated
See [GOOGLE_MEET_FIX.md](./GOOGLE_MEET_FIX.md) - requires `conferenceDataVersion: 1`

### Timezone Issues
Check [TIMEZONE_UPDATE.md](./TIMEZONE_UPDATE.md) for timezone configuration

### API Authentication Errors
Ensure Google OAuth2 tokens are valid and have proper Calendar API scopes

## 📈 Future Enhancements

- [ ] Support for recurring events
- [ ] Calendar color coding
- [ ] Event reminders management
- [ ] Integration with other calendar platforms
- [ ] Voice input support
- [ ] Multi-calendar management
- [ ] Event attachment handling
- [ ] Advanced search filters

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**Ritika Nagpal**
- GitHub: [@ritikanagpal4](https://github.com/ritikanagpal4)
- Email: ritika.nagpal4@gmail.com

## 🙏 Acknowledgments

- [LangChain](https://langchain.com) - Agent framework
- [LangGraph](https://langgraph.js.org) - Graph-based state management
- [Groq](https://groq.com) - LLM inference
- [Google Calendar API](https://developers.google.com/calendar) - Calendar integration
- [Bun](https://bun.sh) - JavaScript runtime

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/ritikanagpal4/ChronoCal/issues)
- Check existing documentation files
- Review troubleshooting guides

---

**Last Updated**: 22 April 2026
**Version**: 1.0.0
**Status**: Active Development ✅
