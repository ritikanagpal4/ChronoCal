import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { createEventTool, getEventsTool } from "./tools";
import { END, MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import type { AIMessage } from "@langchain/core/messages";
import readline from "node:readline/promises";
import { content } from "googleapis/build/src/apis/content";

const tools = [createEventTool, getEventsTool];
const toolNode = new ToolNode(tools);

const model = new ChatGroq({
  model: 'openai/gpt-oss-120b',
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.7,
}).bindTools(tools);

async function callModel(state: typeof MessagesAnnotation.State) {
    console.log("Invoking model with messages");
    const response = await model.invoke(state.messages);
    // console.log("Model response:", response);
    return {messages: [response]};
} 

function shouldContinue(state: typeof MessagesAnnotation.State) {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage | undefined;
    // console.log("Checking if we should continue. Last message:", lastMessage);
    if (!lastMessage) return "__end__";
    // Check if the model's last message contains tool calls
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
        return "tools";
    }
    return "__end__";
}

// Build graph 
const graph = new StateGraph(MessagesAnnotation)
.addNode("assistant", callModel)
.addNode("tools", toolNode)
.addEdge("__start__", "assistant")
.addEdge("tools", "assistant")
.addConditionalEdges("assistant", shouldContinue, {
    tools: 'tools',
    __end__: END
});

const memorySaver = new MemorySaver();
const app = graph.compile({checkpointer: memorySaver});

async function main() {

    const config = { configurable : { thread_id: 'conversation-num-1'}};
    const currentDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const timezoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const initialState = {
        messages: [{role: "system", content: `Current date and time: ${currentDate}, Timezone: ${timezoneString}`},{role: "user", content: ""}],
    };

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        const userInput = await rl.question('You: ');

        if(userInput.toLowerCase() === "exit") {
            break;
        }

        initialState.messages.push({ role: "user", content: userInput });
       const result = await app.invoke(initialState, config);
       const messages = result.messages || [];
       const lastMessage = messages[messages.length - 1];
       console.log("Last message content: \n ", lastMessage?.content);
    }

    rl.close();
    // await saveGraphStateAsImage(app, "./customGraph.png");
}

main();