import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  Camera, 
  Eye, 
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
  FileSpreadsheet,
  Download
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

  // Take screenshot
  const handleScreenshot = () => {
    const fn = (window as unknown as { captureStudio3D?: () => string | undefined }).captureStudio3D;
    if (fn) {
      const dataUrl = fn();
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `Liani-Kitchen-3D-${activePlan}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    }
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-white px-2.5 sm:px-4 h-14 select-none shadow-md shrink-0 flex items-center justify-between overflow-hidden">
      {/* Brand & Plan Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20 shrink-0">
            L
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-xs sm:text-sm leading-none whitespace-nowrap">מטבח משפחת ליאני</h1>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">סטודיו 2D/3D (בני ברק)</span>
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
          <button
            onClick={() => setViewMode('compare')}
            className={`px-2 sm:px-2.5 py-1 rounded-md font-medium transition-all hidden sm:flex items-center gap-1 text-xs whitespace-nowrap ${
              viewMode === 'compare'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>השוואה</span>
          </button>
        </div>
      </div>

      {/* View Modes & Camera Preset Station Selector (Visible on xl+ screens) */}
      <div className="hidden xl:flex items-center gap-2 shrink-0">
        {/* View Modes */}
        <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors whitespace-nowrap ${
              viewMode === 'split' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
            title="תצוגה מפוצלת: 3D + 2D CAD"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>מפוצל 2D/3D</span>
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              viewMode === '3d' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            3D בלבד
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              viewMode === '2d' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            2D CAD בלבד
          </button>
        </div>

        {/* Camera Station Dropdown */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs">
          <Camera className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <select
            value={cameraPreset}
            onChange={(e) => setCameraPreset(e.target.value as CameraPreset)}
            className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[150px] truncate"
          >
            <option value="orbit" className="bg-slate-800">360° סיבוב חופשי</option>
            <option value="eye-level" className="bg-slate-800">עמידה גובה עין (155)</option>
            <option value="seated" className="bg-slate-800">ישיבה בשולחן (115)</option>
            <option value="top-down" className="bg-slate-800">מבט על הנדסי</option>
            <option value="elevation-north" className="bg-slate-800">חזית צפון (חלבי 317)</option>
            <option value="elevation-east" className="bg-slate-800">חזית מזרח (בשרי 705)</option>
            <option value="elevation-west" className="bg-slate-800">חזית מערב (שמאל ואוכל)</option>
            <option value="elevation-south" className="bg-slate-800">חזית דרום (כניסה)</option>
            <option value="station-meat" className="bg-slate-800">עמדת עבודה בשרית</option>
            <option value="station-dairy" className="bg-slate-800">עמדת עבודה חלבית</option>
            <option value="station-dining" className="bg-slate-800">עמדת שולחן שבת</option>
          </select>
        </div>
      </div>

      {/* Quick Actions & Tools */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-xs shrink-0">
        {/* Undo / Redo (hidden on mobile, visible from md) */}
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
          <button
            onClick={undo}
            disabled={historyPast.length === 0}
            className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 text-slate-300"
            title="בטל פעולה אחרונה (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={redo}
            disabled={historyFuture.length === 0}
            className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 text-slate-300"
            title="בצע שוב (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kinetic Door Toggle */}
        <button
          onClick={toggleAllDoors}
          className={`px-2 py-1 rounded-lg border flex items-center gap-1 transition-all shrink-0 ${
            allDoorsOpen
              ? 'bg-amber-600/80 border-amber-500 text-white font-bold'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="פתח/סגור את כל הדלתות והמגירות לבדיקת רדיוס פתיחה"
        >
          {allDoorsOpen ? <DoorOpen className="w-3.5 h-3.5" /> : <DoorClosed className="w-3.5 h-3.5" />}
          <span className="hidden lg:inline">{allDoorsOpen ? 'סגור דלתות' : 'פתח דלתות'}</span>
        </button>

        {/* Material Theme Dropdown (hidden on smaller screens) */}
        <div className="hidden 2xl:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
          <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as MaterialTheme)}
            className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
          >
            <option value="cashmere-oak" className="bg-slate-800">קשמיר + אלון טבעי</option>
            <option value="sahara-bronze" className="bg-slate-800">סהרה + ברונזה</option>
            <option value="dark-graphite" className="bg-slate-800">גרפיט יוקרתי</option>
            <option value="pure-white" className="bg-slate-800">לבן מינימליסטי</option>
          </select>
        </div>

        {/* Lighting Mode Dropdown (hidden on smaller screens) */}
        <div className="hidden 2xl:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
          <Sun className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <select
            value={lightingMode}
            onChange={(e) => setLightingMode(e.target.value as LightingMode)}
            className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
          >
            <option value="daylight" className="bg-slate-800">אור יום טבעי</option>
            <option value="task-led" className="bg-slate-800">תאורת לד עבודה</option>
            <option value="warm-ambient" className="bg-slate-800">אווירת ערב חמימה</option>
            <option value="shabbat" className="bg-slate-800">תאורת שבת רגועה</option>
          </select>
        </div>

        {/* Catalog Drawer Button */}
        <button
          onClick={() => setActiveDialog(activeDialog === 'catalog' ? 'none' : 'catalog')}
          className={`px-2 sm:px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all shrink-0 ${
            activeDialog === 'catalog'
              ? 'bg-blue-600 border-blue-400 text-white'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <span className="whitespace-nowrap">+ מודול</span>
        </button>

        {/* Reference Media Modal Button */}
        <button
          onClick={() => setActiveDialog('media')}
          className="p-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white shrink-0"
          title="מסמכי מקור, צילומי שטח ומידות מאומתות"
        >
          <Image className="w-4 h-4 text-blue-400" />
        </button>

        {/* BOM Calculator Button */}
        <button
          onClick={() => setActiveDialog('bom')}
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-2 sm:px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors shadow shrink-0"
          title="כתב כמויות הנדסי ואומדן עלויות (BOM)"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span className="hidden sm:inline whitespace-nowrap">BOM</span>
        </button>

        {/* Project JSON Export / Import (hidden on mobile) */}
        <button
          onClick={() => setActiveDialog('export')}
          className="hidden sm:block p-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white shrink-0"
          title="ייצוא / ייבוא פרויקט (Project JSON)"
        >
          <Download className="w-4 h-4 text-indigo-400" />
        </button>

        {/* Screenshot capture */}
        <button
          onClick={handleScreenshot}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 shrink-0"
          title="צילום תמונת HD של המטבח"
        >
          <Camera className="w-4 h-4 text-amber-400" />
        </button>

        {/* Mobile / Tablet Studio Controls Quick Button */}
        <button
          onClick={() => setActiveDialog('controls')}
          className="xl:hidden p-1.5 bg-blue-600/30 border border-blue-500/50 hover:bg-blue-600/50 rounded-lg text-blue-300 shrink-0"
          title="בקרת סטודיו והגדרות (מצלמה, תאורה, גוונים)"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
