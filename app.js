const STAT_KEYS = ["power", "defense", "range", "haste", "size", "dexterity", "regeneration", "pierce", "resistance", "warding", "drawback", "insanity"];
const MAX_GAME_LEVEL = 175;
const STAT_LABELS = { power:"Power", defense:"Defense", range:"Range", haste:"Haste", size:"Size", dexterity:"Dexterity", regeneration:"Regeneration", pierce:"Pierce", resistance:"Resistance", warding:"Warding", drawback:"Drawback", insanity:"Insanity" };
const STAT_ICON_URLS = {
  power:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/a/a3/Power.svg/revision/latest?cb=20240317050637",
  defense:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/e/e4/Defense.svg/revision/latest?cb=20240317050627",
  range:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/c/c5/Range.png/revision/latest?cb=20260104020327",
  haste:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/3/35/Haste.png/revision/latest?cb=20260104020327",
  size:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/a/ad/Attack_Size.svg/revision/latest?cb=20240317050622",
  dexterity:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/3/39/Attack_Speed.svg/revision/latest?cb=20240317050624",
  regeneration:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/e/e1/Regeneration.svg/revision/latest?cb=20240317050640",
  pierce:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/4/4d/Armor_Piercing.svg/revision/latest?cb=20240317050650",
  resistance:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/9/97/Resistance.svg/revision/latest?cb=20240317050643",
  warding:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/9/90/Warding.svg/revision/latest?cb=20240317050645",
  drawback:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/3/3f/Drawback.svg/revision/latest?cb=20240317050630",
  insanity:"https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/3/3a/Insanity.svg/revision/latest?cb=20240317050632"
};
const STAT_BUILDS = [
  ["savant","Savant","All four stats · 15%+ in three stats; no single stat at 50%+"],
  ["oracle","Oracle","Full Spirit build · 60%+ Spirit"],
  ["paladin","Paladin","Magic + Spirit hybrid · 40%+ in each"],
  ["juggernaut","Juggernaut","Strength + Spirit hybrid · 40%+ in each"],
  ["knight","Knight","Weapons + Spirit hybrid · 40%+ in each"],
  ["mage","Mage","Full Magic build · 60%+ Magic"],
  ["warlock","Warlock","Magic + Strength hybrid · 40%+ in each"],
  ["conjurer","Conjurer","Magic + Weapons hybrid · 40%+ in each"],
  ["berserker","Berserker","Full Strength build · 60%+ Strength"],
  ["warlord","Warlord","Strength + Weapons hybrid · 40%+ in each"],
  ["warrior","Warrior","Full Weapons build · 60%+ Weapons"]
];
const MAGIC_BUILDS = {savant:1,paladin:1,mage:2,warlock:1,conjurer:1};
const MAGICS = ["Acid","Ash","Crystal","Earth","Explosion","Fire","Glass","Ice","Light","Lightning","Magma","Metal","Plasma","Poison","Sand","Shadow","Snow","Water","Wind","Wood"];
const FIGHTING_BUILDS = {savant:1,juggernaut:1,warlock:1,berserker:2,warlord:1};
const FIGHTING_STYLES = ["Basic Combat","Boxing","Cannon Fist","Iron Leg","Sailor Style","Thermo Fist","Powder Fist","Vanishing Style"];
const ENCHANTS = [
  ["", "No enchant"], ["powerful", "Powerful"], ["armored", "Armored"], ["deadeye", "Deadeye"],
  ["enhanced", "Enhanced"], ["explosive", "Explosive"], ["brisk", "Brisk"],
  ["charged", "Charged"], ["tracking", "Tracking"],
  ["healing", "Healing"],
  ["resilient", "Resilient"], ["piercing", "Piercing"], ["virtuous", "Virtuous"]
];
const ENCHANT_STATS = {
  powerful:{power:.9764705882}, armored:{defense:8}, brisk:{dexterity:2.625}, charged:{power:.529411765,haste:1.40625},
  tracking:{dexterity:1.40625,range:1.40625}, deadeye:{range:2.647058824}, enhanced:{haste:2.625}, explosive:{size:2.588235294},
  healing:{regeneration:2.625}, resilient:{resistance:2.625}, piercing:{pierce:2.625}, virtuous:{defense:5.625}
};
const ENCHANT_UPGRADES = {strong:"powerful",hard:"armored",accurate:"deadeye",amplified:"enhanced",bursting:"explosive",swift:"brisk"};
const ENCHANT_FLAT_STATS = {virtuous:{warding:1}};
const MODIFIERS = [
  ["","No modifier"],["abyssal","Abyssal · Defense + Resistance"],["archaic","Archaic · Size"],
  ["atlantean","Atlantean · Insanity + missing stat"],["blasted","Blasted · Power"],
  ["crystalline","Crystalline · Dexterity"],["drowned","Drowned · Defense + Size"],
  ["frozen","Frozen · Defense"],["gilded","Gilded · +1 jewel slot"],
  ["imbued","Imbued · Base stat bonus"],["sandy","Sandy · Haste"],["superheated","Superheated · Power + Haste"]
];
const MODIFIER_STATS = {
  abyssal:{defense:2.2669,resistance:1.6471}, archaic:{size:1.4118},
  blasted:{power:.4725}, crystalline:{dexterity:1.4118},
  drowned:{defense:2.3,size:.82}, frozen:{defense:4.4706},
  sandy:{haste:1.4118}, superheated:{power:.25,haste:.8236}
};
const MODIFIER_DESCRIPTIONS = {
  abyssal:"Per 10 levels: +2.2669 Defense, +1.6471 Resistance.",
  archaic:"Per 10 levels: +1.4118 Size.", atlantean:"+1 Insanity and the first missing stat (base gear, enchant, and jewels count). Cannot be applied with Virtuous.",
  blasted:"Per 10 levels: +0.4725 Power.", crystalline:"Per 10 levels: +1.4118 Dexterity.",
  drowned:"Per 10 levels: +2.3 Defense and +0.82 Size.", frozen:"Per 10 levels: +4.4706 Defense.",
  gilded:"+1 jewel socket.", imbued:"Adds roughly half of a basic modifier for each unique base stat on the item.",
  sandy:"Per 10 levels: +1.4118 Haste.", superheated:"Per 10 levels: +0.25 Power and +0.8236 Haste."
};
const MODIFIER_GEAR_CATEGORIES = new Set(["Chestplate","Boots","Helmet","Accessory","Amulet"]);
const ATLANTEAN_STATS = [
  ["power",.7648],["defense",6.8236],["size",2.2353],
  ["dexterity",2.2353],["range",2.2353],["haste",2.2353]
];
const GEM_FUSION_MULTIPLIERS = {
  power:0.6,
  defense:0.6,
  regeneration:0.6,
  pierce:0.6,
  resistance:0.6,
  dexterity:2/3,
  size:2/3,
  range:2/3,
  haste:2/3,
  drawback:0.5
};
const GEM_FUSION_RATIO = 0.6;
const GEM_DEFENSE_DELTA = 1-Number.EPSILON;
const GEM_DEFENSE_DELTA_IDS = new Set(["defense","defense-size"]);
const POWER_SUBSTAT_GEM_IDS = new Set(["power-size","power-dexterity","power-range"]);
const GEMS = [
  {id:"defense",name:"Amethyst",variants:["Diamond","Onyx"],stats:[{defense:6.5},{defense:13.1},{defense:19.6},{defense:26.2},{defense:32.8},{defense:39}]},
  {id:"power",name:"Ruby",variants:["Sunstone","Zircon"],stats:[{power:1},{power:1.4},{power:2.1},{power:2.9},{power:3.6},{power:4}]},
  {id:"dexterity",name:"Sapphire",variants:["Tanzanite"],stats:[{dexterity:2.1},{dexterity:4.3},{dexterity:6.5},{dexterity:8.7},{dexterity:10.9},{dexterity:13}]},
  {id:"size",name:"Emerald",variants:["Peridot"],stats:[{size:2.1},{size:4.3},{size:6.5},{size:8.7},{size:10.9},{size:13}]},
  {id:"range",name:"Aquamarine",variants:["Tourmaline"],stats:[{range:2.1},{range:4.3},{range:6.5},{range:8.7},{range:10.9},{range:13}]},
  {id:"haste",name:"Citrine",variants:["Topaz"],stats:[{haste:2.1},{haste:4.3},{haste:6.5},{haste:8.7},{haste:10.9},{haste:13}]},
  {id:"dexterity-range",name:"Lapis Lazuli",stats:[{dexterity:1.6,range:1.6},{dexterity:3.2,range:3.2},{dexterity:4.9,range:4.9},{dexterity:6.5,range:6.5},{dexterity:8.2,range:8.2},{dexterity:9,range:9}]},
  {id:"dexterity-haste",name:"Larimar",stats:[{dexterity:1.6,haste:1.6},{dexterity:3.2,haste:3.2},{dexterity:4.9,haste:4.9},{dexterity:6.5,haste:6.5},{dexterity:8.2,haste:8.2},{dexterity:9,haste:9}]},
  {id:"defense-size",name:"Agate",stats:[{size:1,defense:6.5},{size:2.1,defense:13.1},{size:3.2,defense:19.6},{size:4.3,defense:26.2},{size:5.4,defense:32.8},{size:6,defense:39}]},
  {id:"power-size",name:"Malachite",fusionStats:{power:4},stats:[{power:1,size:1},{power:1.4,size:2.1},{power:2.1,size:3.2},{power:2.9,size:4.3},{power:3.6,size:5.4},{power:3.9,size:6}]},
  {id:"power-dexterity",name:"Candelaria",fusionStats:{power:4},stats:[{power:1,dexterity:1},{power:1.4,dexterity:2.1},{power:2.1,dexterity:3.2},{power:2.9,dexterity:4.3},{power:3.6,dexterity:5.4},{power:3.9,dexterity:6}]},
  {id:"power-range",name:"Morenci",fusionStats:{power:4},stats:[{power:1,range:1},{power:1.4,range:2.1},{power:2.1,range:3.2},{power:2.9,range:4.3},{power:3.6,range:5.4},{power:3.9,range:6}]},
  {id:"double-effect",name:"Musgravite",stats:[{},{},{},{},{},{}]},
  {id:"defense-drawback",name:"Painite",stats:[{drawback:1,defense:31.3},{drawback:1,defense:62.7},{drawback:1,defense:94},{drawback:1,defense:125.4},{drawback:1,defense:156.7},{drawback:1,defense:188}]},
  {id:"range-haste",name:"Kyanite",stats:[{range:1.6,haste:1.6},{range:3.2,haste:3.2},{range:4.9,haste:4.9},{range:6.5,haste:6.5},{range:8.2,haste:8.2},{range:9,haste:9}]},
  {id:"range-size",name:"Variscite",stats:[{range:1.6,size:1.6},{range:3.2,size:3.2},{range:4.9,size:4.9},{range:6.5,size:6.5},{range:8.2,size:8.2},{range:9,size:9}]},
  {id:"resistance",name:"Azurite",stats:[{resistance:3.2},{resistance:6.5},{resistance:9.8},{resistance:13.1},{resistance:16.4},{resistance:19}]},
  {id:"regeneration",name:"Aventurine",stats:[{regeneration:3.2},{regeneration:6.5},{regeneration:9.8},{regeneration:13.1},{regeneration:16.4},{regeneration:19}]},
  {id:"pierce",name:"Fire Opal",stats:[{pierce:3.2},{pierce:6.5},{pierce:9.8},{pierce:13.1},{pierce:16.4},{pierce:19}]}
];
const DRAGONBLOOD_RITUALS = [
  {tier:0,label:"None",healthMultiplier:0,beastDefensePercent:0},
  {tier:1,label:"Dragonblood Blessing I",healthMultiplier:.02,beastDefensePercent:2},
  {tier:2,label:"Dragonblood Blessing II",healthMultiplier:.04,beastDefensePercent:3},
  {tier:3,label:"Dragonblood Blessing III",healthMultiplier:.08,beastDefensePercent:6},
  {tier:4,label:"Dragonblood Blessing IV",healthMultiplier:.12,beastDefensePercent:9},
  {tier:5,label:"Dragonblood Blessing V",healthMultiplier:.16,beastDefensePercent:12},
  {tier:6,label:"Dragonblood Blessing VI",healthMultiplier:.18,beastDefensePercent:14},
  {tier:7,label:"Dragonblood Blessing VII",healthMultiplier:.2,beastDefensePercent:15}
];
const CATEGORY_LABELS = {Amulet:"Amulet",Helmet:"Helmet",Accessory:"Accessory",Chestplate:"Chestpiece",Boots:"Leggings"};
const NEWER_ARMOR_RECORDS=window.BUILDER_NEW_ARMOR_DATA||[];
const WIKI_ARMOR_RECORDS=window.BUILDER_WIKI_ARMOR_DATA||[];
const NEWER_ARMOR_CATEGORY_BY_TYPE={Chestpiece:"Chestplate",Leggings:"Boots",Accessory:"Accessory",Helmet:"Helmet",Amulet:"Amulet"};
const ITEM_CATEGORY_BY_SUBTYPE={Head:"Accessory",Leggings:"Boots"};
const NEWER_ARMOR_SCALE_VALUES={power:3.5,defense:27,size:5,dexterity:5,range:5,haste:5,resistance:5,regeneration:5,pierce:5,warding:1,drawback:1,insanity:1};
const NEWER_ARMOR_NONSCALING_STATS=new Set(["insanity","warding","drawback"]);
const NEWER_ARMOR_EP_VALUES={power:1/3,defense:3,size:1,dexterity:1,range:1,haste:1,resistance:1,regeneration:1,pierce:1,warding:1.5,drawback:-2,insanity:-3};
function getNewerArmorSourceForItem(item){
  if(item.magicKey){
    const name=(item.magicPiece||item.name.slice(item.magicKey.length)).trim();
    const candidates=[name,name.startsWith("mancer")?`Arc${name}`:""];
    return NEWER_ARMOR_RECORDS.find(record=>record.type.startsWith("Magic ")&&candidates.includes(record.name));
  }
  if(item.fightingStyle){
    const name=item.fightingPiece||item.name;
    return NEWER_ARMOR_RECORDS.find(record=>record.type.startsWith("Strength ")&&record.name===name);
  }
  const sourceName=item.name==="Vatrachos Cape"?"Vatrachos Cloak":item.name;
  return NEWER_ARMOR_RECORDS.find(record=>record.name===sourceName&&(
    NEWER_ARMOR_CATEGORY_BY_TYPE[record.type]||NEWER_ARMOR_CATEGORY_BY_TYPE[record.type.replace(/^(?:(?:Corrupted )?Dragon|Magic|Strength|Spirit) /,"")]
  ));
}
function getNewerArmorStatRows(record,item=null,tool=null){
  const levels=Array.from({length:8},(_,index)=>100+index*10);
  return levels.map(level=>{
    const levelFactor=Math.floor(level/10);
    const stats=Object.fromEntries(Object.entries(record.stats||{}).map(([key,value])=>[
      key,NEWER_ARMOR_NONSCALING_STATS.has(key)?value:Math.floor(value*(NEWER_ARMOR_SCALE_VALUES[key]??1)*levelFactor)
    ]));
    if(tool?.["armor-stats"]){
      const reduction=record.type.includes("Chestpiece")||record.name?.toLowerCase().includes("arcsphere")?1:.75;
      for(const [key,value]of Object.entries(tool["armor-stats"])){
        const factor=NEWER_ARMOR_EP_VALUES[key]*3||1;
        stats[key]=(stats[key]||0)+Math.floor(value*levelFactor*factor)*reduction;
      }
    }
    return {level,stats};
  });
}
function updateItemFromNewerArmor(item){
  const record=getNewerArmorSourceForItem(item);
  const recordType=record?.type.replace(/^(?:Magic|Strength|Spirit) /,"");
  const sourceCategory=NEWER_ARMOR_CATEGORY_BY_TYPE[recordType];
  const category=ITEM_CATEGORY_BY_SUBTYPE[item.subType]||sourceCategory||item.category;
  if(!record)return category===item.category?item:{...item,category};
  const tool=item.magicKey
    ?NEWER_ARMOR_RECORDS.find(entry=>entry.type==="Magic"&&entry.name===item.magicKey)
    :item.fightingStyle?NEWER_ARMOR_RECORDS.find(entry=>entry.type==="Fighting Style"&&entry.name===item.fightingStyle):null;
  return {...item,category,minLevel:record.min_level??item.minLevel,maxLevel:170,jewelSlots:record.jewels??item.jewelSlots,statRows:getNewerArmorStatRows(record,item,tool)};
}
function updateItemFromWiki(item){
  const magicPiece=(item.magicPiece||(item.magicKey?item.name.slice(item.magicKey.length):"")).trim();
  const category=item.magicKey&&(magicPiece==="Arcanium Mage Hat"||magicPiece==="mancer Hat")?"Accessory":item.category;
  const record=WIKI_ARMOR_RECORDS.find(entry=>entry.name===item.name&&entry.category===category);
  if(!record)return item;
  const newerRecord=getNewerArmorSourceForItem(item);
  const sourceRows=newerRecord?getNewerArmorStatRows(newerRecord):[];
  const statRows=record.statRows.map(row=>{
    const sourceRow=sourceRows.find(entry=>entry.level===row.level);
    if(!sourceRow||sourceRow.stats.drawback===undefined)return row;
    return {...row,stats:{...row.stats,drawback:sourceRow.stats.drawback}};
  });
  return {...item,minLevel:record.minLevel,maxLevel:record.maxLevel,statRows};
}
function createNewerArmorItem(record,dragonGear=false){
  const type=dragonGear?record.type.replace(/^(?:Corrupted Dragon|Dragon) /,""):record.type;
  const category=NEWER_ARMOR_CATEGORY_BY_TYPE[type];
  return {
    id:`newer-${record.type}-${record.name}`.toLowerCase().replace(/[^a-z0-9]+/g,"-"),
    name:record.name,category,subType:type.replace(/^Magic /,""),minLevel:record.min_level??100,maxLevel:170,
    jewelSlots:record.jewels??0,essenceLocked:false,dragonGear,
    dragonCorrupted:record.type.startsWith("Corrupted Dragon "),dragonK:record.k,
    dragonColorType:record.type.startsWith("Corrupted Dragon ")?"Corrupted Dragon Color":"Dragon Color",
    statRows:getNewerArmorStatRows(record)
  };
}
function createArcaniumArcsphereItems(){
  const record=NEWER_ARMOR_RECORDS.find(entry=>entry.name==="Arcanium Arcsphere"&&entry.type==="Magic Accessory");
  if(!record)throw new Error("Missing Arcanium Arcsphere source record.");
  return MAGICS.map(magic=>{
    const magicRecord=NEWER_ARMOR_RECORDS.find(entry=>entry.type==="Magic"&&entry.name===magic);
    if(!magicRecord)throw new Error(`Missing Arcanium stat data for ${magic}.`);
    return {
      id:`arcanium-arcsphere-${magic.toLowerCase()}`,
      name:`${magic} Arcanium Arcsphere`,magicKey:magic,magicPiece:" Arcanium Arcsphere",
      category:"Accessory",subType:"Accessory",minLevel:record.min_level??100,maxLevel:170,
      jewelSlots:record.jewels??0,essenceLocked:false,
      statRows:getNewerArmorStatRows(record,null,magicRecord)
    };
  });
}
const UPDATED_CATALOG_ITEMS=[...BUILDER_ITEM_DATA,...BUILDER_MAGIC_GEAR_DATA,...BUILDER_FIGHTING_GEAR_DATA].map(item=>updateItemFromWiki(updateItemFromNewerArmor(item)));
const UPDATED_ITEM_KEYS=new Set(UPDATED_CATALOG_ITEMS.map(item=>`${item.name}::${item.category}`));
const ADDED_NEWER_ARMOR_ITEMS=NEWER_ARMOR_RECORDS.filter(record=>NEWER_ARMOR_CATEGORY_BY_TYPE[record.type])
  .filter(record=>record.name!=="Vatrachos Cloak")
  .filter(record=>!UPDATED_ITEM_KEYS.has(`${record.name}::${NEWER_ARMOR_CATEGORY_BY_TYPE[record.type]}`))
  .map(record=>updateItemFromWiki(createNewerArmorItem(record)));
