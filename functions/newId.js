import fs from 'fs'
import path from 'path'
import idDateString from './idDateString.js'

export default function newId() {
    const logpath = path.join('./conversations/',idDateString());

    try {
        const count = fs.readdirSync(logpath) || 0;
        return count.length + 1
    } catch  {
        return 1
    }
    
}