import { RoomSpecification } from '../types/kitchen';

export const ROOM_SPEC: RoomSpecification = {
  widthCm: 317,
  depthCm: 705,
  heightCm: 246,
  entranceReturnWallCm: 44,
  pillars: [
    {
      id: 'pillar-1',
      nameHe: 'עמוד בטון 1 (בין נישת כניסה לבשרי)',
      x: 0,
      y: 0,
      z: 263,
      width: 89,  // Protrusion into room from right wall (depth of niche)
      height: 246,
      depth: 25   // Thickness along wall
    },
    {
      id: 'pillar-2',
      nameHe: 'עמוד בטון 2 (בין נישה בשרית לנישה אחורית)',
      x: 0,
      y: 0,
      z: 556,
      width: 89,  // Protrusion into room
      height: 246,
      depth: 25   // Thickness along wall
    }
  ]
};

export const NICHE_BOUNDS = {
  niche1: {
    id: 'right-niche1',
    nameHe: "נישה 1 (כניסה ימין)",
    zStart: 0,
    zEnd: 263,
    lengthCm: 263,
    depthCm: 89
  },
  pillar1: {
    zStart: 263,
    zEnd: 288,
    lengthCm: 25,
    depthCm: 89
  },
  niche2: {
    id: 'right-niche2',
    nameHe: "נישה 2 (מרכזית - בשרי)",
    zStart: 288,
    zEnd: 556,
    lengthCm: 268,
    depthCm: 89
  },
  pillar2: {
    zStart: 556,
    zEnd: 581,
    lengthCm: 25,
    depthCm: 89
  },
  niche3: {
    id: 'right-niche3',
    nameHe: "נישה 3 (פינה אחורית ימין)",
    zStart: 581,
    zEnd: 705,
    lengthCm: 124,
    depthCm: 89
  },
  backWall: {
    id: 'back-wall',
    nameHe: "קיר אחורי (חלבי - ללא חלון)",
    xStart: 0,
    xEnd: 317,
    lengthCm: 317,
    depthCm: 65
  },
  leftWallActive: {
    id: 'left-wall',
    nameHe: "קיר שמאל (גזרת נגרות מאושרת)",
    zStart: 465,
    zEnd: 705,
    lengthCm: 240, // 160 cm baking + 80 cm pantry
    depthCm: 60
  },
  leftWallDining: {
    id: 'dining-area',
    nameHe: "מרחב פינת אוכל משפחתית ושולחן שבת",
    zStart: 0,
    zEnd: 465,
    lengthCm: 465,
    minClearanceLengthCm: 225 // Guaranteed dining zone
  }
};
