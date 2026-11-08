import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  Camera, 
  Layers, 
  Sliders, 
  Undo2, 
  Redo2, 
  Calculator, 
  Image, 
  Palette, 
  Sun, 
  DoorClosed, 
  DoorOpen,
  ArrowRightLeft,
  Columns2,
  Sparkles,
  Download,
  Compass
} from 'lucide-react';
import { MaterialTheme, LightingMode, CameraPreset, ViewMode } from '../types/kitchen';

export const Header: React.FC = () => {
  const activePlan = useKitchenStore(state => state.activePlan);
  const setPlan = useKitchenStore(state => state.setPlan);
  const viewMode = useKitchenStore(state => state.viewMode);
  const setViewMode = useKitchenStore(state => state.setViewMode);
  const cameraPreset = useKitchenStore(state => state.cameraPreset);
  const setCameraPreset = useKitchenStore(state => state.setCameraPreset);
  const theme = useKitchenStore(state => state.theme);
  const setTheme = useKitchenStore(state => state.setTheme);
  const lightingMode = useKitchenStore(state => state.lightingMode);
  const setLightingMode = useKitchenStore(state => state.setLightingMode);
  const allDoorsOpen = useKitchenStore(state => state.allDoorsOpen);
  const toggleAllDoors = useKitchenStore(state => state.toggleAllDoors);
  const showDimensions = useKitchenStore(state => state.showDimensions);
  const toggleDimensions = useKitchenStore(state => state.toggleDimensions);
  const showKosherColors = useKitchenStore(state => state.showKosherColors);
  const toggleKosherColors = useKitchenStore(state => state.toggleKosherColors);
  const undo = useKitchenStore(state => state.undo);
  const redo = useKitchenStore(state => state.redo);
  const historyPast = useKitchenStore(state => state.historyPast);
  const historyFuture = useKitchenStore(state => state.historyFuture);
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);

  // Live Tour Store integration
  const isLiveTourActive = useKitchenStore(state => state.isLiveTourActive);
  const startLiveTour = useKitchenStore(state => state.startLiveTour);
  const stopLiveTour = useKitchenStore(state => state.stopLiveTour);

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
    <header className="bg-slate-950 border-b border-slate-800 text-white px-2.5 sm:px-4 h-14 select-none shadow-md shrink-0 flex items-center justify-between overflow-hidden">
      {/* Brand & Client Identification */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/25 shrink-0">
            א
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-xs sm:text-sm leading-none whitespace-nowrap text-amber-400 tracking-wide">
                אחינועם מטבחים
              </h1>
              <span className="hidden md:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                לקוח 3155
              </span>
            </div>
            <span className="text-[10px] text-slate-400 whitespace-nowrap hidden sm:inline-block">
              תכנון מטבח משפחת אור | סטודיו אדריכלי
            </span>
          </div>
        </div>

        {/* Plan Selector Buttons */}
        <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex text-xs shrink-0">
          <button
            onClick={() => setPlan('plan-A')}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-bold transition-all text-xs whitespace-nowrap ${
              activePlan === 'plan-A'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            תוכנית א'
          </button>
          <button
            onClick={() => setPlan('plan-B')}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-bold transition-all text-xs whitespace-nowrap ${
              activePlan === 'plan-B'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            תוכנית ב'
          </button>
        </div>
      </div>

      {/* Main Studio View Tabs */}
      <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-xs shrink-0">
        <button
          onClick={() => {
            if (isLiveTourActive) {
              stopLiveTour();
            } else {
              startLiveTour(0);
            }
          }}
          className={`px-2.5 sm:px-3 py-1 rounded-md transition-all font-bold flex items-center gap-1.5 whitespace-nowrap ${
            isLiveTourActive
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/30 ring-1 ring-amber-300'
              : 'text-amber-400 hover:text-white hover:bg-slate-800'
          }`}
          title="סיור וירטואלי חי במטבח – מצב נהיגה ותנועה חופשית בין התחנות"
        >
          <Compass className={`w-3.5 h-3.5 ${isLiveTourActive ? 'animate-spin' : ''}`} />
          <span>🚗 סיור בלייב</span>
        </button>
        <button
          onClick={() => {
            if (isLiveTourActive) stopLiveTour();
            setViewMode('3d');
          }}
          className={`px-2.5 sm:px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 whitespace-nowrap ${
            viewMode === '3d' && !isLiveTourActive ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>תלת-ממד 3D</span>
        </button>
        <button
          onClick={() => setViewMode('2d')}
          className={`px-2.5 sm:px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 whitespace-nowrap ${
            viewMode === '2d' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>תוכנית CAD</span>
        </button>
        <button
          onClick={() => setViewMode('renders')}
          className={`px-2.5 sm:px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 whitespace-nowrap ${
            viewMode === 'renders' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>הדמיות 📸</span>
        </button>
        <button
          onClick={() => setViewMode('compare')}
          className={`hidden md:flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md transition-all font-semibold whitespace-nowrap ${
            viewMode === 'compare' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-3 h-3" />
          <span>השוואה</span>
        </button>
      </div>

      {/* Quick Interactive Actions */}
      <div className="flex items-center gap-1 sm:gap-2 text-xs shrink-0">
        {/* Kinetic Doors & Clearances Toggle */}
        <button
          onClick={toggleAllDoors}
          className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all shrink-0 ${
            allDoorsOpen
              ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="פתח/סגור את כל הדלתות והמגירות לבדיקת רדיוס פתיחה ותנועה"
        >
          {allDoorsOpen ? <DoorOpen className="w-3.5 h-3.5 text-slate-950" /> : <DoorClosed className="w-3.5 h-3.5 text-amber-400" />}
          <span className="hidden lg:inline">{allDoorsOpen ? 'סגור ארונות' : 'פתיחת ארונות (110°)'}</span>
        </button>

        {/* Material Themes Switcher (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
          <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as MaterialTheme)}
            className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
          >
            <option value="cashmere-oak" className="bg-slate-800">קשמיר + אלון טבעי</option>
            <option value="sahara-bronze" className="bg-slate-800">סהרה + ברונזה</option>
            <option value="dark-graphite" className="bg-slate-800">גרפיט יוקרתי</option>
            <option value="pure-white" className="bg-slate-800">לבן נקי ושיש</option>
          </select>
        </div>

        {/* Lighting Switcher (Desktop) */}
        <div className="hidden 2xl:flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
          <Sun className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <select
            value={lightingMode}
            onChange={(e) => setLightingMode(e.target.value as LightingMode)}
            className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
          >
            <option value="daylight" className="bg-slate-800">אור יום טבעי</option>
            <option value="task-led" className="bg-slate-800">תאורת לד עבודה</option>
            <option value="warm-ambient" className="bg-slate-800">אווירת ערב חמימה</option>
            <option value="shabbat" className="bg-slate-800">תאורת שבת</option>
          </select>
        </div>

        {/* Reference Media Archive */}
        <button
          onClick={() => setActiveDialog('media')}
          className="p-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white shrink-0"
          title="תיק מסמכים אדריכלי וצילומי שטח | פרויקט משפחת אור"
        >
          <Image className="w-4 h-4 text-blue-400" />
        </button>

        {/* BOM Calculator */}
        <button
          onClick={() => setActiveDialog('bom')}
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-2 sm:px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors shadow shrink-0"
          title="כתב כמויות הנדסי ואומדן עלויות"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span className="hidden sm:inline whitespace-nowrap">BOM</span>
        </button>

        {/* HD Camera Capture */}
        <button
          onClick={handleScreenshot}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 shrink-0"
          title="צילום תמונת HD של המטבח"
        >
          <Camera className="w-4 h-4 text-amber-400" />
        </button>

        {/* Mobile Settings Dialog Button */}
        <button
          onClick={() => setActiveDialog('controls')}
          className="xl:hidden p-1.5 bg-blue-600/30 border border-blue-500/50 hover:bg-blue-600/50 rounded-lg text-blue-300 shrink-0"
          title="הגדרות תצוגה ומצלמה"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
