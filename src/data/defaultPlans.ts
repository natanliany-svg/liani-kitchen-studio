import { PlacedModule } from '../types/kitchen';

export const PLAN_A_MODULES: PlacedModule[] = [
  // ==================== NICHE 1 (ENTRANCE RIGHT: 263 cm) ====================
  // Freezer 60cm
  {
    id: 'planA-freezer-tall',
    sku: 'REF-FRZ-60',
    nameHe: 'מקפיא עומד 60 ס"מ (נישת כניסה)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 10], // 10cm from entrance wall for clearance
    rotation: 90,
    dimensions: { width: 60, height: 190, depth: 75 },
    doorType: 'single-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'freezer',
    notesHe: 'עומק 75 ס"מ נבלע במלואו בנישת 89 ס"מ',
    priceIls: 4200
  },
  {
    id: 'planA-freezer-pesach-top',
    sku: 'WALL-PESACH-60',
    nameHe: 'קלפה עליונה לפסח מעל מקפיא (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 10],
    rotation: 90,
    dimensions: { width: 60, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    notesHe: 'אחסון עמוק והרמטי לפסח עד התקרה 246 ס"מ',
    priceIls: 1350
  },

  // Refrigerator 1 (90cm)
  {
    id: 'planA-fridge1',
    sku: 'REF-FRD-90-A',
    nameHe: 'מקרר 1 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 75],
    rotation: 90,
    dimensions: { width: 90, height: 190, depth: 75 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'fridge',
    priceIls: 7800
  },
  {
    id: 'planA-fridge1-pesach-top',
    sku: 'WALL-PESACH-90-A',
    nameHe: 'קלפה עליונה לפסח מעל מקרר 1 (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 75],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // Refrigerator 2 (90cm)
  {
    id: 'planA-fridge2',
    sku: 'REF-FRD-90-B',
    nameHe: 'מקרר 2 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 170],
    rotation: 90,
    dimensions: { width: 90, height: 190, depth: 75 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'fridge',
    priceIls: 7800
  },
  {
    id: 'planA-fridge2-pesach-top',
    sku: 'WALL-PESACH-90-B',
    nameHe: 'קלפה עליונה לפסח מעל מקרר 2 (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 170],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // ==================== NICHE 2 (MEAT WORK CENTER: 268 cm) ====================
  // Base Drawers 60cm
  {
    id: 'planA-meat-drawers-60',
    sku: 'BASE-DRW-60-M',
    nameHe: 'יחידת 3 מגירות עבודה בשרית 60 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 288],
    rotation: 90,
    dimensions: { width: 60, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2400
  },
  // Meat Sink Unit 85cm
  {
    id: 'planA-meat-sink-85',
    sku: 'BASE-SINK-85-M',
    nameHe: 'ארון כיור בשרי רחב 85 ס"מ בהתקנה שטוחה',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 348],
    rotation: 90,
    dimensions: { width: 85, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3100
  },
  // Spice / Prep Pullout 43cm
  {
    id: 'planA-meat-spice-43',
    sku: 'BASE-PULL-43-M',
    nameHe: 'יחידת משיכה לתבלינים ומשטח הפרדה 43 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 433],
    rotation: 90,
    dimensions: { width: 43, height: 90, depth: 65 },
    doorType: 'pullout',
    openPercent: 0,
    priceIls: 1800
  },
  // Meat Cooktop & Wide Pan Drawers 80cm
  {
    id: 'planA-meat-cooktop-80',
    sku: 'BASE-HOB-80-M',
    nameHe: 'כיריים בשריות 80 ס"מ + מגירות סירים כבדים',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 476],
    rotation: 90,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'cooktop',
    priceIls: 4500
  },
  // Meat Wall Cabinets Tier 1 (Daily, Y=153..200)
  {
    id: 'planA-meat-wall-daily',
    sku: 'WALL-DAILY-268',
    nameHe: 'ארונות עליונים בשריים יומיומיים 268 ס"מ (קלפות כפולות)',
    category: 'wall',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 153, 288],
    rotation: 90,
    dimensions: { width: 268, height: 47, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 4800
  },
  // Meat Wall Cabinets Tier 2 (Pesach, Y=200..246)
  {
    id: 'planA-meat-wall-pesach',
    sku: 'WALL-PESACH-268',
    nameHe: 'ארונות פסח עליונים הרמטיים עד התקרה 246 ס"מ',
    category: 'wall',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 200, 288],
    rotation: 90,
    dimensions: { width: 268, height: 46, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 4200
  },

  // ==================== NICHE 3 (RIGHT REAR CORNER: 124 cm) ====================
  // L-Return Countertop & Shabbat Base
  {
    id: 'planA-niche3-base-124',
    sku: 'BASE-SHABBAT-124',
    nameHe: 'משטח שיש רצוף ב-ר\' 124 ס"מ (עמדת מיחם ופלטת שבת)',
    category: 'base',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 0, 581],
    rotation: 90,
    dimensions: { width: 124, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    notesHe: 'כולל מתקן פינה נשלף LeMans ושקעי כוח לשעון שבת',
    priceIls: 3900
  },
  // Niche 3 Upper Pesach Cabinets
  {
    id: 'planA-niche3-wall-124',
    sku: 'WALL-PESACH-124',
    nameHe: 'המשך ארונות עליונים עד התקרה 246 ס"מ (נישה 3)',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 153, 581],
    rotation: 90,
    dimensions: { width: 124, height: 93, depth: 38 },
    doorType: 'double-door',
    openPercent: 0,
    priceIls: 2900
  },

  // ==================== BACK WALL (DAIRY WALL: 317 cm - NO WINDOWS!) ====================
  // Dairy Prep Base (Right)
  {
    id: 'planA-dairy-base-right',
    sku: 'BASE-DRW-62-D',
    nameHe: 'יחידת מגירות שיש חלבי ימנית 62 ס"מ',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [65, 0, 640],
    rotation: 0,
    dimensions: { width: 62, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2400
  },
  // Dairy Sink Unit 80cm
  {
    id: 'planA-dairy-sink-80',
    sku: 'BASE-SINK-80-D',
    nameHe: 'כיור חלבי רחב 80 ס"מ עם טוחן אשפה ומסנן מים',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [127, 0, 640],
    rotation: 0,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3200
  },
  // Dairy Secondary Prep & Integrated Dishwasher 50cm
  {
    id: 'planA-dairy-dw-50',
    sku: 'BASE-DW-50-D',
    nameHe: 'משטח חלבי שמאלי ומדיח אינטגרלי 50 ס"מ',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [207, 0, 640],
    rotation: 0,
    dimensions: { width: 50, height: 90, depth: 65 },
    doorType: 'single-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'dishwasher',
    priceIls: 3600
  },
  // Left Corner Appliance Garage on Countertop (Pocket Doors, 60cm wide x 60cm deep, flush with Left Wall baking tower at X=257)
  {
    id: 'planA-appliance-garage',
    sku: 'TALL-GARAGE-60',
    nameHe: 'ארון מכשירים על השיש (דלתות כיס Pocket Doors למיקסר)',
    category: 'appliance',
    kosherZone: 'pareve',
    wallId: 'back-wall',
    position: [197, 90, 645],
    rotation: 0,
    dimensions: { width: 60, height: 110, depth: 60 },
    doorType: 'pocket',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'appliance-garage',
    notesHe: 'דלתות נבלעות בדפנות! שקעי כוח ומדף נשלף כבד למיקסר קנווד וצ\'יפסר, צמוד למגדל האפייה',
    priceIls: 3800
  },
  // Appliance Garage Upper Pesach Unit (Y=200..246)
  {
    id: 'planA-garage-pesach-top',
    sku: 'WALL-GARAGE-PESACH',
    nameHe: 'ארון פסח עליון מעל ארון מכשירים עד 246 ס"מ',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'back-wall',
    position: [197, 200, 645],
    rotation: 0,
    dimensions: { width: 60, height: 46, depth: 60 },
    doorType: 'single-door',
    openPercent: 0,
    priceIls: 1300
  },
  // Dairy Upper Cabinets Across Back Wall (from Niche 3 upper edge at X=38 to appliance garage at X=197: 159cm wide, up to 246cm)
  {
    id: 'planA-dairy-wall-cabinets',
    sku: 'WALL-DAIRY-159',
    nameHe: 'רצף ארונות עליונים חלביים עד התקרה 246 ס"מ (2 קומות)',
    category: 'wall',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [38, 153, 667],
    rotation: 0,
    dimensions: { width: 159, height: 93, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 5200
  },

  // ==================== LEFT WALL (ACTIVE BAKING & PANTRY: 240 cm) ====================
  // Dual Oven Baking Tower (160cm wide, full height 246cm)
  {
    id: 'planA-baking-tower-160',
    sku: 'TALL-OVEN-160',
    nameHe: 'מגדל אפייה כפול 160 ס"מ (2 תנורים בגובה מותניים + מיקרוגל + מגירות)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'left-wall',
    position: [257, 0, 545],
    rotation: 270,
    dimensions: { width: 160, height: 246, depth: 60 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'oven',
    notesHe: 'שני תנורים זה לצד זה בארגונומיה מושלמת + אחסון עליון לפסח עד 246 ס"מ',
    priceIls: 9500
  },
  // High Pantry 80cm with 6 Pullout Drawers (Space Tower)
  {
    id: 'planA-pantry-80',
    sku: 'TALL-PANTRY-80',
    nameHe: 'ארון מזווה גבוה 80 ס"מ (6 מגירות נשלפות Space Tower)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'left-wall',
    position: [257, 0, 465],
    rotation: 270,
    dimensions: { width: 80, height: 246, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    notesHe: 'קיבולת ענקית עם מסילות נשיאה 70 ק"ג למוצרי מזון יבשים',
    priceIls: 5400
  },

  // ==================== DINING AREA (LEFT WALL FOREGROUND) ====================
  {
    id: 'planA-dining-table',
    sku: 'FURN-TABLE-160',
    nameHe: 'שולחן אוכל משפחתי 160×90 ס"מ + 6 כיסאות',
    category: 'furniture',
    kosherZone: 'neutral',
    wallId: 'free',
    position: [180, 0, 180],
    rotation: 0,
    dimensions: { width: 90, height: 76, depth: 160 },
    doorType: 'none',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'table',
    priceIls: 3800
  }
];

export const PLAN_B_MODULES: PlacedModule[] = [
  // ==================== NICHE 1 (ENTRANCE RIGHT: 263 cm) ====================
  // Refrigerator 1 (90cm)
  {
    id: 'planB-fridge1',
    sku: 'REF-FRD-90-A',
    nameHe: 'מקרר 1 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 10],
    rotation: 90,
    dimensions: { width: 90, height: 190, depth: 75 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'fridge',
    priceIls: 7800
  },
  {
    id: 'planB-fridge1-pesach-top',
    sku: 'WALL-PESACH-90-A',
    nameHe: 'קלפה עליונה לפסח מעל מקרר 1 (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 10],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // Refrigerator 2 (90cm)
  {
    id: 'planB-fridge2',
    sku: 'REF-FRD-90-B',
    nameHe: 'מקרר 2 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 105],
    rotation: 90,
    dimensions: { width: 90, height: 190, depth: 75 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'fridge',
    priceIls: 7800
  },
  {
    id: 'planB-fridge2-pesach-top',
    sku: 'WALL-PESACH-90-B',
    nameHe: 'קלפה עליונה לפסח מעל מקרר 2 (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 105],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // Baking Tower 60cm (2 Ovens + Microwave + Pesach Cabinet)
  {
    id: 'planB-baking-tower-60',
    sku: 'TALL-OVEN-60',
    nameHe: 'מגדל אפייה 60 ס"מ (2 תנורים מובנים + מיקרוגל + פסח עד 246)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'right-niche1',
    position: [0, 0, 200],
    rotation: 90,
    dimensions: { width: 60, height: 246, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'oven',
    notesHe: 'מוצב בצמוד לעמוד בטון 1 עם מחיצה תרמית בינו לבין המקרר',
    priceIls: 6900
  },

  // ==================== NICHE 2 (MEAT WORK CENTER: 268 cm) ====================
  // Identical to Plan A
  {
    id: 'planB-meat-drawers-60',
    sku: 'BASE-DRW-60-M',
    nameHe: 'יחידת 3 מגירות עבודה בשרית 60 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 288],
    rotation: 90,
    dimensions: { width: 60, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2400
  },
  {
    id: 'planB-meat-sink-85',
    sku: 'BASE-SINK-85-M',
    nameHe: 'ארון כיור בשרי רחב 85 ס"מ בהתקנה שטוחה',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 348],
    rotation: 90,
    dimensions: { width: 85, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3100
  },
  {
    id: 'planB-meat-spice-43',
    sku: 'BASE-PULL-43-M',
    nameHe: 'יחידת משיכה לתבלינים ומשטח הפרדה 43 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 433],
    rotation: 90,
    dimensions: { width: 43, height: 90, depth: 65 },
    doorType: 'pullout',
    openPercent: 0,
    priceIls: 1800
  },
  {
    id: 'planB-meat-cooktop-80',
    sku: 'BASE-HOB-80-M',
    nameHe: 'כיריים בשריות 80 ס"מ + מגירות סירים כבדים',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 476],
    rotation: 90,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'cooktop',
    priceIls: 4500
  },
  {
    id: 'planB-meat-wall-daily',
    sku: 'WALL-DAILY-268',
    nameHe: 'ארונות עליונים בשריים יומיומיים 268 ס"מ (קלפות כפולות)',
    category: 'wall',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 153, 288],
    rotation: 90,
    dimensions: { width: 268, height: 47, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 4800
  },
  {
    id: 'planB-meat-wall-pesach',
    sku: 'WALL-PESACH-268',
    nameHe: 'ארונות פסח עליונים הרמטיים עד התקרה 246 ס"מ',
    category: 'wall',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 200, 288],
    rotation: 90,
    dimensions: { width: 268, height: 46, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 4200
  },

  // ==================== NICHE 3 (RIGHT REAR CORNER: 124 cm) ====================
  // Standing Freezer 65cm + Top Cabinet
  {
    id: 'planB-freezer-tall',
    sku: 'REF-FRZ-65',
    nameHe: 'מקפיא עומד 65 ס"מ (נישה 3 אחורית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche3',
    position: [0, 0, 581],
    rotation: 90,
    dimensions: { width: 65, height: 185, depth: 65 },
    doorType: 'single-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'freezer',
    priceIls: 4400
  },
  {
    id: 'planB-freezer-pesach-top',
    sku: 'WALL-PESACH-65',
    nameHe: 'קלפה עליונה לפסח מעל מקפיא (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche3',
    position: [0, 185, 581],
    rotation: 90,
    dimensions: { width: 65, height: 61, depth: 65 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1450
  },
  // Appliance Cabinet / Tall Utility Unit 59cm
  {
    id: 'planB-appliance-tower-59',
    sku: 'TALL-UTIL-59',
    nameHe: 'ארון מכשירים / שירות גבוה 59 ס"מ (עד 246 ס"מ)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 0, 646],
    rotation: 90,
    dimensions: { width: 59, height: 246, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'appliance-garage',
    notesHe: 'משלים במדויק את רוחב הנישה (65 + 59 = 124 ס"מ)',
    priceIls: 4100
  },

  // ==================== BACK WALL (DAIRY WALL: 317 cm - OPEN CONTINUOUS COUNTER) ====================
  {
    id: 'planB-dairy-counter-full',
    sku: 'BASE-DAIRY-192',
    nameHe: 'משטח שיש חלבי רציף ונקי 192 ס"מ + כיור חלבי מרכזי ומגירות רחבות',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [65, 0, 640],
    rotation: 0,
    dimensions: { width: 192, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    notesHe: 'חזית פתוחה ללא ארון מכשירים חוסם! מתחברת בקו רציף ב-ר\' למשטח שמאל',
    priceIls: 8900
  },
  // Dairy Upper Cabinets Across Full Back Wall (X=65 to X=317: 252cm, up to 246cm)
  {
    id: 'planB-dairy-wall-317',
    sku: 'WALL-DAIRY-252',
    nameHe: 'רצף ארונות עליונים חלביים 252 ס"מ עד התקרה 246 ס"מ',
    category: 'wall',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [65, 153, 667],
    rotation: 0,
    dimensions: { width: 252, height: 93, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 6200
  },

  // ==================== LEFT WALL (MAXIMIZED DINING ROOM: >280 cm FREE!) ====================
  // L-Return Low Countertop (140cm x 60cm, H=90cm only - keeps space airy)
  {
    id: 'planB-left-return-counter',
    sku: 'BASE-RETURN-140',
    nameHe: 'המשך שיש חלבי ב-ר\' לקיר שמאל 140 ס"מ (גובה 90 ס"מ בלבד - פתוח ומואר)',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'left-wall',
    position: [257, 0, 565],
    rotation: 270,
    dimensions: { width: 140, height: 90, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 3800
  },
  // Only 80cm Pantry on Left Wall
  {
    id: 'planB-pantry-80',
    sku: 'TALL-PANTRY-80',
    nameHe: 'ארון מזווה גבוה 80 ס"מ (6 מגירות נשלפות)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'left-wall',
    position: [257, 0, 485],
    rotation: 270,
    dimensions: { width: 80, height: 246, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 5400
  },

  // Huge Dining Table for 8-10 people in the massive remaining space!
  {
    id: 'planB-dining-table-large',
    sku: 'FURN-TABLE-220',
    nameHe: 'שולחן שבת ואירוח ענק 220×100 ס"מ + 8-10 כיסאות',
    category: 'furniture',
    kosherZone: 'neutral',
    wallId: 'free',
    position: [170, 0, 160],
    rotation: 0,
    dimensions: { width: 100, height: 76, depth: 220 },
    doorType: 'none',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'table',
    notesHe: 'מרחב אירוח ושבת פתוח ורחב ידיים עם מעל 2.80 מטר נטו בקיר שמאל!',
    priceIls: 5200
  }
];
