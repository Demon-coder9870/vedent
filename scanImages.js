const fs = require('fs');
const path = require('path');
const publicDir = path.join(process.cwd(), 'public');

let issues = [];

function checkCaseSensitive(imgPath) {
  if (imgPath.startsWith('http') || imgPath.startsWith('data:')) return { exists: true, isWrong: false };
  const normalizedPath = imgPath.startsWith('/') ? imgPath : '/' + imgPath;
  const parts = normalizedPath.split('/').filter(Boolean);
  let currentPath = publicDir;
  let correctParts = [];
  let isWrong = false;
  
  for (const part of parts) {
    if (!fs.existsSync(currentPath)) return { exists: false, isWrong: false };
    
    // Ignore query params or hashes if present
    const cleanPart = part.split('?')[0].split('#')[0];
    
    const items = fs.readdirSync(currentPath);
    if (!items.includes(cleanPart)) {
      const match = items.find(i => i.toLowerCase() === cleanPart.toLowerCase());
      if (match) {
        correctParts.push(match);
        isWrong = true;
        currentPath = path.join(currentPath, match);
      } else {
        return { exists: false, isWrong: false };
      }
    } else {
      correctParts.push(cleanPart);
      currentPath = path.join(currentPath, cleanPart);
    }
  }
  return { exists: true, isWrong, correctPath: '/' + correctParts.join('/') };
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        scanDir(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.css') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /['\"\`\(](\/images\/[^'\"\`\)\s]+)['\"\`\)]?/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const imgPath = match[1];
        const res = checkCaseSensitive(imgPath);
        if (!res.exists || res.isWrong) {
          issues.push({ file: fullPath, original: imgPath, ...res });
        }
      }
    }
  }
}

scanDir(path.join(process.cwd(), 'src'));
console.log('Total issues found:', issues.length);
console.log(JSON.stringify(issues, null, 2));
