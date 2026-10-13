/* 新增主題：複製一個物件並填寫 title、description、category、url。
   url 使用 / 開頭表示同網域根目錄；跨網站請填完整 https:// 網址。
   陣列順序就是畫面順序，卡片與編號會自動產生。 */
window.SCHOOL_TOPICS = [
  
  {  title: '減重針背後的新生意', description: 'GLP-1 藥物怎麼讓人吃不下？各種藥差在哪？藥廠為什麼要串連遠距醫療、智慧筆數據和 AI 營養工具？看懂科學原理與「藥物＋數據＋平台」的商業模式。', category: '醫療新知', url: '/KS/GLP/index.html', date: '2026-09-15' },
  { title: '捐血小學堂', description: '捐血會讓人變得比較健康嗎？還是有其它的因素呢？讓我們思考一下吧。', category: '醫療新知', url: '/KS/blooddonate/index.html', date: '2026-09-15'},
  { title: '懷舊小學堂', description: '假裝自己年輕二十歲真的會讓身體變健康嗎？還是有其它的心理機制呢？', category: '睡眠情緒', url: '/KS/timetherapy/index.html', date: '2026-09-16'},
  { title: '高資產怎麼會變成下流老人', description: '有房也有存款，老後為什麼還會卡關？一起做退休前財務健檢。', category: '退休理財', url: '/KS/alf/index.html', date: '2026-09-17'},
  { title: '腸子和腦子的雙向交流', description: '腸子和腦子如何溝通？只有肚子餓那麼簡單嗎？', category: '醫療新知', url: '/KS/gbc/index.html', date: '2026-09-18'},
  {    title: '退休保險怎麼保',    description: '保險保險，有保就有驚無險。但是，你對退休保險知多少？',    category: '退休理財',    url: '/KS/retireinsurance/index.html' , date: '2026-10-01'   },
  {    title: '多咬一口，腦袋會更靈光嗎？',    description: '咀嚼能力好可以預防失智？做口腔操有用嗎？要怎麼做？',    category: '健康練習',    url: '/KS/chew/index.html' ,  date: '2026-10-02'   },
  {   title: '跟著節拍，走路更穩嗎？',  description: '節律性聽覺刺激如何幫助帕金森病友改善步速與步幅？看懂原理與證據，還能試聽節拍器示範。',  category: '健康練習',  url: '/KS/rhythm/index.html' , date: '2026-10-10'   },
  {   title: '天變短了，心情也變暗了？',         description: '光週期如何透過生物時鐘、褪黑激素與血清素影響睡眠和情緒？認識季節性情感障礙與光照療法，排出自己的晨光時間表。',         category: '睡眠情緒',         url: '/KS/light/',  date: '2026-10-10'     },
  {       title: '退休，要從幾歲開始準備？',       description: '看懂勞保老年年金65歲新規、提前減給與延後增給，用三大支柱與三層現金流規劃退休，附勞保年金試算與行動清單。',       category: '退休理財',       url: '/KS/PREP/' ,  date: '2026-10-10'   },
  { title: '照光，能讓傷口好得快？', description: '紅光、近紅外光與藍光對傷口癒合有什麼不同？看懂光生物調節原理、劑量為何不是越多越好，以及光療的安全注意事項。', category: '醫療新知', url: '/KS/WOUND/',  date: '2026-10-11' },
  { title: '在家一角綠，給你好心情？', description: '室內植物對情緒的幫助比淨化空氣更明確。看懂證據、挑對植栽與植物燈，配置書桌、客廳、床頭三種療癒角落。', category: '樂活空間', url: '/KS/GREEN/' ,  date: '2026-10-11'},
  { title: '每天念出聲，大腦會更健康嗎？', description: '出聲朗讀是累積認知儲備的好習慣，但預防失智要多管齊下。看懂 WHO 2026 新指引，跟著朗讀計時器念一首唐詩。', category: '健康練習', url: '/KS/READ/' ,  date: '2026-10-11'},
  { title: '聞不到味道，是大腦在提醒？', description: '嗅覺減退或幻嗅可能是神經退化的早期警訊，也可能只是鼻子出問題。看懂原因、就醫時機，用嗅覺小日記記錄變化。', category: '大腦保健', url: '/KS/SMELL/',  date: '2026-10-11' },
  { title: '禱告，能讓心安穩下來嗎？', description: '禱告是面對壓力的信仰資源，但不取代醫療與心理專業。認識禱告類型、證據界線，跟著十分鐘安穩禱告練習。', category: '信仰生活', url: '/KS/PRAY/',  date: '2026-10-11' },
  { title: '動手種一盆，身心更舒坦？', description: '園藝治療對幸福感、壓力與高齡憂鬱有潛在幫助，但預防失智的證據還不足。看懂研究證據與活動設計，排出自己的居家園藝週計畫。', category: '健康練習', url: '/KS/GARDEN/', date: '2026-10-11' },
{ title: '每週讀本書，會活得更久嗎？', description: '耶魯研究發現每週讀書3.5小時以上的人死亡風險較低，但「多活23個月」是未調整的數字。看懂閱讀與認知、同理心的證據，算算自己的每週閱讀時數。', category: '大腦保健', url: '/KS/BOOK/', date: '2026-10-12' },
{ title: '生活，也能當處方嗎？', description: '生活型態醫學的六大支柱與社會處方箋：吃、動、睡、紓壓、遠離風險物質與人際連結。看懂證據界線，算算運動量、跟著做三分鐘正念。', category: '健康練習', url: '/KS/LIFERX/', date: '2026-10-12' },
{ title: '寫下五個願望，讓家人不用猜？', description: '預立醫療不是放棄治療，而是讓醫療選擇符合自己的價值。認識五個願望、病主法與安寧意願書的差別，填寫自己的願望練習卡。', category: '醫療新知', url: '/KS/WISHES/', date: '2026-10-12' },
{ title: '突然好想吃，是身體缺什麼嗎？', description: '嘴饞不等於肚子餓，也不代表缺某種營養素。看懂大腦「想要」與「喜歡」、壓力與經前期的影響，跟著十分鐘延遲與渴望小日記找出觸發點。', category: '健康練習', url: '/KS/CRAVE/', date: '2026-10-12' },
{ title: '喝完酒隔天，為什麼特別焦慮？', description: '宿醉焦慮不是想太多，而是酒退後大腦與身體的反彈。看懂成因、宿醉與酒精戒斷的差別，跟著慢呼吸與警訊檢查。喝酒有害健康，開車不喝酒，喝酒不開車。', category: '睡眠情緒', url: '/KS/HANGX/', date: '2026-10-12' },
{ title: 'AI 說「我懂你」，它真的懂嗎？', description: '從 ELIZA 效應看生成式 AI 的情感依附與心理依賴，學會分辨健康使用與警訊、保護隱私、看穿操縱設計。', category: '科技生活', url: '/KS/ELIZA/', date: '2026-10-12' },
{ title: '退休後的錢，怎麼領才不怕用完？', description: '退休理財重在穩定現金流、抗通膨與醫療預備金。看懂4%法則與70%所得替代率的限制、報酬順序風險，附退休缺口試算與年度健檢清單。', category: '退休理財', url: '/KS/RETFIN/', date: '2026-10-12' }   
,{ title: '為什麼有些長輩特別受歡迎？', description: '情緒穩定、真誠、讓人覺得被理解、提攜而不說教。從社會情緒選擇理論與「被理解感」看懂受歡迎長輩的心理學，再練習六個日常好用的說法。', category: '樂活空間', url: '/KS/CHARM/', date: '2026-10-13' },
{ title: '雙胞胎為什麼越來越多？', description: '全球每 42 個新生兒就有 1 個是雙胞胎。看懂同卵與異卵、雙胞胎變多的原因、非洲的雙胞胎生存悖論，以及雙胞胎懷孕的照護重點。', category: '醫療新知', url: '/KS/TWINS/', date: '2026-10-13' }
,{ title: '我的帳號，身後誰能看？', description: '從美國 RUFADAA 看懂數位遺產的三層順位、通訊內容與目錄的差別，以及 AI「數位復活」的法律問題，再動手整理自己的數位資產清單與 AI 分身意願。', category: '科技生活', url: '/KS/DLEGACY/', date: '2026-10-12' }
,{ title: '為什麼總是好累？', description: '一般疲勞和慢性疲勞症候群（ME/CFS）怎麼分？認識活動後症狀惡化、腸道菌研究、營養與咖啡因、運動治療爭議，再用能量電池和每日檢核表做好能量管理。', category: '醫療新知', url: '/KS/FATIGUE/', date: '2026-10-13' }
   
   // ,{ title: '新主題名稱', description: '主題簡介', category: '主題分類', url: '/KS/新路徑/', date: '日期XXXX-XX-XX' }
];
