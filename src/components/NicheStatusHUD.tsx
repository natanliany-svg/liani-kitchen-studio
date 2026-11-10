import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export const NicheStatusHUD: React.FC = () => {
  const nicheUsage = useKitchenStore(state => state.nicheUsage);
  const validationIssues = useKitchenStore(state => state.validationIssues);
  const activePlan = useKitchenStore(state => state.activePlan);
  const [mobileExpanded, setMobileExpanded] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const errors = validationIssues.filter(i => i.type === 'error');
  const warnings = validationIssues.filter(i => i.type === 'warning');

  if (isCollapsed) {
    return (
      <div className="absolute top-18 right-6 z-20 hidden sm:block">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>סטטוס נישות וקיבולת</span>
          <span className="text-amber-400">▾</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 text-white select-none shrink-0 z-20 transition-all">
      {/* Mobile Compact Status Pill */}
      <div className="sm:hidden flex items-center justify-between px-3 py-1.5 text-xs">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl text-[11px] border border-slate-800 text-slate-300 active:scale-95 transition-all shadow"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-amber-400">
            {activePlan === 'plan-A' ? "תוכנית א'" : "תוכנית ב'"}
          </span>
          <span className="text-slate-400">| נישות</span>
          <span className="text-[10px] text-amber-400 underline font-semibold mr-1">
            {mobileExpanded ? 'סגור ▴' : 'פירוט ▾'}
          </span>
        </button>

        <div className="flex items-center gap-1">
          {errors.length > 0 ? (
            <span className="text-[10px] bg-rose-900 text-rose-200 px-2 py-0.5 rounded-full font-bold">
              {errors.length} שגיאות
            </span>
          ) : (
            <span className="text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              100% תקין
            </span>
          )}
        </div>
      </div>

      {/* Full Capacity Cards (Desktop Always Visible, Mobile Collapsible) */}
      <div className={`w-full px-4 py-1.5 items-center gap-2 overflow-x-auto text-xs scrollbar-none ${mobileExpanded ? 'flex' : 'hidden sm:flex'}`}>
        <div className="flex items-center gap-1.5 shrink-0 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 font-bold">
            {activePlan === 'plan-A' ? 'תוכנית א\' (קירור בכניסה)' : activePlan === 'plan-B' ? 'תוכנית ב\' (פינת אוכל מקסימלית)' : 'מותאמת אישית'}
          </span>
          <span className="text-slate-400 hidden sm:inline">| תקרה 246 ס"מ</span>
        </div>

        {/* 5 Architectural Zones */}
        <div className="flex items-center gap-1.5 shrink-0">
          {nicheUsage.map(niche => {
            const isDanger = niche.isOverLimit;
            const isTight = niche.remainingCm < 5 && !isDanger;

            return (
              <div
                key={niche.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] shrink-0 transition-colors ${
                  isDanger
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : isTight
                    ? 'bg-amber-950/60 border-amber-500/60 text-amber-200'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200'
                }`}
              >
                <span className="font-medium text-slate-400">{niche.nameHe}:</span>
                <span className="font-mono font-bold text-white">{niche.usedCm}/{niche.capacityCm}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isDanger 
                    ? 'bg-rose-700 text-white' 
                    : niche.remainingCm === 0 
                    ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-700' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {isDanger ? `חריגה ${Math.abs(niche.remainingCm)}!` : niche.remainingCm === 0 ? 'מלא 100%' : `פנוי ${niche.remainingCm}`}
                </span>
              </div>
            );
          })}
        </div>

        {/* Validation Status Indicator & Collapse Button */}
        <div className="flex items-center gap-2 shrink-0 mr-auto">
          {errors.length > 0 ? (
            <div className="flex items-center gap-1 bg-rose-900/90 text-rose-100 px-3 py-1 rounded-xl font-bold text-[11px] border border-rose-600">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
              <span>{errors.length} חריגות</span>
            </div>
          ) : warnings.length > 0 ? (
            <div className="flex items-center gap-1 bg-amber-900/80 text-amber-200 px-3 py-1 rounded-xl font-medium text-[11px] border border-amber-700">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{warnings.length} התראות</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-xl font-bold text-[11px] border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% תקין</span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(true)}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg text-xs"
            title="הסתר סרגל נישות למקסימום תצוגת 3D"
          >
            ✕
          </button>
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
