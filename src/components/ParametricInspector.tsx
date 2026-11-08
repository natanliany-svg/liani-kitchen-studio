import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { PlacedModule, DoorOpeningType, WallId } from '../types/kitchen';
import { 
  X, 
  Trash2, 
  Copy, 
  MoveHorizontal, 
  DoorClosed, 
  Sliders, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

export const ParametricInspector: React.FC = () => {
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const selectModule = useKitchenStore(state => state.selectModule);
  const modules = useKitchenStore(state => state.placedModules);
  const updateModule = useKitchenStore(state => state.updateModule);
  const removeModule = useKitchenStore(state => state.removeModule);
  const duplicateModule = useKitchenStore(state => state.duplicateModule);
  const toggleDoorOpen = useKitchenStore(state => state.toggleDoorOpen);

  const selectedMod = modules.find(m => m.id === selectedModuleId);

  if (!selectedMod) return null;

  const handleDimensionChange = (key: 'width' | 'height' | 'depth', val: number) => {
    if (isNaN(val) || val < 10) return;
    updateModule(selectedMod.id, {
      dimensions: {
        ...selectedMod.dimensions,
        [key]: val
      }
    });
  };

  const handleNudge = (deltaZ: number) => {
    updateModule(selectedMod.id, {
      position: [
        selectedMod.position[0],
        selectedMod.position[1],
        Math.max(0, Math.min(705, selectedMod.position[2] + deltaZ))
      ]
    });
  };

  return (
    <div className="w-full md:w-80 bg-slate-900 border-l border-slate-800 text-white flex flex-col z-20 shadow-2xl select-none max-h-full overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-xs truncate max-w-[180px]">{selectedMod.nameHe}</h3>
        </div>
        <button
          onClick={() => selectModule(null)}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 space-y-4 text-xs">
        {/* Kosher Zone Badge & Price */}
        <div className="flex items-center justify-between bg-slate-800/80 p-2 rounded-lg border border-slate-700">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${
              selectedMod.kosherZone === 'meat' ? 'bg-red-500' :
              selectedMod.kosherZone === 'dairy' ? 'bg-blue-500' :
              selectedMod.kosherZone === 'pareve' ? 'bg-emerald-500' : 'bg-slate-400'
            }`} />
            <span className="font-semibold text-slate-200">
              {selectedMod.kosherZone === 'meat' ? 'בשרי (נישה 2)' :
               selectedMod.kosherZone === 'dairy' ? 'חלבי (קיר אחורי)' :
               selectedMod.kosherZone === 'pareve' ? 'פרווה / שבת' : 'כללי'}
            </span>
          </div>
          <span className="font-bold text-amber-400 font-mono">
            {selectedMod.priceIls.toLocaleString()} ₪
          </span>
        </div>

        {/* Parametric Dimension Inputs */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-semibold text-slate-400 block">מידות פרמטריות (בס"מ):</label>
          
          {/* Width */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-300 w-12">רוחב:</span>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={selectedMod.dimensions.width}
              onChange={(e) => handleDimensionChange('width', parseInt(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <input
              type="number"
              value={selectedMod.dimensions.width}
              onChange={(e) => handleDimensionChange('width', parseInt(e.target.value))}
              className="w-14 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-center font-mono font-bold"
            />
          </div>

          {/* Depth */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-300 w-12">עומק:</span>
            <input
              type="range"
              min="30"
              max="90"
              step="1"
              value={selectedMod.dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', parseInt(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <input
              type="number"
              value={selectedMod.dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', parseInt(e.target.value))}
              className="w-14 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-center font-mono font-bold"
            />
          </div>

          {/* Height */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-300 w-12">גובה:</span>
            <input
              type="range"
              min="40"
              max="246"
              step="2"
              value={selectedMod.dimensions.height}
              onChange={(e) => handleDimensionChange('height', parseInt(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <input
              type="number"
              value={selectedMod.dimensions.height}
              onChange={(e) => handleDimensionChange('height', parseInt(e.target.value))}
              className="w-14 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-center font-mono font-bold"
            />
          </div>
        </div>

        {/* Door Opening & Kinetic Swing Slider */}
        {selectedMod.doorType !== 'none' && (
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1 text-slate-300">
                <DoorClosed className="w-3.5 h-3.5 text-amber-400" />
                בדיקת פתיחת דלת / מגירה:
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {Math.round((selectedMod.openPercent || 0) * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={selectedMod.openPercent || 0}
              onChange={(e) => toggleDoorOpen(selectedMod.id, parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px]">
              <button
                onClick={() => toggleDoorOpen(selectedMod.id, 0)}
                className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
              >
                סגור
              </button>
              <button
                onClick={() => toggleDoorOpen(selectedMod.id, 1)}
                className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 rounded text-white font-medium"
              >
                פתיחה מלאה
              </button>
            </div>
          </div>
        )}

        {/* Door Opening Mechanism Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 block">מנגנון פרזול ודלתות:</label>
          <select
            value={selectedMod.doorType}
            onChange={(e) => updateModule(selectedMod.id, { doorType: e.target.value as DoorOpeningType })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="single-door">דלת פתיחה רגילה (צירים Blum 110°)</option>
            <option value="double-door">דלת כפולה (French Door / ארון כיור)</option>
            <option value="drawers">מגירות נשלפות (Blum Legrabox)</option>
            <option value="lift-up">קלפה עליונה (Blum Aventos HF/HK)</option>
            <option value="pocket">דלתות כיס נבלעות (Pocket Doors למיקסר)</option>
            <option value="tambour">תריס גלילה אנכי (זכוכית/אלומיניום)</option>
            <option value="none">ללא דלת (פתוח)</option>
          </select>
        </div>

        {/* Wall & Position Nudge */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 block">הזזה עדינה לאורך הקיר:</label>
          <div className="grid grid-cols-4 gap-1">
            <button
              onClick={() => handleNudge(-5)}
              className="bg-slate-800 hover:bg-slate-700 py-1 rounded text-center font-mono font-medium"
            >
              -5 ס"מ
            </button>
            <button
              onClick={() => handleNudge(-1)}
              className="bg-slate-800 hover:bg-slate-700 py-1 rounded text-center font-mono font-medium"
            >
              -1 ס"מ
            </button>
            <button
              onClick={() => handleNudge(1)}
              className="bg-slate-800 hover:bg-slate-700 py-1 rounded text-center font-mono font-medium"
            >
              +1 ס"מ
            </button>
            <button
              onClick={() => handleNudge(5)}
              className="bg-slate-800 hover:bg-slate-700 py-1 rounded text-center font-mono font-medium"
            >
              +5 ס"מ
            </button>
          </div>
        </div>

        {/* Action Buttons: Duplicate & Delete */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => duplicateModule(selectedMod.id)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 rounded-lg flex items-center justify-center gap-1.5 font-medium transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>שכפל</span>
          </button>
          <button
            onClick={() => removeModule(selectedMod.id)}
            className="flex-1 bg-red-950/80 hover:bg-red-900 text-red-300 py-1.5 rounded-lg flex items-center justify-center gap-1.5 font-medium border border-red-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>מחק מודול</span>
          </button>
        </div>
      </div>
    </div>
  );
};
