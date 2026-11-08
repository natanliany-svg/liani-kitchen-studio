import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  X, 
  Camera, 
  Palette, 
  Sun, 
  DoorClosed, 
  DoorOpen, 
  Layers, 
  Ruler, 
  FileJson, 
  Calculator, 
  Image, 
  ArrowRightLeft,
  Columns2,
  Box,
  Map,
  Compass
} from 'lucide-react';
import { CameraPreset, MaterialTheme, LightingMode, ViewMode, PlanId } from '../types/kitchen';

export const MobileControlsModal: React.FC = () => {
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);
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

  if (activeDialog !== 'controls') return null;

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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border-t border-slate-700 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Sheet Grab Handle & Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-col gap-2">
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white">בקרת סטודיו והגדרות תצוגה</h2>
            </div>
            <button
              onClick={() => setActiveDialog('none')}
              className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable controls body */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs">
          {/* Plan Selector */}
          <div className="space-y-2">
            <span className="font-bold text-slate-300">תוכנית מטבח</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPlan('plan-A')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  activePlan === 'plan-A'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                תוכנית א'
              </button>
              <button
                onClick={() => setPlan('plan-B')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  activePlan === 'plan-B'
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                תוכנית ב'
              </button>
              <button
                onClick={() => {
                  setViewMode('compare');
                  setActiveDialog('none');
                }}
                className={`py-2 rounded-xl font-bold border flex items-center justify-center gap-1 ${
                  viewMode === 'compare'
                    ? 'bg-purple-600 text-white border-purple-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>השוואה</span>
              </button>
            </div>
          </div>

          {/* Camera Stations & Perspectives */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Camera className="w-4 h-4" />
              <span>תחנות מצלמה ומבטים</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'orbit', label: '360° סיבוב חופשי' },
                { id: 'eye-level', label: 'גובה עין (155 ס"מ)' },
                { id: 'seated', label: 'ישיבה בשולחן (115 ס"מ)' },
                { id: 'top-down', label: 'מבט על הנדסי' },
                { id: 'elevation-north', label: 'חזית צפון (קיר חלבי)' },
                { id: 'elevation-east', label: 'חזית מזרח (קיר בשרי)' },
                { id: 'elevation-west', label: 'חזית מערב (קיר שמאל)' },
                { id: 'elevation-south', label: 'חזית דרום (כניסה)' },
                { id: 'station-meat', label: 'עמדת בשרי' },
                { id: 'station-dairy', label: 'עמדת חלבי' },
              ].map(cam => (
                <button
                  key={cam.id}
                  onClick={() => {
                    setCameraPreset(cam.id as CameraPreset);
                    setViewMode('3d');
                  }}
                  className={`p-2 rounded-lg border text-right font-medium transition-colors ${
                    cameraPreset === cam.id
                      ? 'bg-blue-600 border-blue-400 text-white font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material Themes */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Palette className="w-4 h-4" />
              <span>חומרים וגוונים</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'cashmere-oak', label: 'קשמיר + אלון טבעי' },
                { id: 'sahara-bronze', label: 'סהרה + ברונזה' },
                { id: 'dark-graphite', label: 'גרפיט יוקרתי' },
                { id: 'pure-white', label: 'לבן מינימליסטי' },
              ].map(th => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id as MaterialTheme)}
                  className={`p-2 rounded-lg border text-right font-medium transition-colors ${
                    theme === th.id
                      ? 'bg-amber-600 border-amber-400 text-white font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Modes */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <Sun className="w-4 h-4" />
              <span>תאורה ואווירה</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'daylight', label: 'אור יום טבעי' },
                { id: 'task-led', label: 'תאורת לד עבודה' },
                { id: 'warm-ambient', label: 'אווירת ערב חמימה' },
                { id: 'shabbat', label: 'תאורת שבת רגועה' },
              ].map(lt => (
                <button
                  key={lt.id}
                  onClick={() => setLightingMode(lt.id as LightingMode)}
                  className={`p-2 rounded-lg border text-right font-medium transition-colors ${
                    lightingMode === lt.id
                      ? 'bg-yellow-600 border-yellow-400 text-white font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {lt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Toggles */}
          <div className="space-y-2">
            <span className="font-bold text-slate-300">בקרת שכבות ותנועה</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={toggleAllDoors}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  allDoorsOpen ? 'bg-amber-600/80 border-amber-500 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {allDoorsOpen ? <DoorOpen className="w-4 h-4" /> : <DoorClosed className="w-4 h-4" />}
                <span>{allDoorsOpen ? 'דלתות פתוחות' : 'דלתות סגורות'}</span>
              </button>

              <button
                onClick={toggleDimensions}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  showDimensions ? 'bg-blue-600/80 border-blue-500 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Ruler className="w-4 h-4" />
                <span>מידות בס"מ</span>
              </button>

              <button
                onClick={toggleKosherColors}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  showKosherColors ? 'bg-purple-600/80 border-purple-500 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>הפרדה כשרה</span>
              </button>
            </div>
          </div>

          {/* Tools & Project Actions */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="font-bold text-slate-300">כלים וייצוא</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveDialog('export')}
                className="p-2.5 bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600/50 rounded-xl text-indigo-200 flex items-center justify-center gap-2 font-medium"
              >
                <FileJson className="w-4 h-4" />
                <span>ייצוא/ייבוא JSON</span>
              </button>

              <button
                onClick={handleScreenshot}
                className="p-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-slate-200 flex items-center justify-center gap-2 font-medium"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>צילום תמונת HD</span>
              </button>

              <button
                onClick={() => setActiveDialog('bom')}
                className="p-2.5 bg-emerald-800/40 border border-emerald-600/50 hover:bg-emerald-800/60 rounded-xl text-emerald-200 flex items-center justify-center gap-2 font-medium"
              >
                <Calculator className="w-4 h-4" />
                <span>כתב כמויות (BOM)</span>
              </button>

              <button
                onClick={() => setActiveDialog('media')}
                className="p-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-slate-200 flex items-center justify-center gap-2 font-medium"
              >
                <Image className="w-4 h-4 text-blue-400" />
                <span>מסמכי מקור</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={() => setActiveDialog('none')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg transition-colors"
          >
            חזור לסטודיו
          </button>
        </div>
      </div>
    </div>
  );
};
