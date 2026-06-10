import fs from 'fs'
import path from 'path'

export default function writeDirectory(directory){

    try {
        fs.mkdirSync(directory,{recursive: true});
    } catch (e) {
        console.log(`Directory ${directory} not created..\n${e}`)
    }
    
}