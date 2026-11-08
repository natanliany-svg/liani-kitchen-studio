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
    <header className="bg-slate-950 border-b border-slate-800 text-white px-3 py-2 select-none shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Plan Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20">
              L
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base leading-none">מטבח משפחת ליאני</h1>
              <span className="text-[10px] text-slate-400">סטודיו תכנון הנדסי 2D/3D (בני ברק)</span>
            </div>
          </div>

          {/* Plan Selector Buttons */}
          <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setPlan('plan-A')}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                activePlan === 'plan-A'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              תוכנית א'
            </button>
            <button
              onClick={() => setPlan('plan-B')}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                activePlan === 'plan-B'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              תוכנית ב'
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
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

        {/* View Modes & Camera Preset Station Selector */}
        <div className="hidden lg:flex items-center gap-2">
          {/* View Modes */}
          <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                viewMode === 'split' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
              title="תצוגה מפוצלת: 3D + 2D CAD"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>מפוצל 2D/3D</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === '3d' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D בלבד
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === '2d' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              2D CAD בלבד
            </button>
          </div>

          {/* Camera Station Dropdown */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={cameraPreset}
              onChange={(e) => setCameraPreset(e.target.value as CameraPreset)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="orbit" className="bg-slate-800">360° סיבוב חופשי (Orbit)</option>
              <option value="eye-level" className="bg-slate-800">עמידה בגובה עין (155 ס"מ)</option>
              <option value="seated" className="bg-slate-800">ישיבה בשולחן האוכל (115 ס"מ)</option>
              <option value="top-down" className="bg-slate-800">מבט על הנדסי (Top-Down)</option>
              <option value="elevation-north" className="bg-slate-800">חזית צפון (קיר חלבי 317)</option>
              <option value="elevation-east" className="bg-slate-800">חזית מזרח (קיר בשרי 705)</option>
              <option value="elevation-west" className="bg-slate-800">חזית מערב (קיר שמאל ואוכל)</option>
              <option value="elevation-south" className="bg-slate-800">חזית דרום (מבט לכניסה)</option>
              <option value="station-meat" className="bg-slate-800">עמדת עבודה בשרית</option>
              <option value="station-dairy" className="bg-slate-800">עמדת עבודה חלבית</option>
              <option value="station-dining" className="bg-slate-800">עמדת שולחן שבת</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles: Doors, Theme, Lighting, Dimensions, Screenshot, BOM */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
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
            className={`px-2 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              allDoorsOpen
                ? 'bg-amber-600/80 border-amber-500 text-white font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="פתח/סגור את כל הדלתות והמגירות לבדיקת רדיוס פתיחה"
          >
            {allDoorsOpen ? <DoorOpen className="w-3.5 h-3.5" /> : <DoorClosed className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{allDoorsOpen ? 'סגור דלתות' : 'פתח דלתות'}</span>
          </button>

          {/* Material Theme Dropdown */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
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

          {/* Lighting Mode Dropdown */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
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
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
              activeDialog === 'catalog'
                ? 'bg-blue-600 border-blue-400 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <span>+ הוסף מודול</span>
          </button>

          {/* Reference Media Modal Button */}
          <button
            onClick={() => setActiveDialog('media')}
            className="p-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            title="מסמכי מקור, צילומי שטח ומידות מאומתות"
          >
            <Image className="w-4 h-4 text-blue-400" />
          </button>

          {/* BOM Calculator Button */}
          <button
            onClick={() => setActiveDialog('bom')}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors shadow"
            title="כתב כמויות הנדסי ואומדן עלויות (BOM)"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden md:inline">כתב כמויות (BOM)</span>
          </button>

          {/* Project JSON Export / Import */}
          <button
            onClick={() => setActiveDialog('export')}
            className="p-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            title="ייצוא / ייבוא פרויקט (Project JSON)"
          >
            <Download className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Screenshot capture */}
          <button
            onClick={handleScreenshot}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200"
            title="צילום תמונת HD של המטבח"
          >
            <Camera className="w-4 h-4 text-amber-400" />
          </button>

          {/* Mobile Studio Controls Quick Button */}
          <button
            onClick={() => setActiveDialog('controls')}
            className="lg:hidden p-1.5 bg-blue-600/30 border border-blue-500/50 hover:bg-blue-600/50 rounded-lg text-blue-300"
            title="בקרת סטודיו והגדרות (מצלמה, תאורה, גוונים)"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
