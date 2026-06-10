import { tool } from '@langchain/core/tools'
import fs from 'fs';
import z from 'zod';
import writeDirectory from '../functions/writeDirectory.js';

export default tool(
  function ({ directory}) {
    try {
        writeDirectory(directory);
        return `Wrote directory to "${directory}`;
    } catch (e) {
        return `Failed to write directory:\n\n${e}`;
    }
    
  },
  {
    name: "write_directory",
    description: "Write a directory to the disk",
    schema: z.object({
      directory: z.string().describe("The path of the directory to write")
    }),
  }
);