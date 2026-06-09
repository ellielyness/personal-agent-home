import { tool } from '@langchain/core/tools';
import readFile from '../functions/readFile.js';
import fs from 'fs';
import z from 'zod';

export default tool(
  function ({ path }) {
    try {
        return readFile(path)
    } catch (e) {
        return `Failed to write file:\n\n${e}`;
    }
    
  },
  {
    name: "read_file",
    description: "Read a file from the disk",
    schema: z.object({
      path: z.string().describe("The name of the file to read, including it's relative path")
    }),
  }
);