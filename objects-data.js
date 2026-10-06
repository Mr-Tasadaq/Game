// Step 4 object data: shared colors, data, and materials.
const OBJECT_COLORS={red:0xe53935,yellow:0xffd92f,brown:0x8b5a2b,orange:0xf28c28,green:0x32b85a,ice:0x8ed8ff,gold:0xffc928,purple:0xa855f7,cyan:0x22dff3,black:0x151515,darkRed:0x8f1717,blue:0x3b9cff};
const OBJECT_DATA={
ballFruit:{name:"Ball Fruit",type:"good",points:10,size:.7,color:OBJECT_COLORS.red,cutColor:0xffeeee,geometryBuilder:"buildBallFruit"},
longFruit:{name:"Long Fruit",type:"good",points:15,size:1.2,color:OBJECT_COLORS.yellow,cutColor:0xfff4b0,geometryBuilder:"buildLongFruit"},
cubeCrate:{name:"Cube Crate",type:"good",points:20,size:.9,color:OBJECT_COLORS.brown,cutColor:0xc99b62,geometryBuilder:"buildCubeCrate"},
barrel:{name:"Barrel",type:"good",points:25,size:1,color:OBJECT_COLORS.orange,cutColor:0xffc47a,geometryBuilder:"buildBarrel"},
bottle:{name:"Bottle",type:"good",points:30,size:1.1,color:OBJECT_COLORS.green,cutColor:0xb8f0c8,geometryBuilder:"buildBottle"},
iceBlock:{name:"Ice Block",type:"good",points:30,size:1,color:OBJECT_COLORS.ice,cutColor:0xd9f7ff,geometryBuilder:"buildIceBlock"},
goldCoin:{name:"Gold Coin",type:"good",points:40,size:.6,color:OBJECT_COLORS.gold,cutColor:0xffef8a,geometryBuilder:"buildGoldCoin"},
star:{name:"Star",type:"good",points:50,size:.8,color:OBJECT_COLORS.yellow,cutColor:0xffffc2,geometryBuilder:"buildStar"},
ring:{name:"Ring",type:"good",points:35,size:.8,color:OBJECT_COLORS.purple,cutColor:0xe1b8ff,geometryBuilder:"buildRing"},
crystal:{name:"Crystal",type:"good",points:50,size:.8,color:OBJECT_COLORS.cyan,cutColor:0xc9fbff,geometryBuilder:"buildCrystal"},
bomb:{name:"Bomb",type:"bad",points:0,size:.9,color:OBJECT_COLORS.black,cutColor:OBJECT_COLORS.darkRed,geometryBuilder:"buildBomb"},
skullCrate:{name:"Skull Crate",type:"bad",points:0,size:.9,color:OBJECT_COLORS.brown,cutColor:0xd6d6d6,geometryBuilder:"buildSkullCrate"},
freeze:{name:"Freeze",type:"power-up",points:0,size:.7,color:OBJECT_COLORS.blue,cutColor:0xc9eaff,geometryBuilder:"buildFreeze"},
doublePoints:{name:"Double Points",type:"power-up",points:0,size:.7,color:OBJECT_COLORS.gold,cutColor:0xffffbb,geometryBuilder:"buildDoublePoints"},
slowMotion:{name:"Slow Motion",type:"power-up",points:0,size:.7,color:OBJECT_COLORS.purple,cutColor:0xe6c8ff,geometryBuilder:"buildSlowMotion"}};
const OBJECT_MATERIALS={};
/* This creates shared normal and cut materials once. */
function createObjectMaterials(){if(Object.keys(OBJECT_MATERIALS).length)return OBJECT_MATERIALS;for(const k in OBJECT_DATA){const d=OBJECT_DATA[k];OBJECT_MATERIALS[k]={normal:new THREE.MeshLambertMaterial({color:d.color}),cut:new THREE.MeshLambertMaterial({color:d.cutColor})};}return OBJECT_MATERIALS;}
/* This returns materials for one object type. */
function getObjectMaterials(typeName){createObjectMaterials();return OBJECT_MATERIALS[typeName];}
/* This returns object names in gallery order. */
function getObjectTypeNames(){return Object.keys(OBJECT_DATA);}
