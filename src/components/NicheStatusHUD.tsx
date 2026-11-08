import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export const NicheStatusHUD: React.FC = () => {
  const nicheUsage = useKitchenStore(state => state.nicheUsage);
  const validationIssues = useKitchenStore(state => state.validationIssues);
  const activePlan = useKitchenStore(state => state.activePlan);

  const errors = validationIssues.filter(i => i.type === 'error');
  const warnings = validationIssues.filter(i => i.type === 'warning');

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-white select-none">
      {/* Niche Capacity Cards */}
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between gap-2 overflow-x-auto text-xs scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 bg-slate-800/80 px-2.5 py-1.5 rounded-md border border-slate-700">
          <span className="text-amber-400 font-bold">תוכנית {activePlan === 'plan-A' ? 'א\' (קירור בכניסה)' : activePlan === 'plan-B' ? 'ב\' (פינת אוכל מקסימלית)' : 'מותאמת אישית'}:</span>
          <span className="text-slate-300">H=246 ס"מ מלא לתקרה</span>
        </div>

        {/* 5 Architectural Zones */}
        <div className="flex items-center gap-2">
          {nicheUsage.map(niche => {
            const isDanger = niche.isOverLimit;
            const isTight = niche.remainingCm < 5 && !isDanger;

            return (
              <div
                key={niche.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs shrink-0 ${
                  isDanger
                    ? 'bg-red-950/60 border-red-500/50 text-red-300'
                    : isTight
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/70 border-slate-700/80 text-slate-200'
                }`}
              >
                <span className="font-semibold text-slate-400">{niche.nameHe}:</span>
                <span className="font-mono font-bold text-white">{niche.usedCm}/{niche.capacityCm} ס"מ</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                  isDanger ? 'bg-red-800 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {isDanger ? `חריגה ${Math.abs(niche.remainingCm)} ס"מ!` : `פנוי ${niche.remainingCm} ס"מ`}
                </span>
              </div>
            );
          })}
        </div>

        {/* Validation Status Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {errors.length > 0 ? (
            <div className="flex items-center gap-1.5 bg-red-900/80 text-red-200 px-3 py-1 rounded-md font-medium text-xs border border-red-700">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>{errors.length} חריגות מבנה</span>
            </div>
          ) : warnings.length > 0 ? (
            <div className="flex items-center gap-1.5 bg-amber-900/70 text-amber-200 px-3 py-1 rounded-md font-medium text-xs border border-amber-700">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{warnings.length} התראות</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-md font-medium text-xs border border-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>הנדסה וכשרות: 100% תקין</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating alert bar if there are issues */}
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="bg-slate-950 border-t border-slate-800 px-4 py-1 text-xs text-slate-400 flex items-center gap-3 overflow-x-auto">
          {errors.map(err => (
            <div key={err.id} className="flex items-center gap-1 text-red-400 shrink-0">
              <AlertTriangle className="w-3 h-3" />
              <span>{err.messageHe}</span>
            </div>
          ))}
          {warnings.map(warn => (
            <div key={warn.id} className="flex items-center gap-1 text-amber-300 shrink-0">
              <Info className="w-3 h-3" />
              <span>{warn.messageHe}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
