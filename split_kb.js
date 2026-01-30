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

try {
    const data = fs.readFileSync(inputFile, 'utf8');
    const items = JSON.parse(data);
    
    const splitData = {};
    for (const key in categories) {
        splitData[key] = [];
    }
    splitData['General'] = [];

    items.forEach(item => {
        let content = item.content.toLowerCase();
        let assigned = false;
        
        // Check content against keywords
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(k => content.includes(k))) {
                // Add category to metadata for future reference
                if (!item.metadata) item.metadata = {};
                if (typeof item.metadata === 'object') {
                    item.metadata.category = category;
                }
                
                splitData[category].push(item);
                assigned = true;
                break; // Assign to first matching category
            }
        }
        
        if (!assigned) {
            if (!item.metadata) item.metadata = {};
            if (typeof item.metadata === 'object') {
                item.metadata.category = 'General';
            }
            splitData['General'].push(item);
        }
    });

    // Write files
    for (const [category, items] of Object.entries(splitData)) {
        if (items.length > 0) {
            const filePath = path.join(outputDir, `${category}.json`);
            fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
            console.log(`Wrote ${items.length} items to ${category}.json`);
        }
    }

} catch (err) {
    console.error('Error:', err);
}
