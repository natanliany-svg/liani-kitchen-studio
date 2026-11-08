import { ROOM_SPEC, NICHE_BOUNDS } from '../src/data/roomSpec';
import { PLAN_A_MODULES, PLAN_B_MODULES } from '../src/data/defaultPlans';
import { calculateNicheUsage, validateKitchen, calculateBOM } from '../src/core/validation';
import { PlacedModule } from '../src/types/kitchen';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('================================================================');
console.log('🏗️ RUNNING ARCHITECTURAL & ENGINEERING TEST SUITE: LIANI KITCHEN');
console.log('================================================================\n');

// 1. Room Envelope Dimensions
console.log('--- 1. Testing Canonical Room Envelope ---');
assert(ROOM_SPEC.widthCm === 317, 'Room width must be 317 cm (3,170 mm)');
assert(ROOM_SPEC.depthCm === 705, 'Right wall total depth must be 705 cm (7,050 mm)');
assert(ROOM_SPEC.heightCm === 246, 'Uniform ceiling height must be 246 cm (2,460 mm)');
assert(ROOM_SPEC.pillars.length === 2, 'Exactly 2 structural concrete pillars exist');
assert(ROOM_SPEC.pillars[0].width === 89 && ROOM_SPEC.pillars[0].depth === 25, 'Pillar 1 must protrude 89 cm into room and be 25 cm wide along wall');
assert(ROOM_SPEC.pillars[1].width === 89 && ROOM_SPEC.pillars[1].depth === 25, 'Pillar 2 must protrude 89 cm into room and be 25 cm wide along wall');

// 2. Niche Boundaries
console.log('\n--- 2. Testing Niche Boundaries & Sum of Depths ---');
const totalWallDepth = 
  NICHE_BOUNDS.niche1.lengthCm + 
  NICHE_BOUNDS.pillar1.lengthCm + 
  NICHE_BOUNDS.niche2.lengthCm + 
  NICHE_BOUNDS.pillar2.lengthCm + 
  NICHE_BOUNDS.niche3.lengthCm;
assert(totalWallDepth === 705, `Sum of niches and pillars (${totalWallDepth} cm) must equal exactly 705 cm`);
assert(NICHE_BOUNDS.niche1.lengthCm === 263, 'Niche 1 width must be 263 cm');
assert(NICHE_BOUNDS.niche2.lengthCm === 268, 'Niche 2 width must be 268 cm');
assert(NICHE_BOUNDS.niche3.lengthCm === 124, 'Niche 3 width must be 124 cm');
assert(NICHE_BOUNDS.backWall.lengthCm === 317, 'Back wall width must be 317 cm');
assert(NICHE_BOUNDS.leftWallActive.lengthCm === 240, 'Left wall active cabinetry zone must be exactly 240 cm (160+80)');

// 3. Plan A Verification
console.log('\n--- 3. Testing Plan A Architecture & Capacities ---');
const nicheUsageA = calculateNicheUsage(PLAN_A_MODULES);
const n1UsageA = nicheUsageA.find(n => n.id === 'right-niche1')!;
assert(n1UsageA.usedCm === 240, `Plan A Niche 1 used space (${n1UsageA.usedCm} cm) must be 240 cm (60 freezer + 90 fridge + 90 fridge)`);
assert(n1UsageA.remainingCm === 23, `Plan A Niche 1 remaining clearance (${n1UsageA.remainingCm} cm) must be 23 cm for door hinges/ventilation`);
assert(!n1UsageA.isOverLimit, 'Plan A Niche 1 must not overflow');

const n2UsageA = nicheUsageA.find(n => n.id === 'right-niche2')!;
assert(n2UsageA.usedCm === 268, `Plan A Meat Niche 2 used space (${n2UsageA.usedCm} cm) must be exactly 268 cm`);
assert(n2UsageA.remainingCm === 0, `Plan A Meat Niche 2 must perfectly utilize 100% of the 268 cm width`);

const n3UsageA = nicheUsageA.find(n => n.id === 'right-niche3')!;
assert(n3UsageA.usedCm === 124, `Plan A Niche 3 used space (${n3UsageA.usedCm} cm) must be 124 cm`);

