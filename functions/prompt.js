import * as readline from 'node:readline/promises'

export default async function prompt(msg) {

    // Defines the Interface and where the input comes from

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    })

    // Returns the Answer, closes the interface and returns the output
    const output = await rl.question(msg ? `${msg}` : "Prompt: \n")
    rl.close();
    return output;
}