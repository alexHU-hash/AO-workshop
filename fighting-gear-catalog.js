window.BUILDER_FIGHTING_GEAR_DATA = (() => {
  const styles = [
    ["Basic Combat", {power:0.5,haste:0.5}],
    ["Boxing", {range:0.5,resistance:0.5}],
    ["Cannon Fist", {haste:0.5,pierce:0.5}],
    ["Iron Leg", {power:0.5,resistance:0.75,dexterity:-0.25}],
    ["Powder Fist", {power:0.5,pierce:0.5}],
    ["Sailor Style", {power:0.5,size:0.5}],
    ["Thermo Fist", {dexterity:0.75,haste:0.5,size:-0.25}],
    ["Vanishing Style", {haste:0.5,range:0.5}]
  ];
  const pieces = [
    {name:"Fighting Armor",category:"Chestplate",subType:"Chestpiece",stats:{defense:0.42},fullImbue:true},
    {name:"Fighting Leggings",category:"Boots",subType:"Leggings",stats:{defense:0.315}},
    {name:"Fighting Headband",category:"Accessory",subType:"Hat",stats:{power:0.27}},
    {name:"Fighting Handwraps",category:"Accessory",subType:"Arm",stats:{dexterity:0.5625}},
    {name:"Fighting Chestplate",category:"Chestplate",subType:"Chestpiece",stats:{defense:0.315},fullImbue:true},
    {name:"Fighting Greaves",category:"Boots",subType:"Leggings",stats:{haste:0.225,pierce:0.375}},
    {name:"Fighting Balteus",category:"Accessory",subType:"Waist",stats:{haste:0.225,pierce:0.375}},
    {name:"Fighting Robes",category:"Chestplate",subType:"Chestpiece",stats:{power:0.36},fullImbue:true},
    {name:"Fighting Boots",category:"Boots",subType:"Leggings",stats:{power:0.27}}
  ];
  const baseConstants = {power:0.19575,defense:0.22345};
  const imbueConstants = {power:0.315,defense:2.7};
  const substats = ["range","haste","size","dexterity","regeneration","pierce","resistance"];

  function getStats(piece,styleStats,level){
    const stats={};
    for(const stat of new Set([...Object.keys(piece.stats),...Object.keys(styleStats)])){
      const baseMultiplier=piece.stats[stat]||0;
      const constant=stat==="power"?imbueConstants.power:stat==="defense"?imbueConstants.defense:substats.includes(stat)?0.5:0;
      const baseStat=stat==="power"?baseMultiplier*level*imbueConstants.power
        :stat==="defense"?baseMultiplier*level*imbueConstants.defense
        :substats.includes(stat)?baseMultiplier*level*0.5:0;
      const imbueConstant=baseConstants[stat]??(substats.includes(stat)?0.4:0);
      const imbueStat=(styleStats[stat]||0)*level*constant*1.5*imbueConstant*(piece.fullImbue?1:0.75);
      const value=Math.floor((baseStat+imbueStat)*10)/10;
      if(value)stats[stat]=value;
    }
    return stats;
  }

  return styles.flatMap(([style,styleStats])=>pieces.map(piece=>({
    id:`${style.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${piece.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
    name:piece.name.replace("Fighting",style),
    fightingStyle:style,
    fightingPiece:piece.name,
    category:piece.category,
    subType:piece.subType,
    minLevel:100,
    maxLevel:170,
    jewelSlots:2,
    essenceLocked:false,
    modifierAllowed:false,
    statRows:Array.from({length:8},(_,index)=>{
      const level=100+index*10;
      return {level,stats:getStats(piece,styleStats,level)};
    })
  })));
})();
