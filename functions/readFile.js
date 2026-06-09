import fs from 'fs'

export default function readFile(path) {
    return fs.readFileSync(path,{encoding:'utf-8'});
}