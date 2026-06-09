import { tool } from '@langchain/core/tools';
import { exec } from 'child_process';
import { promisify } from 'util';
import z from 'zod';

const execAsync = promisify(exec);

export default tool(
  async function ({ command, timeout_ms }) {
    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: timeout_ms ?? 10000,
        shell: true,
      });

      let result = '';
      if (stdout) result += `stdout:\n${stdout.trim()}`;
      if (stderr) result += `${result ? '\n\n' : ''}stderr:\n${stderr.trim()}`;
      return result || '(no output)';

    } catch (e) {
      // exec rejects on non-zero exit codes, but stdout/stderr may still be useful
      let result = `Exit code: ${e.code ?? 'unknown'}`;
      if (e.stdout) result += `\n\nstdout:\n${e.stdout.trim()}`;
      if (e.stderr) result += `\n\nstderr:\n${e.stderr.trim()}`;
      if (e.killed)  result += `\n\nProcess was killed (timeout?)`;
      return result;
    }
  },
  {
    name: 'exec_shell',
    description: 'Execute a shell command and return its stdout/stderr output. Use for running CLI commands, scripts, or inspecting the system.',
    schema: z.object({
      command: z.string().describe('The shell command to execute'),
      timeout_ms: z.number().optional().describe('Optional timeout in milliseconds before the command is killed. Defaults to 10000ms (10s).'),
    }),
  }
);
