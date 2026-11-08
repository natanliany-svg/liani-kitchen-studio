import { PlacedModule, ValidationIssue, NicheInfo, BOMSummary } from '../types/kitchen';
import { NICHE_BOUNDS, ROOM_SPEC } from '../data/roomSpec';

export function calculateNicheUsage(modules: PlacedModule[]): NicheInfo[] {
  // Filter base/tall/appliance units occupying floor space in each niche
  const floorModules = modules.filter(m => m.category !== 'wall');

  // Helper to determine module wall if free
  const getEffectiveWall = (m: PlacedModule): PlacedModule['wallId'] => {
    if (m.wallId !== 'free') return m.wallId;
    if (m.position[0] <= 10) {
      if (m.position[2] < 263) return 'right-niche1';
      if (m.position[2] >= 263 && m.position[2] <= 556) return 'right-niche2';
      return 'right-niche3';
    }
    if (m.position[2] >= 630) return 'back-wall';
    if (m.position[0] >= 240) return 'left-wall';
    return 'free';
  };

  // Niche 1: Z in [0, 263] on right wall
  const n1Modules = floorModules.filter(m => getEffectiveWall(m) === 'right-niche1');
  const n1Used = n1Modules.reduce((acc, m) => acc + (m.rotation === 90 || m.rotation === 270 ? m.dimensions.width : m.dimensions.depth), 0);

  // Niche 2: Z in [288, 556] on right wall
  const n2Modules = floorModules.filter(m => getEffectiveWall(m) === 'right-niche2');
  const n2Used = n2Modules.reduce((acc, m) => acc + (m.rotation === 90 || m.rotation === 270 ? m.dimensions.width : m.dimensions.depth), 0);

  // Niche 3: Z in [581, 705] on right wall
  const n3Modules = floorModules.filter(m => getEffectiveWall(m) === 'right-niche3');
  const n3Used = n3Modules.reduce((acc, m) => acc + (m.rotation === 90 || m.rotation === 270 ? m.dimensions.width : m.dimensions.depth), 0);

  // Back Wall: X in [0, 317] at Z = 705
  const backModules = floorModules.filter(m => getEffectiveWall(m) === 'back-wall');
  const backUsed = backModules.reduce((acc, m) => acc + (m.rotation === 0 || m.rotation === 180 ? m.dimensions.width : m.dimensions.depth), 0);

  // Left Wall Active zone: 240 cm (Z from 400 to 640)
  const leftModules = floorModules.filter(m => getEffectiveWall(m) === 'left-wall' && m.position[2] >= 390);
  const leftUsed = leftModules.reduce((acc, m) => acc + (m.rotation === 90 || m.rotation === 270 ? m.dimensions.width : m.dimensions.depth), 0);

  return [
    {
      id: 'right-niche1',
      nameHe: 'נישה 1 (כניסה)',
      wallId: 'right-niche1',
      capacityCm: NICHE_BOUNDS.niche1.lengthCm,
      depthCm: 89,
      usedCm: Math.round(n1Used),
      remainingCm: Math.round(NICHE_BOUNDS.niche1.lengthCm - n1Used),
      isOverLimit: n1Used > NICHE_BOUNDS.niche1.lengthCm
    },
    {
      id: 'right-niche2',
      nameHe: 'נישה 2 (בשרי)',
      wallId: 'right-niche2',
      capacityCm: NICHE_BOUNDS.niche2.lengthCm,
      depthCm: 89,
      usedCm: Math.round(n2Used),
      remainingCm: Math.round(NICHE_BOUNDS.niche2.lengthCm - n2Used),
      isOverLimit: n2Used > NICHE_BOUNDS.niche2.lengthCm
    },
    {
      id: 'right-niche3',
      nameHe: 'נישה 3 (פינה אחורית)',
      wallId: 'right-niche3',
      capacityCm: NICHE_BOUNDS.niche3.lengthCm,
      depthCm: 89,
      usedCm: Math.round(n3Used),
      remainingCm: Math.round(NICHE_BOUNDS.niche3.lengthCm - n3Used),
      isOverLimit: n3Used > NICHE_BOUNDS.niche3.lengthCm
    },
    {
      id: 'back-wall',
      nameHe: 'קיר אחורי (חלבי)',
      wallId: 'back-wall',
      capacityCm: NICHE_BOUNDS.backWall.lengthCm,
      depthCm: 65,
      usedCm: Math.round(backUsed),
      remainingCm: Math.round(NICHE_BOUNDS.backWall.lengthCm - backUsed),
      isOverLimit: backUsed > NICHE_BOUNDS.backWall.lengthCm
    },
    {
      id: 'left-wall',
      nameHe: 'קיר שמאל (נגרות)',
      wallId: 'left-wall',
      capacityCm: NICHE_BOUNDS.leftWallActive.lengthCm,
      depthCm: 60,
      usedCm: Math.round(leftUsed),
      remainingCm: Math.round(NICHE_BOUNDS.leftWallActive.lengthCm - leftUsed),
      isOverLimit: leftUsed > NICHE_BOUNDS.leftWallActive.lengthCm
    }
  ];
}

