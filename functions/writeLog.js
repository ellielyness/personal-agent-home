import fs, { readFileSync } from 'fs'
import idDateString from './idDateString.js';
import path from 'path'
import writeDirectory from './writeDirectory.js';

export default function writeLog(id,data) {

    const fullpath = path.join('./conversations/',idDateString(),`${id+".json"}`);
    writeDirectory(path.join('./conversations/',idDateString()));
    try {
        fs.writeFileSync(fullpath,JSON.stringify(data,null,4),'utf-8')
    } catch (e) {
        console.log(e)
    }
    
}