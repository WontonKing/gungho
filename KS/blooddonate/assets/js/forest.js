(function(){
  var rows=[
    {g:"Donor InSight（荷蘭）",c:"--teal"},
    {l:"自評健康良好（近期捐血者 vs 一般人口）",m:"OR",v:1.43,lo:1.27,hi:1.61,c:"--teal"},
    {l:"看一般科門診",m:"OR",v:0.66,lo:0.60,hi:0.72,c:"--teal"},
    {l:"接受專科治療",m:"OR",v:0.83,lo:0.75,hi:0.93,c:"--teal"},
    {l:"自評健康（長期 vs 短期捐血者）",m:"OR",v:1.33,lo:1.15,hi:1.54,c:"--teal"},
    {g:"丹麥國家健康調查",c:"--red"},
    {l:"參與健康調查（捐血者 vs 非捐血者）",m:"OR",v:2.45,lo:2.40,hi:2.49,c:"--red"},
    {l:"目前吸菸者成為捐血者",m:"OR",v:0.70,lo:0.66,hi:0.75,c:"--red"},
    {g:"陝西 60 萬人（捐血前住院，AIRR）",c:"--violet"},
    {l:"整體 HDE",m:"AIRR",v:1.152,lo:1.127,hi:1.178,c:"--violet"},
    {l:"首次捐血 46–55 歲",m:"AIRR",v:1.816,lo:1.707,hi:1.932,c:"--violet"},
    {l:"男性",m:"AIRR",v:1.082,lo:1.05,hi:1.116,c:"--violet"},
    {l:"女性",m:"AIRR",v:1.236,lo:1.196,hi:1.277,c:"--violet"},
    {l:"血液與免疫疾患 D50–D89",m:"AIRR",v:3.225,lo:2.402,hi:4.330,c:"--violet"}
  ];
  var W=760,L=290,R=W-110,top=30,rh=30,H=top+rows.length*rh+30;
  var lmin=Math.log(0.5),lmax=Math.log(5);
  function X(v){return L+(Math.log(v)-lmin)/(lmax-lmin)*(R-L);}
  var s='<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="none"/>';
  [0.5,0.7,1,1.5,2,3,5].forEach(function(t){
    var x=X(t).toFixed(1);
    s+='<line x1="'+x+'" y1="'+(top-6)+'" x2="'+x+'" y2="'+(H-24)+'" stroke="var(--line)" stroke-width="'+(t===1?0:1)+'"/>';
    s+='<text class="num" x="'+x+'" y="'+(H-8)+'" text-anchor="middle" fill="var(--muted)">'+t+'</text>';
  });
  var x1=X(1).toFixed(1);
  s+='<line x1="'+x1+'" y1="'+(top-10)+'" x2="'+x1+'" y2="'+(H-24)+'" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4"/>';
  s+='<text x="'+x1+'" y="14" text-anchor="middle" font-size="11" fill="var(--muted)">1 = 無差異</text>';
  s+='<text class="num" x="'+(W-4)+'" y="14" text-anchor="end" fill="var(--muted)">效應值 (95% CI)</text>';
  rows.forEach(function(r,i){
    var y=top+i*rh+rh/2;
    if(r.g){
      s+='<text x="4" y="'+(y+5)+'" font-size="13" font-weight="900" fill="var('+r.c+')">'+r.g+'</text>';
      return;
    }
    var a=X(r.lo),b=X(r.hi),p=X(r.v);
    s+='<g class="row-hit"><rect class="bgrow" x="0" y="'+(y-rh/2)+'" width="'+W+'" height="'+rh+'" rx="6" fill="transparent"/>';
    s+='<title>'+r.l+'：'+r.m+' '+r.v+'（'+r.lo+'–'+r.hi+'）</title>';
    s+='<text x="16" y="'+(y+4)+'" font-size="12.5" fill="var(--ink)">'+r.l+'</text>';
    s+='<line x1="'+a.toFixed(1)+'" y1="'+y+'" x2="'+b.toFixed(1)+'" y2="'+y+'" stroke="var('+r.c+')" stroke-width="3" stroke-linecap="round"/>';
    s+='<rect x="'+(p-6).toFixed(1)+'" y="'+(y-6)+'" width="12" height="12" rx="3" fill="var('+r.c+')" transform="rotate(45 '+p.toFixed(1)+' '+y+')"/>';
    s+='<text class="num" x="'+(W-4)+'" y="'+(y+4)+'" text-anchor="end" fill="var(--ink)">'+r.v+' ('+r.lo+'–'+r.hi+')</text></g>';
  });
  var svg=document.getElementById('forest');
  svg.setAttribute('viewBox','0 0 '+W+' '+H);
  svg.innerHTML=s;
})();