export function validateKitchen(modules: PlacedModule[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Helper for 3D bounding box of a module
  const getModuleBounds = (mod: PlacedModule) => {
    const isRot = mod.rotation === 90 || mod.rotation === 270;
    const w = isRot ? mod.dimensions.depth : mod.dimensions.width;
    const d = isRot ? mod.dimensions.width : mod.dimensions.depth;
    return {
      minX: mod.position[0],
      maxX: mod.position[0] + w,
      minY: mod.position[1],
      maxY: mod.position[1] + mod.dimensions.height,
      minZ: mod.position[2],
      maxZ: mod.position[2] + d
    };
  };

  // 1. Check Ceiling Height
  for (const mod of modules) {
    const totalTop = mod.position[1] + mod.dimensions.height;
    if (totalTop > ROOM_SPEC.heightCm + 1) {
      issues.push({
        id: `ceil-${mod.id}`,
        type: 'error',
        code: 'CEILING_OVERFLOW',
        messageHe: `ארון "${mod.nameHe}" חורג מגובה התקרה האחיד (${ROOM_SPEC.heightCm} ס"מ) ומגיע ל-${totalTop} ס"מ.`,
        relatedModuleIds: [mod.id]
      });
    }
  }

  // 2. Check Structural Pillar Collisions (Pillar 1 and 2: X in [0, 89], Z in [263, 288] and [556, 581])
  for (const mod of modules) {
    if (mod.category === 'furniture') continue;
    const b = getModuleBounds(mod);

    // Pillar 1 bounding box: X [0, 89], Z [263, 288]
    const p1OverlapX = Math.max(0, Math.min(b.maxX, 89) - Math.max(b.minX, 0));
    const p1OverlapZ = Math.max(0, Math.min(b.maxZ, 288) - Math.max(b.minZ, 263));
    if (p1OverlapX > 2 && p1OverlapZ > 2) {
      issues.push({
        id: `p1-col-${mod.id}`,
        type: 'error',
        code: 'COLLISION',
        messageHe: `התנגשות פיזית: "${mod.nameHe}" חודר לתוך עמוד בטון 1 (בליטה 89 ס"מ). עמוד זה קונסטרוקטיבי ואינו ניתן להריסה!`,
        relatedModuleIds: [mod.id]
      });
    }

    // Pillar 2 bounding box: X [0, 89], Z [556, 581]
    const p2OverlapX = Math.max(0, Math.min(b.maxX, 89) - Math.max(b.minX, 0));
    const p2OverlapZ = Math.max(0, Math.min(b.maxZ, 581) - Math.max(b.minZ, 556));
    if (p2OverlapX > 2 && p2OverlapZ > 2) {
      issues.push({
        id: `p2-col-${mod.id}`,
        type: 'error',
        code: 'COLLISION',
        messageHe: `התנגשות פיזית: "${mod.nameHe}" חודר לתוך עמוד בטון 2 (בליטה 89 ס"מ).`,
        relatedModuleIds: [mod.id]
      });
    }
  }

  // 3. Check Cabinet-on-Cabinet Overlap Collisions (modules in same zone penetrating each other)
  for (let i = 0; i < modules.length; i++) {
    for (let j = i + 1; j < modules.length; j++) {
      const mA = modules[i];
      const mB = modules[j];
      // Skip furniture or stacked units (e.g., base and wall cabinet directly on top of each other)
      if (mA.category === 'furniture' || mB.category === 'furniture') continue;
      
      const bA = getModuleBounds(mA);
      const bB = getModuleBounds(mB);

      const overlapX = Math.max(0, Math.min(bA.maxX, bB.maxX) - Math.max(bA.minX, bB.minX));
      const overlapY = Math.max(0, Math.min(bA.maxY, bB.maxY) - Math.max(bA.minY, bB.minY));
      const overlapZ = Math.max(0, Math.min(bA.maxZ, bB.maxZ) - Math.max(bA.minZ, bB.minZ));

      if (overlapX > 2 && overlapY > 2 && overlapZ > 2) {
        issues.push({
          id: `mod-col-${mA.id}-${mB.id}`,
          type: 'error',
          code: 'COLLISION',
          messageHe: `התנגשות בין ארונות: "${mA.nameHe}" ו-"${mB.nameHe}" חופפים במרחב (${Math.round(overlapX)}×${Math.round(overlapY)}×${Math.round(overlapZ)} ס"מ).`,
          relatedModuleIds: [mA.id, mB.id]
        });
      }
    }
  }

  // 4. Check Left Wall 240cm Limit (Dining Protection)
  const leftWallModules = modules.filter(m => m.wallId === 'left-wall' && m.category === 'tall');
  for (const mod of leftWallModules) {
    if (mod.position[2] < NICHE_BOUNDS.leftWallActive.zStart - 5) {
      issues.push({
        id: `dining-block-${mod.id}`,
        type: 'warning',
        code: 'NICHE_OVERFLOW',
        messageHe: `חריגה מקו ה-240 ס"מ המאושר בקיר שמאל! "${mod.nameHe}" חודר למרחב שולחן האוכל המשפחתי.`,
        relatedModuleIds: [mod.id]
      });
    }
  }

  // 5. Dynamic Corridor / Aisle Width Calculation
  // We measure the true minimum clearance between any obstacle on the right side
  // (Pillars reaching X=89, base counters reaching X=65 or 89) and any module on the left side (tall cabinets, counters, dining table)
  let minAisleClearance = 317;
  const floorModules = modules.filter(m => m.category !== 'wall');

  // Sample along the corridor Z from 200 to 600 in steps of 20 cm
  for (let zSample = 200; zSample <= 600; zSample += 20) {
    // Find rightmost obstacle at this Z
    let rightMaxX = 0;
    // Check pillars at this Z
    if ((zSample >= 263 && zSample <= 288) || (zSample >= 556 && zSample <= 581)) {
      rightMaxX = Math.max(rightMaxX, 89);
    }
    // Check right-side modules at this Z
    for (const mod of floorModules) {
      const b = getModuleBounds(mod);
      if (b.minZ <= zSample && b.maxZ >= zSample) {
        if (b.minX < 150) {
          rightMaxX = Math.max(rightMaxX, b.maxX);
        }
      }
    }

    // Find leftmost obstacle at this Z (modules on left or center)
    let leftMinX = ROOM_SPEC.widthCm;
    for (const mod of floorModules) {
      const b = getModuleBounds(mod);
      if (b.minZ <= zSample && b.maxZ >= zSample) {
        if (b.maxX > 150) {
          leftMinX = Math.min(leftMinX, b.minX);
        }
      }
    }

    const clearance = leftMinX - rightMaxX;
    if (clearance < minAisleClearance) {
      minAisleClearance = clearance;
    }
  }

  const roundedAisle = Math.round(minAisleClearance);
  if (roundedAisle < 105) {
    issues.push({
      id: 'aisle-narrow',
      type: 'warning',
      code: 'AISLE_NARROW',
      messageHe: `מעבר מרכזי צר מדי (${roundedAisle} ס"מ). תקן נוחות מינימלי דורש לפחות 105 ס"מ.`,
    });
  } else {
    issues.push({
      id: 'aisle-ok',
      type: 'info',
      code: 'AISLE_NARROW',
      messageHe: `רוחב מעבר מרכזי מצוין: ${roundedAisle} ס"מ נטו (מעל ומעבר לתקן 105 ס"מ)! מעבר מרווח ונוח לתנועה דו-סטרית.`,
    });
  }

  // 6. Door Swing & Kinetic Clearance Collision Detection
  for (const mod of modules) {
    if (mod.doorType === 'none' || mod.category === 'furniture') continue;
    const b = getModuleBounds(mod);

    // Calculate open door sweep bounding box in world space
    let sweepMinX = b.minX;
    let sweepMaxX = b.maxX;
    let sweepMinZ = b.minZ;
    let sweepMaxZ = b.maxZ;

    if (mod.rotation === 90) {
      // Right wall: door sweeps out towards +X into room
      const swingExtent = mod.doorType === 'drawers' ? 35 : mod.dimensions.width;
      sweepMaxX = b.maxX + swingExtent;
    } else if (mod.rotation === 0) {
      // Back wall: door sweeps out towards -Z into room
      const swingExtent = mod.doorType === 'drawers' 
        ? 35 
        : mod.doorType === 'double-door' 
        ? mod.dimensions.width / 2 
        : mod.doorType === 'lift-up' 
        ? 25 
        : Math.min(mod.dimensions.width, 60);
      sweepMinZ = b.minZ - swingExtent;
    } else if (mod.rotation === 270) {
      // Left wall: door sweeps out towards -X into room
      const swingExtent = mod.doorType === 'drawers' ? 35 : mod.dimensions.width;
      sweepMinX = b.minX - swingExtent;
    }

    // Check collision with Pillar 1 (X: [0, 89], Z: [263, 288]) if module is outside pillar
    if (b.minZ > 288 || b.maxZ < 263) {
      const p1OverlapX = Math.max(0, Math.min(sweepMaxX, 89) - Math.max(sweepMinX, 0));
      const p1OverlapZ = Math.max(0, Math.min(sweepMaxZ, 288) - Math.max(sweepMinZ, 263));
      if (p1OverlapX > 2 && p1OverlapZ > 2) {
        issues.push({
          id: `door-col-p1-${mod.id}`,
          type: 'error',
          code: 'DOOR_SWING_BLOCKED',
          messageHe: `רדיוס פתיחת דלת/מגירה של "${mod.nameHe}" חסום ע"י עמוד בטון 1!`,
          relatedModuleIds: [mod.id]
        });
      }
    }

    // Check collision with Pillar 2 (X: [0, 89], Z: [556, 581])
    if (b.minZ > 581 || b.maxZ < 556) {
      const p2OverlapX = Math.max(0, Math.min(sweepMaxX, 89) - Math.max(sweepMinX, 0));
      const p2OverlapZ = Math.max(0, Math.min(sweepMaxZ, 581) - Math.max(sweepMinZ, 556));
      if (p2OverlapX > 2 && p2OverlapZ > 2) {
        issues.push({
          id: `door-col-p2-${mod.id}`,
          type: 'error',
          code: 'DOOR_SWING_BLOCKED',
          messageHe: `רדיוס פתיחת דלת/מגירה של "${mod.nameHe}" חסום ע"י עמוד בטון 2!`,
          relatedModuleIds: [mod.id]
        });
      }
    }
  }

  // 7. Kosher Separation Check
  const meatSink = modules.find(m => m.applianceType === 'sink' && m.kosherZone === 'meat');
  const dairySink = modules.find(m => m.applianceType === 'sink' && m.kosherZone === 'dairy');
  if (meatSink && dairySink) {
    const dx = meatSink.position[0] - dairySink.position[0];
    const dz = meatSink.position[2] - dairySink.position[2];
    const distanceCm = Math.round(Math.sqrt(dx * dx + dz * dz));
    if (distanceCm < 60) {
      issues.push({
        id: 'kosher-sink-close',
        type: 'error',
        code: 'KOSHER_PROXIMITY',
        messageHe: `הפרדת כשרות לקויה: כיור בשרי וכיור חלבי קרובים מדי (${distanceCm} ס"מ). חובה לפחות 60 ס"מ הפרדה!`,
        relatedModuleIds: [meatSink.id, dairySink.id]
      });
    } else {
      issues.push({
        id: 'kosher-sink-ok',
        type: 'info',
        code: 'KOSHER_PROXIMITY',
        messageHe: `הפרדת כשרות מושלמת: מרחק של ${distanceCm} ס"מ בין הכיור הבשרי (נישה 2) לכיור החלבי (קיר אחורי).`,
        relatedModuleIds: [meatSink.id, dairySink.id]
      });
    }
  }

  return issues;
}

export function calculateBOM(modules: PlacedModule[]): BOMSummary {
  // Aggregate items by SKU
  const itemMap = new Map<string, {
    sku: string;
    nameHe: string;
    category: PlacedModule['category'];
    kosherZone: PlacedModule['kosherZone'];
    count: number;
    unitPriceIls: number;
    totalPriceIls: number;
    widthCm: number;
    heightCm: number;
    depthCm: number;
  }>();

  let carpentryTotal = 0;
  let appliancesTotal = 0;
  let aventosCount = 0;
  let legraboxCount = 0;
  let hingedDoorsCount = 0;
  let pocketDoorsCount = 0;

  let countertopAreaSqM = 0;
  let countertopLinearM = 0;

  for (const mod of modules) {
    const existing = itemMap.get(mod.sku);
    if (existing) {
      existing.count += 1;
      existing.totalPriceIls += mod.priceIls;
    } else {
      itemMap.set(mod.sku, {
        sku: mod.sku,
        nameHe: mod.nameHe,
        category: mod.category,
        kosherZone: mod.kosherZone,
        count: 1,
        unitPriceIls: mod.priceIls,
        totalPriceIls: mod.priceIls,
        widthCm: mod.dimensions.width,
        heightCm: mod.dimensions.height,
        depthCm: mod.dimensions.depth
      });
    }

    if (mod.isAppliance) {
      appliancesTotal += mod.priceIls;
    } else {
      carpentryTotal += mod.priceIls;
    }

    // Hardware breakdown
    if (mod.doorType === 'lift-up') aventosCount += 2;
    if (mod.doorType === 'drawers') legraboxCount += 3;
    if (mod.doorType === 'single-door') hingedDoorsCount += 1;
    if (mod.doorType === 'double-door') hingedDoorsCount += 2;
    if (mod.doorType === 'pocket') pocketDoorsCount += 2;

    // Countertop calculation for base units
    if (mod.category === 'base') {
      const area = (mod.dimensions.width / 100) * (mod.dimensions.depth / 100);
      countertopAreaSqM += area;
      countertopLinearM += mod.dimensions.width / 100;
    }
  }

  const countertopRatePerSqM = 1650; // High-grade Caesarstone / Porcelain
  const countertopPrice = Math.round(countertopAreaSqM * countertopRatePerSqM);

  const hardwareCost = 
    aventosCount * 450 + 
    legraboxCount * 280 + 
    hingedDoorsCount * 65 + 
    pocketDoorsCount * 950;

  return {
    items: Array.from(itemMap.values()),
    countertopSqm: Math.round(countertopAreaSqM * 100) / 100,
    countertopLinearMeters: Math.round(countertopLinearM * 100) / 100,
    countertopPriceIls: countertopPrice,
    hardwareSummary: {
      aventosLiftsCount: aventosCount,
      legraboxDrawersCount: legraboxCount,
      hingedDoorsCount,
      pocketDoorsCount,
      hardwareCostIls: hardwareCost
    },
    carpentryTotalIls: carpentryTotal,
    appliancesTotalIls: appliancesTotal,
    grandTotalIls: carpentryTotal + appliancesTotal + countertopPrice
  };
}
