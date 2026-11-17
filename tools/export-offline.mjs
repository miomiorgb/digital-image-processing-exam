import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
let html = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${fs.readFileSync(path.join(directory, 'style.css'), 'utf8')}</style>`);
html = html.replace('<script src="content-a.js"></script>', '<script>window.OFFLINE_MODE=true;</script><script src="content-a.js"></script>');
for (const filename of ['content-a.js', 'content-b.js', 'content.js', 'model-answers-a.js', 'model-answers-b.js', 'answers.js', 'app.js']) {
  html = html.replace(`<script src="${filename}"></script>`, `<script>${fs.readFileSync(path.join(directory, filename), 'utf8').replace(/<\/script/gi, '<\\/script')}</script>`);
}
fs.writeFileSync(path.join(directory, 'offline.html'), html);
console.log(`Offline version rebuilt (${Buffer.byteLength(html)} bytes).`);
