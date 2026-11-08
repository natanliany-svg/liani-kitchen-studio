import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { 
  Box, 
  Map, 
  ArrowRightLeft, 
  PlusCircle, 
  Calculator, 
  SlidersHorizontal,
  Settings2
} from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const viewMode = useKitchenStore(state => state.viewMode);
  const setViewMode = useKitchenStore(state => state.setViewMode);
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);

  return (
    <nav className="lg:hidden bg-slate-950 border-t border-slate-800 text-white py-1 px-1.5 select-none z-30 shadow-2xl">
      <div className="grid grid-cols-6 gap-1 text-center text-[10px]">
        {/* 3D View */}
        <button
          onClick={() => {
            setViewMode('3d');
            setActiveDialog('none');
          }}
          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
            viewMode === '3d' && activeDialog === 'none' ? 'text-blue-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>3D</span>
        </button>

        {/* 2D CAD */}
        <button
          onClick={() => {
            setViewMode('2d');
            setActiveDialog('none');
          }}
          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
            viewMode === '2d' && activeDialog === 'none' ? 'text-blue-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>2D שרטוט</span>
        </button>

        {/* Compare Plan A / Plan B */}
        <button
          onClick={() => {
            setViewMode('compare');
            setActiveDialog('none');
          }}
          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
            viewMode === 'compare' ? 'text-purple-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>השוואה</span>
        </button>

        {/* Catalog */}
        <button
          onClick={() => setActiveDialog(activeDialog === 'catalog' ? 'none' : 'catalog')}
          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
            activeDialog === 'catalog' ? 'text-amber-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>קטלוג</span>
        </button>

        {/* Studio Controls (Camera stations, Themes, Lighting, Toggles) */}
        <button
          onClick={() => setActiveDialog(activeDialog === 'controls' ? 'none' : 'controls')}
          className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
            activeDialog === 'controls' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>בקרות</span>
        </button>

        {/* Inspector or BOM */}
        {selectedModuleId ? (
          <button
            onClick={() => setActiveDialog(activeDialog === 'inspector' ? 'none' : 'inspector')}
            className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
              activeDialog === 'inspector' ? 'text-emerald-400 font-bold bg-slate-900' : 'text-slate-300 animate-pulse'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>ערוך ארון</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveDialog('bom')}
            className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 ${
              activeDialog === 'bom' ? 'text-emerald-400 font-bold bg-slate-900' : 'text-slate-400'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>כמויות</span>
          </button>
        )}
      </div>
    </nav>
  );
};