const ADDED_ARCANIUM_ARCSPHERE_ITEMS=createArcaniumArcsphereItems()
  .filter(item=>!UPDATED_ITEM_KEYS.has(`${item.name}::${item.category}`))
  .map(item=>updateItemFromWiki(updateItemFromNewerArmor(item)));
const ADDED_DRAGON_ARMOR_ITEMS=NEWER_ARMOR_RECORDS.filter(record=>/^(?:Corrupted Dragon|Dragon) (?:Chestpiece|Leggings|Accessory|Helmet|Amulet)$/.test(record.type))
  .map(record=>updateItemFromWiki(createNewerArmorItem(record,true)));
const ITEMS = [...UPDATED_CATALOG_ITEMS,...ADDED_NEWER_ARMOR_ITEMS,...ADDED_ARCANIUM_ARCSPHERE_ITEMS,...ADDED_DRAGON_ARMOR_ITEMS].map(item=>{
  const latest=item.statRows.find(row=>row.level===item.maxLevel)||item.statRows[item.statRows.length-1];
  const magicPiece=(item.magicPiece||(item.magicKey?item.name.slice(item.magicKey.length):"")).trim();
  const category=ITEM_CATEGORY_BY_SUBTYPE[item.subType]||item.category;
  return {...item,magicPiece,category,type:CATEGORY_LABELS[category],level:latest.level,stats:{...latest.stats}};
});
function getDragonColorRecords(item){
  return item?.dragonGear?NEWER_ARMOR_RECORDS.filter(record=>record.type===item.dragonColorType):[];
}
function getDragonColorBonusStats(item,colorName){
  const color=getDragonColorRecords(item).find(record=>(record.name||"Base")===colorName);
  if(!color?.["armor-stats"])return {};
  const levelFactor=Math.floor((safeNumber(build.level)||175)/10);
  const isChest=item.subType==="Chestpiece";
  const isAmulet=item.subType==="Amulet";
  const defaultK=item.dragonCorrupted?(isChest||isAmulet?4:3):(isChest?2:isAmulet?3.75:1.5);
  const k=item.dragonK??defaultK;
  return Object.fromEntries(Object.entries(color["armor-stats"]).map(([key,value])=>[
    key,Math.floor(value*(NEWER_ARMOR_EP_VALUES[key]??1)*levelFactor*k)
  ]));
}
function replacesCorruptedDragonResistance(item,colorName){
  const color=getDragonColorRecords(item).find(record=>(record.name||"Base")===colorName);
  return Boolean(item?.dragonCorrupted&&color);
}
function getItemStatsAtLevel(item,level){
  const row=item.statRows.find(entry=>entry.level===level)||item.statRows[item.statRows.length-1];
  return {...row.stats};
}
function normalizeItemLevel(item,level){
  const maxLevel=Math.min(MAX_GAME_LEVEL,item.maxLevel??MAX_GAME_LEVEL);
  const minLevel=Math.min(maxLevel,item.minLevel??1);
  const requested=Math.max(minLevel,Math.min(maxLevel,safeNumber(level)||maxLevel));
  return item.statRows.reduce((closest,row)=>Math.abs(row.level-requested)<Math.abs(closest.level-requested)?row:closest,item.statRows[0]).level;
}
const SLOTS = [
  {id:"accessory1",label:"ACCESSORY 01",name:"Accessory 1",categories:["Accessory","Helmet","Amulet"]},
  {id:"accessory2",label:"ACCESSORY 02",name:"Accessory 2",categories:["Accessory","Helmet","Amulet"]},
  {id:"accessory3",label:"ACCESSORY 03",name:"Accessory 3",categories:["Accessory","Helmet","Amulet"]},
  {id:"chestplate",label:"CHESTPIECE",name:"Chestpiece",categories:["Chestplate"]},
  {id:"pants",label:"LEGGINGS",name:"Leggings",categories:["Boots"]}
];
const ACCESSORY_SLOT_IDS = ["accessory1","accessory2","accessory3"];
const starter = {
  name:"", level:175, dragonbloodTier:0, statBuild:"", magics:[], fightingStyles:[], gear:{
    accessory1:null,accessory2:null,accessory3:null,chestplate:null,pants:null
  }
};
const SAVED_GEAR_BUILDS_KEY="ao-gear-workshop-presets-v1";
let build = loadStoredBuild();
let savedGearBuilds = loadSavedGearBuilds();
const itemSearches = Object.fromEntries(SLOTS.map(slot=>[slot.id,""]));
const itemDropdownOpen = Object.fromEntries(SLOTS.map(slot=>[slot.id,false]));
const activeItemIndexes = Object.fromEntries(SLOTS.map(slot=>[slot.id,0]));
const pickerSearches = {};
const pickerDropdownOpen = {};
const activePickerIndexes = {};
const statFilters = new Set();
let saveTimer;
let toastTimer;

