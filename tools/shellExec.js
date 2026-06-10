import { tool } from '@langchain/core/tools';
import shellExec from '../functions/shellExec.js';
import z from 'zod';

export default tool(
  async function ({ command, cwd }) {
    try {
      return await shellExec(command, cwd);
    } catch (e) {
      return `Failed to execute command:\n\n${e}`;
    }
  },
  {
    name: "shell_exec",
    description: "Execute a shell command. The user will be shown the command and must approve it before it runs.",
    schema: z.object({
      command: z.string().describe("The shell command to execute"),
      cwd: z.string().optional().describe("The working directory to run the command in. Defaults to the current working directory.")
    }),
  }
);
