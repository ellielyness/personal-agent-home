import fs from 'fs'

export default function readFile(path, recursive) {
    return fs.readdirSync(path, {recursive: recursive? true : false});
}