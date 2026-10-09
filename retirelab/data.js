(function(root){
const sources=[
 ['S01','國泰｜宅心安 JHA','官方商品頁：投保年齡、續保、日額','https://www.cathaylife.com.tw/official/products/health-surgery/jha'],
 ['S02','國泰｜JHA條款','第13條在宅給付上限、第15條案件計算','https://www.cathaylife.com.tw/official/content/dam/cathaylife-official/files/laws-policies/public-info/insurance/life-health-annuity/JHA%E6%A2%9D%E6%AC%BE.pdf'],
 ['S03','富邦｜安心在家 HJL','2026.08.27版；第2–3頁給付／收案、第5頁投保','https://www.fubon.com/life/cms/7ACA62C198CF4D4396FD989FE474462F/2026-08/202608261651303788568925.pdf'],
 ['S04','富邦｜在宅急症商品公告','2026.08.27；60歲男性日額1,000元案例','https://www.fubon.com/life/about-us/announcement/news/yi-liao-zhao-hu-cong-yi-yuan-yan-shen-dao-gu-ting--zai-zhai-ji-zheng-zhao-hu-cheng-yi-liao-xin-ri-chang'],
 ['S05','南山｜好安定 1HHI','2026.09版；第3頁投保規範、按次給付','https://www.nanshanlife.com.tw/nanshanlife/portal-api/File/11707'],
 ['S06','國泰｜樂齡守護 LCC','官方商品頁：長照認定、一次／分期金及實物服務','https://www.cathaylife.com.tw/official/products/health-long-term-care/lcc'],
 ['S07','富邦｜詠馨久久 LTS','官方商品頁：每年單利2%、最高192個月（無保證）','https://www.fubon.com/life/product/personal/medical/LTS'],
 ['S08','南山｜相守溢百 HRLTC3','2026.06版；相關分期給付最高15次','https://www.nanshanlife.com.tw/nanshanlife/portal-api/File/11225'],
 ['S09','台灣｜守護85 T08P0','官方商品頁：投保年期／年齡及保障到85歲','https://www.taiwanlife.com/product/14/T08P0/'],
 ['S10','凱基｜享放心','官方商品頁：分期給付最高15次；至100歲週年日','https://www.kgilife.com.tw/zh-tw/product-overview/personal/aandh/majiya'],
 ['S11','新光｜新依靠A型 D3A','官方商品頁：90日長照狀態、分期合計20次','https://www.skl.com.tw/content.html?insId=D3A'],
 ['S12','南山｜長青滿溢 SC','2024.09版；第3–4頁給付／等待、第6頁投保','https://www.nanshanlife.com.tw/nanshanlife/portal-api/File/4924'],
 ['S13','富邦｜銀向健康 CLY','官方商品頁：10／15／20年期投保年齡','https://www.fubon.com/life/product/selling/cooperation/C53DB6723B044481A01A05D2B0C67F7E/CLY'],
 ['S14','健保署｜在宅急症照護試辦計畫','2026.05.12公告；自5月1日起生效','https://www.nhi.gov.tw/ch/cp-19892-c500c-3258-1.html'],
 ['S15','衛福部｜長照十年計畫3.0','2026.03.09更新；公共服務需另確認資格','https://1966.gov.tw/LTC/cp-6572-85008-207.html'],
 ['S17','國泰｜心iLife定期壽險','官方商品頁：20–50歲承保、續保至65歲','https://www.cathaylife.com.tw/official/products/life-caring/mnc'],
 ['S18','國泰｜意外傷害險專區','樂享平安：55–76歲；各繳費年期須再核對','https://www.cathaylife.com.tw/official/products/accident'],
 ['S19','富邦｜安康如意 AJI','官方商品頁：16–70歲、壽險與傷害保障','https://www.fubon.com/life/product/personal/accident/AJI'],
 ['S21','南山｜實支實付型錄','2025.06版；1HS／1HSD／1HSCO給付差異','https://www.nanshanlife.com.tw/nanshanlife/portal-api/File/2462'],
 ['S23','金管會｜人身保險商品審查應注意事項','官方法規入口；查核頁列2025.07.30修正','https://law.fsc.gov.tw/LawContent.aspx?id=FL040352']
].map(([id,title,note,url])=>({id,title,note,url,date:'2026-10-09'}));
const catalog=[
 {id:'JHA',company:'國泰人壽',type:'home',name:'宅心安',full:'宅心安一年定期住院日額暨在宅急症照護醫療健康保險',min:0,max:54,end:80,basis:'daily',amount:1000,amountMax:2000,nonGuaranteed:true,refs:['S01','S02'],detail:'按日給付；在宅日額每保單年度最多60日。',perEventMax:60},
 {id:'HJL',company:'富邦人壽',type:'home',name:'安心在家',full:'安心在家一年期住院醫療健康保險',min:15,max:65,end:80,basis:'daily',amount:1000,amountMax:1500,nonGuaranteed:true,refs:['S03','S04'],detail:'肺炎每次最多14日；尿路／軟組織感染9日；排除提早出院。'},
 {id:'1HHI',company:'南山人壽',type:'home',name:'好安定',full:'好安定住院暨在宅急症照護一年期健康保險',min:0,max:75,end:85,basis:'event',amount:10000,amountMax:10000,nonGuaranteed:true,refs:['S05'],detail:'按次給付；1單位1,000元，2–10單位；同次事件依條款合併。'},
 {id:'LCC',company:'國泰人壽',type:'ltc',name:'樂齡守護',full:'樂齡守護長期照顧定期健康保險（外溢型）（實物給付型保險商品）',variants:[{years:10,min:40,max:75},{years:20,min:40,max:65},{years:30,min:40,max:55}],refs:['S06'],detail:'定期長照、一次／分期金及實物服務選擇；保障終點與分期次數須逐約填入。'},
 {id:'LTS',company:'富邦人壽',type:'ltc',name:'詠馨久久',full:'詠馨久久長期照顧終身壽險',min:15,max:65,end:100,maxYears:16,benefitGrowth:2,refs:['S07'],detail:'每年單利2%增加、最高192個月（無保證）；各繳費年期核保範圍須再確認。'},
 {id:'HRLTC3',company:'南山人壽',type:'ltc',name:'相守溢百',full:'相守溢百長期照顧終身保險',variants:[{years:10,min:15,max:70},{years:20,min:15,max:60}],end:100,maxYears:15,benefitGrowth:2,refs:['S08'],detail:'相關分期給付依次數單利2%增加；合計最高15次。'},
 {id:'T08P0',company:'台灣人壽',type:'ltc',name:'守護85',full:'守護85長期照顧定期健康保險',variants:[{years:10,min:15,max:70},{years:15,min:15,max:65},{years:20,min:15,max:60}],end:85,refs:['S09'],detail:'保障至85歲；一次金、分期金；分期給付限制須逐約核對。'},
 {id:'MAJI',company:'凱基人壽',type:'ltc',name:'享放心',full:'享放心長期照顧終身健康保險',end:100,maxYears:15,refs:['S10'],detail:'長照、完全失能及特定意外失能；分期最高15次。未取得投保年齡表。'},
 {id:'D3A',company:'新光人壽',type:'ltc',name:'新依靠A型',full:'新依靠A型長期照顧終身保險',variants:[{years:10,min:15,max:70},{years:20,min:15,max:60},{years:30,min:15,max:50}],end:100,maxYears:20,waiting:3,refs:['S11'],detail:'長照狀態持續90日；長照／完全失能分期金合計最高20次。'},
 {id:'SC',company:'南山人壽',type:'cancer',name:'長青滿溢',full:'長青滿溢癌症定期健康保險',variants:[{years:10,min:55,max:80},{years:20,min:55,max:70}],refs:['S12'],detail:'90日等待期；首年給付與之後不同。模型一次金須填入事故當年的可領金額。'},
 {id:'CLY',company:'富邦人壽',type:'cancer',name:'銀向健康',full:'銀向健康防癌定期健康保險',variants:[{years:10,min:55,max:80},{years:15,min:55,max:75},{years:20,min:55,max:70}],refs:['S13'],detail:'罹癌一次金及重度癌症安養給付。試算僅計使用者填入的一次金。'},
 {id:'MNC',company:'國泰人壽',type:'life',name:'心iLife',full:'心iLife一年期定期壽險',min:20,max:50,end:65,refs:['S17'],detail:'身故／完全失能保障；續保上限65歲。'},
 {id:'LEPING',company:'國泰人壽',type:'accident',name:'樂享平安',full:'樂享平安定期保險',min:55,max:76,refs:['S18'],detail:'意外、失能、骨折等保障；各年期條件須再確認。'},
 {id:'AJI',company:'富邦人壽',type:'accident',name:'安康如意',full:'安康如意終身保險',min:16,max:70,end:100,refs:['S19'],detail:'壽險、傷害失能、傷害醫療複合保障。模型只計填入的傷害醫療補償。'},
 {id:'MEDDOC',company:'南山人壽',type:'medical',name:'實支實付商品組',full:'1HS／1HSD／1HSCO官方型錄',refs:['S21'],researchOnly:true,detail:'不同自負額與部分負擔；先確認具體契約，再以自訂保單輸入。'}
];
root.RetirementData={sources,catalog};if(typeof module!=='undefined'&&module.exports)module.exports=root.RetirementData;
})(typeof window!=='undefined'?window:globalThis);
