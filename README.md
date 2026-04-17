# ChronoCal

A TypeScript-based calendar agent for Google Calendar integration with ChatGroq LLM support using Bun.

ChronoCal is an intelligent agent that allows you to manage your Google Calendar through natural language conversations. It leverages the power of LLMs (Large Language Models) via Groq API to understand your calendar requests and execute them seamlessly.

## Features

- 🤖 **LLM-Powered**: Uses ChatGroq from LangChain for optimized LLM calls
- 📅 **Calendar Management**: Create and retrieve calendar events
- 🗣️ **Natural Language**: Understand and process natural language calendar queries
- ⚡ **Fast**: Built with Bun for lightning-fast execution
- 🔒 **Type-Safe**: Full TypeScript support

## Setup

### 1. Install dependencies:

```bash
bun install
```

### 2. Configure API Key

Create a `.env` file in the root directory with your Groq API key:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

You can use the `.env.example` file as a template.

## Usage

### Run the project:

```bash
bun run index.ts
```

### Use the LLM in your code:

```typescript
import { callLLM } from './index.ts';

// Simple usage
const response = await callLLM('What is the capital of France?');
console.log(response);

// With custom model and parameters
const response = await callLLM(
  'Tell me a joke',
  'gpt-4',
  0.8,
  512
);
```

### Available LLM Functions

- **`chatGroq`**: The initialized ChatGroq client instance from LangChain
- **`callLLM(userMessage, model?, temperature?, maxTokens?)`**: Simple interface for single prompts
- **`callLLMWithHistory(messages, model?)`**: For multi-turn conversations

### Calendar Tools

#### Get Events
```typescript
import { getEventsTool } from './tools.ts';

// Use with agent to retrieve calendar events
const events = await getEventsTool.invoke({ query: 'Get all events for next week' });
```

#### Create Events
```typescript
import { createEventTool } from './tools.ts';

// Use with agent to create calendar events
const result = await createEventTool.invoke({ query: 'Create a meeting with John tomorrow at 3pm' });
```

## Project Structure

- `index.ts` - Main LLM initialization and core functions
- `tools.ts` - Calendar tools for event management
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (not committed)
- `.env.example` - Template for environment variables

## Documentation

- [LLM Setup Guide](./LLM_SETUP.md) - Detailed LLM configuration
- [ChatGroq Optimization](./CHATGROQ_OPTIMIZATION.md) - Code optimization details

## Architecture

ChronoCal uses LangChain's agent framework with:
- **ChatGroq** for LLM inference
- **Zod** for schema validation
- **LangChain Tools** for structured calendar operations

## Requirements

- Node.js/Bun v1.3.11+
- Groq API Key
- TypeScript 5.0+

## Project Info

This project was created using `bun init` in bun v1.3.11. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## License

MIT

## Contributing

Feel free to contribute to ChronoCal! Please ensure all code follows TypeScript best practices and includes proper documentation.
