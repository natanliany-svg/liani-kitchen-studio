import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  Camera, 
  Layers, 
  DoorClosed, 
  DoorOpen,
  Sparkles,
  Compass,
  Ruler,
  Calculator,
  Sun,
  Moon,
  Accessibility,
  Palette
} from 'lucide-react';
import { LightingMode, ViewMode } from '../types/kitchen';

export const Header: React.FC = () => {
  const activePlan = useKitchenStore(state => state.activePlan);
  const setPlan = useKitchenStore(state => state.setPlan);
  const viewMode = useKitchenStore(state => state.viewMode);
  const setViewMode = useKitchenStore(state => state.setViewMode);
  const lightingMode = useKitchenStore(state => state.lightingMode);
  const setLightingMode = useKitchenStore(state => state.setLightingMode);
  const allDoorsOpen = useKitchenStore(state => state.allDoorsOpen);
  const toggleAllDoors = useKitchenStore(state => state.toggleAllDoors);
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);
  const toggleSplash = useKitchenStore(state => state.toggleSplash);
  const toggleAccessibilityDialog = useKitchenStore(state => state.toggleAccessibilityDialog);

  // Live Tour Store integration
  const isLiveTourActive = useKitchenStore(state => state.isLiveTourActive);
  const startLiveTour = useKitchenStore(state => state.startLiveTour);
  const stopLiveTour = useKitchenStore(state => state.stopLiveTour);

  // Next Lighting Mode Cycle
  const cycleLighting = () => {
    const modes: LightingMode[] = ['daylight', 'warm-ambient', 'shabbat'];
    const nextIdx = (modes.indexOf(lightingMode) + 1) % modes.length;
    setLightingMode(modes[nextIdx]);
  };

  // Take screenshot
  const handleScreenshot = () => {
    const fn = (window as unknown as { captureStudio3D?: () => string | undefined }).captureStudio3D;
    if (fn) {
      const dataUrl = fn();
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `Achinoam-Kitchen-Or-3155-${activePlan}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    }
  };

  return (
    <header className="bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 text-white px-3 sm:px-6 h-16 select-none shadow-2xl shrink-0 flex items-center justify-between z-30 transition-all">
      
      {/* Brand & Client Identification (Clickable to open Splash Portal) */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          onClick={toggleSplash}
          className="flex items-center gap-2.5 group text-right focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl p-1 -m-1 transition-all"
          title="לחץ לפתיחת שער הפרויקט ומיתוג המטבח"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
            א
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 tracking-wide font-serif">
                אחינועם מטבחים
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                תיק 3155
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              משפחת אור • סטודיו אדריכלי
            </div>
          </div>
        </button>

        {/* Plan Selector Buttons */}
        <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex text-xs shrink-0 shadow-inner">
          <button
            onClick={() => setPlan('plan-A')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs whitespace-nowrap ${
              activePlan === 'plan-A'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            תוכנית א'
          </button>
          <button
            onClick={() => setPlan('plan-B')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs whitespace-nowrap ${
              activePlan === 'plan-B'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            תוכנית ב'
          </button>
        </div>
      </div>

      {/* Main Studio View Tabs (Desktop - Clean 5 Tabs) */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs shrink-0 shadow-xl">
        
        {/* 3D View */}
        <button
          onClick={() => {
            if (isLiveTourActive) stopLiveTour();
            setViewMode('3d');
          }}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 whitespace-nowrap ${
            viewMode === '3d' && !isLiveTourActive
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>תלת-ממד 3D</span>
        </button>

        {/* Live Tour */}
        <button
          onClick={() => {
            if (isLiveTourActive) {
              stopLiveTour();
            } else {
              startLiveTour(0);
            }
          }}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 whitespace-nowrap ${
            isLiveTourActive
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black shadow-lg shadow-amber-500/30'
              : 'text-amber-400 hover:text-white hover:bg-slate-800'
          }`}
          title="סיור קולנועי רציף בגובה עיניים עם סנכרון תריס קשתי ותאורת לד"
        >
          <Compass className={`w-4 h-4 ${isLiveTourActive ? 'animate-spin' : ''}`} />
          <span>סיור קולנועי חי</span>
        </button>

        {/* CAD Blueprint */}
        <button
          onClick={() => {
            if (isLiveTourActive) stopLiveTour();
            setViewMode('2d');
          }}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 whitespace-nowrap ${
            viewMode === '2d'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>תוכנית CAD</span>
        </button>

        {/* Materials & Lighting Modal */}
        <button
          onClick={() => setActiveDialog(activeDialog === 'controls' ? 'none' : 'controls')}
          className={`px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 whitespace-nowrap ${
            activeDialog === 'controls'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Palette className="w-4 h-4 text-amber-400" />
          <span>חומרים ותאורה</span>
        </button>

        {/* BOM & Spec */}
        <button
          onClick={() => setActiveDialog('bom')}
          className="px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-2 whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>מפרט ועלויות (BOM)</span>
        </button>

      </div>

      {/* Streamlined Quick Tools (Left Side) */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Kinetic Doors & Openings Toggle */}
        <button
          onClick={toggleAllDoors}
          className={`h-10 px-3 rounded-xl border flex items-center gap-2 transition-all text-xs font-bold ${
            allDoorsOpen
              ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="פתח/סגור את כל הדלתות והמגירות לבדיקת תנועה ורדיוסים"
        >
          {allDoorsOpen ? <DoorOpen className="w-4 h-4 text-slate-950" /> : <DoorClosed className="w-4 h-4 text-amber-400" />}
          <span className="hidden xl:inline">{allDoorsOpen ? 'סגירת ארונות' : 'פתיחת ארונות'}</span>
        </button>

        {/* Lighting Mode Quick Cycle */}
        <button
          onClick={cycleLighting}
          className="h-10 px-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white flex items-center gap-2 transition-all text-xs font-medium"
          title={`מצב תאורה: ${lightingMode === 'daylight' ? 'אור יום' : lightingMode === 'warm-ambient' ? 'ערב חמים' : 'שבת'}`}
        >
          {lightingMode === 'daylight' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-amber-300" />
          )}
          <span className="hidden xl:inline">
            {lightingMode === 'daylight' ? 'יום' : lightingMode === 'warm-ambient' ? 'ערב 3000K' : 'שבת'}
          </span>
        </button>

        {/* HD Screenshot */}
        <button
          onClick={handleScreenshot}
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all shadow"
          title="צילום תמונת HD של המטבח"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Accessibility Toggle */}
        <button
          onClick={toggleAccessibilityDialog}
          className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 hover:bg-blue-600/50 flex items-center justify-center text-blue-300 hover:text-white transition-all shadow"
          title="תפריט נגישות (תקן 5568)"
        >
          <Accessibility className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