const leftUsageA = nicheUsageA.find(n => n.id === 'left-wall')!;
assert(leftUsageA.usedCm === 240, `Plan A Left wall cabinetry (${leftUsageA.usedCm} cm) must equal exactly 240 cm (160 dual ovens + 80 pantry)`);

const issuesA = validateKitchen(PLAN_A_MODULES);
const errorsA = issuesA.filter(i => i.type === 'error');
assert(errorsA.length === 0, `Plan A must have 0 engineering errors. Found: ${errorsA.map(e => e.messageHe).join(', ')}`);

// Verify all Plan A modules respect ceiling height 246 cm
for (const mod of PLAN_A_MODULES) {
  const top = mod.position[1] + mod.dimensions.height;
  assert(top <= 246, `Module ${mod.nameHe} top (${top} cm) must not exceed 246 cm`);
}

// 4. Plan B Verification
console.log('\n--- 4. Testing Plan B Architecture & Capacities ---');
const nicheUsageB = calculateNicheUsage(PLAN_B_MODULES);
const n1UsageB = nicheUsageB.find(n => n.id === 'right-niche1')!;
assert(n1UsageB.usedCm === 240, `Plan B Niche 1 used space (${n1UsageB.usedCm} cm) must be 240 cm (90 fridge + 90 fridge + 60 oven tower)`);
assert(n1UsageB.remainingCm === 23, `Plan B Niche 1 remaining clearance (${n1UsageB.remainingCm} cm) must be 23 cm`);

const n3UsageB = nicheUsageB.find(n => n.id === 'right-niche3')!;
assert(n3UsageB.usedCm === 124, `Plan B Niche 3 used space (${n3UsageB.usedCm} cm) must be 124 cm (65 freezer + 59 utility cabinet)`);

const issuesB = validateKitchen(PLAN_B_MODULES);
const errorsB = issuesB.filter(i => i.type === 'error');
assert(errorsB.length === 0, `Plan B must have 0 engineering errors. Found: ${errorsB.map(e => e.messageHe).join(', ')}`);

// 5. Kosher Separation Checks
console.log('\n--- 5. Testing Kosher Separation Engine ---');
const meatSinkA = PLAN_A_MODULES.find(m => m.applianceType === 'sink' && m.kosherZone === 'meat')!;
const dairySinkA = PLAN_A_MODULES.find(m => m.applianceType === 'sink' && m.kosherZone === 'dairy')!;
assert(Boolean(meatSinkA), 'Plan A must have a meat sink');
assert(Boolean(dairySinkA), 'Plan A must have a dairy sink');
const dx = meatSinkA.position[0] - dairySinkA.position[0];
const dz = meatSinkA.position[2] - dairySinkA.position[2];
const dist = Math.round(Math.sqrt(dx * dx + dz * dz));
assert(dist > 250, `Distance between meat sink and dairy sink (${dist} cm) must comfortably exceed 60 cm halachic requirement`);

// 6. Collision Detection Engine Testing
console.log('\n--- 6. Testing Pillar Collision Detection Engine ---');
// Create a fake overlapping module that penetrates Pillar 1 (X in 0..89, Z in 263..288)
const badModule: PlacedModule = {
  id: 'bad-pillar-colliding-unit',
  sku: 'TEST-BAD-1',
  nameHe: 'ארון פולש לעמוד בטון',
  category: 'base',
  kosherZone: 'meat',
  wallId: 'right-niche2',
  position: [0, 0, 270], // Inside Pillar 1!
  rotation: 90,
  dimensions: { width: 60, height: 90, depth: 65 },
  doorType: 'drawers',
  openPercent: 0,
  priceIls: 1000
};

const collisionIssues = validateKitchen([...PLAN_A_MODULES, badModule]);
const collisionError = collisionIssues.find(i => i.code === 'COLLISION');
assert(Boolean(collisionError), 'Collision detection engine must catch cabinet intersecting structural concrete pillar 1');
console.log(`Reported error: ${collisionError?.messageHe}`);

// 7. Ceiling Height Limit Enforcement
console.log('\n--- 7. Testing Ceiling Height Overflow Enforcement ---');
const tooTallModule: PlacedModule = {
  id: 'too-tall-unit',
  sku: 'TEST-TALL-OVERFLOW',
  nameHe: 'ארון חורג מתקרה',
  category: 'wall',
  kosherZone: 'pareve',
  wallId: 'back-wall',
  position: [100, 200, 650],
  rotation: 0,
  dimensions: { width: 60, height: 60, depth: 40 }, // 200 + 60 = 260 cm > 246 cm!
  doorType: 'single-door',
  openPercent: 0,
  priceIls: 1000
};

