'use strict';
const Q=window.QUESTIONS, KEY='dip-recall-v1', DAY=86400000;
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;};
const fresh=()=>({version:1,records:{},drafts:{},includeUncertain:false,history:[]});
let db=fresh(),storageOK=true,session=null,current=null,filter='priority',query='',topic='all',cueQuestion=null,labTab='distance',resumeState=null;
try{const saved=localStorage.getItem(KEY);if(saved)db=validate(JSON.parse(saved));}catch{storageOK=false;}
try{const x=JSON.parse(localStorage.getItem(KEY+'-unfinished')||'null');if(x&&Q.some(q=>q.id===x.id&&!q.blocked)&&Number.isInteger(x.stage)&&x.stage>=0&&x.stage<=3){
 resumeState={id:x.id,stage:x.stage,hint:x.hint===true,session:null};const s=x.session;
 if(s&&['daily','weak','exam'].includes(s.kind)&&Array.isArray(s.ids)&&s.ids.length<=100&&s.ids.every(id=>Q.some(q=>q.id===id&&!q.blocked))&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.ids.length){resumeState.session={kind:s.kind,ids:s.ids,index:s.index,results:Array.isArray(s.results)?s.results.filter(r=>Number.isFinite(r.id)&&Number.isFinite(r.score)):[],retries:Array.isArray(s.retries)?s.retries:[],order:Number(s.order)||0};}
}}catch{}
function saveLearning(){if(!current||current.q.blocked)return;resumeState={id:current.q.id,stage:current.stage,hint:current.hint||current.revealed,session};try{localStorage.setItem(KEY+'-unfinished',JSON.stringify(resumeState));}catch{}}
function clearLearning(){resumeState=null;try{localStorage.removeItem(KEY+'-unfinished');}catch{}}
function validate(x){
 if(!x||x.version!==1||typeof x.records!=='object'||Array.isArray(x.records))throw Error('备份格式不正确');
 const out=fresh();out.includeUncertain=x.includeUncertain===true;
 for(const q of Q){const r=x.records[q.id];if(r&&typeof r==='object')out.records[q.id]={seen:r.seen===true,quiz:Math.max(0,Math.min(10000,Number(r.quiz)||0)),gaps:Math.max(0,Math.min(10000,Number(r.gaps)||0)),attempts:Math.max(0,Math.min(10000,Number(r.attempts)||0)),lapses:Math.max(0,Math.min(10000,Number(r.lapses)||0)),streak:Math.max(0,Math.min(5,Number(r.streak)||0)),due:Number.isFinite(r.due)?r.due:0,lastDay:typeof r.lastDay==='string'?r.lastDay.slice(0,20):'',lastScore:Number.isFinite(r.lastScore)?r.lastScore:0,successDays:Array.isArray(r.successDays)?r.successDays.filter(v=>typeof v==='string').slice(-20):[]};
  if(typeof x.drafts?.[q.id]==='string')out.drafts[q.id]=x.drafts[q.id].slice(0,20000);
 }
 out.history=Array.isArray(x.history)?x.history.filter(h=>h&&typeof h.day==='string'&&Number.isFinite(h.id)&&Number.isFinite(h.score)).slice(-1000):[];return out;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));}catch{storageOK=false;showStorageAlert();}}
