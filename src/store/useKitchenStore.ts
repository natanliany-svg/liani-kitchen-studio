import { create } from 'zustand';
import { 
  PlacedModule, 
  PlanId, 
  ViewMode, 
  CameraPreset, 
  MaterialTheme, 
  LightingMode, 
  CatalogItem,
  ValidationIssue,
  NicheInfo,
  BOMSummary
} from '../types/kitchen';
import { PLAN_A_MODULES, PLAN_B_MODULES } from '../data/defaultPlans';
import { calculateNicheUsage, validateKitchen, calculateBOM } from '../core/validation';

interface KitchenStoreState {
  // Plan & Modules
  activePlan: PlanId;
  placedModules: PlacedModule[];
  selectedModuleId: string | null;
  hoveredModuleId: string | null;

  // View & Camera
  viewMode: ViewMode;
  cameraPreset: CameraPreset;

  // Live Virtual Tour
  isLiveTourActive: boolean;
  activeStationIndex: number;
  isTourPlaying: boolean;
  tourSpeed: number; // 0.5, 1, 1.5, 2
  startLiveTour: (initialStation?: number) => void;
  stopLiveTour: () => void;
  setStationIndex: (idx: number) => void;
  toggleTourPlay: () => void;
  setTourSpeed: (speed: number) => void;
  nextStation: () => void;
  prevStation: () => void;

  // Aesthetics & Lighting
  theme: MaterialTheme;
  lightingMode: LightingMode;
  showDimensions: boolean;
  showKosherColors: boolean;
  allDoorsOpen: boolean;

  // Dialogs & Panels
  activeDialog: 'none' | 'bom' | 'media' | 'export' | 'catalog' | 'inspector' | 'controls';
  mobileTab: '3d' | '2d' | 'compare' | 'catalog' | 'media';

  // Undo/Redo History
  historyPast: PlacedModule[][];
  historyFuture: PlacedModule[][];

  // Computed Cache
  validationIssues: ValidationIssue[];
  nicheUsage: NicheInfo[];
  bomSummary: BOMSummary;

  // Actions
  setPlan: (planId: PlanId) => void;
  selectModule: (id: string | null) => void;
  setHoveredModule: (id: string | null) => void;
  updateModule: (id: string, updates: Partial<PlacedModule>) => void;
  addModuleFromCatalog: (item: CatalogItem, targetWall?: PlacedModule['wallId']) => void;
  removeModule: (id: string) => void;
  duplicateModule: (id: string) => void;
  toggleDoorOpen: (id: string, targetPercent?: number) => void;
  toggleAllDoors: () => void;
  setViewMode: (mode: ViewMode) => void;
  setCameraPreset: (preset: CameraPreset) => void;
  setTheme: (theme: MaterialTheme) => void;
  setLightingMode: (mode: LightingMode) => void;
  toggleDimensions: () => void;
  toggleKosherColors: () => void;
  setActiveDialog: (dialog: KitchenStoreState['activeDialog']) => void;
  setMobileTab: (tab: KitchenStoreState['mobileTab']) => void;
  undo: () => void;
  redo: () => void;
  resetPlan: () => void;
  exportProjectJson: () => string;
  importProjectJson: (jsonString: string) => boolean;
}

