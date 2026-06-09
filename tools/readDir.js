import { tool } from '@langchain/core/tools';
import readDir from '../functions/readDir.js';
import fs from 'fs';
import z from 'zod';

export default tool(
  function ({ path, recursive }) {
    try {
        return readDir(path,recursive)
    } catch (e) {
        return `Failed to read dir:\n\n${e}`;
    }
    
  },
  {
    name: "read_dir",
    description: "Read a directory from the disk",
    schema: z.object({
      path: z.string().describe("The name of the Dir to read, including it's relative path"),
      recursirve: z.boolean().describe("Whether or not to read the directory recursively")
    }),
  }
);