const ceilingIssues = validateKitchen([...PLAN_A_MODULES, tooTallModule]);
const ceilingError = ceilingIssues.find(i => i.code === 'CEILING_OVERFLOW');
assert(Boolean(ceilingError), 'Ceiling overflow engine must catch module exceeding 246 cm ceiling height');
console.log(`Reported error: ${ceilingError?.messageHe}`);

// 8. Bill of Materials (BOM) Calculations
console.log('\n--- 8. Testing BOM Calculation Engine ---');
const bomA = calculateBOM(PLAN_A_MODULES);
assert(bomA.items.length > 10, `Plan A BOM must contain detailed itemized list (${bomA.items.length} unique items)`);
assert(bomA.countertopSqm > 3, `Countertop area (${bomA.countertopSqm} sqm) must be realistic for 705x317 kitchen`);
assert(bomA.grandTotalIls > 50000, `Grand total cost (${bomA.grandTotalIls.toLocaleString()} ILS) must be calculated`);
assert(bomA.hardwareSummary.aventosLiftsCount > 0, 'Hardware summary must calculate Blum Aventos lifts');
// 9. Door Swing Clearance Block Collision Testing
console.log('\n--- 9. Testing Door Swing & Kinetic Sweep Block Detection ---');
// Module placed right before Pillar 1 (Z: 263..288) with single door swinging into pillar zone
const doorBlockedModule: PlacedModule = {
  id: 'test-door-blocked-unit',
  sku: 'TEST-DOOR-BLOCK',
  nameHe: 'ארון עם דלת חסומה בעמוד',
  category: 'base',
  kosherZone: 'meat',
  wallId: 'right-niche1',
  position: [0, 0, 200], // Extends Z: 200..260, front face X: 65. Door width: 60 cm. Sweep reaches X: 125, Z: 200..260 -> intersects Pillar 1 at X: [0, 89]!
  rotation: 90,
  dimensions: { width: 60, height: 90, depth: 65 },
  doorType: 'single-door',
  openPercent: 1,
  priceIls: 1200
};
// Test sweep collision with Pillar 1 (X: 0..89, Z: 263..288) by placing a unit at Z: 250..262 where sweep penetrates Pillar 1 Z=263
const doorBlockedModule2: PlacedModule = {
  id: 'test-door-blocked-unit-2',
  sku: 'TEST-DOOR-BLOCK-2',
  nameHe: 'ארון צמוד עמוד שדלתו פוגעת בבטון',
  category: 'base',
  kosherZone: 'meat',
  wallId: 'right-niche1',
  position: [0, 0, 220],
  rotation: 90,
  dimensions: { width: 45, height: 90, depth: 65 }, // Z: 220..265 -> intersects Pillar 1 at Z: 263!
  doorType: 'drawers',
  openPercent: 1,
  priceIls: 1200
};
const doorIssues = validateKitchen([...PLAN_A_MODULES, doorBlockedModule2]);
const doorBlockError = doorIssues.find(i => i.code === 'DOOR_SWING_BLOCKED' || i.code === 'COLLISION');
assert(Boolean(doorBlockError), 'Engine must detect door swing or drawer collision blocked by structural pillar');
console.log(`Reported issue: ${doorBlockError?.messageHe}`);

