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
const ULTIMATE_ART_EXTRA_POINTS=200;
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
const RELIC_ULTIMATE_EXTRA_POINTS=100;
const SPIRIT_RITES=[
  {name:"Spirit Barrage",points:0},{name:"Spirit Blast",points:0},{name:"Spirit Burst",points:0},{name:"Spirit Hound",points:0},
  {name:"Spirit Rain",points:40},{name:"Spirit Shockwave",points:40},{name:"Spirit Wall",points:40},
  {name:"Spirit Drain",points:160},{name:"Spirit Flight",points:160,movement:true},{name:"Spirit Rise",points:160,movement:true},{name:"Spirit Walk",points:160,movement:true}
];
const SPIRIT_RELICS=[
  {value:"eagle-patrimony",name:"Eagle Patrimony",level:0,uniqueRites:[{name:"Astrapikis",points:100,unique:true},{name:"Astropos",points:220,ultimate:true,unique:true}]},
  {value:"tidestone-band",name:"Tidestone Band",level:20,uniqueRites:[{name:"Thakrousi",points:100,unique:true},{name:"Thalakyma",points:220,ultimate:true,unique:true}]},
  {value:"staff-of-night",name:"Staff of Night",level:40,uniqueRites:[{name:"Nichtetheis",points:100,unique:true},{name:"Nichtaplia",points:220,ultimate:true,unique:true}]},
  {value:"crystal-orb",name:"Crystal Orb",level:80,uniqueRites:[{name:"Aithoro",points:100,unique:true},{name:"Aithiraki",points:220,ultimate:true,unique:true,usable:false}]},
  {value:"ember-staff",name:"Ember Staff",level:80,uniqueRites:[{name:"Flomva",points:100,unique:true},{name:"Floganymai",points:220,ultimate:true,unique:true,usable:false}]}
];
const DEFAULT_RELICS=Array.from({length:3},()=>({type:"",level:0}));
const NAMED_WEAPON_DATA=[
  ["Poison Tooth Dagger","Light Bladed","unique","good",50],
  ["Sanguine","Light Bladed","unique","good",50],
  ["Scald Tooth Dagger","Light Bladed","unique","good",100],
  ["Shadow Daggers","Dual Light Bladed","normal","good",100],
  ["Thalassi","Bladed","normal","good",110],
  ["Khepri","Bladed","unique","good",140],
  ["Sunken Sword","Bladed","unique","good",50,"Rising Tide"],
  ["Commodore Kai's Sabre","Long Bladed","unique","good",50],
  ["Scimitars of Storm","Dual Bladed","unique","good",60],
  ["Siderros","Dual Bladed","unique","good",120],
  ["Sinbane","Heavy Bladed","normal","good",80],
  ["Atlantean Greatsword","Heavy Bladed","unique","good",100],
  ["Noble Thunderspear","Polearm","unique","good",60],
  ["Triasta of Bronze","Polearm","unique","good",100,"Ethereal Flash"],
  ["Sunken Staff","Staff","unique","good",100,"Fury of the Sea"],
  ["Atlantean Mace","Bludgeon","unique","good",100],
  ["Atum","Bludgeon","unique","good",140],
  ["Ruined Fulmenor","Bludgeon","unique","good",120],
  ["Vindicator","Heavy Blunt","unique","good",110],
  ["Silent Blades","Claws","unique","good",50],
  ["Plunderers","Multi Pistols","normal","good",110],
  ["Swiftshot","Rifle","normal","good",100],
  ["Stormcaller","Bow","unique","good",60],
  ["Greatbow","Heavy Bow","strength","good",100],
  ["Lance of Loyalty","Colossal Thrusting","strength","good",80],
  ["Dragon Hunter Lance","Colossal Thrusting","strength","great",100],
  ["Lion's Halberd","Colossal Cleaver","strength","good",80,"Seismic Slash"],
  ["Colossal Greatsword","Colossal Bladed","strength","good",100],
  ["Poison Axe","Axes","normal","good",100],
  ["White Eyes Tooth","Colossal Bladed","strength","good",100],
  ["Giant Dragon Talons","Colossal Claws","strength","good",100],
  ["Dragonbone Dagger","Light Bladed","normal","good",100],
  ["Dragon's Tooth","Bladed","normal","good",100],
  ["Dragon Horn Spear","Polearm","normal","good",100],
  ["Dragon Hunter Javelin","Polearm","unique","great",100],
  ["Dragon Talons","Claws","normal","good",100],
  ["Dragonscale Shield","Shield","normal","good",100],
  ["Dragonscale Greatshield","Greatshield","strength","good",100],
  ["Dragonbone Bow","Bow","normal","good",100],
  ["Dragonbone Greatbow","Heavy Bow","strength","good",100],
  ["Beast Bone Cleaver","Heavy Cleaver","normal","good",50],
  ["Ravenwing","Heavy Cleaver","normal","good",100],
  ["Ruined Sifenya","Heavy Bladed","normal","good",100],
  ["Goldreaver","Colossal Bladed","strength","good",100],
  ["Rusty Zweihander","Colossal Bladed","strength","good",100],
  ["Lost Chief's Axe and Maw","Dual Heavy Bladed","strength","good",80],
  ["Nocturne","Light Bladed","unique","good",120],
  ["Skull Greathammer","Heavy Blunt","normal","average",80],
  ["Spiked Greatclub","Colossal Blunt","strength","good",100]
];
const NAMED_WEAPON_TYPES=NAMED_WEAPON_DATA.map(([name,baseType,variant,quality,level,exclusiveSkill])=>({
  value:name,
  label:`${baseType} · ${name}`,
  baseType,
  ...(exclusiveSkill?{exclusiveSkill}:{}),
  variantLevels:{[variant]:level},
  fixedLevel:true,
  fixedQuality:quality,
  isNamedWeapon:true
}));
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
  ...NAMED_WEAPON_TYPES
];
const WEAPON_VARIANTS=[["normal","Normal"],["unique","Unique"],["strength","Strength"],["arcanium","Arcanium"]];
const WEAPON_SEARCH_LABELS={
  "Light Bladed":"Dagger",
  "Dual Light Bladed":"Dual Daggers",
  "Bladed":"Sword",
  "Dual Bladed":"Dual Swords",
  "Heavy Bladed":"Great Sword",
  "Long Bladed":"Katana",
  "Heavy Cleaver":"Cleaver",
  "Claws":"Claws",
  "Colossal Claws":"Colossal Claws",
  "Axes":"Axe",
  "Thrusting":"Thrusting Weapon",
  "Bludgeon":"Mace",
  "Blunt":"Club",
  "Heavy Blunt":"Warhammer",
  "Polearm":"Spear",
  "Staff":"Staff",
  "Shield":"Shield",
  "Greatshield":"Greatshield",
  "Bow":"Bow",
  "Heavy Bow":"Great Bow",
  "Pistol":"Pistol",
  "Multi Pistols":"Dual Pistols",
  "Rifle":"Rifle",
  "Colossal Cleaver":"Colossal Cleaver",
  "Colossal Thrusting":"Lance",
  "Colossal Bladed":"Colossal Great Sword",
  "Dual Heavy Bladed":"Dual Great Swords",
  "Colossal Blunt":"Colossal Hammer"
};
function getWeaponSearchLabel(baseType){return WEAPON_SEARCH_LABELS[baseType]||baseType;}
const WEAPON_QUALITIES=[
  {value:"poor",label:"Poor",skillSlots:2,tierCap:"2",hasUltimateSlot:false},
  {value:"average",label:"Average",skillSlots:3,tierCap:"3",hasUltimateSlot:false},
  {value:"good",label:"Good",skillSlots:4,tierCap:"7",hasUltimateSlot:true},
  {value:"great",label:"Great",skillSlots:4,tierCap:"N/A",hasUltimateSlot:true}
];
const WEAPON_QUALITY_LEVELS={
  "Light Bladed":{normal:{poor:1,average:50,good:50}},
  "Dual Light Bladed":{normal:{good:100}},
  "Bladed":{normal:{poor:1,average:20,good:50},arcanium:{good:100}},
  "Dual Bladed":{normal:{poor:1,average:50,good:60},arcanium:{good:100}},
  "Heavy Bladed":{normal:{poor:1,average:50,good:80},arcanium:{good:100}},
  "Long Bladed":{normal:{poor:1,average:50,good:50},arcanium:{good:100}},
  "Heavy Cleaver":{normal:{poor:1,average:50,good:50},arcanium:{good:100}},
  "Claws":{normal:{poor:1,average:50,good:50},arcanium:{good:100}},
  "Colossal Claws":{strength:{good:100}},
  "Axes":{normal:{poor:1,average:50,good:100}},
  "Thrusting":{normal:{poor:1,average:20,good:100}},
  "Bludgeon":{normal:{poor:1,average:50,good:100}},
  "Blunt":{normal:{poor:1,average:50,good:100}},
  "Heavy Blunt":{normal:{poor:1,average:50,good:100}},
  "Polearm":{normal:{poor:1,average:20,good:60,great:100}},
  "Staff":{normal:{poor:1,average:50,good:100}},
  "Shield":{normal:{poor:1,average:20,good:100}},
  "Greatshield":{normal:{average:100,good:100},strength:{good:100}},
  "Bow":{normal:{poor:1,average:50,good:60}},
  "Heavy Bow":{strength:{good:100}},
  "Pistol":{normal:{poor:1,average:50,good:100}},
  "Multi Pistols":{normal:{poor:1,average:50,good:100}},
  "Rifle":{normal:{average:1,good:100}},
  "Colossal Cleaver":{strength:{good:80}},
  "Colossal Thrusting":{strength:{good:80,great:100}},
  "Colossal Bladed":{strength:{good:100}},
  "Dual Heavy Bladed":{strength:{good:80}},
  "Colossal Blunt":{strength:{good:100}}
};
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
const WEAPON_SKILLS_THAT_REMAIN_NORMAL_IN_ULTIMATE_SLOT=new Set(["Soaring Eagle","Ardent Rise","Strong Force"]);
const WEAPON_SKILLS=MOVES.weapons.flatMap(([points,names])=>names.split(" / ").map(name=>({name,points})));
const DEFAULT_WEAPONS=Array.from({length:3},()=>({type:"",variant:"normal",quality:"poor"}));
const weaponSearches=Array.from(DEFAULT_WEAPONS,()=>"");
const weaponDropdownOpen=Array.from(DEFAULT_WEAPONS,()=>false);
const activeWeaponSearchIndexes=Array.from(DEFAULT_WEAPONS,()=>0);
function getWeaponVariantOptions(selectedType,classResult=null){
  const supported=new Set(Object.keys(selectedType?.variantLevels||{}));
  return WEAPON_VARIANTS.filter(([variant])=>{
    if(!supported.has(variant))return false;
    if(!classResult)return true;
    if(variant==="arcanium")return classResult.name==="Conjurer";
    if(variant==="strength")return classResult.name==="Warlord";
    return true;
  });
}
function getWeaponQualityOptions(selectedType,variant){
  const qualityVariant=variant==="unique"?"normal":variant;
  const qualities=WEAPON_QUALITY_LEVELS[selectedType?.baseType]?.[qualityVariant]||{};
  return WEAPON_QUALITIES.filter(quality=>Object.prototype.hasOwnProperty.call(qualities,quality.value)&&(!selectedType.fixedQuality||selectedType.fixedQuality===quality.value));
}
function getWeaponQualityInfo(quality){return WEAPON_QUALITIES.find(item=>item.value===quality)||null;}
function getWeaponQualitySummary(quality){
  const info=getWeaponQualityInfo(quality);
  if(!info)return "";
  const slots=`${info.skillSlots} skill slots${info.hasUltimateSlot?" + Ultimate Art":""}`;
  return `${slots} · Tier cap ${info.tierCap}`;
}
function getWeaponLevel(selectedType,variant,quality){
  if(selectedType.fixedLevel)return selectedType.variantLevels[variant];
  return WEAPON_QUALITY_LEVELS[selectedType.baseType]?.[variant]?.[quality]??selectedType.variantLevels[variant];
}
function getWeaponLevelLabel(selectedType,variant,quality){
  const level=getWeaponLevel(selectedType,variant,quality);
  return selectedType.fixedLevel?`${level} (fixed)`:`${level}+ (lowest)`;
}
function getAvailableWeaponTypes(classResult){
  const named=WEAPON_TYPES.filter(type=>type.isNamedWeapon&&getWeaponVariantOptions(type,classResult).length);
  const generic=WEAPON_TYPES.filter(type=>!type.isNamedWeapon&&getWeaponVariantOptions(type,classResult).length);
  return [...named,...generic];
}
function normalizeWeaponSearchText(value){return String(value).toLowerCase().replace(/[\s-]+/g,"");}
function getFilteredWeaponTypes(index,classResult){
  const query=normalizeWeaponSearchText(weaponSearches[index]);
  return getAvailableWeaponTypes(classResult).filter(type=>!query
    ||[type.value,type.label,getWeaponSearchLabel(type.baseType),type.baseType].some(value=>normalizeWeaponSearchText(value).includes(query)));
}
function getWeaponSearchEntries(index,classResult){
  const query=weaponSearches[index].trim();
  const selectedType=WEAPON_TYPES.find(type=>type.value===planner.weapons[index]?.type);
  const clearEntry=!query&&selectedType?[{value:"",label:`Clear Weapon ${index+1}`,isClear:true}]:[];
  return [...clearEntry,...getFilteredWeaponTypes(index,classResult).map(type=>({value:type.value,type}))];
}
function renderWeaponSearchResults(index,classResult){
  const results=document.querySelector(`[data-weapon-results="${index}"]`);
  const input=document.querySelector(`[data-weapon-search="${index}"]`);
  const count=document.querySelector(`[data-weapon-search-count="${index}"]`);
  if(!results||!input)return;
  const entries=getWeaponSearchEntries(index,classResult);
  const filtered=getFilteredWeaponTypes(index,classResult);
  const selectedValue=planner.weapons[index]?.type||"";
  results.innerHTML=entries.length?entries.map((entry,resultIndex)=>{
    const active=resultIndex===activeWeaponSearchIndexes[index];
    if(entry.isClear)return `<button id="weapon-${index}-result-${resultIndex}" class="planner-weapon-search-result planner-weapon-search-clear${active?" is-active":""}" type="button" role="option" aria-selected="false" data-select-weapon-type="${index}" data-weapon-type="">× <span>${entry.label}</span></button>`;
    const type=entry.type;
    const name=type.isNamedWeapon?type.value:getWeaponSearchLabel(type.baseType);
    const selected=type.value===selectedValue;
    return `<button id="weapon-${index}-result-${resultIndex}" class="planner-weapon-search-result${active?" is-active":""}${selected?" is-equipped":""}" type="button" role="option" aria-selected="${selected}" data-select-weapon-type="${index}" data-weapon-type="${type.value}"><span class="planner-weapon-result-main"><span class="planner-weapon-result-name">${name}${selected?'<span class="planner-weapon-selected-tag">SELECTED</span>':""}</span></span></button>`;
  }).join(""):`<div class="planner-weapon-search-empty">${weaponSearches[index]?"No matching weapons.":"No weapons available for this class."}</div>`;
  results.hidden=!weaponDropdownOpen[index];
  if(count)count.textContent=`${filtered.length} / ${getAvailableWeaponTypes(classResult).length}`;
  input.setAttribute("aria-expanded",String(weaponDropdownOpen[index]));
  const active=Math.min(activeWeaponSearchIndexes[index],entries.length-1);
  if(weaponDropdownOpen[index]&&active>=0){
    activeWeaponSearchIndexes[index]=active;
    input.setAttribute("aria-activedescendant",`weapon-${index}-result-${active}`);
  }else{
    input.removeAttribute("aria-activedescendant");
  }
}
const planner=loadPlanner();
const statList=document.getElementById("planner-stat-list");
statList.innerHTML=STAT_ORDER.map(stat=>`<div class="planner-stat-row"><label class="planner-stat-label" for="stat-${stat}">${STAT_NAMES[stat]}</label><div class="planner-stepper"><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="-10" aria-label="Decrease ${STAT_NAMES[stat]} by 10">-10</button><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="-1" aria-label="Decrease ${STAT_NAMES[stat]} by 1">-1</button><input class="planner-stat-input" id="stat-${stat}" data-stat="${stat}" type="number" min="0" max="${getPointTotal()}" step="1" value="${planner.stats[stat]||0}" inputmode="numeric"><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="1" aria-label="Increase ${STAT_NAMES[stat]} by 1">+1</button><button class="planner-step-button" type="button" data-stat="${stat}" data-stat-step="10" aria-label="Increase ${STAT_NAMES[stat]} by 10">+10</button></div><input class="planner-stat-slider" id="stat-slider-${stat}" data-stat="${stat}" type="range" min="0" max="${getPointTotal()}" step="1" value="${planner.stats[stat]||0}" aria-label="${STAT_NAMES[stat]} allocation"></div>`).join("");
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
      const qualityOptions=selectedType?getWeaponQualityOptions(selectedType,variant):[WEAPON_QUALITIES[0]];
      const quality=qualityOptions.some(item=>item.value===weapon.quality)?weapon.quality:qualityOptions[0]?.value||"poor";
      return {
        type,
        variant,
        quality
      };
    });
    const savedRelics=Array.isArray(saved?.relics)?saved.relics:[];
    const relics=DEFAULT_RELICS.map((defaultRelic,index)=>{
      const savedRelic=savedRelics[index];
      const type=SPIRIT_RELICS.some(relic=>relic.value===savedRelic?.type)?savedRelic.type:"";
      const relicType=SPIRIT_RELICS.find(relic=>relic.value===type);
      const relicLevel=relicType?Math.max(relicType.level,Math.min(level,Math.floor(Number(savedRelic?.level)||relicType.level))):0;
      return {type,level:relicLevel};
    });
    return {level,stats,weapons,relics};
  }catch{return {level:MAX_LEVEL,stats:{magic:0,weapons:0,spirit:0,strength:0},weapons:DEFAULT_WEAPONS.map(weapon=>({...weapon})),relics:DEFAULT_RELICS.map(relic=>({...relic}))};}
}
function savePlanner(){localStorage.setItem(STORAGE_KEY,JSON.stringify(planner));}
function getPointTotal(){return planner.level*2;}
function getSpent(){return STAT_ORDER.reduce((sum,stat)=>sum+planner.stats[stat],0);}
function getClass(){
  const spent=getSpent();
  if(!spent)return {name:"Not determined",stats:null,note:"Invest points to estimate a class from your current percentage split."};
  const percentages=Object.fromEntries(STAT_ORDER.map(stat=>[stat,planner.stats[stat]/spent]));
  const distribution=STAT_ORDER.filter(stat=>planner.stats[stat]>0).map(stat=>`${STAT_NAMES[stat]} ${Math.round(percentages[stat]*100)}%`).join(" · ");
  const summary=`${spent} point${spent===1?"":"s"} invested: ${distribution}.`;
  const match=CLASS_RULES.find(rule=>rule.stats.every(stat=>percentages[stat]>=rule.threshold));
  if(match)return {name:match.name,stats:match.stats,note:`Based on your invested-point split. ${summary}`};
  const savantStats=STAT_ORDER.filter(stat=>percentages[stat]>=.15);
  if(savantStats.length>=3&&Math.max(...Object.values(percentages))<.5)return {name:"Savant",stats:STAT_ORDER,note:`Your current split meets the Savant thresholds. ${summary}`};
  return {name:"Not determined",stats:null,note:`No class threshold matches yet. ${summary} Full-stat classes need 60%; hybrid classes need 40% in each stat.`};
}
function normalizeWeaponSelections(classResult){
  let changed=false;
  for(const weapon of planner.weapons){
    const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
    if(!selectedType)continue;
    const variantOptions=getWeaponVariantOptions(selectedType,classResult);
    if(!variantOptions.length){
      weapon.type="";
      weapon.variant="normal";
      weapon.quality="poor";
      changed=true;
      continue;
    }
    if(!variantOptions.some(([value])=>value===weapon.variant)){
      weapon.variant=variantOptions[0][0];
      changed=true;
    }
    const qualityOptions=getWeaponQualityOptions(selectedType,weapon.variant);
    if(!qualityOptions.some(quality=>quality.value===weapon.quality)){
      weapon.quality=qualityOptions[0]?.value||"poor";
      changed=true;
    }
  }
  if(changed)savePlanner();
}
function renderWeaponInputs(classResult){
  document.getElementById("planner-weapon-inputs").innerHTML=planner.weapons.map((weapon,index)=>{
    const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
    const variantOptions=selectedType?getWeaponVariantOptions(selectedType,classResult):WEAPON_VARIANTS;
    const qualityOptions=selectedType?getWeaponQualityOptions(selectedType,weapon.variant):[WEAPON_QUALITIES[0]];
    const variantHtml=variantOptions.map(([value,label])=>`<option value="${value}"${weapon.variant===value?" selected":""}>${label}</option>`).join("");
    const qualityHtml=qualityOptions.map(quality=>`<option value="${quality.value}"${weapon.quality===quality.value?" selected":""}>${quality.label}</option>`).join("");
    const qualityInfo=getWeaponQualityInfo(weapon.quality);
    const level=selectedType?getWeaponLevelLabel(selectedType,weapon.variant,weapon.quality):"—";
    const variantDisabled=!selectedType||variantOptions.length<2;
    const qualityDisabled=!selectedType||qualityOptions.length<2;
    const searchPlaceholder=selectedType?(selectedType.isNamedWeapon?selectedType.value:getWeaponSearchLabel(selectedType.baseType)):"Search weapons…";
    const typePicker=`<div class="planner-weapon-field"><label class="planner-weapon-field-title" for="weapon-${index}-search">TYPE <small data-weapon-search-count="${index}"></small></label><div class="planner-weapon-search-wrap"><input id="weapon-${index}-search" class="planner-weapon-search" type="search" data-weapon-search="${index}" placeholder="${searchPlaceholder}" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="weapon-${index}-results" aria-expanded="${weaponDropdownOpen[index]}" aria-label="Search weapons for slot ${index+1}"><span class="planner-weapon-search-icon" aria-hidden="true">⌕</span><div class="planner-weapon-search-results" id="weapon-${index}-results" data-weapon-results="${index}" role="listbox" hidden></div></div></div>`;
    return `<div class="planner-weapon-row"><strong>WEAPON ${index+1}</strong>${typePicker}<label class="planner-weapon-field">VARIANT<select data-weapon-index="${index}" data-weapon-prop="variant" aria-label="Weapon ${index+1} variant"${variantDisabled?" disabled":""}>${variantHtml}</select></label><label class="planner-weapon-field">QUALITY${qualityInfo?` · ${qualityInfo.skillSlots}${qualityInfo.hasUltimateSlot?"+UA":""} SLOTS`:""}<select data-weapon-index="${index}" data-weapon-prop="quality" aria-label="Weapon ${index+1} quality"${qualityDisabled?" disabled":""}>${qualityHtml}</select></label><label class="planner-weapon-field">LEVEL<output class="planner-weapon-level">${level}</output></label></div>`;
  }).join("");
  for(let index=0;index<planner.weapons.length;index++){
    const input=document.querySelector(`[data-weapon-search="${index}"]`);
    if(input)input.value=weaponSearches[index];
    renderWeaponSearchResults(index,classResult);
  }
}
function getCompatibleWeaponSkills(selectedType){
  const compatibility=new Set((WEAPON_COMPATIBILITY[selectedType.baseType]||"").split("|"));
  return WEAPON_SKILLS.filter(skill=>compatibility.has(skill.name)||selectedType.exclusiveSkill===skill.name);
}
function getWeaponSkillRequirements(skill,weapon,selectedType){
  const level=getWeaponLevel(selectedType,weapon.variant,weapon.quality);
  const weaponBase=weapon.variant==="strength"||weapon.variant==="arcanium"?level:level*2;
  const weapons=RARE_WEAPON_SKILLS.has(skill.name)?Math.max(skill.points,weaponBase):weaponBase+skill.points-30;
  return {
    weapons,
    strength:weapon.variant==="strength"?level:0,
    magic:weapon.variant==="arcanium"?level:0
  };
}
function getWeaponUltimateArtRequirements(skill,weapon,selectedType){
  const required=getWeaponSkillRequirements(skill,weapon,selectedType);
  const hybrid=weapon.variant==="strength"||weapon.variant==="arcanium";
  const bonus=hybrid?40:80;
  return {
    weapons:required.weapons+bonus,
    strength:required.strength+(weapon.variant==="strength"?40:0),
    magic:required.magic+(weapon.variant==="arcanium"?40:0)
  };
}
function getWeaponSkillState(skill,weapon,selectedType,points,classResult){
  const required=getWeaponSkillRequirements(skill,weapon,selectedType);
  const missing=[];
  if(points<required.weapons)missing.push(`Weapons ${required.weapons}`);
  if(required.strength&&planner.stats.strength<required.strength)missing.push(`Strength ${required.strength}`);
  if(required.magic&&planner.stats.magic<required.magic)missing.push(`Magic ${required.magic}`);
  const classUnavailable=Boolean(classResult.stats&&!classResult.stats.includes("weapons"));
  const qualityInfo=getWeaponQualityInfo(weapon.quality);
  const hasUltimateSlot=Boolean(qualityInfo?.hasUltimateSlot);
  const ultimateArtRequired=getWeaponUltimateArtRequirements(skill,weapon,selectedType);
  const ultimateArtMissing=[];
  if(points<ultimateArtRequired.weapons)ultimateArtMissing.push(`Weapons ${ultimateArtRequired.weapons}`);
  if(ultimateArtRequired.strength&&planner.stats.strength<ultimateArtRequired.strength)ultimateArtMissing.push(`Strength ${ultimateArtRequired.strength}`);
  if(ultimateArtRequired.magic&&planner.stats.magic<ultimateArtRequired.magic)ultimateArtMissing.push(`Magic ${ultimateArtRequired.magic}`);
  return {
    required,missing,usable:missing.length===0&&!classUnavailable,classUnavailable,className:classResult.name,
    ultimateArt:{
      slotAvailable:hasUltimateSlot,
      quality:qualityInfo?.label||"Unknown",
      skillSlots:qualityInfo?.skillSlots||0,
      tierCap:qualityInfo?.tierCap||"N/A",
      required:ultimateArtRequired,
      missing:ultimateArtMissing,
      usable:hasUltimateSlot&&ultimateArtMissing.length===0&&!classUnavailable,
      isUltimateArt:!WEAPON_SKILLS_THAT_REMAIN_NORMAL_IN_ULTIMATE_SLOT.has(skill.name)
    }
  };
}
function renderWeaponSkillRow(skill,state){
  const {required,missing,usable}=state;
  const requirement=[`Weapons ${required.weapons}`,required.strength?`Strength ${required.strength}`:"",required.magic?`Magic ${required.magic}`:""].filter(Boolean).join(" + ");
  const status=usable?"Usable":state.classUnavailable?`Unavailable to ${state.className}`:`Needs ${missing.join(" + ")}`;
  const ultimateArt=state.ultimateArt;
  const ultimateArtRequirement=[`Weapons ${ultimateArt.required.weapons}`,ultimateArt.required.strength?`Strength ${ultimateArt.required.strength}`:"",ultimateArt.required.magic?`Magic ${ultimateArt.required.magic}`:""].filter(Boolean).join(" + ");
  const ultimateArtStatus=!ultimateArt.slotAvailable?`No Ultimate Art slot · ${ultimateArt.quality} Quality has ${ultimateArt.skillSlots} skill slots`:ultimateArt.usable?(ultimateArt.isUltimateArt?"Ready":"Functions as a normal move"):state.classUnavailable?`Unavailable to ${state.className}`:`Needs ${ultimateArt.missing.join(" + ")}`;
  const ultimateArtBadge=ultimateArt.usable?`<span class="planner-ultimate-art-badge" title="Slot 5 requires ${ultimateArtRequirement}">${ultimateArt.isUltimateArt?"ULTIMATE ART · SLOT 5":"SLOT 5 · NORMAL"}</span>`:"";
  const slot5Label=ultimateArt.slotAvailable?`${ultimateArtRequirement} · ${ultimateArtStatus}`:ultimateArtStatus;
  return `<div class="planner-move${usable?" is-available":" is-locked"}"><div class="planner-move-main"><strong class="planner-move-name">${skill.name}</strong><small class="planner-move-kind">Skill cost ${skill.points}</small>${ultimateArtBadge}</div><small class="planner-move-status">${requirement} · ${status}<span class="planner-weapon-slot5-status${ultimateArt.usable?" is-ready":" is-locked"}">Slot 5: ${slot5Label}</span></small></div>`;
}
function renderAvailableWeaponSkills(points,classResult){
  const cards=planner.weapons.map((weapon,index)=>{
    const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
    if(!selectedType)return `<article class="planner-weapon-available-card"><h4>WEAPON ${index+1}</h4><p>Choose a weapon type to list available moves.</p></article>`;
    const skills=getCompatibleWeaponSkills(selectedType);
    const available=skills.filter(skill=>getWeaponSkillState(skill,weapon,selectedType,points,classResult).usable);
    const rows=available.map(skill=>renderWeaponSkillRow(skill,getWeaponSkillState(skill,weapon,selectedType,points,classResult))).join("");
    const countLabel=`${available.length} available`;
    const variantLabel=WEAPON_VARIANTS.find(([value])=>value===weapon.variant)?.[1]||"Normal";
    const qualityLabel=`${getWeaponQualityInfo(weapon.quality)?.label||"Poor"} Quality`;
    const qualitySummary=getWeaponQualitySummary(weapon.quality);
    const emptyMessage=classResult.stats&&!classResult.stats.includes("weapons")?`Weapon skills are unavailable to the ${classResult.name} class.`:"No compatible moves meet the current stat requirements.";
    return `<article class="planner-weapon-available-card"><h4>WEAPON ${index+1} · ${selectedType.label} · ${variantLabel} · ${qualityLabel} · LV ${getWeaponLevelLabel(selectedType,weapon.variant,weapon.quality)}</h4><small class="planner-weapon-quality-summary">${qualitySummary}</small><strong>${countLabel}</strong>${rows?`<div class="planner-move-list">${rows}</div>`:`<p>${emptyMessage}</p>`}</article>`;
  }).join("");
  return `<div class="planner-weapon-section-heading"><h3>Usable moves</h3><p>Moves that meet the current stat requirements for each selected weapon.</p></div><div class="planner-weapon-available-cards">${cards}</div>`;
}
function renderWeaponSkills(weapon,index,points,classResult){
  const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
  if(!selectedType)return `<section class="planner-weapon-result"><div class="planner-weapon-result-heading"><h3>WEAPON ${index+1}</h3></div><p class="planner-weapon-class-note">Choose a weapon type to see its compatible skills.</p></section>`;
  const skills=getCompatibleWeaponSkills(selectedType);
  const rows=skills.map(skill=>renderWeaponSkillRow(skill,getWeaponSkillState(skill,weapon,selectedType,points,classResult))).join("");
  const usable=skills.filter(skill=>getWeaponSkillState(skill,weapon,selectedType,points,classResult).usable).length;
  const variantLabel=WEAPON_VARIANTS.find(([value])=>value===weapon.variant)?.[1]||"Normal";
  const qualityLabel=`${getWeaponQualityInfo(weapon.quality)?.label||"Poor"} Quality`;
  const qualitySummary=getWeaponQualitySummary(weapon.quality);
  return `<section class="planner-weapon-result"><div class="planner-weapon-result-heading"><h4>WEAPON ${index+1} · ${selectedType.label} · ${variantLabel} · ${qualityLabel} · LV ${getWeaponLevelLabel(selectedType,weapon.variant,weapon.quality)}</h4><small class="planner-weapon-quality-summary">${qualitySummary}</small><strong>${usable} / ${skills.length} USABLE</strong></div><div class="planner-move-list">${rows||'<p class="planner-weapon-class-note">No skill compatibility data is available for this type.</p>'}</div></section>`;
}
function renderWeapons(points,classResult){
  document.getElementById("planner-weapon-available").innerHTML=renderAvailableWeaponSkills(points,classResult);
  document.getElementById("planner-weapon-results").innerHTML=`<div class="planner-weapon-section-heading"><h3>All compatible moves</h3><p>Usable and locked moves, with their full stat and class requirements.</p></div>${planner.weapons.map((weapon,index)=>renderWeaponSkills(weapon,index,points,classResult)).join("")}`;
}
function getSpiritRiteRequirement(rite,relic){
  return relic.level*2+rite.points+(rite.ultimate&&!rite.movement?RELIC_ULTIMATE_EXTRA_POINTS:0);
}
function getSpiritRiteUltimateArtRequirement(rite,relic){
  if(rite.movement)return null;
  const requirement=getSpiritRiteRequirement(rite,relic);
  return rite.ultimate?requirement:requirement+RELIC_ULTIMATE_EXTRA_POINTS;
}
function getCompatibleSpiritRites(relic){
  return [...SPIRIT_RITES,...relic.uniqueRites];
}
function renderSpiritRiteRows(relic,usableOnly){
  return getCompatibleSpiritRites(relic).map(rite=>{
    const required=getSpiritRiteRequirement(rite,relic);
    const meetsRequirement=planner.stats.spirit>=required;
    const usable=meetsRequirement&&rite.usable!==false;
    if(usableOnly&&!usable)return "";
    const kind=rite.unique?(rite.ultimate?"Unique · Ultimate Rite":"Unique Rite"):"Default Rite";
    const status=rite.usable===false?`Currently unusable · ${meetsRequirement?`Spirit ${required} met`:`needs Spirit ${required}`}`:usable?`Spirit ${required} · Ready`:`Locked · needs Spirit ${required}`;
    const ultimateArtRequirement=getSpiritRiteUltimateArtRequirement(rite,relic);
    const ultimateArtAvailable=rite.usable!==false&&ultimateArtRequirement!==null&&planner.stats.spirit>=ultimateArtRequirement;
    const ultimateArtBadge=ultimateArtAvailable?`<span class="planner-ultimate-art-badge" title="Ultimate Art slot requires Spirit ${ultimateArtRequirement}">ULTIMATE ART</span>`:"";
    return `<div class="planner-move${usable?" is-available":" is-locked"}${rite.usable===false?" is-unavailable":""}"><div class="planner-move-main"><strong class="planner-move-name">${rite.name}</strong><small class="planner-move-kind">${kind}</small>${ultimateArtBadge}</div><small class="planner-move-status">${status}</small></div>`;
  }).join("");
}
function renderSpiritRiteCards(usableOnly){
  return planner.relics.map((selected,index)=>{
    const relic=SPIRIT_RELICS.find(item=>item.value===selected.type);
    if(!relic)return `<article class="planner-weapon-available-card"><h4>SPIRIT WEAPON ${index+1}</h4><p>Choose a relic to list its compatible rites.</p></article>`;
    const level=Math.max(relic.level,Math.min(planner.level,Math.floor(Number(selected.level)||relic.level)));
    const rites=getCompatibleSpiritRites({...relic,level});
    const usable=rites.filter(rite=>rite.usable!==false&&planner.stats.spirit>=getSpiritRiteRequirement(rite,{...relic,level})).length;
    const rows=renderSpiritRiteRows({...relic,level},usableOnly);
    const summary=`${usable} usable · ${rites.length} compatible`;
    const emptyMessage=usableOnly?"No rites meet the current Spirit requirement.":"No compatible rites are listed.";
    return `<article class="planner-weapon-available-card"><h4>SPIRIT WEAPON ${index+1} · ${relic.name} · LV ${level}</h4><small class="planner-weapon-quality-summary">${summary}</small>${rows?`<div class="planner-move-list">${rows}</div>`:`<p>${emptyMessage}</p>`}</article>`;
  }).join("");
}
function renderSpiritRites(){
  document.getElementById("planner-spirit-available").innerHTML=`<div class="planner-weapon-section-heading"><h3>Usable rites</h3><p>Rites available at your current Spirit investment and selected relic levels.</p></div><div class="planner-weapon-available-cards">${renderSpiritRiteCards(true)}</div>`;
  document.getElementById("planner-spirit-results").innerHTML=`<div class="planner-weapon-section-heading"><h3>All compatible rites</h3><p>Unique rites are exclusive to their relic. The Ultimate Art slot needs 100 extra Spirit; Movement Rites gain no Ultimate Art effect.</p></div><div class="planner-weapon-available-cards">${renderSpiritRiteCards(false)}</div>`;
}
const spiritInputs=document.getElementById("planner-spirit-inputs");
function renderSpiritInputs(){
  spiritInputs.innerHTML=planner.relics.map((selected,index)=>{
    const relic=SPIRIT_RELICS.find(item=>item.value===selected.type);
    const options=SPIRIT_RELICS.map(item=>`<option value="${item.value}"${item.value===selected.type?" selected":""}>${item.name}</option>`).join("");
    const level=relic?Math.max(relic.level,Math.min(planner.level,Math.floor(Number(selected.level)||relic.level))):"";
    const maxLevel=relic?Math.max(relic.level,planner.level):"";
    return `<div class="planner-spirit-row"><strong>SPIRIT WEAPON ${index+1}</strong><label class="planner-spirit-field">RELIC<select data-spirit-index="${index}" data-spirit-property="type" aria-label="Spirit weapon ${index+1} relic"><option value="">Select a relic</option>${options}</select></label><label class="planner-spirit-field">LEVEL<input data-spirit-index="${index}" data-spirit-property="level" type="number" min="${relic?relic.level:0}" max="${maxLevel}" value="${level}" inputmode="numeric" aria-label="Spirit weapon ${index+1} relic level"${relic?"":" disabled"}></label></div>`;
  }).join("");
}
spiritInputs.addEventListener("change",event=>{
  const index=Number(event.target.dataset.spiritIndex);
  const property=event.target.dataset.spiritProperty;
  const selected=planner.relics[index];
  if(!selected)return;
  if(property==="type"){
    const relic=SPIRIT_RELICS.find(item=>item.value===event.target.value);
    selected.type=relic?.value||"";
    selected.level=relic?relic.level:0;
  }else if(property==="level"){
    const relic=SPIRIT_RELICS.find(item=>item.value===selected.type);
    if(!relic)return;
    selected.level=Math.max(relic.level,Math.min(Math.max(relic.level,planner.level),Math.floor(Number(event.target.value)||relic.level)));
  }else return;
  savePlanner();
  render();
});
function renderMoveList(id,moves,stat,points,classResult,secondarySlot=null){
  document.getElementById(id).innerHTML=moves.map(move=>{
    const requirement=move.points;
    const ultimateArtRequirement=requirement+ULTIMATE_ART_EXTRA_POINTS;
    const ultimateArtAvailable=Boolean(classResult.stats?.includes(stat)&&points>=ultimateArtRequirement);
    const statAvailable=points>=requirement;
    const classUnavailable=Boolean(classResult.stats&&!classResult.stats.includes(stat));
    const available=statAvailable&&!classUnavailable;
    const lockReasons=[];
    if(classUnavailable)lockReasons.push(`not ${classResult.name}`);
    if(!statAvailable)lockReasons.push(`needs ${STAT_NAMES[stat]} ${requirement}`);
    const status=available?`${STAT_NAMES[stat]} ${requirement} · Ready`:`Locked · ${lockReasons.join(" · ")}`;
    const secondaryRequirement=requirement+(secondarySlot?.bonus||0);
    const secondaryAvailable=Boolean(secondarySlot&&points>=secondaryRequirement);
    const badge=secondaryAvailable?`<span class="planner-secondary-badge" title="Meets the secondary-slot stat requirement">${secondarySlot.label}</span>`:"";
    const ultimateArtBadge=ultimateArtAvailable?`<span class="planner-ultimate-art-badge" title="Requires ${ultimateArtRequirement} ${STAT_NAMES[stat]} points">ULTIMATE ART</span>`:"";
    return `<div class="planner-move${available?" is-available":" is-locked"}"><div class="planner-move-main"><strong class="planner-move-name">${move.name}</strong><small class="planner-move-kind">${move.kind}</small>${badge}${ultimateArtBadge}</div><small class="planner-move-status">${status}</small></div>`;
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
    input.max=total;
    slider.value=planner.stats[stat];
    slider.max=total;
    for(const button of statList.querySelectorAll(`[data-stat="${stat}"][data-stat-step]`)){
      const step=Number(button.dataset.statStep);
      button.disabled=step<0?planner.stats[stat]===0:available-planner.stats[stat]<step;
    }
  }
  const classResult=getClass();
  normalizeWeaponSelections(classResult);
  document.getElementById("planner-class-name").textContent=classResult.name;
  document.getElementById("planner-class-note").textContent=classResult.note;
  for(const group of document.querySelectorAll("[data-move-stat]"))group.hidden=Boolean(classResult.stats&&!classResult.stats.includes(group.dataset.moveStat));
  renderWeaponInputs(classResult);
  renderMoveList("planner-spells",MOVES.spells,"magic",planner.stats.magic,classResult,classResult.name==="Mage"?{kind:"magic",label:"2ND MAGIC",bonus:120}:null);
  renderMoveList("planner-techniques",MOVES.techniques,"strength",planner.stats.strength,classResult,classResult.name==="Berserker"?{kind:"strength",label:"2ND STYLE",bonus:90}:null);
  renderWeapons(planner.stats.weapons,classResult);
  renderSpiritInputs();
  renderSpiritRites();
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
function bindPlannerTabs(tablist){
  function activate(tab,focus=false){
    const tabs=Array.from(tablist.querySelectorAll('[role="tab"]'));
    for(const item of tabs){
      const active=item===tab;
      item.setAttribute("aria-selected",String(active));
      item.tabIndex=active?0:-1;
      document.getElementById(item.getAttribute("aria-controls")).hidden=!active;
    }
    if(focus)tab.focus();
  }
  tablist.addEventListener("click",event=>{
    const tab=event.target.closest('[role="tab"]');
    if(tab)activate(tab);
  });
  tablist.addEventListener("keydown",event=>{
    const tabs=Array.from(tablist.querySelectorAll('[role="tab"]'));
    const current=tabs.indexOf(event.target);
    if(current<0)return;
    let next=current;
    if(event.key==="ArrowRight")next=(current+1)%tabs.length;
    else if(event.key==="ArrowLeft")next=(current+tabs.length-1)%tabs.length;
    else if(event.key==="Home")next=0;
    else if(event.key==="End")next=tabs.length-1;
    else return;
    event.preventDefault();
    activate(tabs[next],true);
  });
}
bindPlannerTabs(document.getElementById("planner-weapon-tabs"));
bindPlannerTabs(document.getElementById("planner-spirit-tabs"));
const weaponInputs=document.getElementById("planner-weapon-inputs");
function selectWeaponType(index,value){
  const weapon=planner.weapons[index];
  if(!weapon)return;
  const classResult=getClass();
  const selectedType=WEAPON_TYPES.find(type=>type.value===value);
  if(!value||!selectedType){
    weapon.type="";
    weapon.variant="normal";
    weapon.quality="poor";
  }else{
    const variantOptions=getWeaponVariantOptions(selectedType,classResult);
    if(!variantOptions.length)return;
    weapon.type=selectedType.value;
    if(!variantOptions.some(([variant])=>variant===weapon.variant))weapon.variant=variantOptions[0][0];
    const qualityOptions=getWeaponQualityOptions(selectedType,weapon.variant);
    if(!qualityOptions.some(quality=>quality.value===weapon.quality))weapon.quality=qualityOptions[0]?.value||"poor";
  }
  weaponSearches[index]="";
  weaponDropdownOpen[index]=false;
  activeWeaponSearchIndexes[index]=0;
  savePlanner();render();
}
weaponInputs.addEventListener("focusin",event=>{
  if(!event.target.matches("[data-weapon-search]"))return;
  const index=Number(event.target.dataset.weaponSearch);
  weaponDropdownOpen[index]=true;
  activeWeaponSearchIndexes[index]=0;
  renderWeaponSearchResults(index,getClass());
});
weaponInputs.addEventListener("input",event=>{
  if(!event.target.matches("[data-weapon-search]"))return;
  const index=Number(event.target.dataset.weaponSearch);
  weaponSearches[index]=event.target.value;
  weaponDropdownOpen[index]=true;
  activeWeaponSearchIndexes[index]=0;
  renderWeaponSearchResults(index,getClass());
});
weaponInputs.addEventListener("keydown",event=>{
  if(!event.target.matches("[data-weapon-search]"))return;
  const index=Number(event.target.dataset.weaponSearch);
  const entries=getWeaponSearchEntries(index,getClass());
  if(event.key==="ArrowDown"||event.key==="ArrowUp"){
    event.preventDefault();
    weaponDropdownOpen[index]=true;
    if(entries.length)activeWeaponSearchIndexes[index]=(activeWeaponSearchIndexes[index]+(event.key==="ArrowDown"?1:-1)+entries.length)%entries.length;
    renderWeaponSearchResults(index,getClass());
  }else if(event.key==="Enter"&&weaponDropdownOpen[index]){
    event.preventDefault();
    const entry=entries[activeWeaponSearchIndexes[index]];
    if(entry)selectWeaponType(index,entry.value);
  }else if(event.key==="Escape"&&weaponDropdownOpen[index]){
    weaponDropdownOpen[index]=false;
    renderWeaponSearchResults(index,getClass());
  }
});
weaponInputs.addEventListener("click",event=>{
  const result=event.target.closest("[data-select-weapon-type]");
  if(result)selectWeaponType(Number(result.dataset.selectWeaponType),result.dataset.weaponType);
});
document.addEventListener("click",event=>{
  if(event.target.closest(".planner-weapon-search-wrap"))return;
  for(let index=0;index<weaponDropdownOpen.length;index++){
    if(!weaponDropdownOpen[index])continue;
    weaponDropdownOpen[index]=false;
    renderWeaponSearchResults(index,getClass());
  }
});
weaponInputs.addEventListener("change",event=>{
  const prop=event.target.dataset.weaponProp;
  if(prop!=="variant"&&prop!=="quality")return;
  const weapon=planner.weapons[Number(event.target.dataset.weaponIndex)];
  if(!weapon)return;
  const classResult=getClass();
  const selectedType=WEAPON_TYPES.find(type=>type.value===weapon.type);
  if(!selectedType)return;
  if(prop==="variant"){
    if(!getWeaponVariantOptions(selectedType,classResult).some(([value])=>value===event.target.value))return;
    weapon.variant=event.target.value;
  }
  const qualityOptions=getWeaponQualityOptions(selectedType,weapon.variant);
  if(prop==="quality"){
    if(!qualityOptions.some(quality=>quality.value===event.target.value))return;
    weapon.quality=event.target.value;
  }else if(!qualityOptions.some(quality=>quality.value===weapon.quality)){
    weapon.quality=qualityOptions[0].value;
  }
  savePlanner();render();
});
render();