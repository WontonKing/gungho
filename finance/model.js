/* 金額一律為新臺幣元，時間為月，報酬為名目年率。純函式不儲存個資。 */
(function(root){
'use strict';
const defaults={age:45,retire:65,end:95,income:65000,cost:35000,debtPay:8000,savingMode:'auto',saveRatio:80,manualSaving:18000,salaryGrowth:2,retCost:30000,medical:3000,medicalInflation:3,care:35000,careAge:85,careYears:5,inf:2,cash:40,stock:100,bond:30,other:30,home:1000,liability:0,cashR:1,stockR:5.5,bondR:2.5,otherR:4,fee:0.3,targetStock:40,targetBond:40,targetCash:20,laborMode:'lump',laborBalance:80,laborContribution:3900,laborR:3,pension:22000,pensionAge:65,laborMonthly:7000,laborStart:65,laborYears:20,otherPension:0,otherStart:65,rent:0,rentStart:65,rentYears:30,pensionGrowth:0,rentGrowth:2,withdraw:3.5,reserveYears:2,legacy:0};
const assetNames=['cash','stock','bond','other'];
function annualToMonthly(pct){return Math.pow(1+pct/100,1/12)-1;}
function validate(p){
 const e=[]; for(const k of Object.keys(defaults)){ if(typeof defaults[k]==='number'&&(!Number.isFinite(p[k])||p[k]<0&& !['cashR','stockR','bondR','otherR','salaryGrowth','pensionGrowth','rentGrowth'].includes(k)))e.push('請檢查輸入欄位：'+k); }
 if(p.age<18||p.age>100)e.push('目前年齡請介於 18 至 100 歲。');
 if(p.retire<p.age||p.retire>100)e.push('退休年齡須大於或等於目前年齡，且不超過 100 歲。');
 if(p.end<=p.retire||p.end>120)e.push('規劃終點須大於退休年齡，且不超過 120 歲。');
 if(![p.age,p.retire,p.end,p.careAge,p.pensionAge,p.laborStart,p.otherStart,p.rentStart].every(Number.isInteger))e.push('年齡請填整數。');
 if(Math.abs(p.targetStock+p.targetBond+p.targetCash-100)>0.01)e.push('退休配置的股票、債券、現金比例合計須為 100%。');
 if(p.saveRatio>100)e.push('投入結餘比例不能超過 100%。');
 if(['pensionAge','laborStart','otherStart','rentStart','careAge','careYears','laborYears','rentYears'].some(k=>p[k]>120))e.push('開始年齡與支應年數不得超過 120。');
 if(['inf','medicalInflation','fee'].some(k=>p[k]>30))e.push('通膨與費用率不得超過 30%。');
 if(Object.keys(defaults).some(k=>typeof defaults[k]==='number'&&Math.abs(p[k])>1e10))e.push('輸入數字過大，請檢查金額單位。');
 if(p.laborMode==='monthly'&&p.laborStart<60)e.push('簡化模型的勞退月領開始年齡須為 60 歲以上。');
 if(p.withdraw<=0||p.withdraw>10)e.push('提領率參考值請介於 0%（不含）至 10%。');
 if(['cashR','stockR','bondR','otherR','laborR','salaryGrowth','pensionGrowth','rentGrowth'].some(k=>p[k]<=-100||p[k]>30))e.push('年率請大於 -100% 且不超過 30%。');
 if(!['auto','manual'].includes(p.savingMode)||!['lump','monthly','none'].includes(p.laborMode))e.push('請選擇有效的儲蓄與勞退模式。');
 if(p.laborMode==='lump'&&p.retire<60)e.push('簡化模型的勞退一次領模式須設定 60 歲以上退休；提早退休可改用月領或不納入。');
 return [...new Set(e)];
}
function rates(p){const total=assetNames.reduce((s,k)=>s+p[k],0);const accum=total?assetNames.reduce((s,k)=>s+p[k]*p[k+'R']/total,0)-p.fee:(p.targetStock*p.stockR+p.targetBond*p.bondR+p.targetCash*p.cashR)/100-p.fee;const retired=(p.targetStock*p.stockR+p.targetBond*p.bondR+p.targetCash*p.cashR)/100-p.fee;return {accum,retired};}
function incomeAt(p,age){
 const pension = age>=p.pensionAge?p.pension*Math.pow(1+p.pensionGrowth/100,age-p.pensionAge):0;
 const labor = p.laborMode==='monthly'&&age>=p.laborStart&&age<p.laborStart+p.laborYears?p.laborMonthly*Math.pow(1+p.pensionGrowth/100,age-p.laborStart):0;
 const other = age>=p.otherStart?p.otherPension*Math.pow(1+p.pensionGrowth/100,age-p.otherStart):0;
 const rent = age>=p.rentStart&&age<p.rentStart+p.rentYears?p.rent*Math.pow(1+p.rentGrowth/100,age-p.rentStart):0;
 return pension+labor+other+rent;
}
function expenseAt(p,age){const t=age-p.age;return p.retCost*Math.pow(1+p.inf/100,t)+p.medical*Math.pow(1+p.medicalInflation/100,t)+(age>=p.careAge&&age<p.careAge+p.careYears?p.care*Math.pow(1+p.medicalInflation/100,t):0);}
function savingAt(p,t){return p.savingMode==='manual'?p.manualSaving*Math.pow(1+p.salaryGrowth/100,t):Math.max(0,p.income*Math.pow(1+p.salaryGrowth/100,t)-p.cost*Math.pow(1+p.inf/100,t)-p.debtPay)*p.saveRatio/100;}
function simulate(p,options={}){
 const errors=validate(p);if(errors.length)return {errors};
 const rr=rates(p),ra=annualToMonthly(rr.accum),rb=annualToMonthly(rr.retired),rl=annualToMonthly(p.laborR),n=(p.retire-p.age)*12,h=(p.end-p.retire)*12;
 let a=assetNames.reduce((s,k)=>s+p[k]*10000,0),labor=p.laborBalance*10000;
 const rows=[],trajectory=[{age:p.age,balance:a,real:a,phase:'在職'}];let added=0;
 for(let y=0;y<n/12;y++){let annualSave=0;for(let mo=0;mo<12;mo++){const t=(y*12+mo)/12,s=savingAt(p,t);a=a*(1+ra)+s;annualSave+=s;if(p.laborMode==='lump')labor=labor*(1+rl)+p.laborContribution*Math.pow(1+p.salaryGrowth/100,t);}added+=annualSave;rows.push({age:p.age+y+1,phase:'累積',expense:null,income:null,flow:annualSave,balance:a,unfunded:0,real:a/Math.pow(1+p.inf/100,y+1)});trajectory.push({...rows[rows.length-1]});}
 const liability=p.liability*10000*Math.pow(1+p.inf/100,p.retire-p.age),lump=p.laborMode==='lump'?labor:0,available=a+lump-liability;
 const shock=options.shock||0,factor=1+shock*(p.targetStock/100);
 const terminal=p.legacy*10000*Math.pow(1+p.inf/100,p.end-p.age);
 let required=terminal;
 for(let j=h-1;j>=0;j--){const age=p.retire+j/12;required=Math.max(0,(required+expenseAt(p,age)-incomeAt(p,age))/(1+rb));}
 required/=factor;
 let b=Math.max(0,available)*factor,unfunded=Math.max(0,-available),depletion=available<0?p.retire:null;
 const retirementPoint={age:p.retire,balance:b,real:b/Math.pow(1+p.inf/100,p.retire-p.age),phase:'退休起點'};
 trajectory.push(retirementPoint);
 for(let y=0;y<h/12;y++){let ex=0,inc=0,annualShort=0;for(let mo=0;mo<12;mo++){const age=p.retire+y+mo/12,c=expenseAt(p,age),i=incomeAt(p,age);b=b*(1+rb)+i-c;ex+=c;inc+=i;if(b < -0.01){if(depletion===null)depletion=age;annualShort+=-b;unfunded+=-b;b=0;}else if(b<0){b=0;}}const age=p.retire+y+1;const row={age,phase:'退休',expense:ex,income:inc,flow:inc-ex,balance:b,unfunded:annualShort,real:b/Math.pow(1+p.inf/100,age-p.age)};rows.push(row);trajectory.push(row);}
 let annuity=0;for(let j=0;j<n;j++)annuity+=Math.pow(1+p.salaryGrowth/100,j/12)*Math.pow(1+ra,n-1-j);
 const gap=Math.max(0,required-available),extra=n>0?gap/annuity:null,firstExpense=expenseAt(p,p.retire),firstIncome=incomeAt(p,p.retire),firstGap=Math.max(0,firstExpense-firstIncome),rule=firstGap*12/(p.withdraw/100),reserve=firstGap*12*p.reserveYears;
 return {errors:[],rates:rr,required,available,gap,extra,rule,reserve,lump,liability,retirementPoint,firstExpense,firstIncome,firstGap,depletion,unfunded,final:b,terminal,added,rows,trajectory,coverage:required>0?available/required*100:null};
}
function scenarios(p){return [{name:'基本情境',p:{...p},options:{}},{name:'低報酬・高通膨',p:{...p,cashR:p.cashR-1,stockR:p.stockR-2,bondR:p.bondR-1,otherR:p.otherR-2,inf:p.inf+1,medicalInflation:p.medicalInflation+1},options:{}},{name:'退休首日股市跌 30%',p:{...p},options:{shock:-0.3}},{name:'延後 3 年退休',p:{...p,retire:Math.min(p.retire+3,p.end-1,100)},options:{}}].map(s=>({...s,result:simulate(s.p,s.options)}));}
const api={defaults,validate,rates,incomeAt,expenseAt,savingAt,simulate,scenarios};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.RetirementModel=api;
})(typeof window!=='undefined'?window:globalThis);
