import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Info,
  ChevronRight,
  ChevronLeft,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useKitchenStore } from '../store/useKitchenStore';
import { TOUR_STATIONS } from '../data/tourStations';

interface ArchitecturalStationView {
  id: string;
  stationIdx: number;
  titleHe: string;
  subtitleHe: string;
  badgeHe: string;
  planTag: 'plan-A' | 'plan-B' | 'both';
  featuresHe: string[];
  specsHe: string;
}

const STATION_VIEWS: ArchitecturalStationView[] = [
  {
    id: 'station-1',
    stationIdx: 0,
    titleHe: 'תחנה 1: מבואת הכניסה וקו 0 נקי',
    subtitleHe: 'מקררים ומקפיא מיושרים בקו 0 מושלם עם דופן קיר הכניסה (50 ס"מ עומק) – ללא שום בליטה',
    badgeHe: 'מבואת כניסה',
    planTag: 'both',
    featuresHe: [
      'דופן קיר כניסה ונישה עמוקה (89 ס"מ) מאפשרת עומק מקררים ללא חסימת הפתח',
      'פתח כניסה נקי ומרווח מעל 110 ס"מ נטו – מעבר חופשי ונגיש',
      'ארונות עליונים לפסח הרמטיים עד תקרת 246 ס"מ',
      'חזיתות נאנו מודרניות בקו אפס ארכיטקטוני'
    ],
    specsHe: 'עומק נישה כולל 89 ס"מ | פתח מעבר נטו >110 ס"מ | יישור קו אפס קפדני ללא חסימות'
  },
  {
    id: 'station-2',
    stationIdx: 1,
    titleHe: 'תחנה 2: מתחם בישול בשרי וכיריים בימין',
    subtitleHe: 'כיריים אינדוקציה 80 ס"מ בצד ימין צמוד לעמוד הבטון, יחידת תבלינים 43 ס"מ וכיור בשרי 85 ס"מ',
    badgeHe: 'מתחם בשרי',
    planTag: 'both',
    featuresHe: [
      'מיקום כיריים 80 ס"מ בצד ימין (קרוב לעמוד) – ארגונומיה אופטימלית ומשטח עבודה רחב משמאל',
      'עגלת בקבוקים ותבלינים נשלפת 43 ס"מ בצמוד לכיריים',
      'כיור בשרי רחב 85 ס"מ בהתקנה שטוחה עם מגירות סכו"ם וסירים תחתיות',
      'קולט אדים אינטגרלי מובנה בתוך ארון הקלפה העליון ללא פגיעה בקו הארונות'
    ],
    specsHe: 'רוחב כולל בנישה: 268 ס"מ | כיריים 80 ס"מ | תבלינים 43 ס"מ | כיור 85 ס"מ | מגירות 60 ס"מ'
  },
  {
    id: 'station-3',
    stationIdx: 2,
    titleHe: 'תחנה 3: פינה אחורית ועמדת שבת',
    subtitleHe: 'תוכנית א\': משטח ר\' עמוק לפלטת שבת | תוכנית ב\': עמודת קוביה מעל קוביה (מקפיא תחתון + ארון מכשירים)',
    badgeHe: 'פינה אחורית',
    planTag: 'both',
    featuresHe: [
      'תוכנית א\': משטח שיש רצוף 124 ס"מ עם הכנה ייעודית לפלטת שבת ומיחם מים חמים',
      'תוכנית ב\': קוביה מעל קוביה – מקפיא תחתון בנוי 60 ס"מ ומעליו ארון מכשירים ייעודי למיקסר',
      'המשך רציף ב-ר\' אל הקיר האחורי החלבי ליצירת זרימת עבודה מושלמת',
      'שקעי כוח תלת-פאזיים מוגנים ומדפים מחוזקים'
    ],
    specsHe: 'נישה 3: עומק 89 ס"מ | רוחב 124 ס"מ | קוביה מעל קוביה 60 ס"מ + משטח L רציף 64 ס"מ'
  },
  {
    id: 'station-4',
    stationIdx: 3,
    titleHe: 'תחנה 4: קיר אחורי חלבי (317 ס"מ אטום ללא חלון)',
    subtitleHe: 'משטח שיש רציף מקיר לקיר, כיור חלבי רחב 80 ס"מ וארונות עליונים עד התקרה',
    badgeHe: 'מתחם חלבי',
    planTag: 'both',
    featuresHe: [
      'קיר בטון אחורי מוצק ואטום לחלוטין (ללא פתחים או חלונות חיצוניים)',
      'משטח עבודה חלבי רצוף באורך מלא המעניק מרחב הכנה ורידוד בצקים נרחב',
      'כיור חלבי גדול 80 ס"מ בהתקנה שטוחה ואינטגרלית',
      'ארונות עליונים דו-קומתיים עם תאורת לד עקיפה חמה לכל האורך'
    ],
    specsHe: 'רוחב קיר: 317 ס"מ נטו | משטח עבודה רצוף | איטום הלכתי מוחלט בין הבשרי לחלבי'
  },
  {
    id: 'station-5',
    stationIdx: 4,
    titleHe: 'תחנה 5: ארון מכשירים יוקרתי על גבי השיש',
    subtitleHe: 'ארון מכשירים ייעודי בפינה עם דלתות כיס Pocket Doors נבלעות, מדף נשלף כבד ושקעי כוח',
    badgeHe: 'ארון מכשירים',
    planTag: 'plan-A',
    featuresHe: [
      'הארון יושב ישירות על גבי משטח השיש בגובה 90 עד 200 ס"מ – השיש ממשיך מתחתיו ברציפות',
      'דלתות כיס מתקדמות (Pocket Doors) הנבלעות לתוך גוף הארון בעת עבודה',
      'מדף נשלף מסיבי למיקסר KitchenAid עם מסילות נשיאה 60 ק"ג',
      'נקודות חשמל פנימיות למכשירים קבועים ללא צורך בהוצאתם למשטח'
    ],
    specsHe: 'רוחב 60 ס"מ | גובה 110 ס"מ (90..200) | דלתות כיס | משטח שיש רצוף מתחתיו עד הפינה'
  },
  {
    id: 'station-6',
    stationIdx: 5,
    titleHe: 'תחנה 6: מתחם אפייה ומזווה Space Tower',
    subtitleHe: 'מגדל שני תנורים בגובה מותניים, קלפות עליונות לפסח וארון מזווה 80 ס"מ עם 6 מגירות נשלפות',
    badgeHe: 'מגדל אפייה ומזווה',
    planTag: 'both',
    featuresHe: [
      'שני תנורים מובנים זה לצד זה בארגונומיה מושלמת בגובה עבודה אידיאלי',
      'ארון מזווה Space Tower 80 ס"מ עם 6 מגירות נשלפות מלאות (כושר נשיאה 70 ק"ג למגירה)',
      'קלפות עליונות לפסח עד גובה 246 ס"מ לניצול מרבי של גובה התקרה',
      'חזיתות אחידות ויוקרתיות המשלימות את המראה האדריכלי'
    ],
    specsHe: 'קיר שמאל: 240 ס"מ נגרות מאושרת | 160 ס"מ מגדל אפייה כפול | 80 ס"מ מזווה Space Tower'
  },
  {
    id: 'station-7',
    stationIdx: 6,
    titleHe: 'תחנה 7: מרחב מרכזי פתוח ומרווח',
    subtitleHe: 'חלל מעבר רחב ידיים (>2.80 מ\' נטו) ללא שולחן חוסם – תנועה זורמת, פתוחה ויוקרתית',
    badgeHe: 'מרחב מרכזי',
    planTag: 'both',
    featuresHe: [
      'רחבה מרכזית פתוחה לחלוטין המאפשרת תנועה חופשית ואירוח משפחתי נעים',
      'מעבר מרכזי נטו של 168 ס"מ בין משטחי העבודה – נוחות מקסימלית לעבודה של מספר אנשים',
      'חוויית מרחב מוארת ומזמינה המדגישה את איכות הנגרות והחומרים',
      'תאורה תקרתית שקועה בשילוב קווי תאורה חמים לאורך הארונות'
    ],
    specsHe: 'מעבר מרכזי נטו: 168 ס"מ | אורך חלל פתוח: >280 ס"מ | תנועה חופשית מלאה ללא חסימות'
  }
];

