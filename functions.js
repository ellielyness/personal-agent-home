import * as fs from 'node:fs'
import * as path from 'node:path'

// Ok so this creates a path, apparently it can't just be a string because the import() function is weird I guess
const dir = path.join(import.meta.dirname, 'functions');

// Then we get a list of the functions
const flist = fs.readdirSync(dir,{ withFileTypes:true, recursive:true })
const modules = [];

// Iterating over the list
for (const x of flist) {

    // Checks to see if the file is a javascript file
    if (!x.isFile() || !x.name.endsWith('.js')) continue;

    // Imports the module
    const fpath = path.join(x.parentPath, x.name);
    const f = await import(fpath);

    // Pushes the module to an array
    const exported = f.default ?? Object.values(f);
    modules.push(exported);
}

// Creates an object from the modules Array, formatting the keys properly to be imported
const exports = Object.fromEntries(modules.map(entry => [entry.name, entry]))

// Exports the functions as a flat object
export default Object.assign({}, exports);