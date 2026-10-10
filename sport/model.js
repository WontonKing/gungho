/* Transparent educational rules, not a validated clinical prescription. */
(function(root){
'use strict';
const L=root.ExerciseLibrary||(typeof require==='function'?require('./exercise-library.js'):null);
const WEEKDAYS=['週一','週二','週三','週四','週五','週六','週日'];
const HEALTH={hypertension:'高血壓',diabetes:'糖尿病',cardiac:'心血管疾病',renal:'腎臟疾病',joint:'關節不適',osteoporosis:'骨質疏鬆',fall:'平衡／跌倒問題',special:'特殊生理或醫療狀況'};
const GOALS={health:'建立規律、維持健康',endurance:'提升心肺耐力',strength:'維持／增加肌力',weight:'體重管理',balance:'平衡與日常功能'};
const WORK={desk:'久坐型',standing:'長時間站立',labor:'體力勞動',shift:'輪班型',mixed:'混合型／退休'};
const DISCLAIMER='僅供一般體適能教育參考；實際以合格專業教練現場指導及醫療專業評估為準。未來週次為條件式草案，恢復良好且無新症狀時才可進階。';
const floor5=n=>Math.max(0,Math.floor(n/5)*5);
function isoDate(date){return date.toISOString().slice(0,10);}
function addDays(start,n){const d=new Date(start+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return isoDate(d);}
function strengthSlots(days,desired){
 let best=[];let bestScore=-1;
 for(let mask=1;mask<(1<<days.length);mask++){
  const choice=days.filter((_,i)=>mask&(1<<i));if(choice.length>desired)continue;
  let gap=7;for(let a=0;a<choice.length;a++)for(let b=a+1;b<choice.length;b++){const d=Math.abs(choice[a]-choice[b]);gap=Math.min(gap,d,7-d);}
  if(gap<2)continue;const score=choice.length*100+gap;
  if(score>bestScore){best=choice;bestScore=score;}
 }return best;
}
function screen(p){
 const reasons=[];
 if(p.symptoms!=='no')reasons.push('最近有胸部不適、昏厥／暈眩、異常喘或心悸，或尚不確定；請先接受醫療評估。急性嚴重症狀應立即尋求急救。');
 if(p.restricted!=='no')reasons.push('有醫療限制、未控制疾病、近期手術／骨折，或尚不確定；先由醫療專業人員確認適合的活動。');
 if(p.health.includes('special'))reasons.push('懷孕、近期產後或其他特殊狀況需要專屬評估，本模型不產生這類運動處方。');
 if(p.pain>=4)reasons.push('目前疼痛達 4／10 以上；這是本工具的保守暫停門檻，先評估疼痛來源與可做動作。');
 if(p.recovery==='worse')reasons.push('運動後有新症狀或疼痛加劇；請停止進階並接受專業評估。');
 if(p.health.length&&!p.cleared)reasons.push('你勾選了已知健康／傷害狀況，但尚未確認可進行低至中等強度運動。此工具採保守規則，先由醫療專業人員評估再排課。');
 if(p.pain>0&&!p.cleared)reasons.push('目前有疼痛且尚未評估；先確認動作限制，再規劃運動。');
 return reasons;
}
function validate(p){
 const checks={age:[18,100],baseline:[0,600],pain:[0,10],sleep:[3,12],target:[30,300],minutes:[20,90]};
 for(const [key,[min,max]]of Object.entries(checks))if(!Number.isFinite(p[key])||p[key]<min||p[key]>max)throw Error('請檢查數值範圍：'+key);
 if(![4,8,12].includes(p.weeks))throw Error('請選擇 4、8 或 12 週。');
 if(!p.days.length||p.days.some(x=>!Number.isInteger(x)||x<0||x>6)||new Set(p.days).size!==p.days.length)throw Error('至少選擇一個方便運動的日子。');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(p.start)||!Number.isFinite(Date.parse(p.start+'T00:00:00Z'))||isoDate(new Date(p.start+'T00:00:00Z'))!==p.start)throw Error('請選擇有效的起始日期。');
 if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(p.time))throw Error('請選擇有效的開始時間。');
 for(const [key,values]of Object.entries({experience:['new','regular'],work:Object.keys(WORK),goal:Object.keys(GOALS),cardio:L.items.filter(e=>e.type==='cardio').map(e=>e.id),equipment:['none','band','dumbbell','gym'],symptoms:['yes','no','unknown'],restricted:['yes','no','unknown'],fatigue:['normal','high'],adherence:['na','low','good'],recovery:['good','tired','worse']}))if(!values.includes(p[key]))throw Error('請完成選項：'+key);
 if(p.variety&&!['variety','steady'].includes(p.variety))throw Error('課表輪替選項無效。');
 if(p.cardioChoices&&(!Array.isArray(p.cardioChoices)||p.cardioChoices.some(id=>!L.items.some(e=>e.type==='cardio'&&e.id===id))))throw Error('有氧輪替選項無效。');
 if(p.health.some(h=>!(h in HEALTH)))throw Error('健康狀況選項無效。');
}
function build(p){
 p={...p,variety:p.variety||'variety',cardioChoices:p.cardioChoices||[]};
 validate(p);const blocked=screen(p);if(blocked.length)return{blocked:true,reasons:blocked};
 const days=[...p.days].sort((a,b)=>a-b),newbie=p.experience==='new';
 const delicate=p.health.length>0||p.pain>0;
 const tired=p.fatigue==='high'||p.sleep<6||p.recovery==='tired'||p.adherence==='low';
 const conservative=tired||delicate||p.work==='labor';
 const balanceNeeded=p.age>=65||p.health.includes('fall')||p.goal==='balance';
 const desiredStrength=p.goal==='strength'&&!newbie&&!conservative?3:2;
 const sDays=p.minutes>=30?strengthSlots(days,desiredStrength):[];
 const bDays=balanceNeeded?[...sDays,...days.filter(d=>!sDays.includes(d))].slice(0,3):sDays;
 const strengthMinutes=newbie||conservative?12:(p.goal==='strength'?25:20);
 const templates=Array.from({length:7},(_,day)=>{
  const active=days.includes(day),strength=active&&sDays.includes(day)?strengthMinutes:0;
  const balance=active&&bDays.includes(day)?(balanceNeeded?5:3):0;
  const functional=active&&balanceNeeded&&balance&&!strength&&p.minutes>=30?6:0;
  return{day,active,strength,balance,functional,capacity:active?floor5(p.minutes-10-strength-balance-functional):0};
 });
 let aerobicStart=newbie?10:Math.max(10,floor5(p.baseline/days.length));
 if(conservative)aerobicStart=Math.min(aerobicStart,15);
 const notes=[];
 const excluded=L.items.filter(e=>e.type==='cardio'&&[p.cardio,...p.cardioChoices].includes(e.id)&&!L.eligibility(p,e).ok);
 if(excluded.length)notes.push('依本次保守篩選，暫不排入：'+excluded.map(e=>e.name).join('、')+'。有氧會輪替其他已選項目；若均不符合條件，改以平地步行／室內踏步等起步。');
 if(newbie)notes.push('新手先建立規律：前 2 週有氧採輕強度，不計入中等強度目標。之後能無不適完成、恢復良好，才考慮轉為中等強度。');
 if(conservative)notes.push('因身體狀況、疲勞、工作負荷或回饋，本次採保守起步；每週只增加部分課次時間，仍須由教練確認。');
 if(p.work==='labor')notes.push('體力勞動不直接視為有氧達標；重工作日降低額外負荷，選低衝擊活動。不要把工作疲勞當作可以加重訓的訊號。');
 if(p.work==='shift')notes.push('輪班者可移動開始時間到主要睡眠後。匯出使用固定時段；匯入後請依班表調整，避免同肌群連日訓練。');
 if(sDays.length<2)notes.push('目前排不到每週 2 天不相鄰的全身肌力課。請增加可用日，並把每次總時間提高到至少 30 分鐘；短時段仍可先做有氧與活動度。');
 if(balanceNeeded&&bDays.length<3)notes.push('目前可用日不足 3 天，無法安排 3 天平衡／功能活動；可與教練討論增加短課次。');
 if(balanceNeeded&&p.minutes<30)notes.push('20 分鐘日程僅安排短平衡練習，未涵蓋足夠的多成分肌力功能訓練；請與教練討論加時。');
 if(p.target<150)notes.push('你設定的有氧目標低於成人一般參考 150 分鐘，可作起步目標；不代表已達一般健康建議。');
 if(p.goal==='weight')notes.push('體重管理先以完成課表、腰圍與生活習慣追蹤；體重也受飲食、睡眠與疾病影響，本工具不保證減重或提供熱量處方。');
 const weeks=[];
 for(let w=0;w<p.weeks;w++){
  const light=(newbie&&w<2)||(tired&&w===0);
  // Progression: add at most five minutes per aerobic session/week; conservative plans grow on alternate weeks.
  const step=conservative?Math.floor(w/2):w;
  const candidates=templates.map(t=>({...t,aerobic:t.active?Math.min(t.capacity,aerobicStart+5*step):0}));
  let excess=candidates.reduce((n,t)=>n+t.aerobic,0)-p.target;
  while(excess>0){const max=Math.max(...candidates.map(t=>t.aerobic));if(max===0)break;const t=candidates.find(t=>t.aerobic===max);const reduce=Math.min(5,excess,t.aerobic);t.aerobic-=reduce;excess-=reduce;}
  const start=addDays(p.start,w*7),startDay=(new Date(start+'T00:00:00Z').getUTCDay()+6)%7;
  const sessions=Array.from({length:7},(_,offset)=>{
   const day=(startDay+offset)%7,t=candidates[day],date=addDays(start,offset);
   const total=t.active?10+t.strength+t.balance+t.functional+t.aerobic:0;
   const session={...t,date,total,light,week:w+1,title:!t.active?'休息／恢復':t.strength?'全身肌力 '+(sDays.indexOf(day)%2?'B':'A')+'＋有氧':t.functional?'有氧＋平衡功能':'有氧＋活動度'};
   session.exercises=L.session(p,session);return session;
  });
  const aerobic=sessions.reduce((n,t)=>n+t.aerobic,0),strength=sDays.length,balance=bDays.length;
  weeks.push({number:w+1,start,end:addDays(start,6),sessions,aerobic,moderate:light?0:aerobic,light:light?aerobic:0,strength,balance,total:sessions.reduce((n,t)=>n+t.total,0),gap:Math.max(0,p.target-(light?0:aerobic))});
 }
 return{blocked:false,p,notes,weeks,balanceNeeded,desiredStrength,goal:GOALS[p.goal],work:WORK[p.work],bmi:p.height&&p.weight?Math.round(p.weight/(p.height/100)**2*10)/10:null};
}
function exerciseSet(p,s){return s.exercises||L.session(p,s);}
function cardioName(p,s){if(s){const ex=exerciseSet(p,s).cardio[0];if(ex)return ex.name;}const e=L.items.find(e=>e.id===p.cardio);return e?e.name:'平地步行／快走';}
function replaceExercise(plan,date,type,index,id){
 if(plan.blocked)throw Error('請先完成安全評估。');
 const s=plan.weeks.flatMap(w=>w.sessions).find(s=>s.date===date),e=L.items.find(e=>e.id===id);
 if(!s||!s.active||!e)throw Error('找不到運動項目。');
 const current=exerciseSet(plan.p,s)[type]?.[index];
 if(!current||!L.alternatives(plan.p,current,s).some(x=>x.id===id))throw Error('此替代項目不符合目前課表條件。');
 s.exercises[type][index]=e;return s;
}
function actions(p,s){
 const list=[];if(!s.active)return['今天不安排正式課表。依精神與身體狀況休息，不需補做或追趕。'];
 const ex=exerciseSet(p,s);
 list.push('暖身 5 分鐘：舒適慢走＋'+ex.warmup.map(e=>e.name).join('、')+'；逐漸進入運動。');
 if(s.aerobic)list.push(cardioName(p,s)+' '+s.aerobic+' 分鐘。'+ex.cardio[0].cue+(s.light?' 輕強度：能輕鬆說完整句子，主觀費力約 2–3／10。':' 中等強度：可說話但不易唱歌，主觀費力約 4–5／10；兩者不符時採較保守強度。')+' 只計入實際活動、達到指定強度的時間，休息或等球不混計。');
 if(s.strength){
  const risky=p.health.includes('osteoporosis')||p.health.includes('joint')||p.health.includes('fall');
  list.push('肌力 '+s.strength+' 分鐘：'+ex.strength.map(e=>e.name).join('、')+'。保留 2–3 次餘力，不閉氣、不追求力竭；以總區塊時間為上限，無法安全完成時減項、由教練補足。'+(risky?'由專業人員先決定動作與範圍；避免負重脊椎前彎與劇烈扭轉。':''));
  for(const e of ex.strength)list.push(e.name+'：'+L.prescription(e,'strength',s.strength,p)+'。'+e.cue);
  if(ex.strength.some(e=>e.pattern==='pull'&&e.learning))list.push('本次拉力類為動作學習，不能視為足量背部阻力訓練；請教練評估加入安全阻力帶或器械。');
 }
 if(s.functional){list.push('功能肌力 '+s.functional+' 分鐘：'+ex.functional.map(e=>e.name).join('、')+'，緩慢可控；此短課不列入完整全身肌力日。');for(const e of ex.functional)list.push(e.name+'：'+e.cue);}
 if(s.balance){list.push('平衡 '+s.balance+' 分鐘：'+ex.balance.map(e=>e.name).join('、')+'；保持眼睛張開，必要時有人陪同，不做無扶持挑戰。');for(const e of ex.balance)list.push(e.name+'：'+L.prescription(e,'balance',s.balance,p)+'。'+e.cue);}
 list.push('緩和 5 分鐘：慢走約 2 分鐘，其餘安排 '+ex.mobility.map(e=>e.name).join('、')+'；不彈震、不忍痛拉伸。');
 for(const e of ex.mobility)list.push(e.name+'：'+L.prescription(e,'mobility',5,p)+'。'+e.cue);
 return list;
}
function workTips(p){return{desk:'可把工作間歇設為每 50 分鐘起身 2–3 分鐘（本工具的生活提醒範例，非強制標準）；走動、活動髖踝與肩胛。站立本身不算中等強度有氧。',standing:'工作中分段休息、變換姿勢與活動踝關節。下肢疲勞時優先固定式自行車或水中活動，不追加跳躍或高負荷腿訓。',labor:'重工作日減輕額外訓練。以恢復、低衝擊有氧及動作控制為優先；工作搬重不等同均衡全身訓練。',shift:'以主要睡眠後的精神狀況決定運動時段；睡眠不足或剛結束夜班，可移動或取消課次，保留恢復。',mixed:'分散安排活動，選喜歡且方便持續的場地。避免用週末一次大運動量補回平日缺課。'}[p.work];}
function safetyTips(p){const tips=['運動中若胸痛、暈眩、異常喘或疼痛加劇，立即停止；若為急性嚴重症狀，尋求緊急醫療協助。','每天根據睡眠、症狀與工作負荷調整；可以減量或休息，未來週次不應自動升級。'];if(p.health.includes('hypertension'))tips.push('血壓與用藥依醫囑追蹤；出力時吐氣、不要閉氣，避免憋氣負重。');if(p.health.includes('diabetes'))tips.push('使用胰島素或會引發低血糖的藥物時，按醫囑監測並備快速糖分；神經、眼底及足部併發症需專屬評估。');if(p.health.includes('osteoporosis'))tips.push('避免脊椎負重前彎、劇烈扭轉與高跌倒風險，請專業人員先確認姿勢與負荷。');if(p.health.includes('joint'))tips.push('採不痛的動作範圍；若關節腫脹、疼痛加劇或持續不適，停止該動作並諮詢專業人員。');if([p.cardio,...(p.cardioChoices||[])].some(id=>['swim','aqua'].includes(id)))tips.push('水中活動需具備相應水性、在有人管理的場地進行；避免獨自游泳。');return tips;}
function csv(plan,selected){
 const rows=[['週次','日期','星期','開始時間（台灣 UTC+8）','課程','總分鐘','有氧分鐘','有氧強度','全身肌力分鐘','功能肌力分鐘','平衡分鐘','暖身分鐘','緩和分鐘','內容','重要聲明']];
 const weeks=selected?plan.weeks.filter(w=>w.number===selected):plan.weeks;
 for(const w of weeks)for(const s of w.sessions)rows.push([w.number,s.date,WEEKDAYS[s.day],s.active?plan.p.time:'',s.title,s.total,s.aerobic,s.active?(s.light?'輕強度':'中等強度'):'',s.strength,s.functional,s.balance,s.active?5:0,s.active?5:0,actions(plan.p,s).join('；'),DISCLAIMER]);
 return '\uFEFF'+rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\r\n');
}
function icsEscape(s){return String(s).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function fold(s){let out='',line='',bytes=0;for(const c of s){const size=new TextEncoder().encode(c).length;if(bytes+size>75){out+=line+'\r\n';line=' ';bytes=1;}line+=c;bytes+=size;}return out+line;}
function calendar(plan,selected){
 const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Fit Life Planner//ZH-TW','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:'+icsEscape('動得剛剛好・運動課表')];
 const weeks=selected?plan.weeks.filter(w=>w.number===selected):plan.weeks;
 for(const w of weeks)for(const s of w.sessions){if(!s.active)continue;const start=new Date(s.date+'T'+plan.p.time+':00+08:00');const end=new Date(start.getTime()+s.total*60000);const dt=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  // Stable identity avoids duplicate events when the same date/time is re-exported.
  lines.push('BEGIN:VEVENT','UID:fitlife-'+s.date.replace(/-/g,'')+'-'+plan.p.time.replace(':','')+'@fitlife.local','DTSTAMP:'+stamp,'DTSTART:'+dt(start),'DTEND:'+dt(end),'SUMMARY:'+icsEscape('運動草案 W'+w.number+'｜'+s.title),'DESCRIPTION:'+icsEscape(actions(plan.p,s).join('\n')+'\n'+DISCLAIMER),'STATUS:TENTATIVE','TRANSP:OPAQUE','BEGIN:VALARM','TRIGGER:-PT15M','ACTION:DISPLAY','DESCRIPTION:'+icsEscape('運動前請確認身體與恢復狀况'),'END:VALARM','END:VEVENT');
 }lines.push('END:VCALENDAR');return lines.map(fold).join('\r\n')+'\r\n';
}
const api={build,validate,screen,actions,cardioName,exerciseSet,replaceExercise,library:L,workTips,safetyTips,csv,calendar,addDays,WEEKDAYS,GOALS,WORK,HEALTH,DISCLAIMER};root.FitModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
