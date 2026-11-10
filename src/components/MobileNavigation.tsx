import React, { useState } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  Box, 
  Map, 
  Compass, 
  Palette, 
  Calculator, 
  SlidersHorizontal,
  X,
  Sun,
  DoorOpen,
  DoorClosed,
  Check
} from 'lucide-react';
import { MaterialTheme, LightingMode } from '../types/kitchen';

export const MobileNavigation: React.FC = () => {
  const viewMode = useKitchenStore(state => state.viewMode);
  const setViewMode = useKitchenStore(state => state.setViewMode);
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);
  const isLiveTourActive = useKitchenStore(state => state.isLiveTourActive);
  const startLiveTour = useKitchenStore(state => state.startLiveTour);
  const stopLiveTour = useKitchenStore(state => state.stopLiveTour);

  const theme = useKitchenStore(state => state.theme);
  const setTheme = useKitchenStore(state => state.setTheme);
  const lightingMode = useKitchenStore(state => state.lightingMode);
  const setLightingMode = useKitchenStore(state => state.setLightingMode);
  const allDoorsOpen = useKitchenStore(state => state.allDoorsOpen);
  const toggleAllDoors = useKitchenStore(state => state.toggleAllDoors);

  const [showPaletteSheet, setShowPaletteSheet] = useState(false);

  const themes: Array<{ id: MaterialTheme; nameHe: string; subtitleHe: string; colors: string[] }> = [
    {
      id: 'cashmere-oak',
      nameHe: 'קשמיר ואלון מעושן',
      subtitleHe: 'Nordic Cashmere & Oak',
      colors: ['#dfd7cb', '#c49a6c', '#f5f3ef']
    },
    {
      id: 'sahara-bronze',
      nameHe: 'חימר מינרלי ואגוז',
      subtitleHe: 'Japandi Mineral & Walnut',
      colors: ['#d9cebe', '#8b5a2b', '#3d3936']
    },
    {
      id: 'dark-graphite',
      nameHe: 'גרפיט כהה ופליז',
      subtitleHe: 'Modern Dark Graphite',
      colors: ['#34373d', '#aa7c4f', '#1f2022']
    },
    {
      id: 'pure-white',
      nameHe: 'אלבסטר מולבן זך',
      subtitleHe: 'Pure Alabaster & Ash',
      colors: ['#fbfbfb', '#ddb88c', '#f8f8f9']
    }
  ];

  return (
    <>
      {/* Mobile Slide-Up Material & Finishes Bottom Sheet */}
      {showPaletteSheet && (
        <div 
          onTouchStart={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-end animate-in fade-in duration-200"
        >
          <div className="w-full bg-slate-950 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl text-white max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">פלטות צבעים וחומרים יוקרתיים</h3>
              </div>
              <button
                onClick={() => setShowPaletteSheet(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Luxury Material Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {themes.map(t => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-right ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/15'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        {t.nameHe}
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400">{t.subtitleHe}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {t.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Interactive Toggles (Doors, Lighting) */}
            <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={toggleAllDoors}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border transition-all ${
                  allDoorsOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {allDoorsOpen ? <DoorOpen className="w-4 h-4" /> : <DoorClosed className="w-4 h-4" />}
                <span>{allDoorsOpen ? 'סגור את כל הדלתות' : 'פתח את כל הדלתות'}</span>
              </button>

              <button
                onClick={() => setLightingMode(lightingMode === 'daylight' ? 'warm-ambient' : 'daylight')}
                className="py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border border-slate-700 bg-slate-900 text-amber-300 transition-all"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>{lightingMode === 'warm-ambient' ? 'תאורת ערב חמה 2700K' : 'תאורת יום טבעית'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Modern Mobile Bottom Dock */}
      <nav 
        onTouchStart={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 text-white py-1.5 px-2 select-none z-30 shadow-2xl"
      >
        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
          {/* 1. 3D Live Orbit */}
          <button
            onClick={() => {
              if (isLiveTourActive) stopLiveTour();
              setViewMode('3d');
              setActiveDialog('none');
              setShowPaletteSheet(false);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 transition-all ${
              viewMode === '3d' && !isLiveTourActive && activeDialog === 'none' && !showPaletteSheet
                ? 'text-sky-400 font-extrabold bg-sky-500/15 border border-sky-500/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>3D חי</span>
          </button>

          {/* 2. Live Cinematic Tour */}
          <button
            onClick={() => {
              setViewMode('3d');
              setActiveDialog('none');
              setShowPaletteSheet(false);
              if (isLiveTourActive) {
                stopLiveTour();
              } else {
                startLiveTour(0);
              }
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 transition-all ${
              isLiveTourActive
                ? 'text-amber-400 font-extrabold bg-amber-500/20 border border-amber-500/40 shadow-lg shadow-amber-500/25 scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className={`w-4 h-4 ${isLiveTourActive ? 'animate-spin' : ''}`} />
            <span>סיור לייב</span>
          </button>

          {/* 3. 2D Architectural CAD */}
          <button
            onClick={() => {
              if (isLiveTourActive) stopLiveTour();
              setViewMode('2d');
              setActiveDialog('none');
              setShowPaletteSheet(false);
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 transition-all ${
              viewMode === '2d' && activeDialog === 'none' && !showPaletteSheet
                ? 'text-sky-400 font-extrabold bg-sky-500/15 border border-sky-500/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>שרטוט CAD</span>
          </button>

          {/* 4. Luxury Color Themes & Finishes Drawer */}
          <button
            onClick={() => setShowPaletteSheet(!showPaletteSheet)}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 transition-all ${
              showPaletteSheet
                ? 'text-amber-400 font-extrabold bg-amber-500/15 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>גוונים ועיצוב</span>
          </button>

          {/* 5. BOM Summary or Inspector */}
          {selectedModuleId ? (
            <button
              onClick={() => setActiveDialog(activeDialog === 'inspector' ? 'none' : 'inspector')}
              className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
                activeDialog === 'inspector' ? 'text-emerald-400 font-bold bg-slate-900 border border-emerald-500/40' : 'text-slate-300 animate-pulse'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>ערוך ארון</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setShowPaletteSheet(false);
                setActiveDialog(activeDialog === 'bom' ? 'none' : 'bom');
              }}
              className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
                activeDialog === 'bom' ? 'text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>מפרט ועלות</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