export const PhotorealisticGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const startLiveTour = useKitchenStore(state => state.startLiveTour);
  const activePlan = useKitchenStore(state => state.activePlan);
  const setPlan = useKitchenStore(state => state.setPlan);

  const current = STATION_VIEWS[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % STATION_VIEWS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + STATION_VIEWS.length) % STATION_VIEWS.length);
  };

  const handleLaunchLiveTour = (stationIdx: number) => {
    startLiveTour(stationIdx);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col overflow-hidden select-none">
      {/* Top Gallery Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-3 sm:px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/25">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              סיור תחנות אדריכליות | אחינועם מטבחים
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                לקוח 3155 - משפחת אור
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              תצוגת 7 תחנות מפתח הנדסיות במטבח עם אפשרות כניסה ישירה לסיור נהיגה חי בתלת-ממד
            </p>
          </div>
        </div>

        {/* Global Live Tour Launch Button */}
        <button
          onClick={() => handleLaunchLiveTour(activeIdx)}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold rounded-xl shadow-xl shadow-amber-500/20 text-xs sm:text-sm transition-all active:scale-95 border border-amber-300/50"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>🚗 צא לסיור בלייב עכשיו</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* Main Station Showcase Viewport */}
        <div className="flex-1 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
          {/* Station Visual Card */}
          <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Badge & Step Indicator */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {current.badgeHe} (תחנה {activeIdx + 1} מתוך {STATION_VIEWS.length})
                </span>
                <span className="text-xs font-bold text-slate-400">
                  זווית תלת-ממד מדויקת 1:1
                </span>
              </div>

              {/* Station Main Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                {current.titleHe}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {current.subtitleHe}
              </p>

              {/* Architectural Key Features */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-6 space-y-2.5">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  מפרט אדריכלי ודגשי ביצוע
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {current.featuresHe.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-amber-400 font-bold mt-1 text-sm">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Specs Pill */}
              <div className="bg-sky-950/40 border border-sky-800/40 rounded-lg p-3 text-xs text-sky-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="leading-relaxed">{current.specsHe}</span>
              </div>
            </div>

            {/* Interactive Live Tour Launcher Button */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlan('plan-A')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePlan === 'plan-A'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  תוכנית א'
                </button>
                <button
                  onClick={() => setPlan('plan-B')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePlan === 'plan-B'
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  תוכנית ב'
                </button>
              </div>

              <button
                onClick={() => handleLaunchLiveTour(current.stationIdx)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-500/25 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>🚗 כניסה לסיור בלייב בתחנה זו</span>
                <ArrowRight className="w-4 h-4 mr-1" />
              </button>
            </div>
          </div>

          {/* Previous / Next Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-2xl backdrop-blur-md transition-all active:scale-95"
            title="תחנה קודמת"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-2xl backdrop-blur-md transition-all active:scale-95"
            title="תחנה הבאה"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Right Station Index Navigator */}
        <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between overflow-y-auto shrink-0">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              תחנות הסיור האדריכלי
            </h4>
            <div className="space-y-2">
              {STATION_VIEWS.map((station, idx) => (
                <button
                  key={station.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-right p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    activeIdx === idx
                      ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      activeIdx === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs font-bold truncate max-w-[170px]">
                      {station.badgeHe}
                    </span>
                  </div>
                  <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform ${activeIdx === idx ? 'text-amber-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>מידות חלל:</span>
              <span className="font-mono text-slate-200">317 × 705 × 246 ס"מ</span>
            </div>
            <div className="flex justify-between">
              <span>עמודי בטון:</span>
              <span className="font-mono text-slate-200">89 × 25 ס"מ (משולבים)</span>
            </div>
            <div className="flex justify-between">
              <span>קיר אחורי חלבי:</span>
              <span className="font-mono text-slate-200">317 ס"מ אטום (ללא חלון)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