function blankGear(){return {name:"",level:175,stats:{},enchant:"",modifier:"",dragonColor:"",sockets:[]};}
function safeNumber(value){const n=Number(value);return Number.isFinite(n)?n:0;}
function clampGameLevel(value){return Math.max(1,Math.min(MAX_GAME_LEVEL,safeNumber(value)||MAX_GAME_LEVEL));}
function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function canUseModifier(gear,item){
  const isKnownModifier=MODIFIERS.some(([id])=>id===gear.modifier);
  const isEquipment=MODIFIER_GEAR_CATEGORIES.has(item?.category);
  const isAtlantean=gear.modifier==="atlantean";
  const isAtlanteanOnlyItem=item?.name==="Jewel Amulet";
  const isLostSet=item?.lostSet===true||/\blost\b/i.test(item?.name||"");
  const isGildedLostSet=gear.modifier==="gilded"&&isLostSet;
  const isArcaniumGear=/\barcanium\b/i.test(item?.name||"");
  const isArcaniumBracelet=isArcaniumGear&&/\bbracelet\b/i.test(item?.name||"");
  const isModifierLocked=item?.essenceLocked||isLostSet;
  const canUseRegularModifiers=!item?.dragonGear&&(item?.modifierAllowed!==false||(isArcaniumGear&&!isArcaniumBracelet));
  const canUse=gear.modifier===""||isAtlantean||(!isAtlanteanOnlyItem&&!isModifierLocked&&canUseRegularModifiers)||isGildedLostSet;
  return Boolean(item&&isEquipment&&canUse&&isKnownModifier&&!(isAtlantean&&gear.enchant==="virtuous"));
}
function sanitizeStatBuild(buildState){
  if(!STAT_BUILDS.some(([id])=>id===buildState.statBuild))buildState.statBuild="";
  const sanitizeChoices=(choices,available,count)=>{const selected=[];for(const choice of Array.isArray(choices)?choices:[])if(available.includes(choice)&&!selected.includes(choice)&&selected.length<count)selected.push(choice);return Array.from({length:count},(_,index)=>selected[index]||"");};
  buildState.magics=sanitizeChoices(buildState.magics,MAGICS,MAGIC_BUILDS[buildState.statBuild]||0);
  buildState.fightingStyles=sanitizeChoices(buildState.fightingStyles,FIGHTING_STYLES,FIGHTING_BUILDS[buildState.statBuild]||0);
  for(const slot of SLOTS){
    const gear=buildState.gear?.[slot.id];
    const item=ITEMS.find(entry=>entry.name===gear?.name);
    let replacement;
    if(item?.magicKey&&!buildState.magics.includes(item.magicKey)){
      const magic=buildState.magics[0];
      replacement=magic&&ITEMS.find(entry=>entry.magicKey===magic&&entry.magicPiece===item.magicPiece);
    }else if(item?.fightingStyle&&!buildState.fightingStyles.includes(item.fightingStyle)){
      const style=buildState.fightingStyles[0];
      replacement=style&&ITEMS.find(entry=>entry.fightingStyle===style&&entry.fightingPiece===item.fightingPiece);
    }else continue;
    if(!replacement){buildState.gear[slot.id]=null;continue;}
    gear.name=replacement.name;
    gear.level=normalizeItemLevel(replacement,gear.level);
    gear.stats=getItemStatsAtLevel(replacement,gear.level);
  }
}
function sanitizeGearModifiers(gearState){
  for(const slot of SLOTS){
    const gear=gearState[slot.id];
    if(!gear)continue;
    const item=ITEMS.find(entry=>entry.name===gear.name);
    if(item){
      gear.level=normalizeItemLevel(item,gear.level);
      gear.stats=getItemStatsAtLevel(item,gear.level);
    }else{
      gear.level=Math.max(1,Math.min(MAX_GAME_LEVEL,safeNumber(gear.level)||170));
    }
    gear.enchant=ENCHANT_UPGRADES[gear.enchant]||gear.enchant;
    if(!canUseModifier(gear,item))gear.modifier="";
    const colorNames=getDragonColorRecords(item).map(color=>color.name||"Base");
    if(!item?.dragonGear||!colorNames.includes(gear.dragonColor))gear.dragonColor="";
    const sockets=(gear.sockets||[]);
    gear.sockets=sockets.slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0));
    for(const socket of gear.sockets){
      for(const key of ["gem","fusionGem"]){
        const selected=GEMS.find(gem=>gem.id===socket[key]||gem.name===socket[key]);
        socket[key]=selected?.id||"";
      }
      if(!socket.gem)socket.fusionGem="";
      delete socket.reagent;
      delete socket.reagentStat;
      delete socket.reagentAmount;
      delete socket.stat;
      delete socket.amount;
      delete socket.quality;
      delete socket.fusionQuality;
    }
  }
}
function getGemStats(socket,key){
  if(key==="fusionGem"&&!socket?.gem)return {};
  const gem=GEMS.find(entry=>entry.id===socket?.[key]);
  return gem?.stats[5]||{};
}
function getGemFusionStats(gemId){
  const gem=GEMS.find(entry=>entry.id===gemId);
  return {...gem?.stats[5],...gem?.fusionStats};
}
function roundGemStats(stats){
  return Object.fromEntries(Object.entries(stats).map(([key,value])=>[key,Math.round(value*10)/10]));
}
function getCombinedGemStats(socket){
  if(!socket?.gem)return {};
  const primaryBase=getGemStats(socket,"gem");
  if(socket.gem==="double-effect"||socket.fusionGem==="double-effect"){
    const activeGemId=socket.gem==="double-effect"?socket.fusionGem:socket.gem;
    return roundGemStats(getGemStats({gem:activeGemId},"gem"));
  }
  if(!socket.fusionGem)return roundGemStats(primaryBase);
  const fusionBase=getGemStats(socket,"fusionGem");
  if(!Object.keys(fusionBase).length)return roundGemStats(primaryBase);
  const primary=getGemFusionStats(socket.gem);
  const fusion=getGemFusionStats(socket.fusionGem);
  const powerSubstatFusion=POWER_SUBSTAT_GEM_IDS.has(socket.gem)&&POWER_SUBSTAT_GEM_IDS.has(socket.fusionGem);
  const combined={};
  for(const key of STAT_KEYS){
    const baseValue = primary[key] || 0;
    const fusionValue = fusion[key] || 0;
    if(powerSubstatFusion&&key==="power"){
      combined[key]=Math.round((baseValue+fusionValue)*0.6*10)/10;
      continue;
    }
    if(powerSubstatFusion&&["size","dexterity","range"].includes(key)){
      combined[key]=Math.round((baseValue+fusionValue)*0.75*10)/10;
      continue;
    }
    const multiplier = GEM_FUSION_MULTIPLIERS[key] ?? GEM_FUSION_RATIO;
    if(key==="drawback"){
      combined[key]=(baseValue+fusionValue)*multiplier;
      continue;
    }
    const delta=key==="power"?0.5:key==="defense"&&[socket.gem,socket.fusionGem].some(id=>GEM_DEFENSE_DELTA_IDS.has(id))?GEM_DEFENSE_DELTA:0;
    combined[key]=Math.floor(baseValue*multiplier+delta)+Math.floor(fusionValue*multiplier+delta);
  }
  return combined;
}
function getEnchantBonusStats(gear,enchant){
  const scale=(safeNumber(gear.level)||1)/10*(safeNumber(gear.enchantFactor)||1);
  const stats={};
  for(const [key,value]of Object.entries(ENCHANT_STATS[enchant]||{}))stats[key]=value*scale;
  for(const [key,value]of Object.entries(ENCHANT_FLAT_STATS[enchant]||{}))stats[key]=(stats[key]||0)+value;
  return stats;
}
function getAtlanteanBonusStat(gear,item){
  const scale=(safeNumber(gear.level)||1)/10;
  const present=new Set(Object.entries(gear.stats||{}).filter(([,value])=>safeNumber(value)!==0).map(([key])=>key));
  for(const [key,value]of Object.entries(ENCHANT_STATS[gear.enchant]||{}))if(value*scale!==0)present.add(key);
  for(const [key,value]of Object.entries(ENCHANT_FLAT_STATS[gear.enchant]||{}))if(value!==0)present.add(key);
  for(const socket of (gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0))){
    for(const [key,value]of Object.entries(getCombinedGemStats(socket)))if(safeNumber(value)!==0)present.add(key);
  }
  return ATLANTEAN_STATS.find(([key])=>!present.has(key))||ATLANTEAN_STATS[0];
}
function getModifierBonusStats(gear,item,modifier=gear.modifier){
  const stats={};
  const modifierScale=(safeNumber(gear.level)||1)/10;
  for(const [key,value]of Object.entries(MODIFIER_STATS[modifier]||{}))stats[key]=value*modifierScale;
  let atlanteanKey="";
  if(modifier==="atlantean"){
    stats.insanity=(stats.insanity||0)+1;
    const [key,value]=getAtlanteanBonusStat({...gear,modifier},item);
    stats[key]=(stats[key]||0)+value*modifierScale;
    atlanteanKey=key;
  }
  if(modifier==="imbued"){
    const baseKeys=Object.keys(gear.stats||{}).filter(key=>safeNumber(gear.stats[key])>0&&key!=="warding"&&key!=="insanity"&&key!=="drawback");
    for(const key of new Set(baseKeys))stats[key]=(stats[key]||0)+(key==="power"?.23625:key==="defense"?2.2353:.7059)*modifierScale;
  }
  return {stats,atlanteanKey};
}
function getGearTotalStats(gear){
  const total=Object.fromEntries(STAT_KEYS.map(key=>[key,0]));
  const item=ITEMS.find(entry=>entry.name===gear.name);
  const replacesResistance=replacesCorruptedDragonResistance(item,gear.dragonColor);
  for(const [key,value]of Object.entries(gear.stats||{}))if(key in total&&!(key==="resistance"&&replacesResistance))total[key]+=safeNumber(value);
  if(item?.dragonGear&&gear.dragonColor)for(const [key,value]of Object.entries(getDragonColorBonusStats(item,gear.dragonColor)))if(key in total)total[key]+=value;
  for(const [key,value]of Object.entries(getEnchantBonusStats(gear,gear.enchant)))total[key]+=value;
  const modifier=gear.modifier;
  for(const [key,value]of Object.entries(getModifierBonusStats(gear,item).stats))total[key]+=value;
  for(const socket of (gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(modifier==="gilded"?1:0))){
    for(const [key,value]of Object.entries(getCombinedGemStats(socket)))if(key in total)total[key]+=value;
  }
  return total;
}
function getEfficiencyPoints(stats){
  return (stats.power||0)*3+(stats.defense||0)/3
    +["range","haste","size","dexterity","regeneration","pierce","resistance","warding","drawback","insanity"]
      .reduce((sum,key)=>sum+(stats[key]||0),0);
}
function formatEfficiencyPoints(value){
  const rounded=Math.round(value*10)/10;
  return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1);
}
function formatGearStats(stats,atlanteanKey=""){
  return Object.entries(stats).filter(([,value])=>Math.abs(value)>1e-9).map(([key,value])=>{
    const stat=renderStatValue(key,value);
    return key===atlanteanKey?`<span class="atlantean-stat" title="Atlantean bonus">${stat}</span>`:stat;
  }).join(" · ")||"No stats";
}
function accessoryConflict(item,other){
  if(item.name===other.name)return `You can only equip one ${item.name}.`;
  if(item.magicKey&&other.magicKey&&item.magicPiece===other.magicPiece)return `Only one ${item.magicPiece} can be equipped at a time.`;
  if(item.fightingStyle&&other.fightingStyle&&item.fightingPiece===other.fightingPiece)return `Only one ${item.fightingPiece.replace("Fighting ","").toLowerCase()} can be equipped at a time.`;
  if(item.category==="Helmet"&&other.category==="Helmet")return "Only one helmet can be equipped at a time.";
  if(item.category==="Amulet"&&other.category==="Amulet")return "Only one amulet can be equipped at a time.";
  return "";
}
function accessoryConflictForSlot(slotId,item,gearState=build.gear){
  if(!ACCESSORY_SLOT_IDS.includes(slotId))return "";
  for(const otherSlotId of ACCESSORY_SLOT_IDS){
    if(otherSlotId===slotId)continue;
    const other=ITEMS.find(entry=>entry.name===gearState[otherSlotId]?.name);
    if(other){const conflict=accessoryConflict(item,other);if(conflict)return conflict;}
  }
  return "";
}
function validateAccessoryLoadout(gearState){
  const equipped=[];
  for(const slotId of ACCESSORY_SLOT_IDS){
    const item=ITEMS.find(entry=>entry.name===gearState[slotId]?.name);
    if(!item)continue;
    const conflict=equipped.map(other=>accessoryConflict(item,other)).find(Boolean);
    if(conflict)return conflict;
    equipped.push(item);
  }
  return "";
}
function loadStoredBuild(){
  try{
    const saved=JSON.parse(localStorage.getItem("ao-gear-workshop-v1"));
    if(saved&&saved.gear&&typeof saved.gear==="object"){
      const result={...starter,...saved,gear:{...starter.gear,...saved.gear}};
      result.level=clampGameLevel(result.level);
      result.dragonbloodTier=Math.max(0,Math.min(7,Math.floor(safeNumber(result.dragonbloodTier))));
      sanitizeStatBuild(result);
      for(const slot of SLOTS){const gear=result.gear[slot.id];if(gear&&!ITEMS.some(item=>item.name===gear.name&&slot.categories.includes(item.category)))result.gear[slot.id]=null;}
      for(let index=0;index<ACCESSORY_SLOT_IDS.length;index++){
        const slotId=ACCESSORY_SLOT_IDS[index];
        const item=ITEMS.find(entry=>entry.name===result.gear[slotId]?.name);
        const earlierAccessories=ACCESSORY_SLOT_IDS.slice(0,index).map(id=>ITEMS.find(entry=>entry.name===result.gear[id]?.name)).filter(Boolean);
        if(item&&earlierAccessories.some(other=>accessoryConflict(item,other)))result.gear[slotId]=null;
      }
      sanitizeGearModifiers(result.gear);
      return result;
    }
  }catch(error){console.warn("Could not read the saved build.",error);}
  return structuredClone(starter);
}
function persist(){clearTimeout(saveTimer);document.getElementById("save-state").textContent="Saving…";saveTimer=setTimeout(()=>{try{localStorage.setItem("ao-gear-workshop-v1",JSON.stringify(build));document.getElementById("save-state").textContent="Changes save locally";}catch(error){document.getElementById("save-state").textContent="Could not save locally";console.error(error);}},180);}
function loadSavedGearBuilds(){
  try{
    const saved=JSON.parse(localStorage.getItem(SAVED_GEAR_BUILDS_KEY));
    return Array.isArray(saved)?saved.filter(entry=>entry&&typeof entry.name==="string"&&entry.build&&typeof entry.build==="object"):[];
  }catch(error){console.warn("Could not read saved gear sets.",error);return [];}
}
function renderSavedGearBuilds(selectedName=""){
  const select=document.getElementById("saved-build-select");
  const sorted=[...savedGearBuilds].sort((a,b)=>a.name.localeCompare(b.name));
  select.innerHTML=`<option value="">${sorted.length?"Choose a saved gear set":"No saved sets"}</option>${sorted.map(entry=>`<option value="${esc(entry.name)}">${esc(entry.name)}</option>`).join("")}`;
  select.value=sorted.some(entry=>entry.name===selectedName)?selectedName:"";
  syncSavedGearBuildButtons();
}
function syncSavedGearBuildButtons(){
  const disabled=!document.getElementById("saved-build-select").value;
  for(const id of ["load-named-build","update-named-build","delete-named-build"])document.getElementById(id).disabled=disabled;
}
function saveNamedGearBuild(){
  const name=String(build.name||"").trim();
  if(!name){document.getElementById("build-name").focus();showToast("Enter a build name before saving.");return;}
  const existingIndex=savedGearBuilds.findIndex(entry=>entry.name.toLowerCase()===name.toLowerCase());
  const savedSet={name,build:{...structuredClone(build),name}};
  if(existingIndex<0)savedGearBuilds.push(savedSet);
  else savedGearBuilds[existingIndex]=savedSet;
  try{
    localStorage.setItem(SAVED_GEAR_BUILDS_KEY,JSON.stringify(savedGearBuilds));
    renderSavedGearBuilds(name);
    showToast(existingIndex<0?"Gear set saved.":"Saved gear set updated.");
  }catch(error){console.error("Could not save this gear set.",error);showToast("Could not save this gear set locally.");}
}
function updateSavedGearBuild(){
  const selectedName=document.getElementById("saved-build-select").value;
  const selectedIndex=savedGearBuilds.findIndex(entry=>entry.name===selectedName);
  if(selectedIndex<0)return;
  const updated=[...savedGearBuilds];
  const selectedSet=updated[selectedIndex];
  updated[selectedIndex]={...selectedSet,build:{...structuredClone(build),name:selectedSet.name}};
  try{
    localStorage.setItem(SAVED_GEAR_BUILDS_KEY,JSON.stringify(updated));
    savedGearBuilds=updated;
    renderSavedGearBuilds(selectedSet.name);
    showToast("Saved gear set updated.");
  }catch(error){console.error("Could not update the saved gear set.",error);showToast("Could not update this gear set locally.");}
}
function deleteSavedGearBuild(){
  const selectedName=document.getElementById("saved-build-select").value;
  const selectedIndex=savedGearBuilds.findIndex(entry=>entry.name===selectedName);
  if(selectedIndex<0)return;
  if(!confirm(`Delete the saved gear set "${selectedName}"?`))return;
  const remaining=savedGearBuilds.filter((_,index)=>index!==selectedIndex);
  try{
    localStorage.setItem(SAVED_GEAR_BUILDS_KEY,JSON.stringify(remaining));
    savedGearBuilds=remaining;
    renderSavedGearBuilds();
    showToast("Saved gear set deleted.");
  }catch(error){console.error("Could not delete the saved gear set.",error);showToast("Could not delete this gear set locally.");}
}
function formatStat(value){const rounded=Math.round(value*10)/10;return `${rounded>0?"+":""}${Number.isInteger(rounded)?rounded:rounded.toFixed(1)}`;}
function renderStatIcon(key,{decorative=false}={}){
  const label=STAT_LABELS[key]||key;
  const source=STAT_ICON_URLS[key];
  return source?`<img class="stat-icon" src="${source}" alt="${decorative?"":esc(label)}" title="${esc(label)}" loading="lazy">`:`<span class="stat-icon-fallback"${decorative?' aria-hidden="true"':` role="img" aria-label="${esc(label)}"`} title="${esc(label)}">${esc(label.slice(0,2).toUpperCase())}</span>`;
}
function renderStatValue(key,value){return `<span class="stat-value">${renderStatIcon(key)}<b>${formatStat(value)}</b></span>`;}
function options(items,selected){return items.map(([value,label])=>`<option value="${esc(value)}"${value===selected?" selected":""}>${esc(label)}</option>`).join("");}
function renderStatFilters(){return STAT_KEYS.map(key=>`<label class="filter-chip" title="${esc(STAT_LABELS[key])}"><input type="checkbox" data-filter-stat="${key}"${statFilters.has(key)?" checked":""}>${renderStatIcon(key,{decorative:true})}<span class="visually-hidden">${esc(STAT_LABELS[key])}</span></label>`).join("");}
function pickerKey(slotId,kind,index=""){return index===""?`${slotId}:${kind}`:`${slotId}:${kind}:${index}`;}
function getPickerBaseChoices(slotId,kind,index=""){
  const gear=build.gear[slotId];
  const item=ITEMS.find(entry=>entry.name===gear?.name);
  if(!gear)return [];
  if(kind==="dragonColor"&&item?.dragonGear)return [
    {value:"",label:"No color"},
    ...getDragonColorRecords(item).map(color=>({value:color.name||"Base",label:color.name||"Base"}))
  ];
  if(kind==="enchant")return ENCHANTS.map(([value,label])=>({value,label}));
  if(kind==="modifier")return MODIFIERS.filter(([value])=>canUseModifier({...gear,modifier:value},item)).map(([value,label])=>({value,label}));
  if(kind==="fusionGem"&&!gear.sockets?.[Number(index)]?.gem)return [];
  if(kind==="gem"||kind==="fusionGem")return GEMS.map(gem=>({value:gem.id,label:[gem.name,...(gem.variants||[])].join(" / ")}));
  return [];
}
function getPickerPreview(slotId,kind,index,value){
  const gear=build.gear[slotId];
  const item=ITEMS.find(entry=>entry.name===gear?.name);
  if(!gear)return {stats:{}};
  if(kind==="dragonColor")return {stats:getDragonColorBonusStats(item,value)};
  if(kind==="enchant")return {stats:getEnchantBonusStats(gear,value)};
  if(kind==="modifier")return getModifierBonusStats(gear,item,value);
  const socket={...(gear.sockets?.[Number(index)]||{}),[kind]:value};
  return {stats:getCombinedGemStats(socket)};
}
function getPickerCandidates(slotId,kind,index="",query=""){
  const search=query.trim().toLowerCase();
  return getPickerBaseChoices(slotId,kind,index).filter(choice=>{
    const preview=getPickerPreview(slotId,kind,index,choice.value);
    return [...statFilters].every(key=>safeNumber(preview.stats[key])!==0)
      &&(!search||choice.label.toLowerCase().includes(search));
  }).map(choice=>({...choice,preview:getPickerPreview(slotId,kind,index,choice.value)}));
}
function renderPickerPreview(stats,title,atlanteanKey="",emptyText="",key="",hasSelection=false){
  const formatted=Object.keys(stats).length?formatGearStats(stats,atlanteanKey):"No stats";
  const values=formatted!=="No stats"?formatted:`<span class="option-preview-empty">${esc(hasSelection?"No stat bonus.":emptyText)}</span>`;
  const atlanteanNote=atlanteanKey?`<span class="option-preview-note">ATLANTEAN · ${esc((STAT_LABELS[atlanteanKey]||atlanteanKey).toUpperCase())}</span>`:"";
  return `<div class="option-preview" data-picker-preview="${key}"><span class="option-preview-label">${esc(title)}</span>${atlanteanNote}<div class="option-preview-stats">${values}</div></div>`;
}
function renderPickerInput({slotId,kind,index="",label,placeholder,selectedValue="",previewStats={},previewTitle="",previewAtlanteanKey="",previewEmptyText="",disabled=false}){
  const key=pickerKey(slotId,kind,index);
  const pickerType=kind==="gem"?" primary-gem-picker":kind==="fusionGem"?" combined-gem-picker":"";
  const choices=getPickerBaseChoices(slotId,kind,index);
  const selectedLabel=choices.find(choice=>choice.value===selectedValue)?.label||"";
  const id=`${slotId}-${kind}${index===""?"":`-${index}`}-search`;
  const count=getPickerCandidates(slotId,kind,index).length;
  return `<div class="field option-picker${pickerType}" data-option-picker="${key}"><label for="${id}">${esc(label)} <span class="item-count" data-picker-count="${key}">${count} / ${choices.length}</span></label><div class="item-search-wrap"><input id="${id}" class="item-search" type="search" data-picker-search="${key}" data-picker-slot="${slotId}" data-picker-kind="${kind}" data-picker-index="${index}" value="${esc(pickerSearches[key]||"")}" placeholder="${esc(selectedLabel||placeholder)}" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="${id}-results" aria-expanded="${Boolean(pickerDropdownOpen[key])}" aria-label="Search ${esc(label.toLowerCase())}"${disabled?" disabled":""}><span class="search-icon" aria-hidden="true">⌕</span><div class="item-results" id="${id}-results" data-picker-results="${key}" role="listbox" hidden></div></div>${previewTitle?renderPickerPreview(previewStats,previewTitle,previewAtlanteanKey,previewEmptyText,key,Boolean(selectedValue)):""}</div>`;
}
function renderPickerResults(slotId,kind,index=""){
  const key=pickerKey(slotId,kind,index);
  const results=document.querySelector(`[data-picker-results="${key}"]`);
  if(!results)return;
  const search=pickerSearches[key]||"";
  const candidates=getPickerCandidates(slotId,kind,index,search);
  const current=kind==="gem"||kind==="fusionGem"
    ?build.gear[slotId]?.sockets?.[Number(index)]?.[kind]||""
    :build.gear[slotId]?.[kind]||"";
  const controls=[];
  if(!search&&!statFilters.size&&current)controls.push(`<button id="${key.replace(/:/g,"-")}-clear" class="item-result item-result-clear" type="button" role="option" aria-selected="false" data-select-picker data-picker-slot="${slotId}" data-picker-kind="${kind}" data-picker-index="${index}" data-picker-value="">× <span>Clear selection</span></button>`);
  for(const [candidateIndex,candidate]of candidates.entries()){
    const selected=current===candidate.value;
    const note=candidate.preview.atlanteanKey?`<span class="option-result-note">Adds ${esc(STAT_LABELS[candidate.preview.atlanteanKey]||candidate.preview.atlanteanKey)}</span>`:"";
    controls.push(`<button id="${key.replace(/:/g,"-")}-result-${candidateIndex}" class="item-result${selected?" is-equipped":""}" type="button" role="option" aria-selected="${selected}" data-select-picker data-picker-slot="${slotId}" data-picker-kind="${kind}" data-picker-index="${index}" data-picker-value="${esc(candidate.value)}"><span class="item-result-main"><span class="item-result-name">${esc(candidate.label)}${selected?'<span class="equipped-tag">SELECTED</span>':""}</span><span class="item-result-stats">${formatGearStats(candidate.preview.stats,candidate.preview.atlanteanKey)}</span>${note}</span></button>`);
  }
  results.innerHTML=controls.length?controls.join(""):`<div class="item-no-results">${search?"No matching options.":"No options match the selected stat filters."}</div>`;
  results.hidden=!pickerDropdownOpen[key];
  const count=document.querySelector(`[data-picker-count="${key}"]`);
  const total=getPickerBaseChoices(slotId,kind,index).filter(choice=>{
    const preview=getPickerPreview(slotId,kind,index,choice.value);
    return [...statFilters].every(stat=>safeNumber(preview.stats[stat])!==0);
  }).length;
  if(count)count.textContent=`${getPickerCandidates(slotId,kind,index,search).length} / ${total}`;
  const input=document.querySelector(`[data-picker-search="${key}"]`);
  input?.setAttribute("aria-expanded",String(pickerDropdownOpen[key]));
  const active=Math.min(activePickerIndexes[key]||0,controls.length-1);
  results.querySelectorAll(".item-result").forEach((button,buttonIndex)=>button.classList.toggle("is-active",buttonIndex===active));
  const activeButton=results.querySelectorAll(".item-result")[active];
  if(pickerDropdownOpen[key]&&activeButton?.id)input?.setAttribute("aria-activedescendant",activeButton.id);
  else input?.removeAttribute("aria-activedescendant");
}
function renderGearPickers(slotId){
  const gear=build.gear[slotId];
  if(!gear){resetSlotPickerState(slotId);return;}
  renderPickerResults(slotId,"enchant");
  if(ITEMS.some(entry=>entry.name===gear.name))renderPickerResults(slotId,"modifier");
  if(ITEMS.find(entry=>entry.name===gear.name)?.dragonGear)renderPickerResults(slotId,"dragonColor");
  for(const [index]of (gear.sockets||[]).entries()){
    renderPickerResults(slotId,"gem",index);
    renderPickerResults(slotId,"fusionGem",index);
  }
}
function refreshPickerPreviews(slotId){
  const gear=build.gear[slotId];
  if(!gear)return;
  const replacePreview=(kind,index,title,preview,emptyText="")=>{
    const key=pickerKey(slotId,kind,index);
    const element=document.querySelector(`[data-picker-preview="${key}"]`);
    const selected=kind==="gem"||kind==="fusionGem"?gear.sockets?.[Number(index)]?.[kind]:gear[kind];
    if(element)element.outerHTML=renderPickerPreview(preview.stats,title,preview.atlanteanKey||"",emptyText,key,Boolean(selected));
  };
  replacePreview("enchant","","ENCHANT",getPickerPreview(slotId,"enchant","",gear.enchant||""),"Choose an enchant.");
  replacePreview("modifier","","MODIFIER",getPickerPreview(slotId,"modifier","",gear.modifier||""),"Choose a modifier.");
  replacePreview("dragonColor","","DRAGON COLOR",getPickerPreview(slotId,"dragonColor","",gear.dragonColor||""),"Choose a color.");
  for(const [index,socket]of (gear.sockets||[]).entries()){
    replacePreview("gem",index,"SOCKET TOTAL",{stats:socket.gem?getCombinedGemStats(socket):{}},"Select a gem to preview.");
  }
  renderGearPickers(slotId);
}
function resetPickerState(key){
  delete pickerSearches[key];
  delete pickerDropdownOpen[key];
  delete activePickerIndexes[key];
}
function resetSlotPickerState(slotId){
  for(const key of Object.keys(pickerSearches))if(key.startsWith(`${slotId}:`))resetPickerState(key);
  for(const key of Object.keys(pickerDropdownOpen))if(key.startsWith(`${slotId}:`))resetPickerState(key);
  for(const key of Object.keys(activePickerIndexes))if(key.startsWith(`${slotId}:`))resetPickerState(key);
}
function getAvailableItemsForSlot(slot){
  return ITEMS.filter(item=>slot.categories.includes(item.category)
    &&(!item.magicKey||build.magics.includes(item.magicKey))
    &&(!item.fightingStyle||build.fightingStyles.includes(item.fightingStyle)));
}
function getFilteredItems(slot,query=""){
  const search=query.trim().toLowerCase();
  return getAvailableItemsForSlot(slot).filter(item=>{
    const arcsphereAlias=item.magicPiece?.trim()==="Arcanium Arcsphere"
      ?item.name.replace("Arcsphere","Archsphere").toLowerCase():"";
    return !accessoryConflictForSlot(slot.id,item)
      &&[...statFilters].every(key=>safeNumber(item.stats[key])!==0)
      &&(!search||item.name.toLowerCase().includes(search)||arcsphereAlias.includes(search));
  });
}
function renderItemResults(slotId){
  const slot=SLOTS.find(entry=>entry.id===slotId);
  if(!slot)return;
  const results=document.querySelector(`[data-item-results="${slotId}"]`);
  const count=document.querySelector(`[data-item-count="${slotId}"]`);
  if(!results)return;
  const filtered=getFilteredItems(slot,itemSearches[slotId]);
  const controls=[];
  if(!itemSearches[slotId]&&!statFilters.size&&build.gear[slotId])controls.push(`<button class="item-result item-result-clear" type="button" role="option" aria-selected="false" data-select-item="${slotId}" data-item-name="">× <span>Clear ${slot.name}</span></button>`);
  for(const [index,item] of filtered.entries()){
    const stats=Object.entries(item.stats).filter(([key])=>STAT_KEYS.includes(key)).map(([key,value])=>renderStatValue(key,value)).join(" ");
    const selected=build.gear[slotId]?.name===item.name;
    controls.push(`<button id="${slotId}-result-${index}" class="item-result${selected?" is-equipped":""}" type="button" role="option" aria-selected="${selected}" data-select-item="${slotId}" data-item-name="${esc(item.name)}"><span class="item-result-main"><span class="item-result-name">${esc(item.name)}${selected?'<span class="equipped-tag">EQUIPPED</span>':""}</span><span class="item-result-stats">${stats||"No base stats listed"}</span></span><span class="item-result-type">${esc(item.type)}</span></button>`);
  }
  results.innerHTML=controls.length?controls.join(""):`<div class="item-no-results">${itemSearches[slotId]?"No matching items.":"No items match the selected stat filters."}</div>`;
  results.hidden=!itemDropdownOpen[slotId];
  if(count)count.textContent=`${filtered.length} / ${getAvailableItemsForSlot(slot).length}`;
  const search=document.querySelector(`[data-item-search="${slotId}"]`);
  search?.setAttribute("aria-expanded",String(itemDropdownOpen[slotId]));
  const active=Math.min(activeItemIndexes[slotId],filtered.length-1);
  results.querySelectorAll(".item-result").forEach((button,index)=>button.classList.toggle("is-active",index===active));
  if(itemDropdownOpen[slotId]&&active>=0)search?.setAttribute("aria-activedescendant",`${slotId}-result-${active}`);
  else search?.removeAttribute("aria-activedescendant");
}
function renderCard(slot){
  const gear=build.gear[slot.id];
  const selectedItem=ITEMS.find(item=>item.name===gear?.name);
  const slotItems=getAvailableItemsForSlot(slot);
  const searchPlaceholder=gear?.name||"Search "+slot.name.toLowerCase()+"…";
  const itemPicker=`<div class="field item-picker"><label for="${slot.id}-search">ITEM <span class="item-count" data-item-count="${slot.id}">${slotItems.length} ITEMS</span></label><div class="item-search-wrap"><input id="${slot.id}-search" class="item-search" type="search" data-item-search="${slot.id}" value="${esc(itemSearches[slot.id])}" placeholder="${esc(searchPlaceholder)}" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="${slot.id}-results" aria-expanded="${itemDropdownOpen[slot.id]}" aria-label="Search ${esc(slot.name)} items"><span class="search-icon" aria-hidden="true">⌕</span><div class="item-results" id="${slot.id}-results" data-item-results="${slot.id}" role="listbox" hidden></div></div></div>`;
  const clearButton=`<button class="clear-slot-button" type="button" data-clear-slot="${slot.id}"${gear?"":" disabled"} aria-label="Clear ${esc(slot.name)}">Clear</button>`;
  if(!gear) return `<article class="gear-card"><div class="gear-card-header"><div><span class="slot-label">${slot.label}</span><h3>Empty slot</h3></div>${clearButton}</div><div class="gear-fields">${itemPicker}</div><div class="gear-snapshot"><span>No item selected</span></div></article>`;
  const jewelSlots=(selectedItem?.jewelSlots||0)+(gear.modifier==="gilded"?1:0);
  const sockets=Array.from({length:jewelSlots},(_,i)=>renderSocket(slot.id,i,gear.sockets?.[i])).join("");
  const socketSection=sockets?`<div class="socket-block"><div class="socket-block-head"><span class="socket-title">JEWEL SOCKETS</span><span class="socket-subtitle">${jewelSlots} SOCKETS</span></div>${sockets}</div>`:"";
  const modifierDescription=MODIFIER_DESCRIPTIONS[gear.modifier];
  const modifierHelp=modifierDescription||(gear.enchant==="virtuous"?"Virtuous removes Atlantean; Atlantean cannot be applied while Virtuous is selected.":"");
  const modifierPreview=getModifierBonusStats(gear,selectedItem);
  const modifierControl=selectedItem?`<div class="modifier-picker-group">${renderPickerInput({slotId:slot.id,kind:"modifier",label:"MODIFIER",placeholder:"Search modifiers…",selectedValue:gear.modifier||"",previewStats:modifierPreview.stats,previewTitle:"MODIFIER",previewAtlanteanKey:modifierPreview.atlanteanKey,previewEmptyText:"Choose a modifier."})}${modifierHelp?`<span class="modifier-note">${esc(modifierHelp)}</span>`:""}</div>`:"";
  const dragonColorPreview=getPickerPreview(slot.id,"dragonColor","",gear.dragonColor||"");
  const dragonColorControl=selectedItem?.dragonGear?renderPickerInput({slotId:slot.id,kind:"dragonColor",label:"DRAGON COLOR",placeholder:"Search dragon colors…",selectedValue:gear.dragonColor||"",previewStats:dragonColorPreview.stats,previewTitle:"DRAGON COLOR",previewEmptyText:"Choose a color."}):"";
  const baseStats=Object.entries(gear.stats||{}).filter(([key])=>STAT_KEYS.includes(key)&&!(key==="resistance"&&replacesCorruptedDragonResistance(selectedItem,gear.dragonColor))).map(([key,value])=>renderStatValue(key,value)).join(" ")||"No base stats listed";
  const totalStats=getGearTotalStats(gear);
  const atlanteanKey=gear.modifier==="atlantean"?getAtlanteanBonusStat(gear,selectedItem)[0]:"";
  const totalStatText=formatGearStats(totalStats,atlanteanKey);
  const itemEfficiency=formatEfficiencyPoints(getEfficiencyPoints(totalStats));
  const screenshotDetails=getScreenshotDetails(gear);
  const screenshotSummary=`<div class="gear-snapshot" data-screenshot-summary="${slot.id}"><div class="gear-snapshot-stats">${formatGearStats(totalStats,atlanteanKey)}</div><div class="gear-snapshot-details"${screenshotDetails?"":" hidden"}>${esc(screenshotDetails)}</div><div class="gear-snapshot-efficiency">${itemEfficiency} EP</div></div>`;
  const maxLevel=Math.min(MAX_GAME_LEVEL,selectedItem?.maxLevel??MAX_GAME_LEVEL);
  const minLevel=Math.min(maxLevel,selectedItem?.minLevel??1);
    const enchantPreview=getPickerPreview(slot.id,"enchant","",gear.enchant||"");
    const enchantControl=renderPickerInput({slotId:slot.id,kind:"enchant",label:"ENCHANT",placeholder:"Search enchants…",selectedValue:gear.enchant||"",previewStats:enchantPreview.stats,previewTitle:"ENCHANT",previewEmptyText:"Choose an enchant."});
    return `<article class="gear-card"><div class="gear-card-header"><div><span class="slot-label">${slot.label}</span><h3>${esc(gear.name||"Unnamed gear")}</h3><span class="item-type">${esc(selectedItem?.type||"Custom item")} · Lv ${safeNumber(gear.level)||1}</span></div>${clearButton}</div><div class="gear-fields">${itemPicker}${dragonColorControl}<div class="field item-level"><label>ITEM LEVEL</label><input data-slot="${slot.id}" data-prop="level" type="number" min="${minLevel}" max="${maxLevel}" step="10" value="${safeNumber(gear.level)||1}" aria-label="${slot.name} level"></div><div class="base-stat-readout">${baseStats}</div><div class="item-total-readout" data-item-total="${slot.id}"><span class="item-total-label">TOTAL ITEM STATS</span><span class="item-total-stats">${esc(totalStatText)}</span><span class="item-efficiency">EFFICIENCY POINTS <b>${itemEfficiency}</b></span></div><div class="enhancement">${enchantControl}${modifierControl}</div>${socketSection}</div>${screenshotSummary}</article>`;
}
function renderSocket(slotId,index,socket={}){
  const combinedStats=socket.gem?getCombinedGemStats(socket):{};
  return `<div class="socket">${renderPickerInput({slotId,kind:"gem",index,label:"PRIMARY GEM",placeholder:"Search…",selectedValue:socket.gem||"",previewStats:combinedStats,previewTitle:socket.gem?"SOCKET TOTAL":"",previewEmptyText:"Select a gem to preview."})}${renderPickerInput({slotId,kind:"fusionGem",index,label:"COMBINED GEM",placeholder:"Search…",selectedValue:socket.fusionGem||"",disabled:!socket.gem})}</div>`;
}
function render(){
  document.getElementById("build-name").value=build.name||"";
  document.getElementById("player-level").value=build.level||175;
  document.getElementById("stat-build").value=STAT_BUILDS.some(([id])=>id===build.statBuild)?build.statBuild:"";
  updateStatBuildDescription();
  renderMagicSelectors();
  renderFightingStyleSelectors();
  document.getElementById("dragonblood-ritual").innerHTML=options(DRAGONBLOOD_RITUALS.map(ritual=>[String(ritual.tier),ritual.label]),String(build.dragonbloodTier||0));
  document.getElementById("dragonblood-ritual").value=String(build.dragonbloodTier||0);
  document.getElementById("stat-filter-list").innerHTML=renderStatFilters();
  document.getElementById("gear-grid").innerHTML=SLOTS.map(renderCard).join("");
  for(const slot of SLOTS){renderItemResults(slot.id);renderGearPickers(slot.id);}
  updateSummary();
}
function updateStatBuildDescription(){
  const selected=STAT_BUILDS.find(([id])=>id===document.getElementById("stat-build").value);
  document.getElementById("stat-build-description").textContent=selected?selected[2]:"Choose your stat build to see its focus and wiki requirements.";
}
function renderMagicSelectors(){
  const container=document.getElementById("magic-selectors");
  const slots=MAGIC_BUILDS[build.statBuild]||0;
  document.getElementById("magic-controls").hidden=slots===0;
  container.innerHTML=Array.from({length:slots},(_,index)=>{
    const optionsHtml=[["","Choose a magic"],...MAGICS.filter(magic=>!build.magics.includes(magic)||magic===build.magics[index]).map(magic=>[magic,magic])];
    const label=slots===2?`MAGIC ${index+1}`:"MAGIC";
    const disabled=index===1&&!build.magics[0];
    return `<label class="magic-select-field"><span>${label}</span><select data-magic-index="${index}" aria-label="${label}"${disabled?" disabled":""}>${options(optionsHtml,build.magics[index]||"")}</select></label>`;
  }).join("");
}
function renderFightingStyleSelectors(){
  const container=document.getElementById("fighting-style-controls");
  const slots=FIGHTING_BUILDS[build.statBuild]||0;
  container.hidden=slots===0;
  document.getElementById("fighting-style-selectors").innerHTML=Array.from({length:slots},(_,index)=>{
    const optionsHtml=[["","Choose a fighting style"],...FIGHTING_STYLES.filter(style=>!build.fightingStyles.includes(style)||style===build.fightingStyles[index]).map(style=>[style,style])];
    const label=slots===2?`FIGHTING STYLE ${index+1}`:"FIGHTING STYLE";
    const disabled=index===1&&!build.fightingStyles[0];
    return `<label class="magic-select-field"><span>${label}</span><select data-fighting-style-index="${index}" aria-label="${label}"${disabled?" disabled":""}>${options(optionsHtml,build.fightingStyles[index]||"")}</select></label>`;
  }).join("");
}
function updateSlotItems(slotId){
  renderItemResults(slotId);
}
function selectItem(slotId,itemName){
  const previous=build.gear[slotId];
  const item=ITEMS.find(entry=>entry.name===itemName);
  if(!item)build.gear[slotId]=null;
  else{
    const slot=SLOTS.find(entry=>entry.id===slotId);
    if(!slot?.categories.includes(item.category)){showToast("That item does not fit this slot.");return;}
    if(item.magicKey&&!build.magics.includes(item.magicKey)){showToast("Select this item's Magic before equipping it.");return;}
    if(item.fightingStyle&&!build.fightingStyles.includes(item.fightingStyle)){showToast("Select this item's fighting style before equipping it.");return;}
    const conflict=accessoryConflictForSlot(slotId,item);
    if(conflict){showToast(conflict);return;}
    const nextLevel=normalizeItemLevel(item,item.maxLevel);
    const nextGear={...blankGear(),name:item.name,level:nextLevel,stats:getItemStatsAtLevel(item,nextLevel),enchant:previous?.enchant||"",modifier:previous?.modifier||""};
    if(!canUseModifier(nextGear,item))nextGear.modifier="";
    const jewelSlots=item.jewelSlots+(nextGear.modifier==="gilded"?1:0);
    nextGear.sockets=(previous?.sockets||[]).slice(0,jewelSlots);
    build.gear[slotId]=nextGear;
  }
  itemSearches[slotId]="";
  itemDropdownOpen[slotId]=false;
  activeItemIndexes[slotId]=0;
  resetSlotPickerState(slotId);
  render();persist();
}
function clearSlot(slotId){
  if(!SLOTS.some(slot=>slot.id===slotId))return;
  build.gear[slotId]=null;
  itemSearches[slotId]="";
  itemDropdownOpen[slotId]=false;
  activeItemIndexes[slotId]=0;
  resetSlotPickerState(slotId);
  render();persist();
}
function getScreenshotDetails(gear){
  const jewels=(gear.sockets||[]).filter(socket=>socket?.gem).map(socket=>{
    const gem=GEMS.find(entry=>entry.id===socket.gem)?.name||"Unknown jewel";
    const fusion=GEMS.find(entry=>entry.id===socket.fusionGem)?.name;
    return fusion?`${gem}-${fusion}`:gem;
  });
  return [
    gear.dragonColor,
    ENCHANTS.find(([id])=>id===gear.enchant)?.[1],
    MODIFIERS.find(([id])=>id===gear.modifier)?.[1],
    jewels.length?`Jewels: ${jewels.join(", ")}`:""
  ].filter(Boolean).join(" · ");
}
function updateSummary(){
  const total=Object.fromEntries(STAT_KEYS.map(k=>[k,0]));
  for(const [slotId,gear]of Object.entries(build.gear)){
    if(!gear)continue;
    refreshPickerPreviews(slotId);
    const gearTotal=getGearTotalStats(gear);
    for(const [key,value]of Object.entries(gearTotal))total[key]+=value;
    const itemReadout=document.querySelector(`[data-item-total="${slotId}"]`);
    if(itemReadout){
      const item=ITEMS.find(entry=>entry.name===gear.name);
      const atlanteanKey=gear.modifier==="atlantean"?getAtlanteanBonusStat(gear,item)[0]:"";
      itemReadout.querySelector(".item-total-stats").innerHTML=formatGearStats(gearTotal,atlanteanKey);
      itemReadout.querySelector(".item-efficiency b").textContent=formatEfficiencyPoints(getEfficiencyPoints(gearTotal));
    }
    const screenshotSummary=document.querySelector(`[data-screenshot-summary="${slotId}"]`);
    if(screenshotSummary){
      const item=ITEMS.find(entry=>entry.name===gear.name);
      const atlanteanKey=gear.modifier==="atlantean"?getAtlanteanBonusStat(gear,item)[0]:"";
      const details=getScreenshotDetails(gear);
      screenshotSummary.querySelector(".gear-snapshot-stats").innerHTML=formatGearStats(gearTotal,atlanteanKey);
      const detailsElement=screenshotSummary.querySelector(".gear-snapshot-details");
      detailsElement.textContent=details;
      detailsElement.hidden=!details;
      screenshotSummary.querySelector(".gear-snapshot-efficiency").textContent=`${formatEfficiencyPoints(getEfficiencyPoints(gearTotal))} EP`;
    }
  }
  document.getElementById("summary-efficiency-points").textContent=formatEfficiencyPoints(getEfficiencyPoints(total));
  const order=["power","defense","range","haste","size","dexterity","regeneration","pierce","resistance","warding","drawback","insanity"];
  document.getElementById("stat-list").innerHTML=order.filter(key=>Math.abs(total[key])>1e-9).map(key=>`<div class="total-stat${key==="power"||key==="defense"?" primary":""}"><span class="stat-name">${renderStatIcon(key)}</span><b>${formatStat(total[key])}</b></div>`).join("");
  const level=clampGameLevel(build.level);
  const baseHealth=Math.round(1000+(level-1)*3.83);
  const ritual=DRAGONBLOOD_RITUALS.find(entry=>entry.tier===Number(build.dragonbloodTier))||DRAGONBLOOD_RITUALS[0];
  const ritualHealth=Math.round(baseHealth*ritual.healthMultiplier);
  document.getElementById("summary-gear-health").textContent=formatStat(total.defense);
  document.getElementById("summary-base-health").textContent=String(baseHealth);
  document.getElementById("summary-ritual-health").textContent=`+${ritualHealth}`;
  document.getElementById("summary-total-health").textContent=String(Math.round(baseHealth+total.defense+ritualHealth));
  document.getElementById("dragonblood-effect").textContent=ritual.beastDefensePercent?`+${ritual.beastDefensePercent}% Beast Defense · +${ritualHealth} HP`:"No ritual bonuses selected";
}
function showToast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200);}
function setSocketValue(slotId,index,key,value){
  const gear=build.gear[slotId];
  if(!gear)return;
  gear.sockets??=[];
  while(gear.sockets.length<=index)gear.sockets.push({});
  gear.sockets[index][key]=value;
}
function selectPickerOption(slotId,kind,index,value){
  const gear=build.gear[slotId];
  if(!gear)return;
  if(kind==="dragonColor"){
    const item=ITEMS.find(entry=>entry.name===gear.name);
    const validColors=getDragonColorRecords(item).map(color=>color.name||"Base");
    if(value&&!validColors.includes(value))return;
    gear.dragonColor=value;
  }else if(kind==="enchant"){
    gear.enchant=ENCHANT_UPGRADES[value]||value;
    if(gear.enchant==="virtuous"&&gear.modifier==="atlantean")gear.modifier="";
  }else if(kind==="modifier"){
    const item=ITEMS.find(entry=>entry.name===gear.name);
    if(!canUseModifier({...gear,modifier:value},item)){showToast("This modifier cannot be used on this item or with its current enchantment.");return;}
    gear.modifier=value;
  }else{
    const socketIndex=Number(index);
    if(kind==="fusionGem"&&!gear.sockets?.[socketIndex]?.gem)return;
    setSocketValue(slotId,socketIndex,kind,value);
    if(kind==="gem"){
      if(!value)gear.sockets[socketIndex].fusionGem="";
      resetPickerState(pickerKey(slotId,"fusionGem",index));
    }
  }
  if(kind==="enchant"||kind==="modifier"){
    const item=ITEMS.find(entry=>entry.name===gear.name);
    gear.sockets=(gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0));
  }
  resetPickerState(pickerKey(slotId,kind,index));
  render();persist();
}
document.getElementById("gear-grid").addEventListener("focusin",event=>{
  if(event.target.matches("[data-item-search]")){
    const slotId=event.target.dataset.itemSearch;
    itemDropdownOpen[slotId]=true;
    activeItemIndexes[slotId]=0;
    renderItemResults(slotId);
  }else if(event.target.matches("[data-picker-search]")){
    const key=event.target.dataset.pickerSearch;
    pickerDropdownOpen[key]=true;
    activePickerIndexes[key]=0;
    renderPickerResults(event.target.dataset.pickerSlot,event.target.dataset.pickerKind,event.target.dataset.pickerIndex);
  }
});
document.getElementById("gear-grid").addEventListener("input",event=>{
  if(event.target.matches("[data-item-search]")){
    itemSearches[event.target.dataset.itemSearch]=event.target.value;
    itemDropdownOpen[event.target.dataset.itemSearch]=true;
    activeItemIndexes[event.target.dataset.itemSearch]=0;
    updateSlotItems(event.target.dataset.itemSearch);
    return;
  }
  if(event.target.matches("[data-picker-search]")){
    const key=event.target.dataset.pickerSearch;
    pickerSearches[key]=event.target.value;
    pickerDropdownOpen[key]=true;
    activePickerIndexes[key]=0;
    renderPickerResults(event.target.dataset.pickerSlot,event.target.dataset.pickerKind,event.target.dataset.pickerIndex);
    return;
  }
  const el=event.target;const gear=build.gear[el.dataset.slot];if(!gear)return;
  updateSummary();persist();
});
document.getElementById("gear-grid").addEventListener("keydown",event=>{
  const input=event.target;
  if(input.matches("[data-picker-search]")){
    const key=input.dataset.pickerSearch;
    const {pickerSlot:slotId,pickerKind:kind,pickerIndex:index}=input.dataset;
    const search=pickerSearches[key]||"";
    const current=kind==="gem"||kind==="fusionGem"
      ?build.gear[slotId]?.sockets?.[Number(index)]?.[kind]||""
      :build.gear[slotId]?.[kind]||"";
    const hasClear=!search&&!statFilters.size&&Boolean(current);
    const candidates=getPickerCandidates(slotId,kind,index,search);
    const count=candidates.length+(hasClear?1:0);
    if(event.key==="ArrowDown"||event.key==="ArrowUp"){
      event.preventDefault();
      pickerDropdownOpen[key]=true;
      if(count)activePickerIndexes[key]=((activePickerIndexes[key]||0)+(event.key==="ArrowDown"?1:-1)+count)%count;
      renderPickerResults(slotId,kind,index);
    }else if(event.key==="Enter"&&pickerDropdownOpen[key]){
      event.preventDefault();
      const active=Math.min(activePickerIndexes[key]||0,Math.max(0,count-1));
      if(hasClear&&active===0)selectPickerOption(slotId,kind,index,"");
      else if(candidates.length)selectPickerOption(slotId,kind,index,candidates[active-(hasClear?1:0)]?.value||"");
    }else if(event.key==="Escape"&&pickerDropdownOpen[key]){
      pickerDropdownOpen[key]=false;
      renderPickerResults(slotId,kind,index);
    }
    return;
  }
  if(!input.matches("[data-item-search]"))return;
  const slotId=input.dataset.itemSearch;
  const filtered=getFilteredItems(SLOTS.find(slot=>slot.id===slotId),itemSearches[slotId]);
  if(event.key==="ArrowDown"||event.key==="ArrowUp"){
    event.preventDefault();
    itemDropdownOpen[slotId]=true;
    if(filtered.length)activeItemIndexes[slotId]=(activeItemIndexes[slotId]+(event.key==="ArrowDown"?1:-1)+filtered.length)%filtered.length;
    renderItemResults(slotId);
  }else if(event.key==="Enter"&&itemDropdownOpen[slotId]){
    event.preventDefault();
    if(filtered.length)selectItem(slotId,filtered[activeItemIndexes[slotId]]?.name||"");
    else if(!itemSearches[slotId])selectItem(slotId,"");
  }else if(event.key==="Escape"&&itemDropdownOpen[slotId]){
    itemDropdownOpen[slotId]=false;
    renderItemResults(slotId);
  }
});
document.getElementById("gear-grid").addEventListener("click",event=>{
  const clearButton=event.target.closest("[data-clear-slot]");
  if(clearButton&&!clearButton.disabled){clearSlot(clearButton.dataset.clearSlot);return;}
  const pickerResult=event.target.closest("[data-select-picker]");
  if(pickerResult){selectPickerOption(pickerResult.dataset.pickerSlot,pickerResult.dataset.pickerKind,pickerResult.dataset.pickerIndex,pickerResult.dataset.pickerValue);return;}
  const result=event.target.closest("[data-select-item]");
  if(result){selectItem(result.dataset.selectItem,result.dataset.itemName);return;}
});
document.addEventListener("click",event=>{
  const itemPicker=event.target.closest(".item-picker");
  const optionPicker=event.target.closest("[data-option-picker]");
  if(!itemPicker)for(const slot of SLOTS)if(itemDropdownOpen[slot.id]){itemDropdownOpen[slot.id]=false;renderItemResults(slot.id);}
  for(const key of Object.keys(pickerDropdownOpen)){
    if(!pickerDropdownOpen[key]||optionPicker?.dataset.optionPicker===key)continue;
    pickerDropdownOpen[key]=false;
    const [slotId,kind,index]=key.split(":");
    renderPickerResults(slotId,kind,index||"");
  }
});
document.getElementById("stat-filter-list").addEventListener("change",event=>{
  const input=event.target.closest("[data-filter-stat]");
  if(!input)return;
  if(input.checked)statFilters.add(input.dataset.filterStat);else statFilters.delete(input.dataset.filterStat);
  render();
});
document.getElementById("clear-filters").addEventListener("click",()=>{
  statFilters.clear();
  render();
});
document.getElementById("clear-all-gear").addEventListener("click",()=>{
  if(!Object.values(build.gear).some(Boolean))return;
  if(!confirm("Clear all equipped items, enchants, and jewels?"))return;
  for(const slot of SLOTS){build.gear[slot.id]=null;itemSearches[slot.id]="";itemDropdownOpen[slot.id]=false;activeItemIndexes[slot.id]=0;resetSlotPickerState(slot.id);}
  render();persist();
  showToast("All equipment cleared.");
});
document.getElementById("gear-grid").addEventListener("change",event=>{
  const el=event.target;
  if(el.dataset.prop==="level"&&build.gear[el.dataset.slot]){
    const gear=build.gear[el.dataset.slot];
    const item=ITEMS.find(entry=>entry.name===gear.name);
    gear.level=item?normalizeItemLevel(item,el.value):Math.max(1,Math.min(MAX_GAME_LEVEL,safeNumber(el.value)||1));
    if(item)gear.stats=getItemStatsAtLevel(item,gear.level);
    render();persist();
  }
});
document.getElementById("build-name").addEventListener("input",event=>{build.name=event.target.value;persist();});
document.getElementById("save-named-build").addEventListener("click",saveNamedGearBuild);
document.getElementById("saved-build-select").addEventListener("change",syncSavedGearBuildButtons);
document.getElementById("load-named-build").addEventListener("click",()=>{
  const savedSet=savedGearBuilds.find(entry=>entry.name===document.getElementById("saved-build-select").value);
  if(!savedSet)return;
  try{importBuildData(savedSet.build,{toast:"Saved gear set loaded.",closeImport:false});}
  catch(error){console.error("Could not load the saved gear set.",error);showToast(error.message||"Could not load saved gear set.");}
});
document.getElementById("update-named-build").addEventListener("click",updateSavedGearBuild);
document.getElementById("delete-named-build").addEventListener("click",deleteSavedGearBuild);
document.getElementById("stat-build").addEventListener("change",event=>{
  build.statBuild=STAT_BUILDS.some(([id])=>id===event.target.value)?event.target.value:"";
  sanitizeStatBuild(build);
  render();persist();
});
document.getElementById("magic-selectors").addEventListener("change",event=>{
  if(!event.target.matches("[data-magic-index]"))return;
  const index=Number(event.target.dataset.magicIndex);
  if(event.target.value&&build.magics.some((magic,otherIndex)=>otherIndex!==index&&magic===event.target.value)){
    showToast("Choose two different Magics.");
    renderMagicSelectors();
    return;
  }
  build.magics[index]=event.target.value;
  sanitizeStatBuild(build);
  render();persist();
});
document.getElementById("fighting-style-selectors").addEventListener("change",event=>{
  if(!event.target.matches("[data-fighting-style-index]"))return;
  const index=Number(event.target.dataset.fightingStyleIndex);
  if(event.target.value&&build.fightingStyles.some((style,otherIndex)=>otherIndex!==index&&style===event.target.value)){
    showToast("Choose two different fighting styles.");
    renderFightingStyleSelectors();
    return;
  }
  build.fightingStyles[index]=event.target.value;
  sanitizeStatBuild(build);
  renderFightingStyleSelectors();persist();
});
document.getElementById("player-level").addEventListener("input",event=>{build.level=clampGameLevel(event.target.value);event.target.value=build.level;updateSummary();persist();});
document.getElementById("dragonblood-ritual").addEventListener("change",event=>{build.dragonbloodTier=safeNumber(event.target.value);updateSummary();persist();});
function encodeBase64Url(bytes){
  let binary="";
  for(let offset=0;offset<bytes.length;offset+=0x8000){
    binary+=String.fromCharCode(...bytes.subarray(offset,offset+0x8000));
  }
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function decodeBase64Url(value){
  const encoded=value.replace(/-/g,"+").replace(/_/g,"/");
  const binary=atob(encoded.padEnd(Math.ceil(encoded.length/4)*4,"="));
  return Uint8Array.from(binary,char=>char.charCodeAt(0));
}
async function encodeBuildCode(){
  if(typeof CompressionStream!=="function")throw new Error("Compressed build codes are not supported by this browser.");
  const bytes=new TextEncoder().encode(JSON.stringify(build));
  const stream=new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
  const compressed=new Uint8Array(await new Response(stream).arrayBuffer());
  return `AO2-${encodeBase64Url(compressed)}`;
}
async function decodeBuildCode(value){
  const trimmed=value.trim();
  if(trimmed.startsWith("AO1-"))return JSON.parse(new TextDecoder().decode(decodeBase64Url(trimmed.slice(4))));
  if(!trimmed.startsWith("AO2-"))throw new Error("Paste a valid build code beginning with AO1- or AO2-.");
  if(typeof DecompressionStream!=="function")throw new Error("Compressed build codes are not supported by this browser.");
  const stream=new Blob([decodeBase64Url(trimmed.slice(4))]).stream().pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text());
}
function importBuildData(parsed,{toast="Build imported.",closeImport=true}={}){
  if(!parsed||!parsed.gear||typeof parsed.gear!=="object")throw new Error("This does not look like a valid build code.");
  const merged={...structuredClone(starter),...parsed,gear:{...structuredClone(starter.gear),...parsed.gear}};
  merged.level=clampGameLevel(merged.level);
  merged.dragonbloodTier=Math.max(0,Math.min(7,Math.floor(safeNumber(merged.dragonbloodTier))));
  for(const slot of SLOTS)if(merged.gear[slot.id]!==null&&merged.gear[slot.id]!==undefined){
    const gear=merged.gear[slot.id];
    if(typeof gear!=="object"||!gear.stats||typeof gear.stats!=="object")throw new Error(`Invalid gear data in ${slot.name}.`);
  }
  const accessoryError=validateAccessoryLoadout(merged.gear);
  if(accessoryError)throw new Error(`This build cannot be imported: ${accessoryError}`);
  sanitizeStatBuild(merged);
  sanitizeGearModifiers(merged.gear);
  build=merged;
  render();persist();
  if(closeImport){
    document.getElementById("import-panel").hidden=true;
    document.getElementById("import-code").value="";
  }
  showToast(toast);
}
document.getElementById("export-build").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(await encodeBuildCode());showToast("Short build code copied to clipboard.");}
  catch(error){console.error("Could not copy the build code.",error);showToast("Clipboard access is unavailable.");}
});
document.getElementById("toggle-import").addEventListener("click",()=>{
  const panel=document.getElementById("import-panel");
  panel.hidden=!panel.hidden;
  if(!panel.hidden)document.getElementById("import-code").focus();
});
document.getElementById("close-import").addEventListener("click",()=>{document.getElementById("import-panel").hidden=true;});
document.getElementById("import-code-button").addEventListener("click",async()=>{
  try{importBuildData(await decodeBuildCode(document.getElementById("import-code").value));}
  catch(error){console.error("Could not import build code.",error);showToast(error.message||"Could not import build.");}
});
document.getElementById("copy-summary").addEventListener("click",async()=>{
  const statBuild=STAT_BUILDS.find(([id])=>id===build.statBuild);
  const lines=[`${build.name||"Arcane Odyssey build"} · Level ${build.level||175}`,...(statBuild?[`Stat build: ${statBuild[1]}`,...(build.magics||[]).filter(Boolean).map((magic,index)=>`Magic ${index+1}: ${magic}`),...(build.fightingStyles||[]).filter(Boolean).map((style,index)=>`Fighting style ${index+1}: ${style}`)]:[]),`Total health: ${document.getElementById("summary-total-health").textContent}`,`Efficiency points: ${document.getElementById("summary-efficiency-points").textContent}`,`Dragonblood ritual: ${DRAGONBLOOD_RITUALS.find(ritual=>ritual.tier===Number(build.dragonbloodTier))?.label||"None"}`,...Array.from(document.querySelectorAll(".total-stat"),el=>`${el.querySelector("span").textContent}: ${el.querySelector("b").textContent}`)];
  try{await navigator.clipboard.writeText(lines.join("\n"));showToast("Stat summary copied.");}catch(error){console.error("Could not copy the summary.",error);showToast("Clipboard access is unavailable.");}
});
document.getElementById("toggle-screenshot").addEventListener("click",event=>{
  const enabled=document.body.classList.toggle("screenshot-mode");
  event.currentTarget.textContent=enabled?"Exit screenshot view":"Screenshot view";
  event.currentTarget.setAttribute("aria-pressed",String(enabled));
  window.scrollTo(0,0);
});
renderSavedGearBuilds();
render();
