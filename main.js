import { createAgent, tool } from "langchain";
import f from './functions.js';
import t from './tools.js';
import 'dotenv/config';

// Defining the model
const agent = createAgent({
    model: "claude-sonnet-4-6",
    tools: t
})

// Need a starter array for our messages with some system information.
const messages = [
    {
        role: "system",
        content: "You are a helpful virtual assistant."
    }
]

// The Invoke Loop Function, this is the important shit bais
async function invokeLoop() {

    // We creating a message here lads
    const msg = {
        role: "user",
        content: ""
    }
    msg.content = await f.prompt();

    // Context is important. The amount of context is at least 10 times as important
    messages.push(msg);
    const window = f.contextWindow(-10,messages).messages

    // I cast ✨ invoke agent ✨
    const fullreply = await agent.invoke({messages: window})
    const reply = fullreply.messages.at(-1).content;
    console.log(reply);

    // Adding the agent's reply to the message list
    messages.push({
        role: "assistant",
        content: reply
    });

    invokeLoop();
}

invokeLoop()