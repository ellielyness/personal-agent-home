import { createAgent } from "langchain";
import f from './functions.js';
import t from './tools.js';
import 'dotenv/config';

// Define exit keywords for graceful shutdown
const EXIT_COMMANDS = ['/exit', '/quit'];
const USE_COMMANDS = ['/new', '/resume']

// Defining the model
const agent = createAgent({
    model: "claude-sonnet-4-6",
    tools: t
});

// Starter message array with system context
const starterMessage = [
    {
        role: "system",
        content: "You are a helpful virtual assistant."
    }
]

let messages = starterMessage;

// The main invoke loop - handles user input, context windowing, and agent responses
async function invokeLoop() {

    let id = f.newId()+'';

    console.log(`\n****\nAgent is ready! Type ${EXIT_COMMANDS.join(', ')} to stop.\n****\n`);

    while (true) {
        try {

            // Get user input
            const userInput = await f.prompt();

            // Check for exit command
            if (EXIT_COMMANDS.includes(userInput.trim().toLowerCase())) {
                console.log("\n****\nGoodbye!\n****\n");
                process.exit(0);
            }

            // Check for other commands
            if (USE_COMMANDS.includes(userInput.trim().toLowerCase())) {
                console.log(userInput);

                messages.push({
                    role: "user",
                    content: userInput
                })

                if (userInput == '/resume') {
                    const convo = await f.prompt('Conversation: ');
                    try {
                        const data = f.readFile(convo);
                        const json = JSON.parse(data);
                        if (Object.hasOwn(json,"messages")) {
                            messages = messages.concat(json.messages);
                            console.log(messages)
                            continue;
                        } else {
                            console.log(`\n****\nThis file didn't have any messages to read\n****\n`)
                            continue;
                        }
                    } catch (e) {
                        console.log(`\n****\nCouldn't load ${id}, ${e}\n****\n`);
                        continue;
                    }
                } else if (userInput == '/new') {

                    // Clears out the message Buffer
                    messages = [];
                    messages.push(starterMessage[0]);

                    // Creates a new log file
                    id = f.newId()+'';
                    f.writeLog(id,{messages:messages});

                    console.log('\n****\nStarting a fresh conversation\n****\n');
                    continue;
                }

                continue;
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
            console.log(`\n****\nAssistant: ${reply}\n****\n`);
            messages.push({
                role: "assistant",
                content: reply
            });

            f.writeLog(id,{messages:messages});

        } catch (err) {
            console.error(`\n****\nAn error occurred: ${err.message}\n****\n`);

            // On error, ask the user if they'd like to continue
            const continueInput = await f.prompt("****\nAn error occurred. Continue? (yes/no): \n****\n");
            if (!continueInput.trim().toLowerCase().startsWith('y')) {
                console.log("\n****\nExiting due to error. Goodbye!\n****\n");
                process.exit(1);
            }
        }
    }
}

invokeLoop();
