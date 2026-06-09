import fs, { readFileSync } from 'fs'
import idDateString from './idDateString.js';
import path from 'path'

export default function writeLog(id,data) {

    const fullpath = path.join('./conversations/',idDateString(),`${id+".json"}`);
    fs.mkdirSync(path.join('./conversations/',idDateString()),{recursive: true});
    try {
        fs.writeFileSync(fullpath,JSON.stringify(data,null,4),'utf-8')
    } catch (e) {
        console.log(e)
    }
    
}