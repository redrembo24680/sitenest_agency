const fs = require('fs');
const path = require('path');


// Robust helper to parse YAML frontmatter (handles block scalars like >-)
function parseFrontmatter(raw) {
  const lines = raw.split('\n');
  const data = {};
  let currentKey = null;
  let blockValue = [];
  let inBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (inBlock) {
      const match = line.match(/^(\s+)(.*)/);
      if (match) {
        blockValue.push(match[2]);
        continue;
      } else if (line.trim() === '') {
        blockValue.push('');
        continue;
      } else {
        data[currentKey] = blockValue.map(l => l.trim()).join(' ');
        inBlock = false;
        currentKey = null;
        blockValue = [];
      }
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      continue;
    }

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (val.startsWith('>') || val.startsWith('|')) {
      inBlock = true;
      currentKey = key;
      blockValue = [];
    } else {
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }

  if (inBlock && currentKey) {
    data[currentKey] = blockValue.map(l => l.trim()).join(' ');
  }

  return data;
}

// Free Google Translate API call helper
async function callTranslateApi(text, fromLang = 'uk', toLang = 'en') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Translate API error: ${res.statusText}`);
    const json = await res.json();
    return json[0].map(item => item[0]).join('');
  } catch (err) {
    console.error(`Error translating: "${text.slice(0, 30)}..."`, err);
    return text; // Fallback to original text on error
  }
}

// Function to translate the Markdown/Markdoc content line by line
async function translateMarkdownContent(content, fromLang, toLang) {
  const lines = content.split('\n');
  const translatedLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      translatedLines.push('');
      continue;
    }

    // Keep markdown structural elements untouched (images, codeblocks, delimiters, list bullets)
    if (trimmed.startsWith('![](')) {
      translatedLines.push(line); // Keep image paths intact
    } else if (trimmed.startsWith('---')) {
      translatedLines.push(line); // Keep dividers
    } else if (trimmed.startsWith('## ')) {
      const trans = await callTranslateApi(trimmed.slice(3), fromLang, toLang);
      translatedLines.push('## ' + trans);
    } else if (trimmed.startsWith('### ')) {
      const trans = await callTranslateApi(trimmed.slice(4), fromLang, toLang);
      translatedLines.push('### ' + trans);
    } else if (trimmed.startsWith('* ')) {
      const trans = await callTranslateApi(trimmed.slice(2), fromLang, toLang);
      translatedLines.push('* ' + trans);
    } else if (trimmed.startsWith('- ')) {
      const trans = await callTranslateApi(trimmed.slice(2), fromLang, toLang);
      translatedLines.push('- ' + trans);
    } else if (trimmed.match(/^\d+\.\s/)) {
      // Bullet lists like "1. Text"
      const match = trimmed.match(/^(\d+\.\s)(.*)/);
      const trans = await callTranslateApi(match[2], fromLang, toLang);
      translatedLines.push(match[1] + trans);
    } else {
      const trans = await callTranslateApi(trimmed, fromLang, toLang);
      // Re-add indentation if original had it
      const leadingSpaces = line.match(/^\s*/)[0];
      translatedLines.push(leadingSpaces + trans);
    }

    // Delay to prevent rate limit (300ms)
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return translatedLines.join('\n');
}

// Main translation orchestrator
async function run() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  console.log(`Scanning blog directory: ${blogDir}`);

  if (!fs.existsSync(blogDir)) {
    console.error('Blog directory does not exist.');
    return;
  }

  const files = fs.readdirSync(blogDir);
  const ukFiles = files.filter(file => file.endsWith('.mdoc') && !file.endsWith('-en.mdoc'));

  if (ukFiles.length === 0) {
    console.log('No Ukrainian blog posts found to translate.');
    return;
  }

  for (const file of ukFiles) {
    const slug = path.basename(file, '.mdoc');
    const enFile = `${slug}-en.mdoc`;
    const enFilePath = path.join(blogDir, enFile);

    if (fs.existsSync(enFilePath)) {
      console.log(`[Skip] English translation already exists for: ${file}`);
      continue;
    }

    console.log(`\n[Translate] Translating: ${file} ...`);
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split frontmatter and content
    const parts = fileContent.split('---');
    if (parts.length < 3) {
      console.warn(`[Warn] Invalid format for file: ${file}`);
      continue;
    }

    const frontmatterRaw = parts[1];
    const bodyContent = parts.slice(2).join('---');

    // Parse frontmatter
    const fmData = parseFrontmatter(frontmatterRaw);

    // Translate fields
    console.log(`- Translating title: "${fmData.title}"`);
    const translatedTitle = await callTranslateApi(fmData.title, 'uk', 'en');

    console.log(`- Translating description...`);
    const translatedDescription = await callTranslateApi(fmData.description, 'uk', 'en');

    console.log(`- Translating body content...`);
    const translatedBody = await translateMarkdownContent(bodyContent, 'uk', 'en');

    // Handle readTime (e.g., "5 хв" -> "5 mins")
    let translatedReadTime = '5 mins';
    if (fmData.readTime) {
      const match = fmData.readTime.match(/(\d+)/);
      if (match) {
        translatedReadTime = `${match[1]} mins`;
      }
    }

    // Reconstruct frontmatter
    let newFrontmatter = '\n';
    newFrontmatter += `title: "${translatedTitle.replace(/"/g, '\\"')}"\n`;
    newFrontmatter += `description: "${translatedDescription.replace(/"/g, '\\"')}"\n`;
    newFrontmatter += `date: ${fmData.date || new Date().toISOString().split('T')[0]}\n`;
    if (fmData.coverImage) {
      newFrontmatter += `coverImage: ${fmData.coverImage}\n`;
    }
    newFrontmatter += `category: ${fmData.category || 'general'}\n`;
    newFrontmatter += `author: ${fmData.author || 'SiteNest Expert'}\n`;
    newFrontmatter += `readTime: ${translatedReadTime}\n`;
    newFrontmatter += `language: en\n`;

    const newFileContent = `---${newFrontmatter}---${translatedBody}`;

    fs.writeFileSync(enFilePath, newFileContent, 'utf-8');
    console.log(`[Success] Saved English translation to: ${enFile}`);
  }

  console.log('\nAll translations completed successfully!');
}

run();
