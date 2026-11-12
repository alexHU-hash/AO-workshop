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
    [30,"Axe Throw / Cheap Shot / Devastate / Gun Draw: Rapid Fire / Knocking Blitz / Light Bladed Throw / Onslaught / Piercing Strikes / Polearm Throw / Primal Swipe / Raging Impact / Rain of Arrows / Shield Throw / Stronghold Slam / Sword Draw: Flash Strike / Tempest / Twin Crescents / Whirlwind"],
    [60,"Beast Instinct / Brutal Rush / Flying Slash / Impaling Strike / Multi Shot / Piercing Gale / Piercing Shot / Quickdraw / Quick Combo / Shield Bash / Shining Cycle / Skull Crusher / Sky Breaker / Spiraling Fury / Sword Draw: Mirrored River / Sword Draw: Mountain Wind / Striking Gale / Tiger Rush"],
    [90,"Ardent Rise / Flying Phoenix / Guard Rush / Hunter's Delta / Iron Will / Ravage / Sleight of Hand / Soaring Eagle / Sparrow Thrust / Sword Step / Towering Impact / Whirling Cyclone"],
    [100,"Rising Tide / Colossal Cleave"],[120,"Keen Vision / Savage Thrash / Sky Splitter / Storm of Arrows / Strong Force / Sword Dance / Sword Draw: Dragon Song / Vault"],
    [150,"Bow Breaker / Demonic Focus / Dragon's Fury / Fatal Claw / Incision / Raging Will / Seismic Rift / Serene Diligence"],
    [160,"Seismic Slash"],[200,"Fury of the Sea"],
    [220,"Crushing Judgement / Ethereal Flash / Gun Draw: Power Shot"],[240,"Anavos Technique / Raging Chaser / Roar of Glory"]
  ]
};
const WEAPON_TYPES=[
  {value:"Light Bladed",label:"Light Bladed",baseType:"Light Bladed",variantLevels:{normal:1}},
  {value:"Dual Light Bladed",label:"Dual Light Bladed",baseType:"Dual Light Bladed",variantLevels:{normal:100}},
  {value:"Bladed",label:"Bladed",baseType:"Bladed",variantLevels:{normal:1,arcanium:100}},
  {value:"Dual Bladed",label:"Dual Bladed",baseType:"Dual Bladed",variantLevels:{normal:1,arcanium:100}},
  {value:"Heavy Bladed",label:"Heavy Bladed",baseType:"Heavy Bladed",variantLevels:{normal:1,arcanium:100}},
  {value:"Long Bladed",label:"Long Bladed",baseType:"Long Bladed",variantLevels:{normal:1,arcanium:100}},
  {value:"Heavy Cleaver",label:"Heavy Cleaver",baseType:"Heavy Cleaver",variantLevels:{normal:1,arcanium:100}},
  {value:"Claws",label:"Claws",baseType:"Claws",variantLevels:{normal:1,arcanium:100}},
  {value:"Colossal Claws",label:"Colossal Claws",baseType:"Colossal Claws",variantLevels:{strength:100}},
  {value:"Axes",label:"Axes",baseType:"Axes",variantLevels:{normal:1}},
  {value:"Thrusting",label:"Thrusting",baseType:"Thrusting",variantLevels:{normal:1}},
  {value:"Bludgeon",label:"Bludgeon",baseType:"Bludgeon",variantLevels:{normal:1}},
  {value:"Blunt",label:"Blunt",baseType:"Blunt",variantLevels:{normal:1}},
  {value:"Heavy Blunt",label:"Heavy Blunt",baseType:"Heavy Blunt",variantLevels:{normal:1}},
  {value:"Polearm",label:"Polearm",baseType:"Polearm",variantLevels:{normal:1}},
  {value:"Staff",label:"Staff",baseType:"Staff",variantLevels:{normal:1}},
  {value:"Shield",label:"Shield",baseType:"Shield",variantLevels:{normal:1}},
  {value:"Greatshield",label:"Greatshield",baseType:"Greatshield",variantLevels:{normal:100,strength:100}},
  {value:"Bow",label:"Bow",baseType:"Bow",variantLevels:{normal:1}},
  {value:"Heavy Bow",label:"Heavy Bow",baseType:"Heavy Bow",variantLevels:{strength:100}},
  {value:"Pistol",label:"Pistol",baseType:"Pistol",variantLevels:{normal:1}},
  {value:"Multi Pistols",label:"Multi Pistols",baseType:"Multi Pistols",variantLevels:{normal:1}},
  {value:"Rifle",label:"Rifle",baseType:"Rifle",variantLevels:{normal:1}},
  {value:"Colossal Cleaver",label:"Colossal Cleaver",baseType:"Colossal Cleaver",variantLevels:{strength:80}},
  {value:"Colossal Thrusting",label:"Colossal Thrusting",baseType:"Colossal Thrusting",variantLevels:{strength:80}},
  {value:"Colossal Bladed",label:"Colossal Bladed",baseType:"Colossal Bladed",variantLevels:{strength:100}},
  {value:"Dual Heavy Bladed",label:"Dual Heavy Bladed",baseType:"Dual Heavy Bladed",variantLevels:{strength:80}},
  {value:"Colossal Blunt",label:"Colossal Blunt",baseType:"Colossal Blunt",variantLevels:{strength:100}},
  {value:"Sunken Sword",label:"Bladed · Sunken Sword",baseType:"Bladed",exclusiveSkill:"Rising Tide",variantLevels:{normal:50},fixedLevel:true},
  {value:"Sunken Staff",label:"Staff · Sunken Staff",baseType:"Staff",exclusiveSkill:"Fury of the Sea",variantLevels:{normal:100},fixedLevel:true},
  {value:"Triasta of Bronze",label:"Polearm · Triasta of Bronze",baseType:"Polearm",exclusiveSkill:"Ethereal Flash",variantLevels:{normal:100},fixedLevel:true},
  {value:"Lion's Halberd",label:"Colossal Cleaver · Lion's Halberd",baseType:"Colossal Cleaver",exclusiveSkill:"Seismic Slash",variantLevels:{strength:80},fixedLevel:true}
];
const WEAPON_VARIANTS=[["normal","Normal"],["strength","Strength"],["arcanium","Arcanium"]];
const WEAPON_COMPATIBILITY={
  "Light Bladed":"Light Bladed Throw|Sword Draw: Flash Strike|Whirlwind|Flying Slash|Spiraling Fury|Sword Step|Anavos Technique|Roar of Glory",
  "Dual Light Bladed":"Light Bladed Throw|Sword Draw: Flash Strike|Whirlwind|Twin Crescents|Flying Slash|Spiraling Fury|Sword Draw: Mirrored River|Sword Step|Soaring Eagle|Sword Dance|Demonic Focus|Anavos Technique|Roar of Glory",
  "Bladed":"Sword Draw: Flash Strike|Whirlwind|Flying Slash|Shining Cycle|Tiger Rush|Flying Phoenix|Sword Step|Sword Draw: Dragon Song|Sky Splitter|Incision|Dragon's Fury|Raging Will|Roar of Glory",
  "Dual Bladed":"Twin Crescents|Whirlwind|Shining Cycle|Sword Draw: Mirrored River|Tiger Rush|Flying Phoenix|Soaring Eagle|Sword Dance|Sky Splitter|Incision|Demonic Focus|Roar of Glory",
  "Heavy Bladed":"Devastate|Sword Draw: Flash Strike|Tempest|Whirlwind|Raging Impact|Flying Slash|Sword Draw: Mountain Wind|Striking Gale|Tiger Rush|Flying Phoenix|Towering Impact|Sword Step|Sword Draw: Dragon Song|Strong Force|Sky Splitter|Seismic Rift|Roar of Glory|Raging Chaser",
  "Long Bladed":"Sword Draw: Flash Strike|Whirlwind|Flying Slash|Shining Cycle|Tiger Rush|Flying Phoenix|Sword Step|Sword Draw: Dragon Song|Sky Splitter|Incision|Dragon's Fury|Roar of Glory",
  "Heavy Cleaver":"Devastate|Tempest|Whirlwind|Raging Impact|Flying Slash|Skull Crusher|Striking Gale|Sword Draw: Mountain Wind|Sky Breaker|Towering Impact|Strong Force|Seismic Rift|Crushing Judgement|Roar of Glory|Raging Chaser",
  "Claws":"Primal Swipe|Spiraling Fury|Beast Instinct|Ravage|Savage Thrash|Fatal Claw|Roar of Glory",
  "Colossal Claws":"Primal Swipe|Spiraling Fury|Beast Instinct|Ravage|Savage Thrash|Fatal Claw|Roar of Glory",
  "Axes":"Whirlwind|Axe Throw|Raging Impact|Brutal Rush|Strong Force|Raging Will|Roar of Glory|Raging Chaser",
  "Thrusting":"Piercing Strikes|Shining Cycle|Spiraling Fury|Piercing Gale|Ardent Rise|Sparrow Thrust|Incision|Roar of Glory",
  "Bludgeon":"Raging Impact|Brutal Rush|Strong Force|Raging Will|Crushing Judgement|Roar of Glory|Raging Chaser",
  "Blunt":"Raging Impact|Brutal Rush|Strong Force|Raging Will|Crushing Judgement|Roar of Glory|Raging Chaser",
  "Heavy Blunt":"Raging Impact|Devastate|Skull Crusher|Sky Breaker|Strong Force|Seismic Rift|Crushing Judgement|Roar of Glory|Raging Chaser",
  "Polearm":"Polearm Throw|Knocking Blitz|Impaling Strike|Piercing Gale|Sparrow Thrust|Whirling Cyclone|Vault|Roar of Glory",
  "Staff":"Knocking Blitz|Piercing Gale|Sparrow Thrust|Whirling Cyclone|Vault|Serene Diligence|Roar of Glory",
  "Shield":"Shield Throw|Shield Bash|Guard Rush|Iron Will|Roar of Glory",
  "Greatshield":"Stronghold Slam|Shield Bash|Iron Will|Roar of Glory",
  "Bow":"Rain of Arrows|Quickdraw|Hunter's Delta|Keen Vision|Bow Breaker|Storm of Arrows",
  "Heavy Bow":"Rain of Arrows|Quickdraw|Hunter's Delta|Keen Vision|Bow Breaker|Storm of Arrows",
  "Pistol":"Cheap Shot|Multi Shot",
  "Multi Pistols":"Cheap Shot|Gun Draw: Rapid Fire|Multi Shot|Quick Combo|Gun Draw: Power Shot",
  "Rifle":"Onslaught|Piercing Shot|Sleight of Hand",
  "Colossal Cleaver":"Whirlwind|Tempest|Devastate|Raging Impact|Flying Slash|Sword Draw: Mountain Wind|Striking Gale|Skull Crusher|Sky Breaker|Towering Impact|Strong Force|Seismic Rift|Crushing Judgement|Roar of Glory|Raging Chaser",
  "Colossal Thrusting":"Piercing Strikes|Devastate|Raging Impact|Shining Cycle|Spiraling Fury|Piercing Gale|Ardent Rise|Sparrow Thrust|Strong Force|Seismic Rift|Incision|Roar of Glory|Raging Chaser",
  "Colossal Bladed":"Devastate|Sword Draw: Flash Strike|Tempest|Whirlwind|Raging Impact|Flying Slash|Sword Draw: Mountain Wind|Striking Gale|Sky Breaker|Tiger Rush|Skull Crusher|Towering Impact|Sword Step|Sword Draw: Dragon Song|Strong Force|Seismic Rift|Colossal Cleave|Roar of Glory|Raging Chaser",
  "Dual Heavy Bladed":"Devastate|Twin Crescents|Whirlwind|Tempest|Sword Draw: Mirrored River|Shining Cycle|Striking Gale|Sword Draw: Mountain Wind|Soaring Eagle|Towering Impact|Sword Dance|Seismic Rift|Roar of Glory",
  "Colossal Blunt":"Devastate|Raging Impact|Skull Crusher|Sky Breaker|Strong Force|Seismic Rift|Crushing Judgement|Roar of Glory|Raging Chaser"
};
const RARE_WEAPON_SKILLS=new Set(["Rising Tide","Storm of Arrows","Seismic Slash","Fury of the Sea","Crushing Judgement","Ethereal Flash","Gun Draw: Power Shot","Anavos Technique","Raging Chaser","Roar of Glory"]);
const WEAPON_SKILLS=MOVES.weapons.flatMap(([points,names])=>names.split(" / ").map(name=>({name,points})));
const DEFAULT_WEAPONS=Array.from({length:3},()=>({type:"",variant:"normal"}));
function getWeaponVariantOptions(selectedType){
  const supported=new Set(Object.keys(selectedType?.variantLevels||{}));
  return WEAPON_VARIANTS.filter(([variant])=>supported.has(variant));
}
function getWeaponLevel(selectedType,variant){return selectedType.variantLevels[variant];}
function getWeaponLevelLabel(selectedType,variant){
  const level=getWeaponLevel(selectedType,variant);
  return selectedType.fixedLevel?`${level} (fixed)`:`${level}+ (lowest)`;
}
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
    const savedWeapons=Array.isArray(saved?.weapons)?saved.weapons:[];
    const weapons=DEFAULT_WEAPONS.map((defaultWeapon,index)=>{
      const savedWeapon=savedWeapons[index];
      const weapon=savedWeapon&&typeof savedWeapon==="object"?savedWeapon:defaultWeapon;
      const type=WEAPON_TYPES.some(item=>item.value===weapon.type)?weapon.type:"";
      const selectedType=WEAPON_TYPES.find(item=>item.value===type);
      const variantOptions=selectedType?getWeaponVariantOptions(selectedType):WEAPON_VARIANTS;
      const variant=variantOptions.some(([value])=>value===weapon.variant)?weapon.variant:variantOptions[0][0];
      return {
        type,
        variant
      };
    });
    return {level,stats,weapons};
  }catch{return {level:MAX_LEVEL,stats:{magic:0,weapons:0,spirit:0,strength:0},weapons:DEFAULT_WEAPONS.map(weapon=>({...weapon}))};}
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
function renderWeaponInputs(){
  const typeOptions=[["","Choose weapon type"],...WEAPON_TYPES.map(type=>[type.value,type.label])];
  document.getElementById("planner-weapon-inputs").innerHTML=planner.weapons.map((weapon,index)=>{
    const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
    const variantOptions=selectedType?getWeaponVariantOptions(selectedType):WEAPON_VARIANTS;
    const typeHtml=typeOptions.map(([value,label])=>`<option value="${value}"${weapon.type===value?" selected":""}>${label}</option>`).join("");
    const variantHtml=variantOptions.map(([value,label])=>`<option value="${value}"${weapon.variant===value?" selected":""}>${label}</option>`).join("");
    const level=selectedType?getWeaponLevelLabel(selectedType,weapon.variant):"—";
    const variantDisabled=!selectedType||variantOptions.length<2;
    return `<div class="planner-weapon-row"><strong>WEAPON ${index+1}</strong><label class="planner-weapon-field">TYPE<select data-weapon-index="${index}" data-weapon-prop="type" aria-label="Weapon ${index+1} type">${typeHtml}</select></label><label class="planner-weapon-field">VARIANT<select data-weapon-index="${index}" data-weapon-prop="variant" aria-label="Weapon ${index+1} variant"${variantDisabled?" disabled":""}>${variantHtml}</select></label><label class="planner-weapon-field">WIKI LEVEL<output class="planner-weapon-level">${level}</output></label></div>`;
  }).join("");
}
function renderClassWeaponSkills(points,classResult){
  const classCanUseWeapons=classResult.stats?classResult.stats.includes("weapons"):points>0;
  const skills=classCanUseWeapons?WEAPON_SKILLS:[];
  const list=skills.map(skill=>`<span class="planner-weapon-skill-chip">${skill.name}<small>${skill.points} pts</small></span>`).join("");
  const className=classResult.name==="Not determined"?"Your current build has Weapons investment.":`${classResult.name} has access to weapon skills.`;
  document.getElementById("planner-weapon-class-skills").innerHTML=classCanUseWeapons
    ?`<div class="planner-weapon-section-heading"><h3>All class-eligible moves</h3></div><p class="planner-weapon-class-note">${className} Compatibility and weapon-level requirements are checked per weapon above.</p><div class="planner-weapon-skill-pool">${list}</div>`
    :`<div class="planner-weapon-section-heading"><h3>All class-eligible moves</h3></div><p class="planner-weapon-class-note">Weapon skills become class-eligible when your build invests in the Weapons stat.</p>`;
}
function getCompatibleWeaponSkills(selectedType){
  const compatibility=new Set((WEAPON_COMPATIBILITY[selectedType.baseType]||"").split("|"));
  return WEAPON_SKILLS.filter(skill=>compatibility.has(skill.name)||selectedType.exclusiveSkill===skill.name);
}
function getWeaponSkillRequirements(skill,weapon,selectedType){
  const level=getWeaponLevel(selectedType,weapon.variant);
  const weaponBase=weapon.variant==="normal"?level*2:level;
  const weapons=RARE_WEAPON_SKILLS.has(skill.name)?Math.max(skill.points,weaponBase):weaponBase+skill.points-30;
  return {
    weapons,
    strength:weapon.variant==="strength"?level:0,
    magic:weapon.variant==="arcanium"?level:0
  };
}
function getWeaponSkillState(skill,weapon,selectedType,points){
  const required=getWeaponSkillRequirements(skill,weapon,selectedType);
  const missing=[];
  if(points<required.weapons)missing.push(`Weapons ${required.weapons}`);
  if(required.strength&&planner.stats.strength<required.strength)missing.push(`Strength ${required.strength}`);
  if(required.magic&&planner.stats.magic<required.magic)missing.push(`Magic ${required.magic}`);
  return {required,missing,usable:missing.length===0};
}
function renderWeaponSkillRow(skill,state){
  const {required,missing,usable}=state;
  const requirement=[`Weapons ${required.weapons}`,required.strength?`Strength ${required.strength}`:"",required.magic?`Magic ${required.magic}`:""].filter(Boolean).join(" + ");
  const status=usable?"Usable":`Needs ${missing.join(" + ")}`;
  return `<div class="planner-move${usable?" is-available":" is-locked"}"><div class="planner-move-main"><strong class="planner-move-name">${skill.name}</strong><small class="planner-move-kind">Skill cost ${skill.points}</small></div><small class="planner-move-status">${requirement} · ${status}</small></div>`;
}
function renderAvailableWeaponSkills(points){
  const cards=planner.weapons.map((weapon,index)=>{
    const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
    if(!selectedType)return `<article class="planner-weapon-available-card"><h4>WEAPON ${index+1}</h4><p>Choose a weapon type to list available moves.</p></article>`;
    const skills=getCompatibleWeaponSkills(selectedType);
    const available=skills.filter(skill=>getWeaponSkillState(skill,weapon,selectedType,points).usable);
    const rows=available.map(skill=>renderWeaponSkillRow(skill,getWeaponSkillState(skill,weapon,selectedType,points))).join("");
    const countLabel=`${available.length} available`;
    const variantLabel=WEAPON_VARIANTS.find(([value])=>value===weapon.variant)?.[1]||"Normal";
    return `<article class="planner-weapon-available-card"><h4>WEAPON ${index+1} · ${selectedType.label} · ${variantLabel} · LV ${getWeaponLevelLabel(selectedType,weapon.variant)}</h4><strong>${countLabel}</strong>${rows?`<div class="planner-move-list">${rows}</div>`:"<p>No compatible moves meet the current stat requirements.</p>"}</article>`;
  }).join("");
  return `<div class="planner-weapon-section-heading"><h3>Available moves</h3><p>Moves your current class, weapon, and stats can use now.</p></div><div class="planner-weapon-available-cards">${cards}</div>`;
}
function renderWeaponSkills(weapon,index,points){
  const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
  if(!selectedType)return `<section class="planner-weapon-result"><div class="planner-weapon-result-heading"><h3>WEAPON ${index+1}</h3></div><p class="planner-weapon-class-note">Choose a weapon type to see its compatible skills.</p></section>`;
  const skills=getCompatibleWeaponSkills(selectedType);
  const rows=skills.map(skill=>renderWeaponSkillRow(skill,getWeaponSkillState(skill,weapon,selectedType,points))).join("");
  const usable=skills.filter(skill=>getWeaponSkillState(skill,weapon,selectedType,points).usable).length;
  const variantLabel=WEAPON_VARIANTS.find(([value])=>value===weapon.variant)?.[1]||"Normal";
  return `<section class="planner-weapon-result"><div class="planner-weapon-result-heading"><h4>WEAPON ${index+1} · ${selectedType.label} · ${variantLabel} · LV ${getWeaponLevelLabel(selectedType,weapon.variant)}</h4><strong>${usable} / ${skills.length} USABLE</strong></div><div class="planner-move-list">${rows||'<p class="planner-weapon-class-note">No skill compatibility data is available for this type.</p>'}</div></section>`;
}
function renderWeapons(points,classResult){
  document.getElementById("planner-weapon-available").innerHTML=renderAvailableWeaponSkills(points);
  document.getElementById("planner-weapon-results").innerHTML=`<div class="planner-weapon-section-heading"><h3>All compatible moves</h3><p>Available skills are listed here again with full stat requirements; locked skills show what additional points are needed.</p></div>${planner.weapons.map((weapon,index)=>renderWeaponSkills(weapon,index,points)).join("")}`;
  renderClassWeaponSkills(points,classResult);
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
  renderWeaponInputs();
  renderMoveList("planner-spells",MOVES.spells,planner.stats.magic,classResult.name==="Mage"?{kind:"magic",label:"2ND MAGIC",bonus:120}:null);
  renderMoveList("planner-techniques",MOVES.techniques,planner.stats.strength,classResult.name==="Berserker"?{kind:"strength",label:"2ND STYLE",bonus:90}:null);
  renderMoveList("planner-rites",MOVES.rites,planner.stats.spirit);
  renderWeapons(planner.stats.weapons,classResult);
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
document.getElementById("planner-weapon-inputs").addEventListener("change",event=>{
  const prop=event.target.dataset.weaponProp;
  if(prop!=="type"&&prop!=="variant")return;
  const weapon=planner.weapons[Number(event.target.dataset.weaponIndex)];
  if(!weapon)return;
  if(prop==="type"){
    const selectedType=WEAPON_TYPES.find(type=>type.value===event.target.value);
    if(!selectedType)return;
    weapon.type=selectedType.value;
    if(!getWeaponVariantOptions(selectedType).some(([value])=>value===weapon.variant))weapon.variant=getWeaponVariantOptions(selectedType)[0][0];
  }
  if(prop==="variant"&&getWeaponVariantOptions(WEAPON_TYPES.find(type=>type.value===weapon.type)).some(([value])=>value===event.target.value))weapon.variant=event.target.value;
  savePlanner();render();
});
render();