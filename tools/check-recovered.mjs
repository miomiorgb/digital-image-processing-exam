import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

// Read-only deterministic checks. These do not claim browser layout coverage.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['content-a.js','content-b.js','content.js','model-answers-a.js','model-answers-b.js','answers.js','app.js'];
const source=Object.fromEntries(files.map(name=>[name,fs.readFileSync(path.join(root,'public',name),'utf8')]));
let passed=0;
function test(name,fn){try{fn();passed++;console.log(`PASS ${name}`);}catch(error){console.error(`FAIL ${name}`);throw error;}}
function close(actual,expected,tolerance=1e-10){assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} differs from ${expected}`);}
function plain(html){return String(html).replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ');}
function makeHarness(){
 const nodes=new Map(),storage=new Map();
 function node(){
  let html='',text='';const classes=new Set();
  return {get innerHTML(){return html;},set innerHTML(x){html=String(x);text=plain(html);},get textContent(){return text;},set textContent(x){text=String(x);html=text;},value:'',dataset:{},disabled:false,readOnly:false,className:'',classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle(c,on){if(on)classes.add(c);else classes.delete(c);}},focus(){},prepend(){},insertAdjacentHTML(){},setAttribute(){},removeAttribute(){},showModal(){},close(){},click(){}};
 }
 function getNode(selector){if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);}
 const sandbox={console,Date,Math,setTimeout(){return 0;},clearTimeout(){},location:{hash:''},scrollTo(){},addEventListener(){},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},document:{querySelector:s=>s==='.storage-alert'?null:getNode(s),querySelectorAll:()=>[],createElement:node,body:node(),addEventListener(){}}};
 sandbox.window=sandbox;vm.createContext(sandbox);
 const run=code=>vm.runInContext(code,sandbox,{timeout:3000});
 for(const file of files)run(source[file]);
 return {run,getNode,json:code=>JSON.parse(run(`JSON.stringify(${code})`)),html:()=>getNode('#main').innerHTML};
}
const h=makeHarness(),questions=h.json('Q'),models=h.json('MODEL_ANSWERS');
const expectedPriority=[1,2,3,7,8,9,10,12,13,14,15,17,18,20,24,25,26,27,28,30];

test('recovered originals yield 32 teachable cards and all 20 teacher priorities',()=>{
 assert.deepEqual(questions.map(q=>q.id),Array.from({length:34},(_,i)=>i+1));
 assert.equal(questions.filter(q=>!q.blocked).length,32);
 assert.deepEqual(questions.filter(q=>q.blocked).map(q=>q.id),[11,19]);
 assert.equal(Object.keys(models).length,32);
 assert.equal(h.run('active().length'),20);
 assert.deepEqual(h.json('PRIORITY_IDS'),expectedPriority);
 assert.deepEqual(h.json('UNCERTAIN_IDS'),[5,29]);
 for(const id of [1,24]){
  const q=questions.find(x=>x.id===id),model=models[id];
  assert.ok(!q.blocked&&!q.missing,`Q${id} should be playable, without a missing-problem flag.`);
  for(const field of ['en','zh','intuition','trap','problemHtml'])assert.ok(q[field]?.length,`Q${id}: ${field}`);
  assert.ok(q.points?.length>=3&&q.points.every(p=>p.label&&p.text&&p.en&&p.aliases?.length));
  assert.ok(q.cues?.length>=2&&q.variants?.length>=2);
  assert.equal(q.quiz.options.length,4);assert.ok(q.quiz.answer>=0&&q.quiz.answer<4&&q.quiz.explain);
  assert.equal((q.cloze.text.match(/___/g)||[]).length,1);assert.ok(q.cloze.answers?.length&&q.cloze.explain);
  assert.ok(model?.english?.length>300&&model?.chinese?.length>200&&model.scoring?.length>=3,`Q${id}: complete bilingual model.`);
 }
});

test('the supplied transmission data and the full 4 by 8 image are preserved',()=>{
 const q1=questions.find(q=>q.id===1),q24=questions.find(q=>q.id===24);
 for(const value of ['1024','256','56','3000'])assert.ok(plain(q1.problemHtml).includes(value),`Q1 input ${value}`);
 const pre=q24.problemHtml.match(/<pre\b[^>]*>([\s\S]*?)<\/pre>/i);
 const matrixText=plain(pre?.[1]||q24.problemHtml.replace(/<tr\b[^>]*>|<\/tr>|<br\s*\/?\s*>/gi,'\n'));
 const matrixRows=matrixText.split(/\r?\n/).map(line=>[...line.matchAll(/\b\d+\b/g)].map(value=>Number(value[0]))).filter(row=>row.length===8);
 assert.deepEqual(matrixRows,Array.from({length:4},()=>[21,21,21,95,169,243,243,243]));
 // Problem displays contain inputs, never precomputed final results.
 assert.doesNotMatch(plain(q1.problemHtml),/187\.24|3\.495|8,?388,?608|10,?485,?760/);
 assert.doesNotMatch(plain(q24.problemHtml),/1\.811|1\.875|4\.266|96\.60|76\.56/);
});

test('both languages of each complete model agree with the independent calculations',()=>{
 for(const language of ['english','chinese']){
  const transmission=plain(models[1][language]).replace(/[\s,，]/g,'');
  for(const value of ['8388608','10485760'])assert.ok(transmission.includes(value),`Q1 ${language}: ${value}`);
  assert.match(transmission,/187\.24/);assert.match(transmission,/3\.495|3\.50/);
  const huffman=plain(models[24][language]).replace(/[\s,，]/g,'');
  assert.match(huffman,/1\.811/);assert.match(huffman,/1\.875/);
  assert.match(huffman,/4\.266|4\.27/);assert.match(huffman,/96\.60|96\.6/);
  assert.ok(huffman.includes('256')&&huffman.includes('60'));
 }
});

test('study, independent recall, variants and answers all retain the actual inputs',()=>{
 for(const id of [1,24]){
  const q=questions.find(x=>x.id===id);
  h.run(`current={q:Q.find(q=>q.id===${id}),stage:0,revealed:false,hint:false,checked:false};session=null;renderStudy();`);
  assert.ok(h.html().includes(q.problemHtml),`Q${id}: study input display`);
  assert.match(h.html(),/★ 老师重点/);
  h.run(`renderAnswer(${id});`);
  assert.ok(h.html().includes(q.problemHtml),`Q${id}: answer input display`);
  assert.ok(h.html().includes(models[id].english),`Q${id}: complete model displayed`);
  for(let variant=0;variant<q.variants.length;variant++){
   h.run(`current={q:Q.find(q=>q.id===${id}),stage:3,revealed:false,hint:false,checked:false};session={kind:'exam',ids:[${id}],index:0,order:${variant},results:[],retries:[]};renderRecall(true);`);
   assert.ok(h.html().includes(q.problemHtml),`Q${id}: recall variant ${variant} input display`);
   assert.doesNotMatch(h.html(),/class="model-answer|class="model-paper/);
   assert.ok(!h.html().includes(models[id].english));
   assert.ok(!h.html().includes(models[id].chinese));
   if(id===1)assert.doesNotMatch(plain(h.html()),/187\.24|3\.495|8,?388,?608|10,?485,?760/);
   else assert.doesNotMatch(plain(h.html()),/1\.811|1\.875|4\.266|96\.60|76\.56/);
  }
 }
 h.run('current=null;session=null;');
});

test('teacher scope and uncertain labels remain separate with either practice setting',()=>{
 for(const include of [false,true]){
  h.run(`db.includeUncertain=${include};`);
  assert.equal(h.run('active().length'),include?22:20);
  for(const [scope,size] of [['priority',20],['uncertain',2],['all',34]]){
   h.run(`filter='${scope}';query='';topic='all';renderLibrary();`);
   const library=h.getNode('#question-results').innerHTML;
   assert.equal((library.match(/class="question-row/g)||[]).length,size);
   h.run(`answerScope='${scope}';answerQuery='';renderAnswers();`);
   const answers=h.getNode('#answer-list').innerHTML;
   assert.equal((answers.match(/class="question-row/g)||[]).length,size);
   if(scope==='all'){
    for(const html of [library,answers]){
     assert.equal((html.match(/★ 老师重点/g)||[]).length,20);
     assert.equal((html.match(/标记待确认/g)||[]).length,2);
    }
   }
  }
  for(const id of [5,29])assert.doesNotMatch(h.run(`priorityBadge(Q.find(q=>q.id===${id}))`),/老师重点/);
 }
 h.run('db.includeUncertain=false;renderHome();');
 for(const text of [h.html(),h.run('priorityOverview()')])assert.doesNotMatch(text,/另 2 题待补原题|第 1、24 题待补|第 1、24 题需要补充/);
});

test('transmission counts every byte frame and uses one bit per symbol with decimal K',()=>{
 const slow=h.json('transmissionMetrics(1024,1024,56)'),fast=h.json('transmissionMetrics(1024,1024,3000)');
 assert.equal(slow.pixels,1048576);assert.equal(slow.payload,8388608);assert.equal(slow.overhead,2097152);assert.equal(slow.total,10485760);assert.equal(slow.rate,56000);
 close(slow.seconds,187.24571428571429);close(fast.seconds,3.4952533333333333);
 close(slow.overhead/slow.payload,.25);close(slow.overhead/slow.total,.2);
 const one=h.json('transmissionMetrics(1,1,1)');assert.equal(one.total,10);assert.equal(one.rate,1000);close(one.seconds,.01);
 const wider=h.json('transmissionMetrics(2048,1024,56)'),faster=h.json('transmissionMetrics(1024,1024,112)');
 assert.equal(wider.total,slow.total*2);close(wider.seconds,slow.seconds*2);close(faster.seconds,slow.seconds/2);
 for(const args of ['0,1024,56','1.5,1,56','1,1,0','1,1,NaN','16385,1,56'])assert.throws(()=>h.run(`transmissionMetrics(${args})`));
});

function independentlyCheckHuffman(counts){
 const m=h.json(`imageHuffmanMetrics(${JSON.stringify(counts)})`),sum=counts.reduce((a,b)=>a+b,0),codes=m.rows.map(r=>r.code);
 assert.equal(m.total,sum);assert.equal(m.rows.length,4);
 for(let i=0;i<4;i++){
  assert.match(codes[i],/^[01]+$/);assert.equal(m.rows[i].count,counts[i]);
  close(m.rows[i].p,counts[i]/sum);assert.equal(m.rows[i].length,codes[i].length);
  for(let j=0;j<4;j++)if(i!==j)assert.ok(!codes[j].startsWith(codes[i]),`${codes[i]} prefixes ${codes[j]}`);
 }
 const weighted=counts.reduce((s,n,i)=>s+n*codes[i].length,0),entropy=-counts.reduce((s,n)=>s+(n/sum)*Math.log2(n/sum),0);
 assert.equal(m.bits,weighted);close(m.average,weighted/sum);close(m.entropy,entropy);
 // Four-symbol full binary trees have length profiles (2,2,2,2) or (1,2,3,3).
 const descending=[...counts].sort((a,b)=>b-a),optimal=Math.min(2*sum,descending[0]+2*descending[1]+3*descending[2]+3*descending[3]);
 assert.equal(m.bits,optimal,'Huffman length should be optimal, including skewed distributions.');
 assert.ok(m.entropy<=m.average+1e-12&&m.average<m.entropy+1+1e-12);
 close(codes.reduce((s,c)=>s+2**(-c.length),0),1);
 close(m.efficiency,m.entropy/m.average);close(m.redundancy,1-m.efficiency);close(m.saving,1-m.bits/(8*sum));
 assert.equal(m.rawBits,8*sum);close(m.compression,m.rawBits/m.bits);assert.equal(m.packedBytes,Math.ceil(m.bits/8));
 // Decode a stream containing every symbol and multiple codeword boundaries.
 const symbols=[0,1,2,3,3,2,1,0,0,3,1,2],stream=symbols.map(i=>codes[i]).join(''),decoded=[];
 let prefix='';for(const bit of stream){prefix+=bit;const index=codes.indexOf(prefix);if(index>=0){decoded.push(index);prefix='';}}
 assert.equal(prefix,'');assert.deepEqual(decoded,symbols);
 return m;
}

test('image Huffman original has the correct entropy, bit length and distinct metrics',()=>{
 const m=independentlyCheckHuffman([12,4,4,12]);
 close(m.entropy,1.811278124459133);close(m.average,1.875);assert.equal(m.bits,60);assert.equal(m.rawBits,256);
 close(m.compression,4.266666666666667);close(m.efficiency,.9660149997115376);close(m.redundancy,.03398500028846241);close(m.saving,.765625);assert.equal(m.packedBytes,8);
 assert.notEqual(m.redundancy,m.saving,'Coding redundancy and storage saving have different denominators.');
});

test('Huffman remains decodable and optimal for uniform, skewed, changed and scaled data',()=>{
 const uniform=independentlyCheckHuffman([1,1,1,1]);close(uniform.entropy,2);close(uniform.average,2);close(uniform.efficiency,1);assert.equal(uniform.bits,8);
 const skewed=independentlyCheckHuffman([1000,1,1,1]);assert.equal(skewed.bits,1008);assert.equal(skewed.rows[0].length,1);
 independentlyCheckHuffman([1,2,7,15]);
 const original=independentlyCheckHuffman([12,4,4,12]),scaled=independentlyCheckHuffman([24,8,8,24]);
 close(scaled.entropy,original.entropy);close(scaled.average,original.average);assert.equal(scaled.bits,2*original.bits);
 for(const counts of [[1,1,1],[0,1,1,1],[1.2,1,1,1],[1,1,1,NaN],[1000001,1,1,1]])assert.throws(()=>h.run(`imageHuffmanMetrics([${counts.join(',')}])`));
});

test('both new labs withhold results until a prediction and render the calculated values',()=>{
 for(const tab of ['transmission','image-huffman']){
  h.run(`labTab='${tab}';renderLab();`);
  const input=h.getNode('#lab-body').innerHTML;
  assert.match(input,/id="lab-prediction"/);assert.match(input,/id="lab-result"[^>]*><\/div>/);
  assert.doesNotMatch(plain(input),/187\.24|3\.495|1\.811|1\.875|4\.266|96\.60/);
  h.getNode('#lab-prediction').value='';h.getNode('#lab-result').innerHTML='';h.run('runLab();');assert.equal(h.getNode('#lab-result').innerHTML,'');
  h.getNode('#lab-prediction').value='我的预测';
  if(tab==='transmission'){
   h.getNode('#tx-width').value='1024';h.getNode('#tx-height').value='1024';h.getNode('#tx-rate').value='56';
  }else h.getNode('#huffman-counts').value='12 4 4 12';
  h.run('runLab();');const output=plain(h.getNode('#lab-result').innerHTML);
  if(tab==='transmission'){assert.match(output,/187\.2457/);assert.match(output,/3\.4953/);assert.match(output,/10,485,760/);}
  else {assert.match(output,/1\.811278/);assert.match(output,/1\.875000/);assert.match(output,/60 bit/);assert.match(output,/96\.6015/);assert.match(output,/76\.5625/);assert.match(output,/8 字节/);}
 }
});
console.log(`PASS ${passed} recovered-problem and calculation integration checks.`);