function showStorageAlert(){if(!$('.storage-alert')){const el=document.createElement('div');el.className='storage-alert';el.textContent='此浏览器无法保存进度。请使用“进度备份”导出记录后再离开。';document.body.prepend(el);}}
function rec(id){return db.records[id]||{seen:false,quiz:0,gaps:0,attempts:0,lapses:0,streak:0,due:0,lastScore:0,successDays:[]};}
function patchRec(id,patch){db.records[id]={...rec(id),...patch};save();}
function isMastered(id){return rec(id).streak>=2&&rec(id).successDays?.length>=2;}
function teacherPriority(q){return PRIORITY_IDS.includes(q.id);}
function priority(q){return teacherPriority(q)||(db.includeUncertain&&UNCERTAIN_IDS.includes(q.id));}
function priorityBadge(q,showOther=false){return teacherPriority(q)?'<span class="priority-badge">★ 老师重点</span>':UNCERTAIN_IDS.includes(q.id)?'<span class="priority-badge uncertain">标记待确认</span>':showOther?'<span class="priority-badge supplementary">补充练习</span>':'';}
function priorityRowClass(q){return teacherPriority(q)?' teacher-priority':UNCERTAIN_IDS.includes(q.id)?' priority-uncertain':'';}
function priorityOverview(destination='answer'){return `<section class="priority-overview" aria-label="老师重点题目"><div class="priority-heading"><strong>★ 老师重点 · ${PRIORITY_IDS.length} 题</strong><span>按老师手写照片标注</span></div><div class="priority-numbers">${PRIORITY_IDS.map(id=>`<a href="#${destination}/${id}" aria-label="第 ${id} 题，老师重点">${id}</a>`).join('')}</div><p>第 1 题特别注明教材 2.9；第 1、24 题待补原题。第 5、29 题有涂改，标记待确认。</p></section>`;}
function active(){return Q.filter(q=>priority(q)&&!q.blocked);}
function due(q){return rec(q.id).attempts>0&&rec(q.id).due<=Date.now();}
function weak(q){const r=rec(q.id);return r.attempts>0&&r.lastScore<.8;}
function status(q){if(q.blocked)return ['待补原题','warn'];if(due(q))return ['该复习了','warn'];if(isMastered(q.id))return ['已稳定回忆',''];if(rec(q.id).attempts)return ['回忆练习中',''];if(rec(q.id).seen)return ['已理解','gray'];return ['未开始','gray'];}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2800);}
function navigate(hash){if(location.hash===hash)route();else location.hash=hash;}
function route(){
 const hash=location.hash.slice(1)||'home',name=hash.split('/')[0];
 const titles={home:'今天怎么学',answers:'标准作答范本',answer:'完整作答范本',library:'作业题库',study:'分步学习',cues:'英文题眼',lab:'计算练习',exam:'变式自测',session:'主动回忆'};
 $('#page-name').textContent=titles[name]||'今天怎么学';
 document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===name||(name==='answer'&&a.dataset.nav==='answers')||(name==='study'&&a.dataset.nav==='library')||(name==='session'&&a.dataset.nav==='home'));a.removeAttribute('aria-current');if(a.classList.contains('active'))a.setAttribute('aria-current','page');});
 if(name==='study'){session=null;const q=Q.find(q=>q.id===Number(hash.split('/')[1]));if(q){const r=resumeState?.id===q.id?resumeState:null;current={q,stage:r?.stage||0,revealed:false,hint:r?.hint||false,checked:false};renderStudy();}else renderHome();}
 else if(name==='library')renderLibrary();else if(name==='answers')renderAnswers();else if(name==='answer'){session=null;renderAnswer(Number(hash.split('/')[1]));}else if(name==='cues')renderCues();else if(name==='lab')renderLab();else if(name==='exam')renderExam();else if(name==='session'&&(session||resumeState?.session)){if(!session)session=resumeState.session;renderSession();}else{$('#page-name').textContent='今天怎么学';renderHome();}
 window.scrollTo(0,0);
}
function mount(html){$('#main').innerHTML=html;}
function button(label,action,cls='primary',extra=''){return `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;}
function renderHome(){
 if(resumeState){setTimeout(()=>{const hero=$('.hero>div');if(hero&&!$('#resume-button'))hero.insertAdjacentHTML('beforeend',`<p style="margin-top:15px;margin-bottom:0"><button id="resume-button" class="text-button" data-action="resume">继续上次未完成的作答 · 第 ${resumeState.id} 题 →</button></p>`);},0);}
 const a=active(),master=a.filter(q=>isMastered(q.id)).length,seen=a.filter(q=>rec(q.id).seen).length,waiting=a.filter(due).length,done=db.history.filter(h=>h.day===today()).length;
 const groups=[['基础与空间域',[2,3,7,8,9,10,12,13,17],'从像素、灰度到邻域运算'],['频域与几何处理',[14,15,18,20],'理解原理，把步骤接起来'],['压缩与图像分割',[25,26,27,28,30],'抓住概念间的区别与联系']];
 mount(`<section class="hero"><div><span class="eyebrow">A LITTLE EVERY DAY</span><h1>看懂题眼，<br>写出完整答案。</h1><p>每道题都有一份完整的中英文作答范本。<br class="desktop">先看懂该怎么写，再逐步撤掉提示，独立写出来。</p><a class="primary" href="#answers">先看标准作答范本 <span>↗</span></a><p style="margin:12px 0 0">${button('开始今天的 6 题 →','start-daily','text-button')}</p></div><div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="orbit-two"></div><span class="tiny-star">✳</span><div class="art-note n1"><small>看懂英文题眼</small>median filter</div><div class="art-note n2"><small>连接答案主线</small>sort → middle</div><div class="art-note n3"><small>自己想起，才记得住</small>理解 · 回忆 · 再相遇</div></div></section>
 ${priorityOverview()}<section class="stats" aria-label="复习进度"><div class="stat"><div class="stat-label">当前范围可练</div><div class="stat-number">${a.length}<small>另 2 题待补原题</small></div></div><div class="stat"><div class="stat-label">已稳定回忆</div><div class="stat-number">${master}<small>/ ${a.length} 题</small></div></div><div class="stat"><div class="stat-label">到期复习</div><div class="stat-number">${waiting}<small>优先再想一遍</small></div></div><div class="stat"><div class="stat-label">今天完成回忆</div><div class="stat-number">${done}<small>次 · 已理解 ${seen} 题</small></div></div></section>
 <div class="section-heading"><h2>给今天一个小目标</h2><p>不赶进度，把一次回忆做扎实</p></div><section class="plan-grid"><article class="plan green"><span class="eyebrow">01 / 推荐路线</span><h3>一轮 6 题，慢慢撤掉提示</h3><p>新题先学，旧题先想。到期题和薄弱题会优先出现。</p><div class="steps"><span><b class="number-circle">1</b>理解</span><i>→</i><span><b class="number-circle">2</b>题眼</span><i>→</i><span><b class="number-circle">3</b>补词</span><i>→</i><span><b class="number-circle">4</b>回忆</span></div>${button('进入分步学习 →','start-daily')}</article><article class="plan"><span class="eyebrow">02 / 加固记忆</span><h3>再看一次容易忘的题</h3><p>${a.filter(weak).length?`${a.filter(weak).length} 题上次回忆还不完整。重新练时，从写答案开始。`:'还没有薄弱记录。完成回忆后，答不稳的题会留在这里。'}</p>${button('薄弱题再练 ↗','start-weak','secondary',a.filter(weak).length?'':'disabled')} <a class="text-button" href="#cues" style="font-size:11px;margin-left:12px">先练英文题眼</a></article></section>
 <div class="section-heading"><h2>知识主线</h2><a href="#library" class="text-button" style="font-size:11px">查看全部作业 ↗</a></div><section class="topic-list">${groups.map(([title,ids,desc])=>{const count=ids.filter(id=>rec(id).seen).length;return `<a href="#library" class="topic-card"><strong>${esc(title)}</strong><p>${esc(desc)} · 已理解 ${count}/${ids.length}</p><div class="progress-track"><span style="width:${count/ids.length*100}%"></span></div></a>`;}).join('')}</section>
 <p class="notice"><b>范围已核对</b> 照片中 20 个未划掉的题号优先练习。第 5、29 题有划改痕迹，可在设置中加入。教材题 1、24 缺题干，不计入可练完成率。<br>“已稳定回忆”需要至少两个不同日期独立回忆达标。已看过、选择题答对与独立回忆分别记录。</p>`);
}
function renderLibrary(){
 const topics=[...new Set(Q.map(q=>q.topic))];
 mount(`<span class="eyebrow">THE QUESTION COLLECTION</span><h1 class="page-title">作业题库</h1><p class="lede">保留原作业编号。先学照片中的重点，再按需要补充其余题。每题提供完整英文作答与中文对照，先看范本，再用分步练习记牢。</p>${priorityOverview("study")}<div class="toolbar"><input class="search" id="search" aria-label="搜索题号中文或英文" placeholder="搜索题号、中文或 English…" value="${esc(query)}"><select id="topic-filter" aria-label="按主题筛选"><option value="all">全部主题</option>${topics.map(t=>`<option ${t===topic?'selected':''}>${esc(t)}</option>`).join('')}</select></div><div class="chips">${[['priority','老师重点 · 20 题'],['uncertain','标记待确认 · 2 题'],['all','全部 34 题'],['weak','薄弱题'],['due','到期复习'],['missing','原题有缺失']].map(([v,l])=>button(l,'filter','chip'+(filter===v?' selected':''),`data-value="${v}"`)).join('')}</div><div id="question-results"></div>`);renderRows();
}
function renderRows(){
 const items=Q.filter(q=>(topic==='all'||q.topic===topic)&&(`${q.id} ${q.title} ${q.en} ${q.zh} ${(q.cues||[]).map(c=>c.en).join(' ')}`.toLowerCase().includes(query.toLowerCase()))).filter(q=>filter==='all'||filter==='priority'&&teacherPriority(q)||filter==='uncertain'&&UNCERTAIN_IDS.includes(q.id)||filter==='weak'&&weak(q)||filter==='due'&&due(q)||filter==='missing'&&q.missing);
 $('#question-results').innerHTML=`<p class="info-text">${items.length} 题${filter==='priority'?' · 第 1、24 题需要补充教材原题':''}</p><div class="question-list">${items.map(q=>{const [s,c]=status(q);return `<a class="question-row${priorityRowClass(q)}" href="#study/${q.id}"><span class="question-num">${String(q.id).padStart(2,'0')}</span><div><div class="question-title"><h3>${esc(q.title)}</h3>${priorityBadge(q)}</div><p>${esc(q.en)}</p></div><span class="badge ${c}">${s}</span></a>`;}).join('')||'<p class="empty">没有符合条件的题目。</p>'}</div>`;
}
function questionHeader(q,en=q.en){return `<span class="subtle-label">作业 ${String(q.id).padStart(2,'0')} · ${esc(q.topic)}</span><h1 class="question-en">${esc(en)}</h1><p class="question-zh">${esc(q.zh)}</p>`;}
function pointHTML(q,english=true){return (q.points||[]).map((p,i)=>`<section class="point"><strong>${i+1}. ${esc(p.label)}</strong><p>${esc(p.text)}</p>${english?`<p class="english">${esc(p.en)}</p>`:''}</section>`).join('');}
function studyOuter(inner){const q=current.q;mount(`<div class="study-shell">${button('← 返回题库','back-library','back-link')}<div class="study-top"><span>${session?`本轮 ${session.index+1} / ${session.ids.length} 题`:'按自己的节奏，完成这一题'}</span><span>${priorityBadge(q,true)}</span></div><div class="stage-nav">${['理解答案','认英文题眼','补关键短语','独立回忆'].map((s,i)=>`<span class="${i===current.stage?'current':''}">${i+1} ${s}</span>`).join('')}</div><article class="study-card">${inner}</article></div>`);}
function renderStudy(){
 const {q,stage}=current;
 saveLearning();
 if(q.blocked){studyOuter(`${questionHeader(q)}<div class="example">${esc(q.missing)}</div><p class="info-text">待补题不参与自动出题与掌握率。可以把原题发回此聊天，后续补入同一题库。</p><div class="study-actions"><a href="#library" class="primary">返回可练题目</a></div>`);return;}
if(stage===0){studyOuter(`${questionHeader(q)}${q.missing?`<div class="notice"><b>原题资料不完整：</b>${esc(q.missing)}</div>`:''}<div class="intuition">${esc(q.intuition)}</div>${answerLink(q)}<span class="subtle-label">先理解这份完整答案的结构</span>${pointHTML(q)}${q.example?`<details><summary>展开完整算例 / 推导</summary><div class="example">${q.example}</div></details>`:''}<p class="trap">容易混淆：${esc(q.trap)}</p><div class="study-actions"><small>先试着用自己的话串起这些要点。</small>${button('我理解了，认题眼 →','next-stage')}</div>`);}
 else if(stage===1){studyOuter(`${questionHeader(q)}<span class="subtle-label">看到这些词，想到这套答案</span><div class="cue-grid">${q.cues.map(c=>`<span class="cue"><b>${esc(c.en)}</b><small>${esc(c.zh)}</small></span>`).join('')}</div><h2 style="font-size:15px">${esc(q.quiz.prompt)}</h2><div class="options">${q.quiz.options.map((o,i)=>button(`${String.fromCharCode(65+i)}. ${esc(o)}`,'study-option','option',`data-value="${i}"`)).join('')}</div><div id="answer-feedback" aria-live="polite"></div><div class="study-actions">${button('← 回看理解','prev-stage','text-button')}${button('进入短语回忆 →','next-stage','primary','id="next-stage" disabled')}</div>`);}
 else if(stage===2){studyOuter(`${questionHeader(q)}<span class="subtle-label">少一点提示，自己补回关键内容</span><p class="formula">${esc(q.cloze.text)}</p><label class="field" for="gap-answer">填入关键术语或数值（可用中英文）</label><input id="gap-answer" class="cloze-input" autocomplete="off" placeholder="先想一想，再写下答案"><div id="answer-feedback" aria-live="polite"></div><div class="study-actions">${button('核对这个空','check-gap','secondary')}${button('进入独立回忆 →','next-stage','primary','id="next-stage" disabled')}</div>`);}
 else renderRecall(false);
}
function shuffled(a){return [...a].sort(()=>Math.random()-.5);}
function startSession(kind){
 let items=active();
 if(kind==='weak')items=items.filter(weak);else if(kind==='exam'){const size=Number($('#exam-count')?.value||6),scope=$('#exam-scope')?.value||'priority';items=(scope==='all'?Q.filter(q=>!q.blocked):items);items=shuffled(items).slice(0,size||items.length);}
 else items.sort((a,b)=>{const weight=q=>due(q)?0:weak(q)?1:!rec(q.id).attempts?2:3;return weight(a)-weight(b)||rec(a.id).due-rec(b.id).due||a.id-b.id;});
 if(!items.length){toast('当前没有可练题目。');return;}
 session={kind,ids:items.slice(0,kind==='exam'?items.length:6).map(q=>q.id),index:0,results:[],retries:[],order:Math.floor(Math.random()*99)};
 navigate('#session');
}
function renderSession(){
 if(session.index>=session.ids.length){renderSessionEnd();return;}
 const q=Q.find(q=>q.id===session.ids[session.index]),r=resumeState?.id===q.id&&resumeState.session?.index===session.index?resumeState:null;current={q,stage:r?r.stage:session.kind==='daily'&&!rec(q.id).attempts?0:3,revealed:false,hint:r?.hint||false,checked:false};
 if(current.stage<3)renderStudy();else renderRecall(session.kind==='exam');
}
function problemData(q){
 const notice=q.missing||q.note?`<p class="notice"><b>资料说明：</b>${esc(q.missing||q.note)}</p>`:'';
 const data=q.id===9?'<div class="example"><strong>原题数据（L=8）</strong><br>灰度：0，1，2，3，4，5，6，7<br>概率：0.17，0.12，0.13，0.05，0.03，0.13，0.15，0.22<br>本练习约定：s = round(7 × CDF)。请计算映射及合并后的概率。</div>':q.id===10?'<div class="example"><strong>原题矩阵</strong><pre>168 166 157 174\n148 146 123 118\n140 121 133 157</pre>操作中心灰度 146：设计 3×3 平滑核和锐化核，并计算最大值、中值、最小值。算子可自行选择并注明；参考解采用均值核和四邻域中心为 5 的锐化核。</div>':'';
 const extra=q.id===20?'<div class="example"><strong>补充算例（不是缺失的课堂原例）</strong><br>f(0,0)=10，f(1,0)=20，f(0,1)=30，f(1,1)=40。求 (0.25,0.5) 的最近邻、双线性插值；最近邻半格约定取较大坐标。</div>':q.id===26?'<div class="example"><strong>可用于说明算法的教学数据</strong><br>A、B、C、D 概率分别为 0.4、0.3、0.2、0.1。请写出合并最小概率的过程及各指标定义。</div>':q.id===33?`<div class="example"><strong>从 Word 原生线段恢复的原题图</strong>${q.example?.match(/<svg[\s\S]*?<\/svg>/)?.[0]||''}<p>约定：左上角为起点，沿箭头行进，右0、上1、左2、下3。计算链码、循环差分与形状数。</p></div>`:'';
 return notice+data+extra;
}
function renderRecall(exam=false){
 saveLearning();
 const q=current.q,en=(q.variants||[q.en])[(session?.order||0)%Math.max(1,q.variants?.length||1)]||q.en;
 studyOuter(`${questionHeader(q,en)}${problemData(q)}<div class="subtle-label">${exam?'变式自测 · 暂时收起提示':'独立回忆 · 题干已轻微改写'}</div><p class="info-text">写出答案骨架、公式和关键步骤。可以先用中文作答，再补英文关键词。原题带数据的，改写保持数据不变。</p><label class="field" for="recall-answer">我的答案</label><textarea id="recall-answer" class="recall-input" placeholder="先不看答案，写出你能想起的内容…">${esc(db.drafts[q.id]||'')}</textarea><div id="hint-area"></div><div class="study-actions"><span>${!exam?button('需要一点提示','recall-hint','text-button'):''}</span>${button('写好了，对照要点','reveal-recall')}</div><div id="recall-review" aria-live="polite"></div>`);
}
function revealRecall(){
 const answer=$('#recall-answer').value.trim();if(!answer){toast('先写一点你能想起的内容；不确定也可以。');$('#recall-answer').focus();return;}
 current.revealed=true;db.drafts[current.q.id]=answer;save();saveLearning();$('#recall-answer').readOnly=true;
 const q=current.q,norm=normalize(answer),hits=q.points.map(p=>(p.aliases||[]).some(k=>norm.includes(normalize(k))));
 $('#recall-review').innerHTML=`<div class="result-block"><strong>逐项核对：这次真正写到了什么？</strong><p class="info-text">下面的关键词扫描只作提示，不判定语义或公式是否正确。读完参考要点后，请勾选你原答案已正确包含的内容。</p><div class="key-hints">本机关键词扫描：${hits.filter(Boolean).length}/${q.points.length} 项出现相关词。最终以你的逐项核对为准。</div>${pointHTML(q)}${q.example?`<details><summary>核对算例 / 推导</summary><div class="example">${q.example}</div></details>`:''}<div class="checkpoints">${q.points.map((p,i)=>`<label><input type="checkbox" data-point="${i}"><span>我的原答案正确写到了：${esc(p.label)}</span></label>`).join('')}</div><p class="trap">${esc(q.trap)}</p>${finalModelSection(q)}${current.hint?'<p class="info-text">本次使用过提示，会记为提示回忆，不计入独立掌握。</p>':''}<div class="rating">${button('还不稳，再练一次','rate-again','')}${button('核对完成，记下结果 →','rate-submit','')}</div></div>`;
 $('[data-action="reveal-recall"]').disabled=true;
}
function normalize(s){return String(s).toLowerCase().replace(/[\s，。,.!?？！:：;；()（）_−-]/g,'');}
function rateAnswer(forceAgain=false){
 if(!current.revealed)return;
 const q=current.q,checked=document.querySelectorAll('[data-point]:checked').length,raw=checked/q.points.length,score=forceAgain?Math.min(raw,.4):current.hint?Math.min(raw,.6):raw;
 const r=rec(q.id),good=score>=.8,day=today(),sameDay=r.lastDay===day;let streak=good?(sameDay?r.streak:r.streak+1):0;
 const successDays=good?[...new Set([...(r.successDays||[]),day])].slice(-20):[];
 const intervals=[0,1,3,7,14,30];const next=good?Date.now()+intervals[Math.min(5,Math.max(1,streak))]*DAY:Date.now()+10*60000;
 patchRec(q.id,{attempts:r.attempts+1,lapses:r.lapses+(good?0:1),lastScore:score,lastDay:day,streak,due:next,successDays});
 db.history.push({day,id:q.id,score,hint:current.hint});db.history=db.history.slice(-1000);delete db.drafts[q.id];save();clearLearning();
 if(session){session.results.push({id:q.id,score});if(!good&&session.kind!=='exam'&&!session.retries.includes(q.id)){session.ids.push(q.id);session.retries.push(q.id);}session.index++;renderSession();window.scrollTo(0,0);}else{toast(good?'已记录，明天再独立回忆一次。':'已放入薄弱题，稍后再练。');navigate('#library');}
}
function renderSessionEnd(){
 clearLearning();
 const rs=session.results,good=rs.filter(r=>r.score>=.8).length;
 mount(`<div class="study-shell"><span class="eyebrow">ONE SESSION AT A TIME</span><h1 class="page-title">这一轮，完成了。</h1><p class="lede">对照答案后的自评记录已经保存。暂时想不起的内容，会进入下一次复习。</p><div class="summary-score">${good}<span style="font:16px var(--sans);color:var(--muted)"> / ${rs.length} 次回忆达标</span></div><p class="info-text">这是要点自评结果，不是考试分数。不同日期独立回忆两次达标后，题目才会标为“已稳定回忆”。</p><div class="session-list">${rs.map(r=>`<div><a href="#study/${r.id}">${String(r.id).padStart(2,'0')} · ${esc(Q.find(q=>q.id===r.id).title)}</a><a class="text-button" href="#answer/${r.id}">完整作答范本 ↗</a><span class="badge ${r.score>=.8?'':'warn'}">${r.score>=.8?'本次达标':'需要再练'}</span></div>`).join('')}</div><div class="study-actions"><a class="primary" href="#home">回到学习首页 →</a><a class="text-button" href="#lab">练一下计算</a></div></div>`);
}
function renderCues(){
 const pool=active().filter(q=>q.cues?.length);const q=pool[Math.floor(Math.random()*pool.length)];const cue=q.cues[Math.floor(Math.random()*q.cues.length)];const options=shuffled([q,...shuffled(pool.filter(x=>x.id!==q.id&&x.topic!==q.topic&&!x.cues.some(c=>q.cues.some(k=>normalize(k.en)===normalize(c.en))))).slice(0,3)]);cueQuestion={q,cue,options,answered:false};
 mount(`<div class="study-shell"><span class="eyebrow">SPOT THE KEYWORDS</span><h1 class="page-title">认出题眼，就有了起点。</h1><p class="lede">先建立英文短语与答案主线的联系。这里答对会记录题眼练习，不代表已经能独立作答。</p><article class="study-card"><div class="study-top"><span>作业 ${String(q.id).padStart(2,"0")}</span>${priorityBadge(q,true)}</div><span class="subtle-label">这组词通常指向哪一道题？</span><p class="question-en">${esc(q.en)}</p><p class="info-text">结合完整题干，判断下面的题眼所对应的答案主线。</p><p class="formula" style="font-size:30px">${esc(cue.en)}</p><div class="options">${options.map((x,i)=>button(`${String.fromCharCode(65+i)}. ${esc(x.title)}`,'cue-option','option',`data-value="${i}"`)).join('')}</div><div id="cue-feedback" aria-live="polite"></div><div class="study-actions">${button('换一组题眼 ↻','next-cue','secondary','id="next-cue" disabled')}<a href="#study/${q.id}" class="text-button">学这道题 →</a></div></article></div>`);
}
function renderExam(){
 mount(`<div class="study-shell"><span class="eyebrow">SAME CORE, A NEW QUESTION</span><h1 class="page-title">换个问法，自己写一遍。</h1><p class="lede">题目只轻微改写描述，核心知识与作业相同。每题先独立作答，再对照要点自评。全程不需要联网或模型评分。</p><article class="study-card"><div class="input-row"><label class="field">本轮题量<select id="exam-count" class="lab-input"><option value="6">6 题 · 小轮自测</option><option value="10">10 题 · 加强练习</option><option value="0">范围内全部可练题</option></select></label><label class="field">出题范围<select id="exam-scope" class="lab-input"><option value="priority">老师重点${db.includeUncertain?" + 待确认题":""}</option><option value="all">全部可练题</option></select></label></div><p class="info-text">缺少完整题干的教材题不会抽入。链码与插值题中，作业未附的原始图和数据会明确标注；训练方法不能代替核对原题。</p><div class="study-actions"><span class="pill">无倒计时 · 可以保存草稿</span>${button('开始变式自测 ↗','start-exam')}</div></article></div>`);
}
function renderLab(){
 mount(`<span class="eyebrow">CALCULATE, THEN UNDERSTAND</span><h1 class="page-title">把计算过程走通。</h1><p class="lede">原题先完整复现，再改数字检查方法。先输入预测，随后展开步骤。此处练习不自动计入独立回忆掌握率。</p><div class="lab-tabs">${[['distance','07 像素距离'],['histogram','09 直方图均衡'],['filters','10 邻域滤波'],['interpolation','20 插值'],['huffman','26 Huffman']].map(([v,t])=>button(t,'lab-tab','chip'+(labTab===v?' selected':''),`data-value="${v}"`)).join('')}</div><div id="lab-body"></div>`);
 let html='';
 if(labTab==='distance')html=`<div class="lab-grid"><article class="study-card"><h2 style="font-size:18px">像素距离：走格子还是走直线？</h2><p class="info-text">原题 P(3,4)，Q(8,10)。可修改下面四个坐标。</p><div class="input-row">${[['px','P 的 x',3],['py','P 的 y',4]].map(([id,l,v])=>`<label class="field">${l}<input class="lab-input" type="number" id="${id}" value="${v}"></label>`).join('')}</div><div class="input-row">${[['qx','Q 的 x',8],['qy','Q 的 y',10]].map(([id,l,v])=>`<label class="field">${l}<input class="lab-input" type="number" id="${id}" value="${v}"></label>`).join('')}</div><label class="field">先预测 D₄、D₈、Dₑ<input class="lab-input" id="lab-prediction" placeholder="例如：11，6，√61"></label>${button('核对计算步骤','run-lab')}</article><article class="study-card"><div class="formula">D₄ = |Δx| + |Δy|<br>D₈ = max(|Δx|, |Δy|)<br>Dₑ = √(Δx² + Δy²)</div><p class="info-text">4 距离只走横竖；8 距离允许对角；欧氏距离直接连接两点。</p><div id="lab-result" aria-live="polite"></div></article></div>`;
 else if(labTab==='histogram')html=`<article class="study-card"><h2 style="font-size:18px">离散均衡化：累计 → 映射 → 合并</h2><p class="info-text">原题 L = 8，输入各灰度概率，使用 round(7 × CDF)。改变取整约定会改变映射，因此作答应注明。</p><label class="field">灰度 0–7 的概率，用空格或逗号分隔<input id="hist-probs" class="lab-input" value="0.17 0.12 0.13 0.05 0.03 0.13 0.15 0.22"></label><label class="field">先预测：输入灰度 3 会映射到哪里？<input id="lab-prediction" class="lab-input" placeholder="写一个 0–7 的整数"></label>${button('逐步计算 CDF 与映射','run-lab')}<div id="lab-result" aria-live="polite"></div></article>`;
 else if(labTab==='filters')html=`<div class="lab-grid"><article class="study-card"><h2 style="font-size:18px">对中心灰度 146 操作</h2><p class="info-text">从原题 3×4 数据取中心 146 的 3×3 邻域，第四列不参与。</p><div class="matrix">${[168,166,157,148,146,123,140,121,133].map((n,i)=>`<span class="${i===4?'center':''}">${n}</span>`).join('')}</div><label class="field">先预测：中值和均值是否相同？<input id="lab-prediction" class="lab-input" placeholder="写下你的预测与理由"></label>${button('对照五种滤波结果','run-lab')}</article><article class="study-card"><p class="info-text">均值核为全 1/9；锐化核选择四邻域中心 5、上下左右 −1、其余 0。算子设计有多种合理答案，必须先声明核。</p><pre>平滑核             锐化核
1/9 × [1 1 1]       [ 0 −1  0]
      [1 1 1]       [−1  5 −1]
      [1 1 1]       [ 0 −1  0]</pre><div id="lab-result" aria-live="polite"></div></article></div>`;
 else if(labTab==='interpolation')html=`<div class="lab-grid"><article class="study-card"><h2 style="font-size:18px">先定坐标，再做加权</h2><p class="info-text">这是补充算例，课堂原例数据未附。约定四角 f(0,0)=10，f(1,0)=20，f(0,1)=30，f(1,1)=40。</p><div class="input-row"><label class="field">α = x（0 到 1）<input id="alpha" class="lab-input" type="number" min="0" max="1" step="0.05" value="0.25"></label><label class="field">β = y（0 到 1）<input id="beta" class="lab-input" type="number" min="0" max="1" step="0.05" value="0.5"></label></div><label class="field">先预测双线性插值<input id="lab-prediction" class="lab-input" placeholder="四个权重相加应等于 1"></label>${button('查看权重与结果','run-lab')}</article><article class="study-card"><div class="formula">f = (1−α)(1−β)f₀₀<br> + α(1−β)f₁₀<br> + (1−α)βf₀₁ + αβf₁₁</div><p class="info-text">最近邻选距离最近的采样点；恰在半格处，本练习约定选择坐标较大的点。</p><div id="lab-result" aria-live="polite"></div></article></div>`;
 else html=`<article class="study-card"><h2 style="font-size:18px">Huffman：合并最小的两个概率</h2><p class="info-text">教学算例：A、B、C、D 的概率为 0.4、0.3、0.2、0.1。它不替代未提供的教材 8.9 原题。</p><label class="field">先预测平均码长 L̄（bit/符号）<input id="lab-prediction" class="lab-input" placeholder="先画树或写出四个码长"></label>${button('展开合并过程与四个指标','run-lab')}<div id="lab-result" aria-live="polite"></div></article>`;
 $('#lab-body').innerHTML=html;
}
function number(id){const el=$('#'+id);if(!el||el.value.trim()==='')throw Error('请填写所有输入数值。');const n=Number(el.value);if(!Number.isFinite(n)||Math.abs(n)>1e6)throw Error('请输入合理范围内的有限数值。');return n;}
function runLab(){
 const pred=$('#lab-prediction').value.trim();if(!pred){toast('先写下你的预测，再核对步骤。');$('#lab-prediction').focus();return;}
 let result='';try{
 if(labTab==='distance'){const dx=Math.abs(number('px')-number('qx')),dy=Math.abs(number('py')-number('qy'));result=`<div class="lab-output">|Δx| = ${dx}，|Δy| = ${dy}<br>D₄ = ${dx}+${dy} = <b>${dx+dy}</b><br>D₈ = max(${dx},${dy}) = <b>${Math.max(dx,dy)}</b><br>Dₑ = √${dx*dx+dy*dy} ≈ <b>${Math.hypot(dx,dy).toFixed(4)}</b></div>`;}
 else if(labTab==='histogram'){const p=$('#hist-probs').value.trim().split(/[\s,，]+/).map(Number);if(p.length!==8||p.some(x=>!Number.isFinite(x)||x<0)||Math.abs(p.reduce((a,b)=>a+b,0)-1)>1e-6)throw Error('需要 8 个非负概率，且总和为 1。');let c=0;const out=Array(8).fill(0);const rows=p.map((v,i)=>{c+=v;const s=Math.min(7,Math.round(7*c));out[s]+=v;return `<tr><td>${i}</td><td>${v}</td><td>${c.toFixed(2)}</td><td>${(7*c).toFixed(2)}</td><td>${s}</td></tr>`;}).join('');result=`<div class="example"><table><thead><tr><th>r</th><th>p(r)</th><th>CDF</th><th>7×CDF</th><th>round</th></tr></thead><tbody>${rows}</tbody></table><p>合并后灰度 0–7 概率：<br><b>${out.map(x=>x.toFixed(2)).join('，')}</b></p><div class="formula-curves" aria-label="输出直方图">${out.map((x,i)=>`<span title="灰度${i}：${x.toFixed(2)}" style="height:${x/.35*130}px"></span>`).join('')}</div><p>为什么不平？原有同灰度像素一起映射，不能被确定性灰度映射拆开，还可能多对一合并。</p></div>`;}
 else if(labTab==='filters'){const ns=[168,166,157,148,146,123,140,121,133],sorted=[...ns].sort((a,b)=>a-b);result=`<div class="lab-output">排序：${sorted.join('，')}<br>最大值 = <b>168</b> · 最小值 = <b>121</b><br>中值 = 第 5 个 = <b>146</b><br>均值 = 1302/9 ≈ <b>144.67</b><br>锐化 = 5×146−166−148−123−121 = <b>172</b></div><p class="info-text">若选不同锐化核，结果会不同。中值是排序统计，均值是线性加权求和。</p>`;}
 else if(labTab==='interpolation'){const a=number('alpha'),b=number('beta');if(a<0||a>1||b<0||b>1)throw Error('α 和 β 必须在 0 到 1 之间。');const weights=[(1-a)*(1-b),a*(1-b),(1-a)*b,a*b],r=weights.reduce((s,w,i)=>s+w*[10,20,30,40][i],0),nn=[10,20,30,40][(b<.5?0:2)+(a<.5?0:1)];result=`<div class="lab-output">四角权重：${weights.map(x=>x.toFixed(4)).join('，')}<br>权重和 = <b>${weights.reduce((s,x)=>s+x,0).toFixed(4)}</b><br>双线性插值 = <b>${r.toFixed(4)}</b><br>最近邻（半格向大坐标）= <b>${nn}</b></div>`;}
 else{const H=-[.4,.3,.2,.1].reduce((s,p)=>s+p*Math.log2(p),0);result=`<div class="example"><p>合并：0.1+0.2=0.3；再把 B 的 0.3 与新 0.3 合为 0.6；最后 0.4+0.6=1。</p><pre>A: 0     长度 1
B: 10    长度 2
C: 110   长度 3
D: 111   长度 3</pre><p>H = −Σ p log₂p ≈ <b>${H.toFixed(4)} bit/符号</b><br>L̄ = 0.4×1+0.3×2+0.2×3+0.1×3 = <b>1.9 bit/符号</b><br>效率 η = H/L̄ ≈ <b>${(H/1.9*100).toFixed(2)}%</b><br>相对编码冗余 1−η ≈ <b>${((1-H/1.9)*100).toFixed(2)}%</b></p><p>0/1 左右可互换，并列概率可有不同合并顺序，码字不唯一。每个符号码长要与所画树一致。</p></div>`;}
 $('#lab-result').innerHTML=`<p class="info-text">你的预测：${esc(pred)}。请逐步对照以下过程。</p>${result}`;
 }catch(e){toast(e.message);}
}
function settings(){openModal(`<h2>进度备份与设置</h2><p>学习进度只保存在当前设备、当前浏览器。在线版与离线版、不同浏览器之间不自动同步。换设备前导出 JSON，再到另一处导入。</p>${button('导出进度 JSON','export','secondary')}${button('导入进度 JSON','import','secondary')}<hr style="border:0;border-top:1px solid #dfdfd5;margin:22px 0"><label style="font-size:13px"><input id="uncertain-toggle" type="checkbox" ${db.includeUncertain?'checked':''}> 将标记待确认的第 5、29 题加入每日练习</label><p>切换练习范围不会删除旧记录，也不会改变“老师重点”标记。照片中的第 1 题备注为“2.9”；作业另列 2.15，仍保留在题目说明。</p><p>稳定回忆：至少两个不同日期，在无提示时正确回忆至少 80% 的要点。复习间隔按 1、3、7、14、30 天递增，未达标约 10 分钟后可再练。</p>${button('下载单文件离线版','download-offline','secondary')}${button('清空此处学习记录','reset-confirm','text-button')}<p>清空操作只影响此浏览器；建议先导出备份。</p>`);}
function sourceInfo(){openModal(`<h2>范围与资料说明</h2><p>题目依据你提供的作业文档，保留 1–34 原编号。英文题干保留原意，少量格式整理。答案与变式由本平台整理，用于复习，不是教师官方答案。</p><p>照片中未划掉的重点题号：</p><p class="scope-numbers">${PRIORITY_IDS.join(' · ')}</p><p>第 5、29 题有划改痕迹，始终标为待确认；可在设置中加入每日练习。第 1 题照片备注 2.9，但文档还列了 2.15。</p><p>资料缺失：第 1、11、19、24 题只有教材题号；第 20 题没有课堂例题数据；第 33 题已恢复文档中的原生矢量图，第 34 题未找到独立对应图形。前三类教材题不会编造原题答案，插值和链码提供明确标记的补充算例。</p><p>第 10 题的锐化子问误写了“smoothing operation”，平台按“设计锐化算子”处理，并注明选择的核。DFT 与卷积的归一化约定在证明中单独声明，避免混用。</p><p>参考你提供的网页方法指南，提供手机布局、预测后核对、具体纠错、离线版、进度导入导出。原文档与照片不会随网站上传。</p><p>考试时间尚未确定，以老师后续通知为准。本平台不预测考试日期，也不承诺分数。</p>`);}
function openModal(html){$('#modal-content').innerHTML=html;$('#modal').showModal();}
function download(name,text,type){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action,v=b.dataset.value;
 if(a==='resume'){if(resumeState?.session){session=resumeState.session;navigate('#session');}else if(resumeState)navigate('#study/'+resumeState.id);}
 else if(a==='start-daily'){clearLearning();startSession('daily');}else if(a==='start-weak'){clearLearning();startSession('weak');}else if(a==='start-exam'){clearLearning();startSession('exam');}
 else if(a==='back-library'){session=null;navigate('#library');}
 else if(a==='filter'){filter=v;renderLibrary();}
 else if(a==='next-stage'){if(current.stage===0)patchRec(current.q.id,{seen:true});current.stage++;current.checked=false;renderStudy();window.scrollTo(0,0);}
 else if(a==='prev-stage'){current.stage--;renderStudy();}
 else if(a==='study-option'){
  const q=current.q,correct=Number(v)===q.quiz.answer;document.querySelectorAll('[data-action="study-option"]').forEach(x=>{x.disabled=true;if(Number(x.dataset.value)===q.quiz.answer)x.classList.add('correct');});if(!correct)b.classList.add('wrong');
  $('#answer-feedback').className='feedback'+(correct?'':' error');$('#answer-feedback').textContent=(correct?'答对了。':'这里要换个理解。')+q.quiz.explain;$('#next-stage').disabled=false;if(correct)patchRec(q.id,{quiz:rec(q.id).quiz+1});
 }
 else if(a==='check-gap'){
  const q=current.q,input=$('#gap-answer').value,correct=q.cloze.answers.some(x=>normalize(x)===normalize(input));if(!input.trim()){toast('先填一个答案。');return;}
  $('#answer-feedback').className='feedback'+(correct?'':' error');$('#answer-feedback').textContent=(correct?'想起来了。':`参考填法：${q.cloze.answers[0]}。`)+q.cloze.explain;$('#next-stage').disabled=false;if(correct&&!current.checked){patchRec(q.id,{gaps:rec(q.id).gaps+1});current.checked=true;}
 }
 else if(a==='recall-hint'){current.hint=true;saveLearning();$('#hint-area').innerHTML=`<div class="example">提示主线：${current.q.points.map(p=>esc(p.label)).join(' → ')}</div>`;b.disabled=true;}
 else if(a==='reveal-recall')revealRecall();else if(a==='rate-again')rateAnswer(true);else if(a==='rate-submit')rateAnswer();
 else if(a==='cue-option'){
  if(cueQuestion.answered)return;cueQuestion.answered=true;const good=cueQuestion.options[Number(v)].id===cueQuestion.q.id;document.querySelectorAll('[data-action="cue-option"]').forEach(x=>{x.disabled=true;if(cueQuestion.options[Number(x.dataset.value)].id===cueQuestion.q.id)x.classList.add('correct');});if(!good)b.classList.add('wrong');$('#cue-feedback').className='feedback'+(good?'':' error');$('#cue-feedback').textContent=`${good?'识别正确。':'正确方向是：'+cueQuestion.q.title+'。'} ${cueQuestion.cue.en}：${cueQuestion.cue.zh}。${cueQuestion.q.intuition}`;$('#next-cue').disabled=false;if(good)patchRec(cueQuestion.q.id,{quiz:rec(cueQuestion.q.id).quiz+1});
 }
 else if(a==='next-cue')renderCues();else if(a==='lab-tab'){labTab=v;renderLab();}else if(a==='run-lab')runLab();
 else if(a==='settings')settings();else if(a==='sources')sourceInfo();else if(a==='close-modal')$('#modal').close();
 else if(a==='export'){download('图像处理复习进度-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(db,null,2),'application/json');toast('已导出学习进度。');}
 else if(a==='import')$('#import-file').click();
 else if(a==='reset-confirm')openModal(`<h2>清空当前浏览器进度？</h2><p>这会删除学习记录、回忆草稿和复习安排。导出过的备份不受影响。</p>${button('先导出备份','export','secondary')}${button('确认清空','reset-final','secondary')}`);
 else if(a==='reset-final'){db=fresh();save();clearLearning();session=null;$('#modal').close();navigate('#home');toast('此浏览器学习记录已清空；已导出的备份仍可恢复。');}
 else if(a==='download-offline'){if(window.OFFLINE_MODE){toast('你正在使用单文件离线版，可直接保存这个 HTML 文件。');}else{const l=document.createElement('a');l.href='offline.html';l.download='图像处理复习练习室-离线版.html';l.click();}}
});
document.addEventListener('input',e=>{if(e.target.id==='search'){query=e.target.value;renderRows();}else if(e.target.id==='recall-answer'){db.drafts[current.q.id]=e.target.value;save();}});
document.addEventListener('change',e=>{if(e.target.id==='topic-filter'){topic=e.target.value;renderRows();}else if(e.target.id==='uncertain-toggle'){db.includeUncertain=e.target.checked;save();route();toast('练习范围已更新，待确认标记不变。');}else if(e.target.id==='import-file'){const file=e.target.files[0];if(!file)return;if(file.size>2e6){toast('备份文件过大，请选择正确的进度 JSON。');return;}file.text().then(text=>{try{const next=validate(JSON.parse(text));window.pendingImport=next;openModal(`<h2>确认导入学习进度</h2><p>这会替换当前浏览器的记录。备份包含 ${Object.keys(next.records).length} 道题的记录和 ${next.history.length} 次回忆。建议先导出当前进度。</p>${button('导出当前进度','export','secondary')}<button class="primary" id="confirm-import">替换并导入</button>`);$('#confirm-import').onclick=()=>{db=window.pendingImport;clearLearning();delete window.pendingImport;save();session=null;$('#modal').close();navigate('#home');toast('进度已恢复。');};}catch(err){toast('无法读取备份：'+err.message);}});e.target.value='';}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='gap-answer')$('[data-action="check-gap"]').click();});
window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#session')&&!location.hash.startsWith('#study'))session=null;route();});
if(!storageOK)showStorageAlert();route();
