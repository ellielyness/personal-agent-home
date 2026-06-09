import fs, { readFileSync } from 'fs'
import path from 'path'

export default function readLog(filePath) {
    const data = JSON.parse(readFileSync(filePath))
    return data;
}