const MAX_LEVEL=175;
const STAT_ORDER=["magic","weapons","spirit","strength"];
const STAT_NAMES={magic:"Magic",weapons:"Weapons",spirit:"Spirit",strength:"Strength"};
const STORAGE_KEY="ao-stat-planner-v1";
const CLASS_RULES=[
  {name:"Warlock",stats:["magic","strength"],threshold:.4},
  {name:"Conjurer",stats:["magic","weapons"],threshold:.4},
  {name:"Warlord",stats:["strength","weapons"],threshold:.4},
  {name:"Paladin",stats:["spirit","magic"],threshold:.4},
  {name:"Juggernaut",stats:["spirit","strength"],threshold:.4},
  {name:"Knight",stats:["spirit","weapons"],threshold:.4},
  {name:"Oracle",stats:["spirit"],threshold:.6},
  {name:"Mage",stats:["magic"],threshold:.6},
  {name:"Berserker",stats:["strength"],threshold:.6},
  {name:"Warrior",stats:["weapons"],threshold:.6}
];
const MOVES={
  spells:[
    {name:"Blast",points:0,kind:"Base"},{name:"Explosion",points:30,kind:"Base"},{name:"Leap",points:60,kind:"Base"},
    {name:"Beam",points:90,kind:"Base"},{name:"Snare",points:120,kind:"Base"},{name:"Aura",points:150,kind:"Base"},
    {name:"Cannon",points:80,kind:"Rare scroll"},{name:"Barrage",points:100,kind:"Rare scroll"},{name:"Quake",points:120,kind:"Rare scroll"},
    {name:"Javelin",points:150,kind:"Rare scroll"},{name:"Barrier",points:180,kind:"Rare scroll"},{name:"Hasta",points:180,kind:"Rare scroll"},
    {name:"Slash",points:180,kind:"Rare scroll"},{name:"Hover",points:200,kind:"Rare scroll"},{name:"Nebula",points:200,kind:"Rare scroll"},
    {name:"Array",points:220,kind:"Rare scroll"},{name:"Construct",points:240,kind:"Rare scroll"},{name:"Meteor",points:240,kind:"Rare scroll"},
    {name:"Path",points:240,kind:"Rare scroll"},{name:"Pulsar",points:240,kind:"Rare scroll"},{name:"Surge",points:240,kind:"Rare scroll"},
    {name:"Flight",points:300,kind:"Rare scroll"},{name:"Ray",points:340,kind:"Rare scroll"},
    {name:"Enchantment",points:220,kind:"Lost scroll"},{name:"Annihilation",points:280,kind:"Lost scroll"},{name:"Conjure Elemental",points:320,kind:"Lost scroll"}
  ],
  techniques:[
    {name:"Crash",points:30,kind:"Base"},{name:"Smash",points:60,kind:"Base"},{name:"Rushdown",points:90,kind:"Base"},
    {name:"Shot",points:120,kind:"Base"},{name:"Focus",points:150,kind:"Base"},{name:"Airstep",points:180,kind:"Base"},
    {name:"Jab",points:80,kind:"Rare scroll"},{name:"Breathtaker",points:100,kind:"Rare scroll"},{name:"Selino",points:150,kind:"Rare scroll"},
    {name:"Uppercut",points:180,kind:"Rare scroll"},{name:"Axe-Slash",points:200,kind:"Rare scroll"},{name:"Retaliate",points:200,kind:"Rare scroll"},
    {name:"Blitz",points:220,kind:"Rare scroll"},{name:"Greatjump",points:220,kind:"Rare scroll"},
    {name:"Crescendo",points:300,kind:"Lost scroll"},{name:"Torrent",points:300,kind:"Lost scroll"},
    {name:"Acumen",points:340,kind:"Lost scroll"},{name:"Aftershock",points:340,kind:"Lost scroll"}
  ],
  rites:[
    {name:"Spirit Barrage",points:0,kind:"Default"},{name:"Spirit Blast",points:0,kind:"Default"},
    {name:"Spirit Burst",points:0,kind:"Default"},{name:"Spirit Hound",points:0,kind:"Default"},
    {name:"Spirit Rain",points:40,kind:"Default"},{name:"Spirit Shockwave",points:40,kind:"Default"},
    {name:"Spirit Wall",points:40,kind:"Default"},{name:"Spirit Drain",points:160,kind:"Default"},
    {name:"Spirit Flight",points:160,kind:"Default"},{name:"Spirit Rise",points:160,kind:"Default"},
    {name:"Spirit Walk",points:160,kind:"Default"}
  ],
  weapons:[
    [30,"Axe Throw / Cheap Shot / Devastate / Gun Draw: Rapid Fire / Knocking Blitz / Light Bladed Throw / Onslaught / Piercing Strikes / Polearm Throw / Primal Swipe / Raging Impact / Rain of Arrows / Shield Throw / Stronghold Slam / Sword Draw / Flash Strike / Tempest / Twin Crescents / Whirlwind"],
    [60,"Beast Instinct / Brutal Rush / Flying Slash / Impaling Strike / Multi Shot / Piercing Gale / Piercing Shot / Quickdraw / Quick Combo / Shield Bash / Shining Cycle / Skull Crusher / Sky Breaker / Spiraling Fury / Sword Draw: Mirrored River / Sword Draw: Mountain Wind / Striking Gale / Tiger Rush"],
    [90,"Ardent Rise / Flying Phoenix / Hunter's Delta / Iron Will / Ravage / Sleight of Hand / Soaring Eagle / Sparrow Thrust / Sword Step / Towering Impact / Whirling Cyclone"],
    [100,"Rising Tide"],[120,"Keen Vision / Savage Thrash / Sky Splitter / Storm of Arrows / Strong Force / Sword Dance / Sword Draw: Dragon Song / Vault"],
    [150,"Bow Breaker / Demonic Focus / Dragon's Fury / Fatal Claw / Incision / Raging Will / Seismic Rift / Serene Diligence"],
    [160,"Seismic Slash"],[200,"Fury of the Sea"],
    [220,"Crushing Judgement / Ethereal Flash / Gun Draw: Power Shot"],[240,"Anavos Technique / Raging Chaser / Roar of Glory"]
  ]
};
const planner=loadPlanner();
const statList=document.getElementById("planner-stat-list");
statList.innerHTML=STAT_ORDER.map(stat=>`<div class="planner-stat-row"><label class="planner-stat-label" for="stat-${stat}">${STAT_NAMES[stat]}</label><div class="planner-stepper"><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="-10" aria-label="Decrease ${STAT_NAMES[stat]} by 10">-10</button><input class="planner-stat-input" id="stat-${stat}" data-stat="${stat}" type="number" min="0" max="${getPointTotal()}" step="10" value="${planner.stats[stat]||0}" inputmode="numeric"><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="10" aria-label="Increase ${STAT_NAMES[stat]} by 10">+10</button></div><input class="planner-stat-slider" id="stat-slider-${stat}" data-stat="${stat}" type="range" min="0" max="${getPointTotal()}" step="10" value="${planner.stats[stat]||0}" aria-label="${STAT_NAMES[stat]} allocation"></div>`).join("");
function loadPlanner(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    const level=Math.max(1,Math.min(MAX_LEVEL,Math.floor(Number(saved?.level)||MAX_LEVEL)));
    const stats=Object.fromEntries(STAT_ORDER.map(stat=>[stat,Math.max(0,Math.floor(Number(saved?.stats?.[stat])||0))]));
    let remaining=level*2;
    for(const stat of STAT_ORDER){stats[stat]=Math.min(stats[stat],remaining);remaining-=stats[stat];}
    return {level,stats};
  }catch{return {level:MAX_LEVEL,stats:{magic:0,weapons:0,spirit:0,strength:0}};}
}
function savePlanner(){localStorage.setItem(STORAGE_KEY,JSON.stringify(planner));}
function getPointTotal(){return planner.level*2;}
function getSpent(){return STAT_ORDER.reduce((sum,stat)=>sum+planner.stats[stat],0);}
function getClass(){
  const total=getPointTotal();
  const percentages=Object.fromEntries(STAT_ORDER.map(stat=>[stat,planner.stats[stat]/total]));
  const match=CLASS_RULES.find(rule=>rule.stats.every(stat=>percentages[stat]>=rule.threshold));
  if(match)return {name:match.name,stats:match.stats,note:match.stats.length===1?`At least ${Math.round(match.threshold*100)}% of the level ${planner.level} point budget is in ${STAT_NAMES[match.stats[0]]}.`:`At least ${Math.round(match.threshold*100)}% is invested in both ${STAT_NAMES[match.stats[0]]} and ${STAT_NAMES[match.stats[1]]}.`};
  const savantStats=STAT_ORDER.filter(stat=>percentages[stat]>=.15);
  if(savantStats.length>=3&&Math.max(...Object.values(percentages))<.5)return {name:"Savant",stats:STAT_ORDER,note:"At least 15% is invested in three stats, with no stat reaching 50%."};
  if(getSpent()===total)return {name:"Savant",stats:STAT_ORDER,note:"The wiki classifies allocations that meet no full-build or hybrid threshold as Savant."};
  return {name:"Not determined",stats:null,note:`Spend the remaining ${total-getSpent()} points to complete the allocation and confirm a class.`};
}
function renderMoveList(id,moves,points,secondarySlot=null){
  document.getElementById(id).innerHTML=moves.map(move=>{
    const requirement=move.points;
    const available=points>=requirement;
    const secondaryRequirement=requirement+(secondarySlot?.bonus||0);
    const secondaryAvailable=Boolean(secondarySlot&&points>=secondaryRequirement);
    const badge=secondaryAvailable?`<span class="planner-secondary-badge" title="Meets the secondary-slot stat requirement">${secondarySlot.label}</span>`:"";
    return `<div class="planner-move${available?" is-available":" is-locked"}"><div class="planner-move-main"><strong class="planner-move-name">${move.name}</strong><small class="planner-move-kind">${move.kind}</small>${badge}</div><small class="planner-move-status">${requirement} pts ${available?"· available":"· locked"}</small></div>`;
  }).join("");
}
function renderWeapons(points){
  const level=Math.max(1,Math.min(MAX_LEVEL,Math.floor(Number(document.getElementById("planner-weapon-level").value)||1)));
  document.getElementById("planner-weapon-level").value=level;
  const slotSurcharge={standard:0,advanced:10,ultimate:80}[document.getElementById("planner-weapon-slot").value]||0;
  document.getElementById("planner-weapons").innerHTML=MOVES.weapons.flatMap(([skillCost,names])=>{
    const required=level*2+skillCost-30+slotSurcharge;
    return names.split(" / ").map(name=>`<div class="planner-move${points>=required?" is-available":" is-locked"}"><div class="planner-move-main"><strong class="planner-move-name">${name}</strong><small class="planner-move-kind">Skill cost ${skillCost}</small></div><small class="planner-move-status">${required} pts ${points>=required?"· available":"· locked"}</small></div>`);
  }).join("");
}
function render(){
  const total=getPointTotal();
  const spent=getSpent();
  document.getElementById("planner-level").value=planner.level;
  document.getElementById("planner-spent").textContent=spent;
  document.getElementById("planner-remaining").textContent=total-spent;
  for(const stat of STAT_ORDER){
    const input=document.getElementById(`stat-${stat}`);
    const slider=document.getElementById(`stat-slider-${stat}`);
    const available=total-(spent-planner.stats[stat]);
    input.value=planner.stats[stat];
    input.max=available;
    slider.value=planner.stats[stat];
    slider.max=available;
    for(const button of statList.querySelectorAll(`[data-stat="${stat}"][data-stat-step]`))button.disabled=button.dataset.statStep==="-10"?planner.stats[stat]===0:available-planner.stats[stat]<10;
  }
  const classResult=getClass();
  document.getElementById("planner-class-name").textContent=classResult.name;
  document.getElementById("planner-class-note").textContent=classResult.note;
  for(const group of document.querySelectorAll("[data-move-stat]"))group.hidden=Boolean(classResult.stats&&!classResult.stats.includes(group.dataset.moveStat));
  renderMoveList("planner-spells",MOVES.spells,planner.stats.magic,classResult.name==="Mage"?{kind:"magic",label:"2ND MAGIC",bonus:120}:null);
  renderMoveList("planner-techniques",MOVES.techniques,planner.stats.strength,classResult.name==="Berserker"?{kind:"strength",label:"2ND STYLE",bonus:90}:null);
  renderMoveList("planner-rites",MOVES.rites,planner.stats.spirit);
  renderWeapons(planner.stats.weapons);
}
document.getElementById("planner-level").addEventListener("input",event=>{
  planner.level=Math.max(1,Math.min(MAX_LEVEL,Math.floor(Number(event.target.value)||1)));
  let remaining=getPointTotal();
  for(const stat of STAT_ORDER){planner.stats[stat]=Math.min(planner.stats[stat],remaining);remaining-=planner.stats[stat];}
  savePlanner();render();
});
function setStatValue(stat,value){
  if(!STAT_ORDER.includes(stat))return;
  const otherSpent=getSpent()-planner.stats[stat];
  planner.stats[stat]=Math.max(0,Math.min(getPointTotal()-otherSpent,Math.floor(Number(value)||0)));
  savePlanner();render();
}
statList.addEventListener("click",event=>{
  const button=event.target.closest("[data-stat-step]");
  if(button)setStatValue(button.dataset.stat,planner.stats[button.dataset.stat]+Number(button.dataset.statStep));
});
statList.addEventListener("input",event=>{
  const stat=event.target.dataset.stat;
  if(!STAT_ORDER.includes(stat))return;
  setStatValue(stat,event.target.value);
});
document.getElementById("planner-weapon-level").addEventListener("input",()=>renderWeapons(planner.stats.weapons));
document.getElementById("planner-weapon-slot").addEventListener("change",()=>renderWeapons(planner.stats.weapons));
render();