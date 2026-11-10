import React, { useEffect } from 'react';
import { 
  Accessibility, 
  X, 
  Sun, 
  Moon, 
  ZoomIn, 
  ZoomOut, 
  Pause, 
  Play, 
  Link2, 
  Eye, 
  RotateCcw,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { useKitchenStore } from '../store/useKitchenStore';

export const AccessibilityWidget: React.FC = () => {
  const isAccessibilityOpen = useKitchenStore(state => state.isAccessibilityOpen);
  const toggleAccessibilityDialog = useKitchenStore(state => state.toggleAccessibilityDialog);
  const highContrast = useKitchenStore(state => state.highContrast);
  const setHighContrast = useKitchenStore(state => state.setHighContrast);
  const fontScale = useKitchenStore(state => state.fontScale);
  const setFontScale = useKitchenStore(state => state.setFontScale);
  const reducedMotion = useKitchenStore(state => state.reducedMotion);
  const setReducedMotion = useKitchenStore(state => state.setReducedMotion);
  const highlightLinks = useKitchenStore(state => state.highlightLinks);
  const setHighlightLinks = useKitchenStore(state => state.setHighlightLinks);

  // Apply Accessibility Classes to Document Root
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    if (highlightLinks) {
      root.classList.add('accessibility-highlight-links');
    } else {
      root.classList.remove('accessibility-highlight-links');
    }

    if (reducedMotion) {
      root.classList.add('accessibility-reduced-motion');
    } else {
      root.classList.remove('accessibility-reduced-motion');
    }

    root.style.fontSize = fontScale === 100 ? '' : `${fontScale}%`;
  }, [highContrast, fontScale, reducedMotion, highlightLinks]);

  const handleReset = () => {
    setHighContrast(false);
    setFontScale(100);
    setReducedMotion(false);
    setHighlightLinks(false);
  };

  return (
    <>
      {/* Floating Universal Accessibility Button */}
      <button
        onClick={toggleAccessibilityDialog}
        aria-label="פתח תפריט נגישות לפי תקן ישראלי 5568"
        className="fixed bottom-20 sm:bottom-6 left-4 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-white/40 focus:outline-none focus:ring-4 focus:ring-blue-400"
        title="תפריט נגישות (תקן 5568)"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessible Dialog */}
      {isAccessibilityOpen && (
        <div 
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border-2 border-blue-500/60 text-slate-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Accessibility className="w-6 h-6" />
                </div>
                <div>
                  <h2 id="accessibility-title" className="text-lg font-black text-white">
                    תפריט נגישות – אחינועם מטבחים
                  </h2>
                  <p className="text-xs text-blue-300 font-medium">
                    מותאם לתקן ישראלי ת"י 5568 (ברמת AA) ו-WCAG 2.1
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAccessibilityDialog}
                aria-label="סגור תפריט נגישות"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Accessibility Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5 text-sm">
              
              {/* High Contrast */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  highContrast 
                    ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Moon className="w-5 h-5 text-amber-400" />
                  <span>ניגודיות גבוהה</span>
                </div>
                <span className="text-xs">{highContrast ? 'פעיל' : 'כבוי'}</span>
              </button>

              {/* Reduced Motion */}
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  reducedMotion 
                    ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Pause className="w-5 h-5 text-purple-400" />
                  <span>עצירת אנימציות</span>
                </div>
                <span className="text-xs">{reducedMotion ? 'פעיל' : 'כבוי'}</span>
              </button>

              {/* Text Size Control */}
              <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 sm:col-span-2 flex items-center justify-between flex-wrap gap-2">
                <span className="font-medium text-slate-200">גודל טקסט: {fontScale}%</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontScale(Math.max(100, fontScale - 15))}
                    disabled={fontScale <= 100}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
                  >
                    A- הקטנה
                  </button>
                  <button
                    onClick={() => setFontScale(100)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                  >
                    איפוס
                  </button>
                  <button
                    onClick={() => setFontScale(Math.min(145, fontScale + 15))}
                    disabled={fontScale >= 145}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
                  >
                    A+ הגדלה
                  </button>
                </div>
              </div>

              {/* Highlight Clickable Items */}
              <button
                onClick={() => setHighlightLinks(!highlightLinks)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all sm:col-span-2 ${
                  highlightLinks 
                    ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Link2 className="w-5 h-5 text-emerald-400" />
                  <span>הדגשת קישורים וכפתורים לחיצים</span>
                </div>
                <span className="text-xs">{highlightLinks ? 'פעיל' : 'כבוי'}</span>
              </button>

            </div>

            {/* Official Accessibility Statement Accordion */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              <div className="flex items-center gap-2 font-bold text-blue-400 mb-2">
                <FileCheck2 className="w-4 h-4" />
                <span>הצהרת נגישות רשמית – סטודיו 'אחינועם מטבחים'</span>
              </div>
              <p>
                אתר וסטודיו התכנון הונגשו בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013 ולתקן הישראלי ת"י 5568 ברמת AA. האתר תומך בניווט מקלדת מלא, קוראי מסך תקניים, התאמות ניגודיות ומבנה סמנטי מוקפד.
              </p>
              <div className="mt-2 text-slate-400">
                לפניות וסיוע בנושאי נגישות: <span className="text-white font-semibold">accessibility@achinoam-kitchens.co.il</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>איפוס כל ההגדרות</span>
              </button>
              <button
                onClick={toggleAccessibilityDialog}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs transition-colors shadow-lg"
              >
                החל וסגור
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
