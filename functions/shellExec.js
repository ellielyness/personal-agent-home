import { execSync } from 'node:child_process';
import prompt from './prompt.js';

export default async function shellExec(command, cwd) {

    // Show the guardrail prompt to the user before executing anything
    console.log(`\n****\nShell Command Requested:\n\n  ${command}\n${cwd ? `\n  Working Directory: ${cwd}\n` : ''}\nApprove? (yes/no)\n****\n`);

    const answer = await prompt();

    // Reject anything that isn't an explicit yes
    if (answer.trim().toLowerCase() !== 'yes') {
        return 'Command rejected by user.';
    }

    try {
        const result = execSync(command, {
            cwd: cwd ?? process.cwd(),
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        return result || '(no output)';
    } catch (e) {
        return `Command failed:\n\n${e.stderr || e.message}`;
    }
}
