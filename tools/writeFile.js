import { tool } from '@langchain/core/tools'
import fs from 'fs';
import z from 'zod';

export default tool(
  function ({ directory, filename, data }) {
    try {
        fs.writeFileSync(`${directory}/${filename}`, data, 'utf8');
        return `Wrote file to "${directory}/${filename}"`;
    } catch (e) {
        return `Failed to write file:\n\n${e}`;
    }
    
  },
  {
    name: "write_file",
    description: "Write a file to the disk",
    schema: z.object({
      directory: z.string().describe("Where to write the file. Use './OUTPUT' unless otherwise specified"),
      filename: z.string().describe("The name of the file, including extension"),
      data: z.string().describe("The data to write to the file"),
    }),
  }
);