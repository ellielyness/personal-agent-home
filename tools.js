import * as fs from 'node:fs'
import * as path from 'node:path'

// Ok so this creates a path, apparently it can't just be a string because the import() function is weird I guess
const dir = path.join(import.meta.dirname, 'tools');

// Then we get a list of the tools
const toollist = fs.readdirSync(dir,{ withFileTypes:true, recursive:true })
const modules = [];

// Iterating over the list
for (const x of toollist) {

    // Checks to see if the file is a javascript file
    if (!x.isFile() || !x.name.endsWith('.js')) continue;

    // Imports the module
    const toolpath = path.join(x.parentPath, x.name);
    const tool = await import(toolpath);

    // Pushes the module to an array
    modules.push(tool.default ?? Object.values);
}

// Exports the tools as a flat object
export default modules;