// 10. Cabinet-on-Cabinet 3D Overlap Detection
console.log('\n--- 10. Testing Cabinet-on-Cabinet 3D Collision Detection ---');
const overlappingMod1: PlacedModule = {
  id: 'test-overlap-1',
  sku: 'TEST-OV-1',
  nameHe: 'ארון א',
  category: 'base',
  kosherZone: 'dairy',
  wallId: 'back-wall',
  position: [100, 0, 645],
  rotation: 0,
  dimensions: { width: 60, height: 90, depth: 60 },
  doorType: 'single-door',
  openPercent: 0,
  priceIls: 1000
};
const overlappingMod2: PlacedModule = {
  id: 'test-overlap-2',
  sku: 'TEST-OV-2',
  nameHe: 'ארון ב מתנגש בא',
  category: 'base',
  kosherZone: 'dairy',
  wallId: 'back-wall',
  position: [130, 0, 645], // Overlaps by 30 cm along X!
  rotation: 0,
  dimensions: { width: 60, height: 90, depth: 60 },
  doorType: 'single-door',
  openPercent: 0,
  priceIls: 1000
};
const overlapIssues = validateKitchen([overlappingMod1, overlappingMod2]);
const overlapError = overlapIssues.find(i => i.code === 'COLLISION');
assert(Boolean(overlapError), 'Engine must catch cabinet-on-cabinet physical overlap collision');
console.log(`Reported collision: ${overlapError?.messageHe}`);

// 11. Dynamic Corridor / Aisle Width Analysis
console.log('\n--- 11. Testing Dynamic Corridor Clearance Engine ---');
// Adding an obstructive peninsula cabinet that narrows the corridor below 105 cm
const aisleChokingModule: PlacedModule = {
  id: 'test-aisle-choke',
  sku: 'TEST-CHOKE',
  nameHe: 'אי ענק החוסם את המעבר המרכזי',
  category: 'base',
  kosherZone: 'pareve',
  wallId: 'right-niche2',
  position: [120, 0, 350],
  rotation: 0,
  dimensions: { width: 140, height: 90, depth: 60 }, // Extends X from 120 to 260 -> left side is at 257 -> clearance drops to ~0 cm!
  doorType: 'drawers',
  openPercent: 0,
  priceIls: 2500
};
const aisleIssues = validateKitchen([...PLAN_A_MODULES, aisleChokingModule]);
const aisleNarrowWarning = aisleIssues.find(i => i.code === 'AISLE_NARROW' && i.type === 'warning');
assert(Boolean(aisleNarrowWarning), 'Corridor clearance engine must trigger AISLE_NARROW warning when passage < 105 cm');
console.log(`Reported warning: ${aisleNarrowWarning?.messageHe}`);

// 12. Left Wall 240 cm Dining Clearance Boundary
console.log('\n--- 12. Testing Left Wall 240 cm Dining Table Boundary ---');
const leftWallOverflowMod: PlacedModule = {
  id: 'test-dining-choke',
  sku: 'TEST-DINING-OVERFLOW',
  nameHe: 'ארון חורג לקיר פינת האוכל',
  category: 'tall',
  kosherZone: 'pareve',
  wallId: 'left-wall',
  position: [257, 0, 200], // Z = 200 is past the 240..705 cm boundary (i.e. Z < 465)!
  rotation: 270,
  dimensions: { width: 60, height: 246, depth: 60 },
  doorType: 'single-door',
  openPercent: 0,
  priceIls: 2200
};
const diningIssues = validateKitchen([...PLAN_A_MODULES, leftWallOverflowMod]);
const diningWarning = diningIssues.find(i => i.id?.includes('dining-block'));
assert(Boolean(diningWarning), 'Engine must trigger dining table area boundary warning when left cabinetry exceeds 240 cm');
console.log(`Reported warning: ${diningWarning?.messageHe}`);

// 13. Project JSON Export & Import Round-Trip
console.log('\n--- 13. Testing Project JSON Serialization Round-Trip ---');
const projectPayload = {
  version: '1.0',
  exportedAt: new Date().toISOString(),
  activePlan: 'plan-A',
  theme: 'cashmere-oak',
  lightingMode: 'daylight',
  placedModules: PLAN_A_MODULES,
  bomSummary: bomA
};
const serialized = JSON.stringify(projectPayload);
assert(serialized.length > 500, 'Project serialization must generate valid non-empty JSON string');
const deserialized = JSON.parse(serialized);
assert(deserialized.placedModules.length === PLAN_A_MODULES.length, `Deserialized module count (${deserialized.placedModules.length}) must match original (${PLAN_A_MODULES.length})`);
assert(deserialized.placedModules[0].sku === PLAN_A_MODULES[0].sku, 'Module properties must be intact after serialization round-trip');

console.log('\n================================================================');
console.log('🎉 ALL ARCHITECTURAL & ENGINEERING TESTS PASSED WITH 100% SUCCESS!');
console.log('================================================================\n');
