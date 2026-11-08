export type KosherZone = 'meat' | 'dairy' | 'pareve' | 'neutral';

export type CabinetCategory = 
  | 'base' 
  | 'tall' 
  | 'wall' 
  | 'appliance' 
  | 'countertop' 
  | 'furniture'
  | 'filler';

export type DoorOpeningType = 
  | 'single-door' 
  | 'double-door' 
  | 'drawers' 
  | 'lift-up' 
  | 'pocket' 
  | 'tambour' 
  | 'open-shelf' 
  | 'pullout'
  | 'none';

export type WallId = 'right-niche1' | 'right-niche2' | 'right-niche3' | 'back-wall' | 'left-wall' | 'center-island' | 'free';

export interface CabinetDimensions {
  width: number;  // cm
  height: number; // cm
  depth: number;  // cm
}

export interface PlacedModule {
  id: string;
  sku: string;
  nameHe: string;
  category: CabinetCategory;
  kosherZone: KosherZone;
  wallId: WallId;
  position: [number, number, number]; // [x, y, z] in cm
  rotation: number; // in degrees (0, 90, 180, 270)
  dimensions: CabinetDimensions;
  doorType: DoorOpeningType;
  openPercent: number; // 0 (closed) to 1 (fully open)
  color?: string;
  notesHe?: string;
  isAppliance?: boolean;
  applianceType?: 'fridge' | 'freezer' | 'oven' | 'microwave' | 'sink' | 'cooktop' | 'dishwasher' | 'appliance-garage' | 'table';
  priceIls: number;
}

export interface CatalogItem {
  sku: string;
  nameHe: string;
  category: CabinetCategory;
  kosherZone: KosherZone;
  descriptionHe: string;
  defaultDimensions: CabinetDimensions;
  minWidth?: number;
  maxWidth?: number;
  doorType: DoorOpeningType;
  isAppliance?: boolean;
  applianceType?: PlacedModule['applianceType'];
  suggestedWall?: WallId;
  priceIls: number;
  iconName: string;
}

export interface StructuralPillar {
  id: string;
  nameHe: string;
  x: number; // cm
  y: number; // cm
  z: number; // cm
  width: number;  // cm
  height: number; // cm
  depth: number;  // cm
}

export interface NicheInfo {
  id: string;
  nameHe: string;
  wallId: WallId;
  capacityCm: number;
  depthCm: number;
  usedCm: number;
  remainingCm: number;
  isOverLimit: boolean;
}

export interface RoomSpecification {
  widthCm: number;         // 317 cm
  depthCm: number;         // 705 cm
  heightCm: number;        // 246 cm (uniform)
  entranceReturnWallCm: number; // 44 cm
  pillars: StructuralPillar[];
}

export type PlanId = 'plan-A' | 'plan-B' | 'custom';

export type ViewMode = 'split' | '3d' | '2d' | 'compare' | 'media' | 'renders';

export type CameraPreset = 
  | 'orbit' 
  | 'eye-level' 
  | 'seated' 
  | 'top-down' 
  | 'elevation-north' 
  | 'elevation-east' 
  | 'elevation-west' 
  | 'elevation-south'
  | 'station-meat'
  | 'station-dairy'
  | 'station-dining';

export type MaterialTheme = 'cashmere-oak' | 'sahara-bronze' | 'pure-white' | 'dark-graphite';

export type LightingMode = 'daylight' | 'task-led' | 'warm-ambient' | 'shabbat';

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  code: 'COLLISION' | 'NICHE_OVERFLOW' | 'AISLE_NARROW' | 'KOSHER_PROXIMITY' | 'CEILING_OVERFLOW' | 'DOOR_SWING_BLOCKED';
  messageHe: string;
  relatedModuleIds?: string[];
}

export interface BOMSummary {
  items: Array<{
    sku: string;
    nameHe: string;
    category: CabinetCategory;
    kosherZone: KosherZone;
    count: number;
    unitPriceIls: number;
    totalPriceIls: number;
    widthCm: number;
    heightCm: number;
    depthCm: number;
  }>;
  countertopSqm: number;
  countertopLinearMeters: number;
  countertopPriceIls: number;
  hardwareSummary: {
    aventosLiftsCount: number;
    legraboxDrawersCount: number;
    hingedDoorsCount: number;
    pocketDoorsCount: number;
    hardwareCostIls: number;
  };
  carpentryTotalIls: number;
  appliancesTotalIls: number;
  grandTotalIls: number;
}
