const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('e:/sitenest_agency');
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  if (content.includes("import Link from 'next/link';")) {
    content = content.replace(/import Link from 'next\/link';/g, "import { Link } from '@/components/Link';");
    changed = true;
  }
  if (content.includes('import Link from "next/link";')) {
    content = content.replace(/import Link from "next\/link";/g, "import { Link } from '@/components/Link';");
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
