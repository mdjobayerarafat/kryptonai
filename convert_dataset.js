const fs = require('fs');
const readline = require('readline');
const path = require('path');

const inputFile = 'f:\\Downloads\\CyberSec-Dataset_escaped.jsonl';
const outputFile = 'e:\\cyber\\knowledge_base.json';

const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

writeStream.write('[\n');

let isFirst = true;
let count = 0;

rl.on('line', (line) => {
  if (!line.trim()) return;

  try {
    const data = JSON.parse(line);
    
    // Format the content for RAG
    // We combine User and Assistant fields to provide full context
    const content = `User Query: ${data.user}\n\nAnalysis & Response:\n${data.assistant}`;
    
    const outputObject = {
      content: content,
      metadata: {
        source: 'CyberSec-Dataset',
        type: 'educational_content',
        system_prompt: data.system ? data.system.substring(0, 100) + '...' : undefined // Truncate system prompt to save space
      }
    };

    if (!isFirst) {
      writeStream.write(',\n');
    }
    
    writeStream.write(JSON.stringify(outputObject, null, 2));
    isFirst = false;
    count++;
    
    if (count % 100 === 0) {
      process.stdout.write(`Processed ${count} records...\r`);
    }

  } catch (err) {
    console.error(`Error parsing line: ${err.message}`);
  }
});

rl.on('close', () => {
  writeStream.write('\n]');
  writeStream.end();
  console.log(`\nConversion complete! Processed ${count} records.`);
  console.log(`Output saved to: ${outputFile}`);
});
