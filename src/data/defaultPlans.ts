import { PlacedModule } from '../types/kitchen';

export const PLAN_A_MODULES: PlacedModule[] = [
  // ==================== NICHE 1 (ENTRANCE RIGHT: 263 cm) ====================
  // Flush Zero-Line Alignment with 50cm Entrance Wall: 23cm Entrance setback, abutting Pillar 1 (23cm to 263cm)
  // Freezer 60cm
  {
    id: 'planA-freezer-tall',
    sku: 'REF-FRZ-60',
    nameHe: 'מקפיא עומד 60 ס"מ (קו 0 כניסה)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 23], // 23cm setback at entrance, abuts fridge 1
    rotation: 90,
    dimensions: { width: 60, height: 190, depth: 75 },
    doorType: 'single-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'freezer',
    notesHe: 'עומק 75 ס"מ נבלע במלואו בנישת 89 ס"מ – מרווח 23 ס"מ פתוח בכניסה',
    priceIls: 4200
  },
  {
    id: 'planA-freezer-pesach-top',
    sku: 'WALL-PESACH-60',
    nameHe: 'קלפה עליונה לפסח מעל מקפיא (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 23],
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
    position: [0, 0, 83],
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
    position: [0, 190, 83],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // Refrigerator 2 (90cm) - abuts Pillar 1 at Z=263
  {
    id: 'planA-fridge2',
    sku: 'REF-FRD-90-B',
    nameHe: 'מקרר 2 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 173],
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
    position: [0, 190, 173],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // ==================== NICHE 2 (MEAT WORK CENTER: 268 cm) ====================
  // Meat Cooktop & Wide Pan Drawers 80cm (RIGHT SIDE / Entrance adjacent)
  {
    id: 'planA-meat-cooktop-80',
    sku: 'BASE-HOB-80-M',
    nameHe: 'כיריים בשריות 80 ס"מ (ימין) + מגירות סירים',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 288],
    rotation: 90,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'cooktop',
    priceIls: 4500
  },
  // Spice / Prep Pullout 43cm
  {
    id: 'planA-meat-spice-43',
    sku: 'BASE-PULL-43-M',
    nameHe: 'יחידת משיכה לתבלינים ומשטח הפרדה 43 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 368],
    rotation: 90,
    dimensions: { width: 43, height: 90, depth: 65 },
    doorType: 'pullout',
    openPercent: 0,
    priceIls: 1800
  },
  // Meat Sink Unit 85cm
  {
    id: 'planA-meat-sink-85',
    sku: 'BASE-SINK-85-M',
    nameHe: 'ארון כיור בשרי רחב 85 ס"מ בהתקנה שטוחה',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 411],
    rotation: 90,
    dimensions: { width: 85, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3100
  },
  // Base Drawers 60cm (LEFT SIDE / towards back wall)
  {
    id: 'planA-meat-drawers-60',
    sku: 'BASE-DRW-60-M',
    nameHe: 'יחידת 3 מגירות עבודה בשרית 60 ס"מ (שמאל)',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 496],
    rotation: 90,
    dimensions: { width: 60, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2400
  },
  // Meat Wall Cabinets Tier 1 (Daily, Y=153..200)
  {
    id: 'planA-meat-wall-daily',
    sku: 'WALL-DAILY-268',
    nameHe: 'ארונות עליונים בשריים יומיומיים 268 ס"מ (קלפות כפולות + קולט אדים מובנה מעל כיריים בימין)',
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
  // Niche 3 Upper Pesach Cabinets connecting in L-shape to Back Wall
  {
    id: 'planA-niche3-wall-124',
    sku: 'WALL-PESACH-124',
    nameHe: 'ארונות עליונים ב-ר\' (נישה 3 עד פינת הקיר האחורי)',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 153, 581],
    rotation: 90,
    dimensions: { width: 124, height: 93, depth: 38 },
    doorType: 'double-door',
    openPercent: 0,
    notesHe: 'חיבור פינתי רציף ב-ר\' לארונות הקיר האחורי החלבי',
    priceIls: 2900
  },

  // ==================== BACK WALL (DAIRY WALL: 317 cm - NO WINDOWS!) ====================
  // Continuous Base Countertop running all the way to corner X=257/317!
  // Dairy Prep Base (Right: 62cm)
  {
    id: 'planA-dairy-base-right',
    sku: 'BASE-DRW-62-D',
    nameHe: 'יחידת 3 מגירות שיש חלבי ימנית 62 ס"מ',
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
    nameHe: 'כיור חלבי רחב 80 ס"מ בהתקנה שטוחה',
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
  // Continuous Dairy Countertop Base Unit (110cm all the way to left corner!)
  {
    id: 'planA-dairy-prep-110',
    sku: 'BASE-PREP-110-D',
    nameHe: 'משטח עבודה רצוף ומגירות חלבי 110 ס"מ (עד הפינה)',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [207, 0, 640],
    rotation: 0,
    dimensions: { width: 110, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    notesHe: 'משטח שיש רצוף העובר מתחת לארון המכשירים עד קיר שמאל!',
    priceIls: 4100
  },
  // Corner Appliance Garage sitting ON TOP of the Countertop (Y=90..200) with Curved Tambour Shutter
  {
    id: 'planA-appliance-garage',
    sku: 'APPL-TAMBOUR-60',
    nameHe: 'ארון מכשירים פינתי על גבי השיש (תריס נגלל בחצי עיגול)',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'back-wall',
    position: [257, 90, 645],
    rotation: 0,
    dimensions: { width: 60, height: 110, depth: 60 },
    doorType: 'tambour',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'appliance-garage',
    notesHe: 'יושב ישירות על השיש! תריס נגלל קשתי (Tambour) לנצילות מקסימלית ואפס התנגשות עם דלתות סמוכות',
    priceIls: 4200
  },
  // Appliance Garage Upper Pesach Unit (Y=200..246)
  {
    id: 'planA-garage-pesach-top',
    sku: 'WALL-GARAGE-PESACH',
    nameHe: 'קלפה עליונה לפסח מעל ארון מכשירים עד 246 ס"מ',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'back-wall',
    position: [257, 200, 645],
    rotation: 0,
    dimensions: { width: 60, height: 46, depth: 60 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1300
  },
  // Dairy Upper Cabinets Across Back Wall stopping above the sink (X=38 to X=207: 169cm)
  {
    id: 'planA-dairy-wall-cabinets',
    sku: 'WALL-DAIRY-SINK-ZONE',
    nameHe: 'ארונות עליונים חלביים מעל הכיור (עוצרים מעל הכיור)',
    category: 'wall',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [38, 153, 667],
    rotation: 0,
    dimensions: { width: 169, height: 93, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    notesHe: 'ארונות עליונים הממשיכים את פינת ה-ר\' מנישה 3 ונעצרים מעל הכיור החלבי (משאירים חלל פתוח מעל משטח ההמשך)',
    priceIls: 4800
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
    position: [257, 0, 480],
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
    position: [257, 0, 400],
    rotation: 270,
    dimensions: { width: 80, height: 246, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    notesHe: 'קיבולת ענקית עם מסילות נשיאה 70 ק"ג למוצרי מזון יבשים',
    priceIls: 5400
  }
  // [שולחן הוסר לחלוטין לקבלת מרחב מרכזי פתוח ומרווח!]
];

export const PLAN_B_MODULES: PlacedModule[] = [
  // ==================== NICHE 1 (ENTRANCE RIGHT: 263 cm) ====================
  // Flush Zero-Line Alignment with 50cm Entrance Wall: 23cm Entrance setback, abutting Pillar 1 (23cm to 263cm)
  // Refrigerator 1 (90cm)
  {
    id: 'planB-fridge1',
    sku: 'REF-FRD-90-A',
    nameHe: 'מקרר 1 רחב 90 ס"מ (פתיחה צרפתית)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 0, 23],
    rotation: 90,
    dimensions: { width: 90, height: 190, depth: 75 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'fridge',
    notesHe: 'מרווח 23 ס"מ פתוח בכניסה, אינו חוסם את פתח המעבר',
    priceIls: 7800
  },
  {
    id: 'planB-fridge1-pesach-top',
    sku: 'WALL-PESACH-90-A',
    nameHe: 'קלפה עליונה לפסח מעל מקרר 1 (עד 246 ס"מ)',
    category: 'wall',
    kosherZone: 'neutral',
    wallId: 'right-niche1',
    position: [0, 190, 23],
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
    position: [0, 0, 113],
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
    position: [0, 190, 113],
    rotation: 90,
    dimensions: { width: 90, height: 56, depth: 75 },
    doorType: 'lift-up',
    openPercent: 0,
    priceIls: 1650
  },

  // Baking Tower 60cm (2 Ovens + Microwave + Pesach Cabinet) - abuts Pillar 1 at Z=263
  {
    id: 'planB-baking-tower-60',
    sku: 'TALL-OVEN-60',
    nameHe: 'מגדל אפייה 60 ס"מ (2 תנורים מובנים + מיקרוגל + פסח עד 246)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'right-niche1',
    position: [0, 0, 203],
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
  // Meat Cooktop & Wide Pan Drawers 80cm (RIGHT SIDE / Entrance adjacent)
  {
    id: 'planB-meat-cooktop-80',
    sku: 'BASE-HOB-80-M',
    nameHe: 'כיריים בשריות 80 ס"מ (ימין) + מגירות סירים',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 288],
    rotation: 90,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'cooktop',
    priceIls: 4500
  },
  // Spice / Prep Pullout 43cm
  {
    id: 'planB-meat-spice-43',
    sku: 'BASE-PULL-43-M',
    nameHe: 'יחידת משיכה לתבלינים ומשטח הפרדה 43 ס"מ',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 368],
    rotation: 90,
    dimensions: { width: 43, height: 90, depth: 65 },
    doorType: 'pullout',
    openPercent: 0,
    priceIls: 1800
  },
  // Meat Sink Unit 85cm
  {
    id: 'planB-meat-sink-85',
    sku: 'BASE-SINK-85-M',
    nameHe: 'ארון כיור בשרי רחב 85 ס"מ בהתקנה שטוחה',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 411],
    rotation: 90,
    dimensions: { width: 85, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3100
  },
  // Base Drawers 60cm (LEFT SIDE / towards back wall)
  {
    id: 'planB-meat-drawers-60',
    sku: 'BASE-DRW-60-M',
    nameHe: 'יחידת 3 מגירות עבודה בשרית 60 ס"מ (שמאל)',
    category: 'base',
    kosherZone: 'meat',
    wallId: 'right-niche2',
    position: [0, 0, 496],
    rotation: 90,
    dimensions: { width: 60, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2400
  },
  {
    id: 'planB-meat-wall-daily',
    sku: 'WALL-DAILY-268',
    nameHe: 'ארונות עליונים בשריים יומיומיים 268 ס"מ (קלפות כפולות + קולט מובנה מעל כיריים בימין)',
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
  // 1. Lower Built-in Under-Counter Freezer (0-90cm, width 60cm)
  {
    id: 'planB-freezer-lower-cube',
    sku: 'REF-FRZ-CUBE-60',
    nameHe: 'מקפיא תחתון בנוי 60 ס"מ (0-90 ס"מ)',
    category: 'appliance',
    kosherZone: 'neutral',
    wallId: 'right-niche3',
    position: [0, 0, 581],
    rotation: 90,
    dimensions: { width: 60, height: 90, depth: 75 },
    doorType: 'drawers',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'freezer',
    notesHe: 'מקפיא מובנה תחתון בנישה 3, מאפשר המשך רציף מעליו',
    priceIls: 4600
  },
  // 2. Remaining 64cm in Niche 3: Base Countertop connecting in L-shape to Back Wall!
  {
    id: 'planB-niche3-corner-base',
    sku: 'BASE-RETURN-64',
    nameHe: 'משטח שיש רצוף ב-ר\' 64 ס"מ ומגירות (חיבור לקיר אחורי חלבי)',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'right-niche3',
    position: [0, 0, 641],
    rotation: 90,
    dimensions: { width: 64, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    notesHe: 'משטח עבודה רצוף המתחבר ישירות לקיר האחורי החלבי',
    priceIls: 2600
  },
  // 3. Compact Appliance Garage on Countertop with Curved Tambour Shutter (Y=90..153)
  {
    id: 'planB-appliance-garage-tambour',
    sku: 'APPL-TAMBOUR-CORNER-55',
    nameHe: 'ארון מכשירים פינתי על גבי השיש (תריס נגלל בחצי עיגול)',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 90, 645],
    rotation: 90,
    dimensions: { width: 60, height: 63, depth: 60 },
    doorType: 'tambour',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'appliance-garage',
    notesHe: 'יושב ישירות על השיש מתחת לארונות העליונים! תריס קשתי נגלל (Tambour) לנצילות מקסימלית',
    priceIls: 3900
  },
  // 4. Upper Kitchen Cabinets in L-shape connecting Niche 3 to Back Wall (Y=153..246, height 93cm)
  {
    id: 'planB-niche3-wall-corner',
    sku: 'WALL-CORNER-124',
    nameHe: 'ארונות עליונים ב-ר\' (נישה 3 עד פינת הקיר האחורי)',
    category: 'wall',
    kosherZone: 'pareve',
    wallId: 'right-niche3',
    position: [0, 153, 581],
    rotation: 90,
    dimensions: { width: 124, height: 93, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    notesHe: 'ארונות עליונים המכסים את שטח הנישה ומתחברים ב-ר\' לארונות הקיר החלבי עד התקרה 246 ס"מ',
    priceIls: 3400
  },

  // ==================== BACK WALL (DAIRY WALL: 317 cm - OPEN CONTINUOUS COUNTER) ====================
  // Continuous Dairy Countertop from X=65 to X=317 (252cm total)
  {
    id: 'planB-dairy-sink-80',
    sku: 'BASE-SINK-80-D',
    nameHe: 'כיור חלבי רחב 80 ס"מ בהתקנה שטוחה',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [65, 0, 640],
    rotation: 0,
    dimensions: { width: 80, height: 90, depth: 65 },
    doorType: 'double-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'sink',
    priceIls: 3200
  },
  {
    id: 'planB-dairy-dw-60',
    sku: 'BASE-DW-60-D',
    nameHe: 'מדיח כלים אינטגרלי מלא 60 ס"מ',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [145, 0, 640],
    rotation: 0,
    dimensions: { width: 60, height: 90, depth: 65 },
    doorType: 'single-door',
    openPercent: 0,
    isAppliance: true,
    applianceType: 'dishwasher',
    priceIls: 3800
  },
  {
    id: 'planB-dairy-prep-112',
    sku: 'BASE-PREP-112-D',
    nameHe: 'משטח שיש חלבי רציף 112 ס"מ ומגירות רחבות (עד קיר שמאל)',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [205, 0, 640],
    rotation: 0,
    dimensions: { width: 112, height: 90, depth: 65 },
    doorType: 'drawers',
    openPercent: 0,
    notesHe: 'משטח שיש פתוח ומרווח המתחבר ב-ר\' לקיר שמאל',
    priceIls: 4200
  },
  // Dairy Upper Cabinets Across Back Wall stopping above the sink (X=38 to X=145: 107cm)
  {
    id: 'planB-dairy-wall-sink-zone',
    sku: 'WALL-DAIRY-SINK-ZONE-B',
    nameHe: 'ארונות עליונים חלביים מעל הכיור (עוצרים מעל הכיור)',
    category: 'wall',
    kosherZone: 'dairy',
    wallId: 'back-wall',
    position: [38, 153, 667],
    rotation: 0,
    dimensions: { width: 107, height: 93, depth: 38 },
    doorType: 'lift-up',
    openPercent: 0,
    notesHe: 'ארונות עליונים הממשיכים את פינת ה-ר\' מנישה 3 ונעצרים מעל הכיור החלבי (משאירים חלל פתוח מעל המדיח והמשטח)',
    priceIls: 3600
  },

  // ==================== LEFT WALL (MAXIMIZED OPEN SPACE: >280 cm FREE!) ====================
  // L-Return Low Countertop (80cm x 60cm, H=90cm only - keeps space airy)
  {
    id: 'planB-left-return-counter',
    sku: 'BASE-RETURN-80',
    nameHe: 'המשך שיש חלבי ב-ר\' לקיר שמאל 80 ס"מ (גובה 90 ס"מ בלבד - פתוח ומואר)',
    category: 'base',
    kosherZone: 'dairy',
    wallId: 'left-wall',
    position: [257, 0, 560],
    rotation: 270,
    dimensions: { width: 80, height: 90, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 2900
  },
  // Only 80cm Pantry on Left Wall
  {
    id: 'planB-pantry-80',
    sku: 'TALL-PANTRY-80',
    nameHe: 'ארון מזווה גבוה 80 ס"מ (6 מגירות נשלפות Space Tower)',
    category: 'tall',
    kosherZone: 'pareve',
    wallId: 'left-wall',
    position: [257, 0, 480],
    rotation: 270,
    dimensions: { width: 80, height: 246, depth: 60 },
    doorType: 'drawers',
    openPercent: 0,
    priceIls: 5400
  }
  // [שולחן הוסר לחלוטין לקבלת חלל מרכזי ענק ומרווח!]
];
