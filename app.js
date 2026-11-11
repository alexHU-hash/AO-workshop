const STAT_KEYS = ["power", "defense", "range", "haste", "size", "speed", "dexterity", "regeneration", "pierce", "resistance", "warding", "drawback", "insanity"];
const STAT_LABELS = { power:"Power", defense:"Defense", range:"Range", haste:"Haste", size:"Size", speed:"Speed", dexterity:"Dexterity", regeneration:"Regeneration", pierce:"Pierce", resistance:"Resistance", warding:"Warding", drawback:"Drawback", insanity:"Insanity" };
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
  ["", "No enchant"], ["powerful", "Powerful · Power"], ["armored", "Armored · Defense"], ["deadeye", "Deadeye · Range"],
  ["enhanced", "Enhanced · Haste"], ["explosive", "Explosive · Size"], ["brisk", "Brisk · Dexterity"],
  ["charged", "Charged · Power + Haste"], ["tracking", "Tracking · Dexterity + Range"],
  ["healing", "Healing · Regeneration"],
  ["resilient", "Resilient · Resistance"], ["piercing", "Piercing · Pierce"], ["virtuous", "Virtuous · Defense + Warding"]
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
const ATLANTEAN_STATS = [
  ["power",.7648],["defense",6.8236],["size",2.2353],
  ["dexterity",2.2353],["range",2.2353],["haste",2.2353]
];
const GEMS = [
  {id:"defense",name:"Amethyst",variants:["Diamond","Onyx"],stats:[{defense:6.5},{defense:13.1},{defense:19.6},{defense:26.2},{defense:32.8},{defense:39.3}]},
  {id:"power",name:"Ruby",variants:["Sunstone","Zircon"],stats:[{power:1},{power:1.4},{power:2.1},{power:2.9},{power:3.6},{power:3.9}]},
  {id:"dexterity",name:"Sapphire",variants:["Tanzanite"],stats:[{dexterity:2.1},{dexterity:4.3},{dexterity:6.5},{dexterity:8.7},{dexterity:10.9},{dexterity:13.1}]},
  {id:"size",name:"Emerald",variants:["Peridot"],stats:[{size:2.1},{size:4.3},{size:6.5},{size:8.7},{size:10.9},{size:13.1}]},
  {id:"range",name:"Aquamarine",variants:["Tourmaline"],stats:[{range:2.1},{range:4.3},{range:6.5},{range:8.7},{range:10.9},{range:13.1}]},
  {id:"haste",name:"Citrine",variants:["Topaz"],stats:[{haste:2.1},{haste:4.3},{haste:6.5},{haste:8.7},{haste:10.9},{haste:13.1}]},
  {id:"dexterity-range",name:"Lapis Lazuli",stats:[{dexterity:1.6,range:1.6},{dexterity:3.2,range:3.2},{dexterity:4.9,range:4.9},{dexterity:6.5,range:6.5},{dexterity:8.2,range:8.2},{dexterity:9.8,range:9.8}]},
  {id:"dexterity-haste",name:"Larimar",stats:[{dexterity:1.6,haste:1.6},{dexterity:3.2,haste:3.2},{dexterity:4.9,haste:4.9},{dexterity:6.5,haste:6.5},{dexterity:8.2,haste:8.2},{dexterity:9.8,haste:9.8}]},
  {id:"defense-size",name:"Agate",stats:[{size:1,defense:6.5},{size:2.1,defense:13.1},{size:3.2,defense:19.6},{size:4.3,defense:26.2},{size:5.4,defense:32.8},{size:6.5,defense:39.3}]},
  {id:"power-size",name:"Malachite",stats:[{power:1,size:1},{power:1.4,size:2.1},{power:2.1,size:3.2},{power:2.9,size:4.3},{power:3.6,size:5.4},{power:3.9,size:6.5}]},
  {id:"power-dexterity",name:"Candelaria",stats:[{power:1,dexterity:1},{power:1.4,dexterity:2.1},{power:2.1,dexterity:3.2},{power:2.9,dexterity:4.3},{power:3.6,dexterity:5.4},{power:3.9,dexterity:6.5}]},
  {id:"power-range",name:"Morenci",stats:[{power:1,range:1},{power:1.4,range:2.1},{power:2.1,range:3.2},{power:2.9,range:4.3},{power:3.6,range:5.4},{power:3.9,range:6.5}]},
  {id:"double-effect",name:"Musgravite",stats:[{},{},{},{},{},{}]},
  {id:"defense-drawback",name:"Painite",stats:[{drawback:1,defense:31.3},{drawback:1,defense:62.7},{drawback:1,defense:94},{drawback:1,defense:125.4},{drawback:1,defense:156.7},{drawback:1,defense:188.1}]},
  {id:"range-haste",name:"Kyanite",stats:[{range:1.6,haste:1.6},{range:3.2,haste:3.2},{range:4.9,haste:4.9},{range:6.5,haste:6.5},{range:8.2,haste:8.2},{range:9.8,haste:9.8}]},
  {id:"range-size",name:"Variscite",stats:[{range:1.6,size:1.6},{range:3.2,size:3.2},{range:4.9,size:4.9},{range:6.5,size:6.5},{range:8.2,size:8.2},{range:9.8,size:9.8}]},
  {id:"resistance",name:"Azurite",stats:[{resistance:3.2},{resistance:6.5},{resistance:9.8},{resistance:13.1},{resistance:16.4},{resistance:19.6}]},
  {id:"regeneration",name:"Aventurine",stats:[{regeneration:3.2},{regeneration:6.5},{regeneration:9.8},{regeneration:13.1},{regeneration:16.4},{regeneration:19.6}]},
  {id:"pierce",name:"Fire Opal",stats:[{pierce:3.2},{pierce:6.5},{pierce:9.8},{pierce:13.1},{pierce:16.4},{pierce:19.6}]}
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
const ITEMS = [...BUILDER_ITEM_DATA,...BUILDER_MAGIC_GEAR_DATA,...BUILDER_FIGHTING_GEAR_DATA].map(item=>{
  const latest=item.statRows.find(row=>row.level===item.maxLevel)||item.statRows[item.statRows.length-1];
  const magicPiece=(item.magicPiece||(item.magicKey?item.name.slice(item.magicKey.length):"")).trim();
  const isMagicHat=item.magicKey&&(magicPiece==="Arcanium Mage Hat"||magicPiece==="mancer Hat");
  const category=isMagicHat?"Accessory":item.category;
  return {...item,magicPiece,category,subType:isMagicHat?"Hat":item.subType,type:CATEGORY_LABELS[category],level:latest.level,stats:{...latest.stats}};
});
function getItemStatsAtLevel(item,level){
  const row=item.statRows.find(entry=>entry.level===level)||item.statRows[item.statRows.length-1];
  return {...row.stats};
}
function normalizeItemLevel(item,level){
  const requested=Math.max(item.minLevel,Math.min(item.maxLevel,safeNumber(level)||item.maxLevel));
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
let build = loadStoredBuild();
const itemSearches = Object.fromEntries(SLOTS.map(slot=>[slot.id,""]));
const itemDropdownOpen = Object.fromEntries(SLOTS.map(slot=>[slot.id,false]));
const activeItemIndexes = Object.fromEntries(SLOTS.map(slot=>[slot.id,0]));
const statFilters = new Set();
let saveTimer;
let toastTimer;

function blankGear(){return {name:"",level:175,stats:{},enchant:"",sockets:[]};}
function safeNumber(value){const n=Number(value);return Number.isFinite(n)?n:0;}
function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function canUseModifier(gear,item){
  const canApplyAtlantean=Boolean(item);
  const canUse=gear.modifier===""?true:gear.modifier==="atlantean"?canApplyAtlantean:Boolean(item?.modifierAllowed);
  return Boolean(item&&canUse&&MODIFIERS.some(([id])=>id===gear.modifier)&&!(gear.modifier==="atlantean"&&gear.enchant==="virtuous"));
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
      gear.level=Math.max(1,Math.min(300,safeNumber(gear.level)||170));
    }
    gear.enchant=ENCHANT_UPGRADES[gear.enchant]||gear.enchant;
    if(!canUseModifier(gear,item))gear.modifier="";
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
function getCombinedGemStats(socket){
  const primary=getGemStats(socket,"gem");
  const fusion=getGemStats(socket,"fusionGem");
  if(!Object.keys(fusion).length)return Object.fromEntries(Object.entries(primary).map(([key,value])=>[key,Math.trunc(value)]));
  const combined={};
  for(const key of STAT_KEYS){
    combined[key]=key==="drawback"
      ?Math.trunc(primary[key]||0)
      :Math.trunc((primary[key]||0)+(fusion[key]||0)*.5);
  }
  return combined;
}
function getAtlanteanBonusStat(gear,item){
  const scale=(safeNumber(gear.level)||1)/10;
  const present=new Set(Object.entries(gear.stats||{}).filter(([,value])=>safeNumber(value)!==0).map(([key])=>key));
  for(const [key,value]of Object.entries(ENCHANT_STATS[gear.enchant]||{}))if(value*scale!==0)present.add(key);
  for(const [key,value]of Object.entries(ENCHANT_FLAT_STATS[gear.enchant]||{}))if(value!==0)present.add(key);
  for(const socket of (gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0))){
    for(const key of Object.keys(getCombinedGemStats(socket)))present.add(key);
  }
  return ATLANTEAN_STATS.find(([key])=>!present.has(key))||ATLANTEAN_STATS[0];
}
function getGearTotalStats(gear){
  const total=Object.fromEntries(STAT_KEYS.map(key=>[key,0]));
  const level=safeNumber(gear.level)||1;
  const scale=level/10*(safeNumber(gear.enchantFactor)||1);
  const modifierScale=level/10;
  const item=ITEMS.find(entry=>entry.name===gear.name);
  for(const [key,value]of Object.entries(gear.stats||{}))if(key in total)total[key]+=safeNumber(value);
  for(const [key,value]of Object.entries(ENCHANT_STATS[gear.enchant]||{}))total[key]+=value*scale;
  for(const [key,value]of Object.entries(ENCHANT_FLAT_STATS[gear.enchant]||{}))total[key]+=value;
  const modifier=gear.modifier;
  for(const [key,value]of Object.entries(MODIFIER_STATS[modifier]||{}))total[key]+=value*modifierScale;
  if(modifier==="atlantean"){
    total.insanity+=1;
    const [key,value]=getAtlanteanBonusStat(gear,item);
    total[key]+=value*modifierScale;
  }
  if(modifier==="imbued"){
    const baseKeys=Object.keys(gear.stats||{}).filter(key=>safeNumber(gear.stats[key])>0&&key!=="warding"&&key!=="insanity"&&key!=="drawback");
    for(const key of new Set(baseKeys))total[key]+=(key==="power"?.23625:key==="defense"?2.2353:.7059)*modifierScale;
  }
  for(const socket of (gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(modifier==="gilded"?1:0))){
    for(const [key,value]of Object.entries(getCombinedGemStats(socket)))if(key in total)total[key]+=value;
  }
  return total;
}
function getEfficiencyPoints(stats){
  return (stats.power||0)*3+(stats.defense||0)/3
    +["range","haste","size","speed","regeneration","pierce","resistance","warding","drawback","insanity"]
      .reduce((sum,key)=>sum+(stats[key]||0),0);
}
function formatEfficiencyPoints(value){
  const rounded=Math.round(value*10)/10;
  return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1);
}
function formatGearStats(stats,atlanteanKey=""){
  return Object.entries(stats).filter(([,value])=>Math.abs(value)>1e-9).map(([key,value])=>{
    const stat=`${esc(STAT_LABELS[key])} ${formatStat(value)}`;
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
function formatStat(value){const rounded=Math.round(value*10)/10;return `${rounded>0?"+":""}${Number.isInteger(rounded)?rounded:rounded.toFixed(1)}`;}
function options(items,selected){return items.map(([value,label])=>`<option value="${esc(value)}"${value===selected?" selected":""}>${esc(label)}</option>`).join("");}
function renderStatFilters(){return STAT_KEYS.map(key=>`<label class="filter-chip"><input type="checkbox" data-filter-stat="${key}"${statFilters.has(key)?" checked":""}><span>${STAT_LABELS[key]}</span></label>`).join("");}
function getAvailableItemsForSlot(slot){
  return ITEMS.filter(item=>slot.categories.includes(item.category)
    &&(!item.magicKey||build.magics.includes(item.magicKey))
    &&(!item.fightingStyle||build.fightingStyles.includes(item.fightingStyle)));
}
function getFilteredItems(slot,query=""){
  const search=query.trim().toLowerCase();
  return getAvailableItemsForSlot(slot).filter(item=>!accessoryConflictForSlot(slot.id,item)
    &&[...statFilters].every(key=>safeNumber(item.stats[key])!==0)
    &&(!search||item.name.toLowerCase().includes(search)));
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
    const stats=Object.entries(item.stats).map(([key,value])=>`${STAT_LABELS[key]} ${formatStat(value)}`).join(" · ");
    const selected=build.gear[slotId]?.name===item.name;
    controls.push(`<button id="${slotId}-result-${index}" class="item-result${selected?" is-equipped":""}" type="button" role="option" aria-selected="${selected}" data-select-item="${slotId}" data-item-name="${esc(item.name)}"><span class="item-result-main"><span class="item-result-name">${esc(item.name)}${selected?'<span class="equipped-tag">EQUIPPED</span>':""}</span><span class="item-result-stats">${esc(stats||"No base stats listed")}</span></span><span class="item-result-type">${esc(item.type)}</span></button>`);
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
  if(!gear) return `<article class="gear-card"><div class="gear-card-header"><div><span class="slot-label">${slot.label}</span><h3>Empty slot</h3></div>${clearButton}</div><div class="gear-fields">${itemPicker}</div></article>`;
  const jewelSlots=(selectedItem?.jewelSlots||0)+(gear.modifier==="gilded"?1:0);
  const sockets=Array.from({length:jewelSlots},(_,i)=>renderSocket(slot.id,i,gear.sockets?.[i])).join("");
  const socketSection=sockets?`<div class="socket-block"><div class="socket-block-head"><span class="socket-title">JEWEL SOCKETS</span><span class="socket-subtitle">${jewelSlots} AVAILABLE · GEM + COMBINED GEM</span></div>${sockets}</div>`:"";
  const modifierDescription=MODIFIER_DESCRIPTIONS[gear.modifier];
  const canUseAtlantean=Boolean(selectedItem);
  const modifierOptions=MODIFIERS.map(([value,label])=>{
    const disabled=(value==="atlantean"&&(!canUseAtlantean||gear.enchant==="virtuous"))||(value!==""&&value!=="atlantean"&&!selectedItem?.modifierAllowed);
    return `<option value="${esc(value)}"${value===(gear.modifier||"")?" selected":""}${disabled?" disabled":""}>${esc(label)}</option>`;
  }).join("");
  const modifierHelp=modifierDescription||(gear.enchant==="virtuous"?"Virtuous removes Atlantean; Atlantean cannot be applied while Virtuous is selected.":canUseAtlantean&&!selectedItem?.modifierAllowed?"Atlantean is allowed on items without an existing modifier.":"");
  const modifierControl=selectedItem?.modifierAllowed||canUseAtlantean?`<div class="field"><label>MODIFIER</label><select data-slot="${slot.id}" data-prop="modifier" aria-label="${slot.name} modifier">${modifierOptions}</select>${modifierHelp?`<span class="modifier-note">${esc(modifierHelp)}</span>`:""}</div>`:`<div class="field"><label>MODIFIER</label><select data-slot="${slot.id}" data-prop="modifier" disabled aria-label="${slot.name} cannot have a modifier"><option>Not available on this item</option></select></div>`;
  const baseStats=Object.entries(gear.stats||{}).map(([key,value])=>`${STAT_LABELS[key]} ${formatStat(value)}`).join(" · ")||"No base stats listed";
  const totalStats=getGearTotalStats(gear);
  const atlanteanKey=gear.modifier==="atlantean"?getAtlanteanBonusStat(gear,selectedItem)[0]:"";
  const totalStatText=formatGearStats(totalStats,atlanteanKey);
  const itemEfficiency=formatEfficiencyPoints(getEfficiencyPoints(totalStats));
  const minLevel=selectedItem?.minLevel??1;
  const maxLevel=selectedItem?.maxLevel??300;
  return `<article class="gear-card"><div class="gear-card-header"><div><span class="slot-label">${slot.label}</span><h3>${esc(gear.name||"Unnamed gear")}</h3><span class="item-type">${esc(selectedItem?.type||"Custom item")} · Lv ${safeNumber(gear.level)||1}</span></div>${clearButton}</div><div class="gear-fields">${itemPicker}<div class="field item-level"><label>ITEM LEVEL</label><input data-slot="${slot.id}" data-prop="level" type="number" min="${minLevel}" max="${maxLevel}" step="10" value="${safeNumber(gear.level)||1}" aria-label="${slot.name} level"></div><div class="base-stat-readout">${esc(baseStats)}</div><div class="item-total-readout" data-item-total="${slot.id}"><span class="item-total-label">TOTAL ITEM STATS</span><span class="item-total-stats">${esc(totalStatText)}</span><span class="item-efficiency">EFFICIENCY POINTS <b>${itemEfficiency}</b></span></div><div class="enhancement"><div class="field"><label>ENCHANT SCROLL</label><select data-slot="${slot.id}" data-prop="enchant" aria-label="${slot.name} enchantment">${options(ENCHANTS,gear.enchant||"")}</select></div>${modifierControl}</div>${socketSection}</div></article>`;
}
function renderSocket(slotId,index,socket={}){
  const gemOptions=[["","Choose gem"],...GEMS.map(gem=>[gem.id,[gem.name,...(gem.variants||[])].join(" / ")])];
  return `<div class="socket"><span class="socket-label">GEM · PERFECT</span><select data-slot="${slotId}" data-socket="${index}" data-socket-prop="gem" aria-label="Socket ${index+1} gem">${options(gemOptions,socket.gem||"")}</select><span class="socket-label">COMBINED GEM · PERFECT</span><select data-slot="${slotId}" data-socket="${index}" data-socket-prop="fusionGem" aria-label="Socket ${index+1} combined gem" ${socket.gem?"":"disabled"}>${options(gemOptions,socket.fusionGem||"")}</select></div>`;
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
  for(const slot of SLOTS)renderItemResults(slot.id);
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
    const nextGear={...blankGear(),name:item.name,level:item.maxLevel,stats:getItemStatsAtLevel(item,item.maxLevel),enchant:previous?.enchant||"",modifier:previous?.modifier||""};
    if(!canUseModifier(nextGear,item))nextGear.modifier="";
    const jewelSlots=item.jewelSlots+(nextGear.modifier==="gilded"?1:0);
    nextGear.sockets=(previous?.sockets||[]).slice(0,jewelSlots);
    build.gear[slotId]=nextGear;
  }
  itemSearches[slotId]="";
  itemDropdownOpen[slotId]=false;
  activeItemIndexes[slotId]=0;
  render();persist();
}
function clearSlot(slotId){
  if(!SLOTS.some(slot=>slot.id===slotId))return;
  build.gear[slotId]=null;
  itemSearches[slotId]="";
  itemDropdownOpen[slotId]=false;
  activeItemIndexes[slotId]=0;
  render();persist();
}
function updateSummary(){
  const total=Object.fromEntries(STAT_KEYS.map(k=>[k,0]));
  let equipped=0,jewels=0,enchants=0;
  for(const [slotId,gear]of Object.entries(build.gear)){
    if(!gear)continue;
    equipped++;
    const gearTotal=getGearTotalStats(gear);
    for(const [key,value]of Object.entries(gearTotal))total[key]+=value;
    const itemReadout=document.querySelector(`[data-item-total="${slotId}"]`);
    if(itemReadout){
      const item=ITEMS.find(entry=>entry.name===gear.name);
      const atlanteanKey=gear.modifier==="atlantean"?getAtlanteanBonusStat(gear,item)[0]:"";
      itemReadout.querySelector(".item-total-stats").innerHTML=formatGearStats(gearTotal,atlanteanKey);
      itemReadout.querySelector(".item-efficiency b").textContent=formatEfficiencyPoints(getEfficiencyPoints(gearTotal));
    }
    if(gear.enchant)enchants++;
    const item=ITEMS.find(entry=>entry.name===gear.name);
    const socketLimit=(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0);
    jewels+=(gear.sockets||[]).slice(0,socketLimit).filter(socket=>socket?.gem).length;
  }
  document.getElementById("summary-efficiency-points").textContent=formatEfficiencyPoints(getEfficiencyPoints(total));
  const order=["power","defense","range","haste","size","speed","dexterity","regeneration","pierce","resistance","warding","drawback","insanity"];
  document.getElementById("stat-list").innerHTML=order.filter(key=>Math.abs(total[key])>1e-9).map(key=>`<div class="total-stat${key==="power"||key==="defense"?" primary":""}"><span>${STAT_LABELS[key]}</span><b>${formatStat(total[key])}</b></div>`).join("");
  document.getElementById("slot-count").textContent=`${equipped} / 5 EQUIPPED`;
  document.getElementById("summary-equipped").textContent=`${equipped} / 5`;
  document.getElementById("summary-jewels").textContent=String(jewels);
  document.getElementById("summary-enchants").textContent=String(enchants);
  const level=Math.max(1,Math.min(300,safeNumber(build.level)||175));
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
function setSocketValue(slotId,index,key,value){const gear=build.gear[slotId];if(!gear)return;gear.sockets??=[];gear.sockets[index]??={};gear.sockets[index][key]=value;}
document.getElementById("gear-grid").addEventListener("focusin",event=>{
  if(!event.target.matches("[data-item-search]"))return;
  const slotId=event.target.dataset.itemSearch;
  itemDropdownOpen[slotId]=true;
  activeItemIndexes[slotId]=0;
  renderItemResults(slotId);
});
document.getElementById("gear-grid").addEventListener("input",event=>{
  if(event.target.matches("[data-item-search]")){
    itemSearches[event.target.dataset.itemSearch]=event.target.value;
    itemDropdownOpen[event.target.dataset.itemSearch]=true;
    activeItemIndexes[event.target.dataset.itemSearch]=0;
    updateSlotItems(event.target.dataset.itemSearch);
    return;
  }
  const el=event.target;const gear=build.gear[el.dataset.slot];if(!gear)return;
  if(el.dataset.prop&&el.dataset.prop!=="item"){
    if(el.dataset.prop!=="level")gear[el.dataset.prop]=el.value;
    if(el.dataset.prop==="modifier"){
      const item=ITEMS.find(entry=>entry.name===gear.name);
      if(!canUseModifier(gear,item)){gear.modifier="";showToast("Atlantean cannot be applied to Virtuous gear or items that do not accept modifiers.");}
    }
    if(el.dataset.prop==="enchant"&&gear.enchant==="virtuous"&&gear.modifier==="atlantean")gear.modifier="";
  }
  if(el.dataset.socketProp){
    const index=Number(el.dataset.socket);
    setSocketValue(el.dataset.slot,index,el.dataset.socketProp,el.value);
    const socket=gear.sockets[index];
    if(el.dataset.socketProp==="gem"){
      const fusion=el.closest(".socket").querySelector('[data-socket-prop="fusionGem"]');
      if(!el.value){socket.fusionGem="";fusion.value="";}
      fusion.disabled=!el.value;
    }
  }
  updateSummary();persist();
});
document.getElementById("gear-grid").addEventListener("keydown",event=>{
  const input=event.target;
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
  const result=event.target.closest("[data-select-item]");
  if(result){selectItem(result.dataset.selectItem,result.dataset.itemName);return;}
});
document.addEventListener("click",event=>{
  if(event.target.closest(".item-picker"))return;
  for(const slot of SLOTS)if(itemDropdownOpen[slot.id]){itemDropdownOpen[slot.id]=false;renderItemResults(slot.id);}
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
  for(const slot of SLOTS){build.gear[slot.id]=null;itemSearches[slot.id]="";itemDropdownOpen[slot.id]=false;activeItemIndexes[slot.id]=0;}
  render();persist();
  showToast("All equipment cleared.");
});
document.getElementById("gear-grid").addEventListener("change",event=>{
  const el=event.target;
  if(el.dataset.prop==="enchant"&&build.gear[el.dataset.slot]){
    const gear=build.gear[el.dataset.slot];
    if(gear.enchant==="virtuous"&&gear.modifier==="atlantean")gear.modifier="";
    const item=ITEMS.find(entry=>entry.name===gear.name);
    gear.sockets=(gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0));
    render();persist();return;
  }
  if(el.dataset.prop==="modifier"&&build.gear[el.dataset.slot]){
    const gear=build.gear[el.dataset.slot];
    const item=ITEMS.find(entry=>entry.name===gear.name);
    if(!canUseModifier(gear,item)){gear.modifier="";showToast("Atlantean cannot be applied to Virtuous gear or items that do not accept modifiers.");}
    gear.sockets=(gear.sockets||[]).slice(0,(item?.jewelSlots||0)+(gear.modifier==="gilded"?1:0));
    render();persist();return;
  }
  if(el.dataset.prop==="level"&&build.gear[el.dataset.slot]){
    const gear=build.gear[el.dataset.slot];
    const item=ITEMS.find(entry=>entry.name===gear.name);
    gear.level=item?normalizeItemLevel(item,el.value):Math.max(1,Math.min(300,safeNumber(el.value)||1));
    if(item)gear.stats=getItemStatsAtLevel(item,gear.level);
    render();persist();
  }
});
document.getElementById("build-name").addEventListener("input",event=>{build.name=event.target.value;persist();});
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
document.getElementById("player-level").addEventListener("input",event=>{build.level=Math.max(1,Math.min(300,safeNumber(event.target.value)||1));event.target.value=build.level;updateSummary();persist();});
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
function importBuildData(parsed){
  if(!parsed||!parsed.gear||typeof parsed.gear!=="object")throw new Error("This does not look like a valid build code.");
  const merged={...structuredClone(starter),...parsed,gear:{...structuredClone(starter.gear),...parsed.gear}};
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
  document.getElementById("import-panel").hidden=true;
  document.getElementById("import-code").value="";
  showToast("Build imported.");
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
render();
