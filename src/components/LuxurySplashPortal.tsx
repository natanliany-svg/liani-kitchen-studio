import React from 'react';
import { 
  Compass, 
  Box, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  X,
  Layers,
  ShieldCheck,
  Ruler
} from 'lucide-react';
import { useKitchenStore } from '../store/useKitchenStore';

export const LuxurySplashPortal: React.FC = () => {
  const isSplashOpen = useKitchenStore(state => state.isSplashOpen);
  const setSplashOpen = useKitchenStore(state => state.setSplashOpen);
  const startLiveTour = useKitchenStore(state => state.startLiveTour);
  const setViewMode = useKitchenStore(state => state.setViewMode);
  const activePlan = useKitchenStore(state => state.activePlan);
  const setPlan = useKitchenStore(state => state.setPlan);

  if (!isSplashOpen) return null;

  const handleStartTour = () => {
    setSplashOpen(false);
    setViewMode('3d');
    startLiveTour(0);
  };

  const handleEnterStudio = () => {
    setSplashOpen(false);
    setViewMode('3d');
  };

  const handleEnterCad = () => {
    setSplashOpen(false);
    setViewMode('2d');
  };

  return (
    <div 
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-2xl text-slate-100 transition-all duration-500 animate-in fade-in"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 25%, rgba(212, 175, 55, 0.08) 0%, transparent 65%), radial-gradient(circle at 80% 80%, rgba(30, 41, 59, 0.5) 0%, transparent 50%)`
      }}
    >
      {/* Subtle close button if returning user */}
      <button
        onClick={() => setSplashOpen(false)}
        className="absolute top-5 left-5 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-800 hover:border-amber-400/60 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg"
        title="חזרה לסטודיו"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-3xl w-full my-auto flex flex-col items-center text-center py-6 sm:py-8">
        
        {/* Luxury Architectural Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-amber-500/20 via-slate-900/90 to-slate-950 border border-amber-400/40 shadow-2xl shadow-amber-500/10 flex items-center justify-center p-4 relative group">
            {/* Geometric Crown / Architectural Lines Emblem */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Outer diamond outline */}
              <polygon points="50,6 94,50 50,94 6,50" strokeDasharray="1 0" opacity="0.4" />
              {/* Inner geometric kitchen frame */}
              <rect x="24" y="24" width="52" height="52" rx="4" strokeWidth="2" />
              {/* Architectural counter lines & zero-line columns */}
              <line x1="24" y1="52" x2="76" y2="52" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="52" y1="24" x2="52" y2="76" strokeWidth="2" />
              {/* Central Stylized Monogram 'A' */}
              <path d="M40 70 L50 32 L60 70" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="43" y1="58" x2="57" y2="58" strokeWidth="2.5" />
              {/* Top luxury sparkle */}
              <circle cx="50" cy="18" r="2.5" fill="#f59e0b" />
            </svg>
          </div>
          <div className="absolute -bottom-2 inset-x-0 mx-auto w-16 h-1 bg-amber-400/40 blur-sm rounded-full" />
        </div>

        {/* Brand Name & Typography */}
        <div className="space-y-1.5 mb-6">
          <h1 className="text-2xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif">
            א ח י נ ו ע ם &nbsp; מ ט ב ח י ם
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-amber-200/70 uppercase">
            Achinoam Kitchen Studio • Bespoke Architecture & Living
          </p>
        </div>

        {/* Client Project Passport Card */}
        <div className="w-full bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-7 backdrop-blur-md shadow-2xl text-right transition-all">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                פרויקט תכנון אדריכלי פעיל
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              תיק פרויקט: <span className="font-bold text-amber-300">#3155</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] mb-0.5">שם הלקוח</span>
              <span className="font-bold text-slate-100">משפחת אור</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] mb-0.5">מידות החלל האדריכלי</span>
              <span className="font-bold text-slate-100">705 × 317 ס"מ (תקרה 246 ס"מ)</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px] mb-0.5">אפיון כשרות</span>
              <span className="font-bold text-amber-300">מהדרין – הפרדה 262 ס"מ</span>
            </div>
          </div>

          {/* Plan Switcher Pills inside Passport */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/60 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400 font-medium">בחר חלופת תכנון מבוקשת:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlan('plan-A')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activePlan === 'plan-A'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                תוכנית א' (עמודת תריס קשתית מלאה 156 ס"מ)
              </button>
              <button
                onClick={() => setPlan('plan-B')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activePlan === 'plan-B'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                תוכנית ב' (קו 0 במקפיא + תריס רבע-עיגול בשיש)
              </button>
            </div>
          </div>
        </div>

        {/* Primary Interactive Entry Gateways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
          
          {/* Option 1: Live Cinematic Tour */}
          <button
            onClick={handleStartTour}
            className="group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-right shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="w-13 h-13 rounded-xl bg-slate-950/15 flex items-center justify-center shrink-0">
              <Compass className="w-7 h-7 text-slate-950 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-900/80 font-bold">
                חוויה קולנועית מודרכת
              </div>
              <div className="text-base sm:text-lg font-black text-slate-950">
                כניסה לסיור חי במטבח (Live Tour)
              </div>
              <div className="text-[11px] text-slate-900/70 font-medium mt-0.5">
                מסלול רציף בגובה עיניים עם סנכרון תריס קשתי ותאורת לד
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-950/70 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Option 2: 3D Interactive Studio */}
          <button
            onClick={handleEnterStudio}
            className="group relative flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-amber-400/50 text-slate-100 font-bold text-right shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="w-13 h-13 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Box className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wider text-amber-400/80 font-semibold">
                שליטה אינטראקטיבית מלאה
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                כניסה לסטודיו התלת-ממד
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                בחינת חומרים, זוויות מבט, תאורת אווירה ופתיחת מגירות
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:-translate-x-1 transition-transform" />
          </button>

        </div>

        {/* Secondary CAD option & Trust Badges */}
        <div className="flex items-center justify-between w-full flex-wrap gap-4 pt-2 text-xs text-slate-400 border-t border-slate-800/50">
          <button 
            onClick={handleEnterCad}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium"
          >
            <Ruler className="w-4 h-4 text-amber-400" />
            <span>מעבר ישיר לתוכנית CAD אדריכלית דו-ממדית</span>
          </button>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> תואם תקן נגישות 5568
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> אימות הנדסי 100%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
