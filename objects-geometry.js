// Step 4 geometry builders. All geometry is generated locally.
/* This builds Ball Fruit. */
function buildBallFruit(){return new THREE.SphereGeometry(1,8,6);}
/* This builds Ball Fruit halves. */
function buildBallFruitHalves(){return[new THREE.SphereGeometry(1,8,4,0,Math.PI*2,0,Math.PI/2),new THREE.SphereGeometry(1,8,4,0,Math.PI*2,Math.PI/2,Math.PI/2)];}
/* This builds Long Fruit. */
function buildLongFruit(){return new THREE.CapsuleGeometry(.32,1,3,8);}
/* This builds Long Fruit halves. */
function buildLongFruitHalves(){return[new THREE.BoxGeometry(.34,.95,.64),new THREE.BoxGeometry(.34,.95,.64)];}
/* This builds Cube Crate. */
function buildCubeCrate(){return new THREE.BoxGeometry(1,1,1);}
/* This builds Cube Crate halves. */
function buildCubeCrateHalves(){return[new THREE.BoxGeometry(.5,1,1),new THREE.BoxGeometry(.5,1,1)];}
/* This builds Barrel. */
function buildBarrel(){return new THREE.CylinderGeometry(.48,.48,1,10);}
/* This builds Barrel halves. */
function buildBarrelHalves(){return[new THREE.CylinderGeometry(.48,.48,.48,10),new THREE.CylinderGeometry(.48,.48,.48,10)];}
/* This builds Bottle. */
function buildBottle(){const p=[new THREE.Vector2(.3,-.65),new THREE.Vector2(.38,-.52),new THREE.Vector2(.38,.2),new THREE.Vector2(.27,.38),new THREE.Vector2(.17,.48),new THREE.Vector2(.15,.72),new THREE.Vector2(.12,.78)];return new THREE.LatheGeometry(p,8);}
/* This builds Bottle halves. */
function buildBottleHalves(){return[new THREE.CylinderGeometry(.34,.34,.7,8),new THREE.CylinderGeometry(.28,.28,.7,8)];}
/* This builds Ice Block. */
function buildIceBlock(){return new THREE.BoxGeometry(1,1,1);}
/* This builds Ice fragments. */
function buildIceBlockHalves(){return[new THREE.BoxGeometry(.48,.85,.85),new THREE.BoxGeometry(.48,.85,.85)];}
/* This builds Gold Coin. */
function buildGoldCoin(){return new THREE.CylinderGeometry(.5,.5,.16,12);}
/* This builds Coin halves. */
function buildGoldCoinHalves(){return[new THREE.CylinderGeometry(.5,.5,.08,12),new THREE.CylinderGeometry(.5,.5,.08,12)];}
/* This builds Star. */
function buildStar(){const s=new THREE.Shape(),o=.5,i=.22;for(let n=0;n<10;n++){const a=n/10*Math.PI*2-Math.PI/2,r=n%2?i:o,x=Math.cos(a)*r,y=Math.sin(a)*r;n?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.18,bevelEnabled:false});}
/* This builds Star halves. */
function buildStarHalves(){return[new THREE.BoxGeometry(.65,.8,.18),new THREE.BoxGeometry(.65,.8,.18)];}
/* This builds Ring. */
function buildRing(){return new THREE.TorusGeometry(.32,.12,6,12);}
/* This builds Ring halves. */
function buildRingHalves(){return[new THREE.TorusGeometry(.32,.12,6,6,Math.PI),new THREE.TorusGeometry(.32,.12,6,6,Math.PI)];}
/* This builds Crystal. */
function buildCrystal(){return new THREE.OctahedronGeometry(.55,0);}
/* This builds Crystal fragments. */
function buildCrystalHalves(){return[new THREE.TetrahedronGeometry(.48,0),new THREE.TetrahedronGeometry(.48,0)];}
/* This builds Bomb. */
function buildBomb(){const g=new THREE.Group(),b=new THREE.Mesh(new THREE.SphereGeometry(.42,8,6)),f=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.3,6));b.position.y=-.05;f.position.y=.43;g.add(b,f);return g;}
/* This builds Bomb preview halves. */
function buildBombHalves(){return[new THREE.SphereGeometry(.42,8,4),new THREE.SphereGeometry(.42,8,4)];}
/* This builds Skull Crate. */
function buildSkullCrate(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1)));return g;}
/* This builds Skull Crate halves. */
function buildSkullCrateHalves(){return[new THREE.BoxGeometry(.5,1,1),new THREE.BoxGeometry(.5,1,1)];}
/* This builds Freeze. */
function buildFreeze(){return new THREE.OctahedronGeometry(.55,1);}
/* This builds Freeze halves. */
function buildFreezeHalves(){return[new THREE.TetrahedronGeometry(.5,1),new THREE.TetrahedronGeometry(.5,1)];}
/* This builds Double Points. */
function buildDoublePoints(){const s=new THREE.Shape(),o=.55,i=.25;for(let n=0;n<10;n++){const a=n/10*Math.PI*2-Math.PI/2,r=n%2?i:o,x=Math.cos(a)*r,y=Math.sin(a)*r;n?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.2,bevelEnabled:false});}
/* This builds Double Points halves. */
function buildDoublePointsHalves(){return[new THREE.BoxGeometry(.55,.8,.2),new THREE.BoxGeometry(.55,.8,.2)];}
/* This builds Slow Motion. */
function buildSlowMotion(){return new THREE.TorusGeometry(.38,.1,6,12);}
/* This builds Slow Motion halves. */
function buildSlowMotionHalves(){return[new THREE.TorusGeometry(.38,.1,6,6,Math.PI),new THREE.TorusGeometry(.38,.1,6,6,Math.PI)];}
/* This builds normal geometry from object data. */
function buildObjectGeometry(typeName){const d=OBJECT_DATA[typeName];if(!d)return null;const fn=window[d.geometryBuilder];return typeof fn==="function"?fn():null;}
/* This builds reusable slice geometries. */
function buildObjectHalfGeometries(typeName){const n="build"+typeName.charAt(0).toUpperCase()+typeName.slice(1)+"Halves",fn=window[n];return typeof fn==="function"?fn():[new THREE.BoxGeometry(.5,.5,.5),new THREE.BoxGeometry(.5,.5,.5)];}
