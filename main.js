import { createAgent } from "langchain";
import f from './functions.js';
import t from './tools.js';
import 'dotenv/config';

// Define exit keywords for graceful shutdown
const EXIT_COMMANDS = ['exit', 'quit', 'bye', 'q'];

// Defining the model
const agent = createAgent({
    model: "claude-sonnet-4-6",
    tools: t
});

// Starter message array with system context
const messages = [
    {
        role: "system",
        content: "You are a helpful virtual assistant."
    }
];

// The main invoke loop - handles user input, context windowing, and agent responses
async function invokeLoop() {

    const id = f.newId()+'';
    console.log("Agent is ready! Type 'exit', 'quit', or 'bye' to stop.\n");

    while (true) {
        try {

            // Get user input
            const userInput = await f.prompt();

            // Check for exit command
            if (EXIT_COMMANDS.includes(userInput.trim().toLowerCase())) {
                console.log("Goodbye!");
                process.exit(0);
            }

            // Build the user message and add to history
            messages.push({
                role: "user",
                content: userInput
            });

            // Slice the context window to the last 10 messages
            const window = f.contextWindow(-10, messages).messages;

            // Invoke the agent
            const fullReply = await agent.invoke({ messages: window });
            const reply = fullReply.messages.at(-1).content;

            // Display and store the agent's response
            console.log(`\nAssistant: ${reply}\n`);
            messages.push({
                role: "assistant",
                content: reply
            });

            f.writeLog(id,{1:messages});

        } catch (err) {
            console.error(`An error occurred: ${err.message}`);

            // On error, ask the user if they'd like to continue
            const continueInput = await f.prompt("An error occurred. Continue? (yes/no): ");
            if (!continueInput.trim().toLowerCase().startsWith('y')) {
                console.log("Exiting due to error. Goodbye!");
                process.exit(1);
            }
        }
    }
}

invokeLoop();
