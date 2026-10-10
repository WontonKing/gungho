/* Educational movement library. Eligibility is a conservative software filter, not clinical approval. */
(function(root){'use strict';
const items=[];
function add(id,type,pattern,name,equipment,cue,flags=[],extra={}){items.push({id,type,pattern,name,equipment,cue,flags,...extra});}
const body=['none','band','dumbbell','gym'],band=['band','gym'],weights=['dumbbell','gym'],gym=['gym'];
const CATEGORIES={cardio:'有氧與休閒活動',strength:'全身肌力',mobility:'活動度與柔軟度',balance:'平衡與協調',functional:'日常功能'};
const PATTERNS={squat:'腿部／坐站',hip:'臀部／髖',push:'胸部／推',pull:'背部／拉',core:'核心穩定',calf:'小腿',arm:'手臂／肩',mobility:'活動度',balance:'平衡',functional:'日常功能',cardio:'心肺耐力'};
add('walk','cardio','cardio','平地步行／快走',body,'選平坦防滑路面；從舒適步速開始，以談話測試控制速度。');
add('indoor','cardio','cardio','室內低衝擊踏步',body,'原地小幅踏步、手臂自然擺動；不跳躍，旁邊保留扶手。');
add('cycle','cardio','cardio','固定式自行車',body,'先調整座高，採舒適阻力；膝部不適時縮小負荷或停止。');
add('swim','cardio','cardio','游泳',body,'限熟悉泳式與有救生員的場地；不獨自游泳，保留呼吸與速度控制。',[],{water:true});
add('aqua','cardio','cardio','水中行走／水中有氧',body,'在可安全站立且有人管理的水域練習；先確認進出水池與水溫。',[],{water:true});
add('treadmill','cardio','cardio','跑步機步行',body,'從低速、平坡開始，確認緊急停止裝置；上下機先停帶。',['fall']);
add('elliptical','cardio','cardio','橢圓機',body,'由教練示範上下機，先採低阻力；維持可說話的節奏。',['fall','new']);
add('dance','cardio','cardio','低衝擊有氧舞蹈',body,'採踏步與側點步、不跳躍；避免快速扭轉，跟不上時放慢。',['fall','joint']);
add('outdoorcycle','cardio','cardio','平路休閒單車',body,'需會騎乘、戴安全帽，選平坦低車流路線；避免追求速度。',['fall','new','medical']);
add('nordic','cardio','cardio','健走杖步行',body,'先由教練調整杖長與步態，再在平地練習。',['fall']);
add('walkrun','cardio','cardio','走跑交替',body,'限已有規律習慣者與教練確認；跑段仍須可說話，不使用衝刺。',['new','joint','fall','osteoporosis','medical','tired']);
add('hike','cardio','cardio','緩坡健行',body,'選熟悉短路線，避免陡坡、碎石與濕滑路面；帶水與同伴。',['new','joint','fall','osteoporosis','medical','tired']);
add('rowing','cardio','cardio','划船機',body,'需先學正確髖與背部配合；低阻力起步，不駝背拉扯。',['new','joint','osteoporosis','medical','tired']);
add('tabletennis','cardio','cardio','休閒桌球',body,'採可控對打、不快速追球；只有實際達到目標強度的活動時間才計入。',['fall','joint','medical']);
add('badminton','cardio','cardio','休閒羽球',body,'限規律運動者；以平穩短距離對打為主，不跳殺、不急轉追球。',['new','fall','joint','osteoporosis','medical','tired']);

add('chair-stand','strength','squat','椅子坐站',body,'使用不滑動、無輪子的穩固椅子；緩慢站起與坐下，在不痛範圍活動。');
add('mini-squat','strength','squat','扶椅淺蹲',body,'雙手扶穩，膝部與腳尖同方向，只下降到舒適深度。',['joint']);
add('box-squat','strength','squat','箱式深蹲（徒手）',body,'以固定椅面作深度參考；臀部後移，坐穩再起身，不急落。',['joint','new']);
add('goblet','strength','squat','輕啞鈴杯式深蹲',weights,'教練確認負重與深度後進行；不閉氣、不忍痛。',['joint','osteoporosis','new','medical','tired']);
add('leg-press','strength','squat','器械坐姿腿推',gym,'教練先調座位與活動範圍；不鎖死膝，不追求深屈。',['new']);
add('band-chair','strength','squat','阻力帶椅子坐站',band,'帶子位置與張力先由教練確認，維持膝與腳尖對齊。',['joint','new']);
add('standing-hip','strength','hip','扶椅髖伸展',body,'扶穩後將一腳小幅向後移，軀幹直立，避免腰部後仰。');
add('side-leg','strength','hip','扶椅側抬腿',body,'髖與身體保持正面，腿小幅外抬，不歪腰或甩腿。');
add('glute-bridge','strength','hip','橋式臀部抬起',body,'仰躺屈膝，臀部小幅抬起，肋骨與骨盆穩定；上下地板需安全。',['fall']);
add('hinge-wall','strength','hip','碰牆髖鉸鏈',body,'面向前、臀部後移碰近牆；由教練確認背部中立，不彎腰追深度。',['osteoporosis','new']);
add('band-hip','strength','hip','阻力帶髖外展',band,'扶穩後在舒適範圍向外移腿，不讓帶子拉歪姿勢。');
add('db-hinge','strength','hip','輕啞鈴髖鉸鏈',weights,'先學徒手髖鉸鏈，再由教練決定重量與範圍；不彎脊椎硬拉。',['osteoporosis','new','medical','tired']);
add('machine-hip','strength','hip','坐姿髖外展器械',gym,'調整器械後小幅可控開合，不用力撞擋板。');

add('wall-push','strength','push','牆面伏地挺身',body,'手置胸部高度、身體一直線，緩慢靠近與推離，不聳肩。');
add('counter-push','strength','push','高支撐斜板伏地挺身',body,'只使用固定不滑的檯面；高度由教練決定，維持軀幹中立。',['new']);
add('band-chest','strength','push','阻力帶胸推',band,'固定點必須由教練確認；出力吐氣，避免帶子反彈。');
add('db-chest','strength','push','啞鈴胸推',weights,'使用穩固長凳，由教練安排上下凳與負重；肩部無痛範圍。',['new','fall','medical']);
add('machine-chest','strength','push','器械坐姿胸推',gym,'先調椅高與握把，肩胛自然穩定，避免憋氣。');
add('band-press','strength','push','坐姿阻力帶前推',band,'在穩固椅上坐直，固定點經確認後平穩前推。');

add('scapula','strength','pull','肩胛後收（動作學習）',body,'肩膀放鬆，肩胛小幅向後；這不是足量的阻力拉力訓練。',[],{learning:true});
add('wall-scapula','strength','pull','站姿肩胛控制（動作學習）',body,'靠近牆面維持軀幹直立，手臂小幅外開；不聳肩、不拱腰。',[],{learning:true});
add('band-row','strength','pull','坐姿阻力帶划船',band,'確認固定點與帶子狀態，手肘平穩向後，不後仰。');
add('band-standing-row','strength','pull','站姿阻力帶划船',band,'雙腳站穩，固定點由教練確認，避免身體借力晃動。',['fall']);
add('db-row','strength','pull','支撐式啞鈴划船',weights,'用固定檯面支撐，由教練調整背部姿勢；不扭轉軀幹。',['new','osteoporosis','medical']);
add('machine-row','strength','pull','器械坐姿划船',gym,'胸部與骨盆穩定，向後拉時不聳肩，不借腰後仰。');
add('pulldown','strength','pull','坐姿滑輪下拉',gym,'拉向胸前、避免頸後下拉；握距及重量由教練決定。',['new']);

add('standing-core','strength','core','站姿腹部穩定與呼吸',body,'站直、腹部輕收，持續自然呼吸，不閉氣或用力縮腹。');
add('wall-plank','strength','core','牆面支撐核心',body,'前臂靠牆、身體中立，短時間可控維持，不聳肩。');
add('heel-slide','strength','core','仰躺腳跟滑動',body,'仰躺屈膝，腳跟小幅前後滑動，腰與骨盆保持穩定。',['fall']);
add('bird-dog','strength','core','四足跪姿對側伸展',body,'在防滑墊上由教練指導；先單肢，再考慮對側，不塌腰。',['new','joint','fall','osteoporosis']);
add('pallof','strength','core','阻力帶抗旋轉推',band,'固定點經確認，雙腳站穩，手向前推時軀幹不扭轉。',['new','fall']);
add('pilates-breath','strength','core','皮拉提斯中立位呼吸啟動',body,'坐姿或站姿練習肋骨與骨盆對齊、自然呼吸；不是完整皮拉提斯課。',[],{learning:true});

add('calf-raise','strength','calf','扶椅雙腳提踵',body,'扶穩、慢慢抬起與放下腳跟，避免向前倒。');
add('seated-calf','strength','calf','坐姿提踵',body,'坐在穩固椅上，腳掌貼地、抬放腳跟，動作平穩。');
add('curl','strength','arm','輕啞鈴二頭彎舉',weights,'坐姿或站穩，手肘貼近身體，緩慢彎曲與放下，不甩動。');
add('band-curl','strength','arm','阻力帶二頭彎舉',band,'帶子位置由教練確認，手肘穩定，不過度拉長。');
add('lateral-raise','strength','arm','輕啞鈴側平舉',weights,'教練確認肩部無痛範圍後進行，不聳肩、不抬超過可控高度。',['new','medical']);

add('shoulder-circle','mobility','mobility','肩膀小幅繞環',body,'肩膀放鬆，小幅慢速向前後繞環，不忍痛。');
add('ankle-circle','mobility','mobility','坐姿踝關節活動',body,'坐穩後腳踝小幅繞環或勾腳，不急轉。');
add('neck-turn','mobility','mobility','坐姿頸部轉向',body,'保持坐直，慢慢左右看向舒適角度；不用手拉頭。');
add('chest-open','mobility','mobility','胸前舒適開展',body,'肩胛放鬆、手臂小幅向後開；不強拉肩部。');
add('calf-stretch','mobility','mobility','扶牆小腿伸展',body,'腳跟貼地、扶牆站穩，感到輕微牽拉即可。');
add('hip-flexor','mobility','mobility','扶穩髖前側伸展',body,'小前後步、骨盆穩定，不壓腰或刻意拉大步距。',['fall']);
add('hamstring','mobility','mobility','坐姿腿後側伸展',body,'一腳向前、背部保持中立，只微幅由髖前移，不低頭摸腳。',['osteoporosis']);
add('wrist-mobility','mobility','mobility','手腕與前臂活動',body,'手腕舒適屈伸與轉動，不壓到疼痛位置。');
add('wall-slide','mobility','mobility','牆面肩臂滑動',body,'手臂沿牆在無痛角度滑動，肋骨不外翻，不拱腰。');
add('heel-toe','mobility','mobility','坐姿腳跟腳尖交替',body,'腳跟與腳尖輪流小幅抬起，控制節奏、放鬆小腿。');
add('chair-yoga','mobility','mobility','椅子瑜伽短活動序列',body,'以坐直呼吸、肩部與踝部活動組合，不加脊椎深彎與扭轉；不是完整瑜伽課。');
add('hip-march','mobility','mobility','扶穩小幅抬膝活動',body,'扶固定物，左右小幅抬膝，不甩腿、不聳肩。');

add('weight-shift','balance','balance','扶穩左右重心轉移',body,'雙腳站穩、手扶固定物，左右小幅移動重心，眼睛張開。');
add('forward-shift','balance','balance','扶穩前後重心轉移',body,'採小前後步，微幅轉移重心；不踮腳追距離。');
add('semi-tandem','balance','balance','扶穩半前後腳站',body,'腳跟錯開站位，在穩固扶手旁保持，必要時有人陪同。');
add('tandem','balance','balance','扶穩前後腳站',body,'採舒適間距，手可持續扶穩，眼睛張開；不能穩定時改半前後腳。',['new','fall']);
add('side-step','balance','balance','扶手旁側向小步',body,'沿固定扶手緩慢側移，雙腳不交叉，清空地面障礙物。');
add('toe-tap','balance','balance','扶穩前方腳尖點地',body,'手扶穩，左右腳小幅向前點地再收回，不踢高。');
add('taichi','balance','balance','太極重心轉移短練習',body,'由教練帶領小步重心移動，保持自然呼吸，不追求低架式；不算整堂太極課。');
add('single-leg','balance','balance','扶穩單腳短站',body,'手持續扶固定物，短時間微抬一腳；不閉眼、不拿掉支撐。',['new','fall']);
add('heel-toe-walk','balance','balance','扶手旁腳跟接腳尖步行',body,'有人陪同、旁有固定扶手，採小步慢走；不穩即改普通步行。',['new','fall','joint']);
add('seated-reach','balance','balance','坐姿小幅伸手與重心控制',body,'坐穩、雙腳貼地，小幅伸手取物；不扭腰、不探身追遠物。');

add('functional-stand','functional','functional','日常坐站練習',body,'穩固椅上練習慢起身、慢坐下，依教練建議使用支撐。');
add('functional-calf','functional','functional','扶穩提踵與站姿控制',body,'扶固定物，小幅提踵，注意平穩抬放。');
add('functional-reach','functional','functional','站姿近距離取物',body,'物品置於胸腹高度，只做近距離取放；不負重、不踩高。');
add('functional-turn','functional','functional','扶手旁分步轉向',body,'用數個小步改變方向，不軸心急轉；需要時有人陪同。',['joint','fall']);

function eligibility(p,e){
 const reasons=[];if(e.type!=='cardio'&&!e.equipment.includes(p.equipment))reasons.push('需要其他器材');
 const tired=p.fatigue==='high'||p.sleep<6||p.recovery==='tired'||p.adherence==='low'||p.work==='labor';
 const checks={new:p.experience==='new',joint:p.health.includes('joint')||p.pain>0,fall:p.health.includes('fall')||p.age>=75,osteoporosis:p.health.includes('osteoporosis'),medical:p.health.length>0||p.pain>0,tired};
 const labels={new:'需已有規律習慣',joint:'目前關節／疼痛條件不安排',fall:'目前平衡條件不安排',osteoporosis:'目前骨質條件不安排',medical:'目前健康條件需另行確認',tired:'目前恢復條件不安排'};
 for(const flag of e.flags)if(checks[flag])reasons.push(labels[flag]);
 return{ok:!reasons.length,reasons};
}
function pool(p,type,pattern){let options=items.filter(e=>e.type===type&&(!pattern||e.pattern===pattern)&&eligibility(p,e).ok);if(type==='strength'&&pattern==='pull'&&options.some(e=>!e.learning))options=options.filter(e=>!e.learning);return options;}
function pick(options,seed){return options.length?options[((seed%options.length)+options.length)%options.length]:null;}
function prescription(e,type,minutes,p){
 if(type==='cardio')return minutes+' 分鐘，依本課強度與談話測試調整';
 if(type==='mobility')return '舒適小幅活動／伸展，約 20–30 秒 × 1–2 回；計入緩和時間';
 if(type==='balance')return '每項短練習約 20–30 秒，間歇休息，合計不超過 '+minutes+' 分鐘';
 if(type==='functional')return '每動作約 4–8 次，慢速可控，合計不超過 '+minutes+' 分鐘';
 if(e.learning)return '短時間動作學習，不當作足量阻力訓練';
 if(e.pattern==='core')return '短時間 10–20 秒或 4–8 次 × 1–2 回，持續呼吸';
 return minutes<20||p.experience==='new'?'約 5–10 次 × 1 組，組間休息 45–90 秒':'約 8–12 次 × 1–2 組，組間休息 45–90 秒';
}
function session(p,s){
 if(!s.active)return{warmup:[],cardio:[],strength:[],mobility:[],balance:[],functional:[]};
 const seed=p.variety==='steady'?0:s.day+7*(s.week-1);
 const selected=new Set([p.cardio,...(p.cardioChoices||[])]);
 let cp=items.filter(e=>e.type==='cardio'&&selected.has(e.id)&&eligibility(p,e).ok);
 if(!cp.length)cp=pool(p,'cardio').filter(e=>['walk','indoor','cycle','aqua'].includes(e.id));
 const result={warmup:[items.find(e=>e.id==='shoulder-circle'),items.find(e=>e.id==='ankle-circle')],cardio:s.aerobic?[pick(cp,seed)]:[],strength:[],mobility:[],balance:[],functional:[]};
 if(s.strength){
  const patterns=['squat','hip','push','pull','core'];
  for(let i=0;i<patterns.length;i++)result.strength.push(pick(pool(p,'strength',patterns[i]),seed+i));
  if(s.strength>=20)result.strength.push(pick(pool(p,'strength',s.day%2?'arm':'calf'),seed));
 }
 const priorities=p.work==='desk'?['chest-open','wall-slide','hip-flexor','chair-yoga','neck-turn','wrist-mobility']:p.work==='standing'||p.work==='labor'?['calf-stretch','heel-toe','ankle-circle','hip-march','hip-flexor','hamstring']:['shoulder-circle','ankle-circle','chest-open','chair-yoga','calf-stretch','wall-slide'];
 let mp=pool(p,'mobility').filter(e=>priorities.includes(e.id));if(mp.length<2)mp=pool(p,'mobility');
 result.mobility=[pick(mp,seed),pick(mp,seed+1)];
 if(s.balance){const bp=pool(p,'balance');result.balance=[pick(bp,seed),pick(bp,seed+1)];}
 if(s.functional){const fp=pool(p,'functional');result.functional=[pick(fp,seed),pick(fp,seed+1)];}
 for(const key of Object.keys(result))result[key]=result[key].filter(Boolean);
 return result;
}
function alternatives(p,e,s){const occupied=new Set((s.exercises?.[e.type]||[]).filter(x=>x.id!==e.id).map(x=>x.id));return pool(p,e.type,e.type==='strength'?e.pattern:null).filter(x=>x.id!==e.id&&!occupied.has(x.id)&&(e.type!=='cardio'||new Set([p.cardio,...(p.cardioChoices||[])]).has(x.id)));}
const api={items,CATEGORIES,PATTERNS,eligibility,pool,pick,session,prescription,alternatives};root.ExerciseLibrary=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