export const useKitchenStore = create<KitchenStoreState>((set, get) => {
  const initialModules = JSON.parse(JSON.stringify(PLAN_A_MODULES)) as PlacedModule[];

  const computeStateDerivations = (modules: PlacedModule[]) => {
    return {
      validationIssues: validateKitchen(modules),
      nicheUsage: calculateNicheUsage(modules),
      bomSummary: calculateBOM(modules)
    };
  };

  const initialDerivations = computeStateDerivations(initialModules);

  return {
    activePlan: 'plan-A',
    placedModules: initialModules,
    selectedModuleId: null,
    hoveredModuleId: null,

    viewMode: 'split',
    cameraPreset: 'orbit',

    isLiveTourActive: false,
    activeStationIndex: 0,
    isTourPlaying: true,
    tourSpeed: 1,
    startLiveTour: (initialStation = 0) => set({ isLiveTourActive: true, activeStationIndex: initialStation, isTourPlaying: true, viewMode: '3d' }),
    stopLiveTour: () => set({ isLiveTourActive: false, isTourPlaying: false }),
    setStationIndex: (idx: number) => set({ activeStationIndex: idx }),
    toggleTourPlay: () => set(state => ({ isTourPlaying: !state.isTourPlaying })),
    setTourSpeed: (speed: number) => set({ tourSpeed: speed }),
    nextStation: () => set(state => ({ activeStationIndex: (state.activeStationIndex + 1) % 7 })),
    prevStation: () => set(state => ({ activeStationIndex: (state.activeStationIndex - 1 + 7) % 7 })),

    theme: 'cashmere-oak',
    lightingMode: 'daylight',
    showDimensions: true,
    showKosherColors: false,
    allDoorsOpen: false,

    activeDialog: 'none',
    mobileTab: '3d',

    historyPast: [],
    historyFuture: [],

    ...initialDerivations,

    setPlan: (planId: PlanId) => {
      const current = get();
      if (current.activePlan === planId && planId !== 'custom') return;

      const newModules = planId === 'plan-A'
        ? JSON.parse(JSON.stringify(PLAN_A_MODULES))
        : planId === 'plan-B'
        ? JSON.parse(JSON.stringify(PLAN_B_MODULES))
        : current.placedModules;

      set({
        activePlan: planId,
        placedModules: newModules,
        selectedModuleId: null,
        historyPast: [...current.historyPast, current.placedModules].slice(-30),
        historyFuture: [],
        allDoorsOpen: false,
        ...computeStateDerivations(newModules)
      });
    },

    selectModule: (id: string | null) => set({ selectedModuleId: id }),
    setHoveredModule: (id: string | null) => set({ hoveredModuleId: id }),

    updateModule: (id: string, updates: Partial<PlacedModule>) => {
      const { placedModules, historyPast } = get();
      const updated = placedModules.map(m => m.id === id ? { ...m, ...updates } : m);
      set({
        placedModules: updated,
        activePlan: 'custom',
        historyPast: [...historyPast, placedModules].slice(-30),
        historyFuture: [],
        ...computeStateDerivations(updated)
      });
    },

    addModuleFromCatalog: (item: CatalogItem, targetWall?: PlacedModule['wallId']) => {
      const { placedModules, historyPast } = get();
      const newId = `mod-${Date.now()}`;
      const wall = targetWall || item.suggestedWall || 'right-niche2';

      // Default positioning based on wall
      let posX = 0;
      let posZ = 300;
      let rotation = 90;

      if (wall === 'right-niche1') {
        posX = 0; posZ = 100; rotation = 90;
      } else if (wall === 'right-niche2') {
        posX = 0; posZ = 350; rotation = 90;
      } else if (wall === 'right-niche3') {
        posX = 0; posZ = 600; rotation = 90;
      } else if (wall === 'back-wall') {
        posX = 150; posZ = 640; rotation = 0;
      } else if (wall === 'left-wall') {
        posX = 257; posZ = 500; rotation = 270;
      } else {
        posX = 150; posZ = 200; rotation = 0;
      }

      const newModule: PlacedModule = {
        id: newId,
        sku: item.sku,
        nameHe: item.nameHe,
        category: item.category,
        kosherZone: item.kosherZone,
        wallId: wall,
        position: [posX, item.category === 'wall' ? 153 : 0, posZ],
        rotation,
        dimensions: { ...item.defaultDimensions },
        doorType: item.doorType,
        openPercent: 0,
        isAppliance: item.isAppliance,
        applianceType: item.applianceType,
        priceIls: item.priceIls
      };

      const updated = [...placedModules, newModule];
      set({
        placedModules: updated,
        selectedModuleId: newId,
        activePlan: 'custom',
        historyPast: [...historyPast, placedModules].slice(-30),
        historyFuture: [],
        ...computeStateDerivations(updated)
      });
    },

    removeModule: (id: string) => {
      const { placedModules, historyPast, selectedModuleId } = get();
      const updated = placedModules.filter(m => m.id !== id);
      set({
        placedModules: updated,
        selectedModuleId: selectedModuleId === id ? null : selectedModuleId,
        activePlan: 'custom',
        historyPast: [...historyPast, placedModules].slice(-30),
        historyFuture: [],
        ...computeStateDerivations(updated)
      });
    },

    duplicateModule: (id: string) => {
      const { placedModules, historyPast } = get();
      const target = placedModules.find(m => m.id === id);
      if (!target) return;

      const dup: PlacedModule = {
        ...JSON.parse(JSON.stringify(target)),
        id: `mod-dup-${Date.now()}`,
        nameHe: `${target.nameHe} (העתק)`,
        position: [target.position[0], target.position[1], target.position[2] + 20]
      };

      const updated = [...placedModules, dup];
      set({
        placedModules: updated,
        selectedModuleId: dup.id,
        activePlan: 'custom',
        historyPast: [...historyPast, placedModules].slice(-30),
        historyFuture: [],
        ...computeStateDerivations(updated)
      });
    },

    toggleDoorOpen: (id: string, targetPercent?: number) => {
      const { placedModules } = get();
      const updated = placedModules.map(m => {
        if (m.id !== id) return m;
        const nextPercent = targetPercent !== undefined ? targetPercent : (m.openPercent > 0.05 ? 0 : 1);
        return { ...m, openPercent: nextPercent };
      });
      set({ placedModules: updated });
    },

    toggleAllDoors: () => {
      const { placedModules, allDoorsOpen } = get();
      const target = allDoorsOpen ? 0 : 1;
      const updated = placedModules.map(m => ({
        ...m,
        openPercent: m.doorType !== 'none' ? target : 0
      }));
      set({
        placedModules: updated,
        allDoorsOpen: !allDoorsOpen
      });
    },

    setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
    setCameraPreset: (preset: CameraPreset) => set({ cameraPreset: preset }),
    setTheme: (theme: MaterialTheme) => set({ theme }),
    setLightingMode: (mode: LightingMode) => set({ lightingMode: mode }),
    toggleDimensions: () => set(state => ({ showDimensions: !state.showDimensions })),
    toggleKosherColors: () => set(state => ({ showKosherColors: !state.showKosherColors })),
    setActiveDialog: (dialog) => set({ activeDialog: dialog }),
    setMobileTab: (tab) => set({ mobileTab: tab }),

    undo: () => {
      const { historyPast, placedModules, historyFuture } = get();
      if (historyPast.length === 0) return;
      const previous = historyPast[historyPast.length - 1];
      const newPast = historyPast.slice(0, -1);
      set({
        placedModules: previous,
        historyPast: newPast,
        historyFuture: [placedModules, ...historyFuture].slice(0, 30),
        ...computeStateDerivations(previous)
      });
    },

    redo: () => {
      const { historyFuture, placedModules, historyPast } = get();
      if (historyFuture.length === 0) return;
      const next = historyFuture[0];
      const newFuture = historyFuture.slice(1);
      set({
        placedModules: next,
        historyPast: [...historyPast, placedModules].slice(-30),
        historyFuture: newFuture,
        ...computeStateDerivations(next)
      });
    },

    resetPlan: () => {
      const { activePlan } = get();
      const planToRestore = activePlan === 'plan-B' ? 'plan-B' : 'plan-A';
      get().setPlan(planToRestore);
    },

    exportProjectJson: () => {
      const state = get();
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        activePlan: state.activePlan,
        theme: state.theme,
        lightingMode: state.lightingMode,
        placedModules: state.placedModules,
        bomSummary: state.bomSummary
      };
      return JSON.stringify(exportData, null, 2);
    },

    importProjectJson: (jsonString: string) => {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.placedModules || !Array.isArray(parsed.placedModules)) return false;
        set({
          placedModules: parsed.placedModules,
          activePlan: 'custom',
          theme: parsed.theme || 'cashmere-oak',
          lightingMode: parsed.lightingMode || 'daylight',
          ...computeStateDerivations(parsed.placedModules)
        });
        return true;
      } catch (err) {
        console.error('Failed to import JSON project', err);
        return false;
      }
    }
  };
});
