// Step 4 object pool and slice preview.
const OBJECT_CACHE={},OBJECT_POOLS={};
/* This creates and caches one object template. */
function createObjectTemplate(typeName){if(OBJECT_CACHE[typeName])return OBJECT_CACHE[typeName];const d=OBJECT_DATA[typeName];if(!d)return null;const t={typeName:typeName,data:d,geometry:buildObjectGeometry(typeName),halfGeometries:buildObjectHalfGeometries(typeName),materials:getObjectMaterials(typeName)};OBJECT_CACHE[typeName]=t;return t;}
/* This creates one reusable object. */
function createObject(typeName){const t=createObjectTemplate(typeName);if(!t)return null;const r=new THREE.Group();r.name=t.data.name;r.userData.typeName=typeName;r.userData.objectType=t.data.type;r.userData.points=t.data.points;r.userData.isActive=false;r.userData.isSliced=false;if(typeName==="bomb"||typeName==="skullCrate"){const g=buildObjectGeometry(typeName);g.traverse(c=>{if(c.isMesh)c.material=t.materials.normal;});r.add(g);}else{const m=new THREE.Mesh(t.geometry,t.materials.normal);m.scale.setScalar(t.data.size);r.add(m);}return r;}
/* This creates a small pool for every object type. */
function initializeObjectPools(perType=2){for(const n in OBJECT_DATA){OBJECT_POOLS[n]=[];for(let i=0;i<perType;i++){const o=createObject(n);if(o){o.visible=false;OBJECT_POOLS[n].push(o);}}}}
/* This gets an inactive object from the pool. */
function getFromPool(typeName){if(!OBJECT_POOLS[typeName])OBJECT_POOLS[typeName]=[];let o=OBJECT_POOLS[typeName].find(x=>!x.userData.isActive);if(!o){o=createObject(typeName);if(!o)return null;OBJECT_POOLS[typeName].push(o);}o.userData.isActive=true;o.userData.isSliced=false;o.visible=true;o.position.set(0,0,0);o.rotation.set(0,0,0);o.scale.set(1,1,1);return o;}
/* This hides and returns an object to its pool. */
function returnToPool(o){if(!o)return;o.userData.isActive=false;o.userData.isSliced=false;o.visible=false;if(o.parent)o.parent.remove(o);}
/* This adds a pooled object to the scene. */
function activateObjectInScene(scene,typeName){const o=getFromPool(typeName);if(o)scene.add(o);return o;}
/* This creates two visible cut pieces without moving them. */
function showSlicedHalves(o,scene){if(!o||!scene)return[];const t=OBJECT_CACHE[o.userData.typeName]||createObjectTemplate(o.userData.typeName),a=[];if(!t)return a;for(let i=0;i<t.halfGeometries.length;i++){const m=new THREE.Mesh(t.halfGeometries[i],t.materials.cut);m.scale.setScalar(t.data.size);m.position.copy(o.position);m.rotation.copy(o.rotation);m.userData.isSlicePiece=true;m.userData.parentType=o.userData.typeName;scene.add(m);a.push(m);}o.userData.isSliced=true;o.visible=false;return a;}
/* This removes temporary slice pieces. */
function removeSlicePieces(pieces){if(!pieces)return;for(const p of pieces)if(p.parent)p.parent.remove(p);}
/* This returns the number of active pooled objects. */
function getActiveObjectCount(){let n=0;for(const k in OBJECT_POOLS)for(const o of OBJECT_POOLS[k])if(o.userData.isActive)n++;return n;}
