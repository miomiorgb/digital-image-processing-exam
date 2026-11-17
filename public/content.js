window.PRIORITY_IDS=[1,2,3,7,8,9,10,12,13,14,15,17,18,20,24,25,26,27,28,30];
window.UNCERTAIN_IDS=[5,29];
const missingQuestions=[
 {id:1,title:'教材练习 2.9 / 2.15',topic:'教材待补',en:'Exercise 2.9, 2.15.',zh:'作业列了 2.9、2.15；照片重点在第 1 题旁注明 2.9。',missing:'作业只有题号，没有教材版本和完整题干，不能据此编造答案。请补充你所用教材的 2.9 题；2.15 保留作补充。',blocked:true},
 {id:11,title:'教材练习 3.23',topic:'教材待补',en:'Exercise 3.23 in the book.',zh:'教材第 3.23 题。',missing:'缺少教材版本、题干和图。当前不纳入完成率或自测。',blocked:true},
 {id:19,title:'教材练习 5.11',topic:'教材待补',en:'Exercise 5.11 (a), (b), (c), (d).',zh:'教材第 5.11 题的四个小问。',missing:'缺少教材版本和完整题干。当前不纳入完成率或自测。',blocked:true},
 {id:24,title:'教材 P646 · 8.9',topic:'教材待补',en:'P646, 8.9 (a), (b), (c).',zh:'教材第 646 页，8.9 题的三个小问。',missing:'这是照片中的重点题，但作业中没有题干。需要补充教材版本以及 8.9 原题，不能用别的版本同号题替代。',blocked:true}
];
window.QUESTIONS=[...(window.CONTENT_A||[]),...(window.CONTENT_B||[]),...missingQuestions].sort((a,b)=>a.id-b.id);
