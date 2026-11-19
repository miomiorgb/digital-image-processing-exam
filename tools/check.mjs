import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetDirectory = path.join(root, 'public');
const expected = [
  'index.html', 'style.css', 'content-a.js', 'content-b.js', 'content.js',
  'model-answers-a.js', 'model-answers-b.js', 'answers.js', 'app.js', 'offline.html'
];
const assets = new Map(expected.map(name => [name, fs.readFileSync(path.join(assetDirectory, name), 'utf8')]));
const actual = fs.readdirSync(assetDirectory).sort();
assert.deepEqual(actual, [...expected].sort(), 'Only declared public browser assets belong in public/.');
const html = assets.get('index.html');
for (const [, reference] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^https?:/.test(reference)) continue;
  assert.ok(assets.has(reference), `Missing asset referenced by index.html: ${reference}`);
}
for (const [name, text] of assets) {
  assert.ok(!/art_v2_|github_pat_|ghp_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|C:[\\/]Users[\\/]/i.test(text), `Private material found in ${name}`);
  if (name.endsWith('.js')) new vm.Script(text, { filename: name });
}
const context = vm.createContext({ window: {} });
for (const name of ['content-a.js', 'content-b.js', 'content.js', 'model-answers-a.js', 'model-answers-b.js']) {
  vm.runInContext(assets.get(name), context, { filename: name });
}
const questions = context.window.QUESTIONS;
const models = { ...context.window.MODEL_ANSWERS_A, ...context.window.MODEL_ANSWERS_B, ...context.window.MODEL_ANSWERS_RECOVERED };
assert.equal(questions.length, 34);
assert.equal(new Set(questions.map(q => q.id)).size, 34);
assert.deepEqual(Array.from(questions.filter(q => q.blocked), q => q.id), [11, 19]);
assert.equal(Object.keys(models).length, 32);
for (const q of questions.filter(q => !q.blocked)) {
  const model = models[q.id];
  assert.ok(model?.english?.length > 300 && model?.chinese?.length > 200, `Missing complete bilingual model for Q${q.id}`);
}
const offline = assets.get('offline.html');
assert.ok(!/<script\b[^>]*\bsrc=|<link\b[^>]*rel="stylesheet"/i.test(offline), 'Offline bundle still has external application files.');
const inlineScripts = [...offline.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(inlineScripts.length, 8, 'Offline bundle should contain the flag plus seven current scripts.');
for (const [index, script] of inlineScripts.entries()) new vm.Script(script[1], { filename: `offline-script-${index}.js` });
assert.ok(offline.includes('window.MODEL_ANSWERS_A') && offline.includes('window.MODEL_ANSWERS_B'));
assert.ok(offline.includes('window.MODEL_ANSWERS_RECOVERED'), 'The recovered Q1 and Q24 models must also be available offline.');
assert.ok(!fs.existsSync(path.join(root, '.openai')), 'Private Sites metadata must not enter the public checkout.');
assert.ok(!fs.existsSync(path.join(root, 'private-source')), 'Original private source files must not enter the public checkout.');
const config = JSON.parse(fs.readFileSync(path.join(root, 'wrangler.jsonc'), 'utf8'));
assert.equal(config.name, 'digital-image-processing-exam');
assert.equal(config.assets.directory, './public');
assert.ok(!config.main && !config.d1_databases && !config.vars, 'This is an asset-only public Worker.');
console.log('PASS public assets, references, syntax, 34 question numbers, 32 bilingual models, offline bundle and clean static Workers configuration.');
