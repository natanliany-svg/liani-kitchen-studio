import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { ThreeKitchenCanvas } from './ThreeKitchenCanvas';
import { CadBlueprintCanvas } from './CadBlueprintCanvas';
import { PLAN_A_MODULES, PLAN_B_MODULES } from '../data/defaultPlans';
import { Check, ArrowRightLeft } from 'lucide-react';

export const SplitCompareView: React.FC = () => {
  const activePlan = useKitchenStore(state => state.activePlan);
  const setPlan = useKitchenStore(state => state.setPlan);
  const [compareMode, setCompareMode] = React.useState<'3d' | '2d'>('3d');

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white select-none">
      {/* Header with comparison toggles */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 sm:px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <ArrowRightLeft className="w-4 h-4 text-amber-400 shrink-0" />
          <h2 className="text-xs sm:text-sm font-bold whitespace-nowrap">השוואה: תוכנית א' מול תוכנית ב'</h2>
          <span className="text-xs text-slate-400 hidden md:inline">מעטפת קשיחה (317×705 | עמודים 89 | H=246)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setCompareMode('3d')}
              className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition-colors text-xs whitespace-nowrap ${
                compareMode === '3d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D
            </button>
            <button
              onClick={() => setCompareMode('2d')}
              className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition-colors text-xs whitespace-nowrap ${
                compareMode === '2d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              2D CAD
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Viewports */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-800 overflow-hidden">
        {/* Pane 1: Plan A */}
        <div className="relative flex flex-col h-full bg-slate-900/50">
          <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div>
              <span className="text-amber-400 font-bold text-sm ml-2">תוכנית א'</span>
              <span className="text-xs text-slate-300">קירור מרוכז בכניסה | אפייה ומזווה בקיר שמאל</span>
            </div>
            <button
              onClick={() => setPlan('plan-A')}
              className={`text-xs px-3 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                activePlan === 'plan-A'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {activePlan === 'plan-A' && <Check className="w-3.5 h-3.5" />}
              {activePlan === 'plan-A' ? 'תוכנית נבחרת' : 'בחר תוכנית א\''}
            </button>
          </div>

          <div className="flex-1 relative">
            {compareMode === '3d' ? (
              <ThreeKitchenCanvas overridePlanModules={PLAN_A_MODULES} isMiniView={true} />
            ) : (
              <CadBlueprintCanvas overridePlanModules={PLAN_A_MODULES} isMiniView={true} />
            )}
          </div>

          {/* Key specs for Plan A */}
          <div className="bg-slate-900 border-t border-slate-800 p-2 text-xs grid grid-cols-2 gap-2 text-slate-300">
            <div>• <strong className="text-white">נישה 1 (263):</strong> מקפיא 60 + 2 מקררים 90</div>
            <div>• <strong className="text-white">נישה 3 (124):</strong> שיש רצוף ב-ר' לפלטה/מיחם</div>
            <div>• <strong className="text-white">קיר אחורי:</strong> ארון מכשירים על השיש בשמאל</div>
            <div>• <strong className="text-white">פינת אוכל:</strong> שולחן 160 ס"מ (מקום ל-6 סועדים)</div>
          </div>
        </div>

        {/* Pane 2: Plan B */}
        <div className="relative flex flex-col h-full bg-slate-900/50">
          <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div>
              <span className="text-sky-400 font-bold text-sm ml-2">תוכנית ב'</span>
              <span className="text-xs text-slate-300">קירור+אפייה בכניסה | מקסום מרחב פינת האוכל</span>
            </div>
            <button
              onClick={() => setPlan('plan-B')}
              className={`text-xs px-3 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                activePlan === 'plan-B'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-lg'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {activePlan === 'plan-B' && <Check className="w-3.5 h-3.5" />}
              {activePlan === 'plan-B' ? 'תוכנית נבחרת' : 'בחר תוכנית ב\''}
            </button>
          </div>

          <div className="flex-1 relative">
            {compareMode === '3d' ? (
              <ThreeKitchenCanvas overridePlanModules={PLAN_B_MODULES} isMiniView={true} />
            ) : (
              <CadBlueprintCanvas overridePlanModules={PLAN_B_MODULES} isMiniView={true} />
            )}
          </div>

          {/* Key specs for Plan B */}
          <div className="bg-slate-900 border-t border-slate-800 p-2 text-xs grid grid-cols-2 gap-2 text-slate-300">
            <div>• <strong className="text-white">נישה 1 (263):</strong> 2 מקררים 90 + מגדל תנורים 60</div>
            <div>• <strong className="text-white">נישה 3 (124):</strong> מקפיא 65 + ארון מכשירים 59</div>
            <div>• <strong className="text-white">קיר אחורי:</strong> שיש פתוח רצוף המסתובב ב-ר'</div>
            <div>• <strong className="text-white">פינת אוכל:</strong> שולחן ענק 220 ס"מ (8-10 סועדים!)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
