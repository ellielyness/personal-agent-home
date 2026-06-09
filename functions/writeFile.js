export default function writeFile({ directory, filename, data }) {
    try {
        fs.writeFileSync(`${directory}/${filename}`, data, 'utf8');
        return `Wrote file to "${directory}/${filename}"`;
    } catch (e) {
        return `Failed to write file:\n\n${e}`;
    }
    
  }