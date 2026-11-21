'use strict';
window.MODEL_ANSWERS={...(window.MODEL_ANSWERS_A||{}),...(window.MODEL_ANSWERS_B||{}),...(window.MODEL_ANSWERS_RECOVERED||{})};
let answerLanguage='english',answerScope='priority',answerQuery='';
function answerModel(id){return window.MODEL_ANSWERS[id];}
function answerLink(q){return `<a class="answer-link" href="#answer/${q.id}">查看这题的完整作答范本 ↗</a>`;}
function modelHTML(q,lang=answerLanguage){
 const m=answerModel(q.id);if(!m)return `<div class="notice"><b>待补原题</b> ${esc(q.missing||'当前资料还不足以给出完整原题解答。')}</div>`;
 return `<div class="model-status">${esc(m.status||'完整参考范本 · 按题目要求展开作答')}</div><div class="model-answer ${lang==='english'?'model-en':'model-zh'}" lang="${lang==='english'?'en':'zh-CN'}">${m[lang]}</div>`;
}
function modelTools(q){return `<div class="model-tools"><div class="chips" aria-label="范本语言">${[['english','英文完整作答'],['chinese','中文完整作答']].map(([v,t])=>button(t,'answer-language','chip'+(answerLanguage===v?' selected':''),`data-value="${v}" data-id="${q.id}"`)).join('')}</div><div>${button('复制当前范本','copy-model','secondary',`data-id="${q.id}"`)} ${button('打印 / 保存 PDF','print-model','secondary',`data-id="${q.id}"`)}</div></div>`;}
function renderAnswers(){
 mount(`<span class="eyebrow">COMPLETE MODEL ANSWERS</span><h1 class="page-title">知道这道题，最后该怎么写。</h1><p class="lede">每题都有完整的英文作答和中文对照。先看一份成形的答案，再记结构、公式与关键表达，最后脱离范本独立写。这里的范本按作业要求整理，不代表教师官方评分答案。</p><div class="model-intro"><strong>范本会写到哪里？</strong><p>概念题包含定义、区别、联系和必要条件；计算题写出代入与结果；证明题保留推导链条。缺少原题数据的部分单独说明。</p></div>${priorityOverview()}<div class="toolbar"><input class="search" id="answer-search" aria-label="搜索作答范本" placeholder="搜索题号、中文或英文…" value="${esc(answerQuery)}"></div><div class="chips">${[['priority','老师重点 · 20 题'],['uncertain','标记待确认 · 2 题'],['all','全部作业'],['missing','待补原题 / 数据']].map(([v,t])=>button(t,'answer-scope','chip'+(answerScope===v?' selected':''),`data-value="${v}"`)).join('')}</div><div id="answer-list"></div>`);renderAnswerRows();
}
function renderAnswerRows(){
 const qs=Q.filter(q=>(answerScope==='all'||answerScope==='priority'&&teacherPriority(q)||answerScope==='uncertain'&&UNCERTAIN_IDS.includes(q.id)||answerScope==='missing'&&(q.blocked||q.missing))&&`${q.id} ${q.title} ${q.en} ${q.zh}`.toLowerCase().includes(answerQuery.toLowerCase()));
 $('#answer-list').innerHTML=`<p class="info-text">${qs.length} 个题号 · ${qs.filter(q=>answerModel(q.id)).length} 份作答范本${answerScope==='priority'?' · 两道计算题已补齐':''}</p><div class="question-list">${qs.map(q=>`<a class="question-row${priorityRowClass(q)}" href="#answer/${q.id}"><span class="question-num">${String(q.id).padStart(2,'0')}</span><div><div class="question-title"><h3>${esc(q.title)}</h3>${priorityBadge(q)}</div><p>${esc(q.en)}</p></div><span class="badge ${q.blocked?'warn':q.missing?'gray':''}">${q.blocked?'待补原题':q.missing?'方法范本':'完整范本'}</span></a>`).join('')||'<p class="empty">没有匹配的题目。</p>'}</div>`;
}
function renderAnswer(id){
 const q=Q.find(q=>q.id===id);if(!q){renderAnswers();return;}
 const m=answerModel(id),qs=Q.filter(q=>teacherPriority(q)),i=qs.findIndex(x=>x.id===id),next=qs.slice(i+1).find(x=>!x.blocked);
 mount(`<div class="model-shell"><a href="#answers" class="back-link">← 返回作答范本</a><div class="study-top"><span>作业 ${String(id).padStart(2,'0')} · ${esc(q.topic)}</span><span>${priorityBadge(q,true)}</span></div><h1 class="page-title">${esc(q.title)}</h1><div class="model-question"><p class="question-en">${esc(q.en)}</p><p class="question-zh">${esc(q.zh)}</p>${q.problemHtml||''}</div>${q.missing||q.note?`<p class="notice"><b>本题说明：</b>${esc(q.missing||q.note)}</p>`:''}${q.id===33&&q.example?`<details open><summary>原题图与方向约定</summary><div class="example">${q.example.match(/<svg[\s\S]*?<\/svg>/)?.[0]||''}<p>从左上角开始，沿箭头，右 0、上 1、左 2、下 3。</p></div></details>`:''}${m?`${modelTools(q)}<article class="model-paper" id="model-paper">${modelHTML(q)}</article><section class="model-rubric"><h2>检查有没有漏掉这些内容</h2><p>这是一份内容核对表，不是虚构的分值分配。</p><ol>${m.scoring.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></section><details><summary>理解用的短要点与常见错因</summary>${pointHTML(q)}<p class="trap">${esc(q.trap)}</p></details><div class="study-actions"><a class="primary" href="#study/${id}">按这份答案分步练习 →</a>${next?`<a class="text-button" href="#answer/${next.id}">下一份重点范本：${esc(next.title)} →</a>`:''}</div>`:`<article class="model-paper">${modelHTML(q)}<p>补充对应教材版本、完整题干及图表后，才能把原题的标准计算与推导补进这里。</p></article>`}<p class="info-text">改写题干时，先辨认考查点，再按问题取舍这些内容。不同数字要重新计算，不能机械抄写算例结果。</p></div>`);
}
function finalModelSection(q){return `<section class="recall-model"><h2>最后，把答案组织成这样</h2><p class="info-text">先与自己的答案对照：检查段落顺序、定义、条件与关键步骤。以下为英文完整范本，可切换中文并单独查看。</p><div class="model-answer model-en" lang="en">${answerModel(q.id)?.english||''}</div><a href="#answer/${q.id}" class="answer-link" target="_blank" rel="noopener">单独查看中英文范本 / 复制 / 打印 ↗</a></section>`;}
function modelText(id,lang=answerLanguage){const q=Q.find(q=>q.id===id),m=answerModel(id);if(!q||!m)return '';const holder=document.createElement('div');holder.innerHTML=((q.problemHtml||'')+m[lang]).replace(/<sup>([\s\S]*?)<\/sup>/gi,'^($1)').replace(/<sub>([\s\S]*?)<\/sub>/gi,'_($1)').replace(/<\/(p|li|h[1-6]|tr|pre|div)>/g,'</$1>\n').replace(/<br\s*\/?\s*>/g,'\n').replace(/<\/t[dh]>/g,'</td>\t');return `${q.id}. ${q.en}\n\n${holder.textContent}\n\n复习参考范本，非教师官方答案。`;}
document.addEventListener('input',e=>{if(e.target.id==='answer-search'){answerQuery=e.target.value;renderAnswerRows();}});
document.addEventListener('click',async e=>{
 const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,id=Number(b.dataset.id);
 if(action==='answer-scope'){answerScope=b.dataset.value;renderAnswers();}
 else if(action==='answer-language'){answerLanguage=b.dataset.value;renderAnswer(id);}
 else if(action==='copy-model'){
  const text=modelText(id);try{if(!navigator.clipboard)throw Error('clipboard unavailable');await navigator.clipboard.writeText(text);toast('已复制完整作答范本。');}catch{openModal(`<h2>复制这份范本</h2><p>浏览器未允许自动复制。选中下面的文本后复制即可。</p><textarea class="recall-input" readonly id="model-copy-text">${esc(text)}</textarea>`);$('#model-copy-text').focus();$('#model-copy-text').select();}
 }else if(action==='print-model')window.print();
});
