const fs = require('fs');
const path = require('path');

const inputFile = 'e:\\cyber\\datajson\\knowledge_base.json';
const outputDir = 'e:\\cyber\\datajson\\split';

const categories = {
    'Malware_Analysis': ['malware', 'obfuscation', 'packing', 'anti-debugging', 'anti-analysis', 'reverse engineering', 'binary', 'virtualization'],
    'Forensics_IR': ['forensic', 'timestomping', 'snapshot', 'logging', 'artifact', 'incident response', 'evidence', 'memory'],
    'Network_Security': ['network', 'traffic', 'tls', 'c2', 'wireless', 'pcap', 'handshake', 'dns'],
    'Exploitation': ['exploit', 'injection', 'rop', 'jop', 'buffer overflow', 'vulnerability', 'bypass', 'privilege escalation'],
    'Cloud_Security': ['cloud', 'aws', 'azure', 'container', 'kubernetes', 'iac', 'infrastructure as code', 'serverless'],
    'Defense_Compliance': ['nist', 'policy', 'compliance', 'dlp', 'ueba', 'monitor', 'mitigate', 'governance'],
    'Cryptography': ['crypto', 'encryption', 'hashing', 'quantum', 'cipher', 'key'],
    'Web_Security': ['xss', 'csrf', 'sql injection', 'web', 'browser', 'cookie', 'session']
};

// Initialize output streams
const outputStreams = {};
for (const cat of Object.keys(categories)) {
    outputStreams[cat] = fs.createWriteStream(path.join(outputDir, `${cat}.json`));
    outputStreams[cat].write('[\n');
    outputStreams[cat].first = true;
}
outputStreams['General'] = fs.createWriteStream(path.join(outputDir, 'General.json'));
outputStreams['General'].write('[\n');
outputStreams['General'].first = true;

const rs = fs.createReadStream(inputFile, { encoding: 'utf8', highWaterMark: 64 * 1024 });

let buffer = '';
let depth = 0;
let inString = false;
let escaped = false;
let objectStart = -1;

rs.on('data', (chunk) => {
    // Append chunk to buffer, but be careful with memory. 
    // We only need to keep the *current object* in memory.
    // So we iterate the chunk and slice when we find an object.
    
    // Actually, appending to a huge string buffer will cause the same error.
    // We must process 'chunk' and only build the current object string.
    
    for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        
        if (!inString) {
            if (char === '{') {
                if (depth === 0) {
                    // Start of an object (assuming root array is ignored effectively or we handle depth 1 as object start)
                    // The file starts with [ { ...
                    // So root [ is depth 1 (if we counted it).
                    // Let's track brace depth.
                }
                depth++;
                if (depth === 1) {
                    buffer = ''; // Start capturing
                }
            } else if (char === '}') {
                depth--;
                if (depth === 0) {
                    // End of an object
                    buffer += char;
                    processObject(buffer);
                    buffer = '';
                    continue; // processed
                }
            } else if (char === '"') {
                inString = true;
            }
        } else {
            if (!escaped && char === '"') {
                inString = false;
            } else if (!escaped && char === '\\') {
                escaped = true;
            } else {
                escaped = false;
            }
        }
        
        if (depth > 0) {
            buffer += char;
        }
    }
});

rs.on('end', () => {
    // Close all streams
    for (const key in outputStreams) {
        outputStreams[key].write('\n]');
        outputStreams[key].end();
    }
    console.log('Processing complete.');
});

function processObject(jsonStr) {
    try {
        const item = JSON.parse(jsonStr);
        let content = (item.content || '').toLowerCase();
        let assigned = false;
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(k => content.includes(k))) {
                if (!item.metadata) item.metadata = {};
                item.metadata.category = category;
                
                writeItem(category, item);
                assigned = true;
                break;
            }
        }
        
        if (!assigned) {
            if (!item.metadata) item.metadata = {};
            item.metadata.category = 'General';
            writeItem('General', item);
        }
    } catch (e) {
        console.error('Failed to parse object:', e.message);
    }
}

function writeItem(category, item) {
    const stream = outputStreams[category];
    if (!stream.first) {
        stream.write(',\n');
    }
    stream.write(JSON.stringify(item, null, 2));
    stream.first = false;
}
