window.BUILDER_FIGHTING_GEAR_DATA = (() => {
  // These style pieces use a simple level-based stat curve so armor/accessory values stay
  // consistent with the wiki's scaling model instead of the previous uneven formula.
  const styles = [
    ["Basic Combat", {power:0.55,haste:0.55}],
    ["Boxing", {range:0.55,resistance:0.55}],
    ["Cannon Fist", {haste:0.55,pierce:0.55}],
    ["Iron Leg", {power:0.55,resistance:0.75,dexterity:0.25}],
    ["Powder Fist", {power:0.55,pierce:0.55}],
    ["Sailor Style", {power:0.55,size:0.55}],
    ["Thermo Fist", {dexterity:0.75,haste:0.55,size:0.25}],
    ["Vanishing Style", {haste:0.55,range:0.55}]
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

  function getStats(piece,styleStats,level){
    const stats={};
    const levelScale = level / 10;
    for(const stat of new Set([...Object.keys(piece.stats),...Object.keys(styleStats)])){
      const baseValue = piece.stats[stat] || 0;
      const styleValue = styleStats[stat] || 0;
      const combinedValue = (baseValue * levelScale) + (styleValue * levelScale * (piece.fullImbue ? 1.2 : 1));
      const value = Math.round(combinedValue * 10) / 10;
      if(value !== 0)stats[stat] = value;
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
