# ChronoCal

A TypeScript project with integrated Groq LLM support using Bun.

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
const response = await callLLM([
  { role: 'user', content: 'What is the capital of France?' }
]);
console.log(response);

// With custom model and parameters
const response = await callLLM(
  [{ role: 'user', content: 'Tell me a joke' }],
  'llama-3.3-70b-versatile',
  0.8,
  512
);
```

### Available Functions

- **`groq`**: The initialized Groq client instance for direct API calls
- **`callLLM(messages, model?, temperature?, max_tokens?)`**: Convenience function to call the LLM
  - `messages`: Array of message objects with `role` ('user' or 'assistant') and `content` (string)
  - `model`: LLM model to use (default: 'llama-3.3-70b-versatile')
  - `temperature`: Sampling temperature (default: 0.7)
  - `max_tokens`: Maximum tokens in response (default: 1024)

## Project Info

This project was created using `bun init` in bun v1.3.11. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
