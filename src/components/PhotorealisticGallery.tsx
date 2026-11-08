import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface RenderItem {
  id: string;
  titleHe: string;
  subtitleHe: string;
  planTag: 'plan-A' | 'plan-B' | 'overview' | 'comparison';
  imageSrc: string;
  featuresHe: string[];
  notesHe: string;
}

const RENDERS: RenderItem[] = [
  {
    id: 'render-plan-a',
    titleHe: "תוכנית א' | חלל מרכזי פתוח ויוקרתי",
    subtitleHe: 'מרחב נקי ללא שולחן חוסם, כיריים בימין וארון מכשירים יושב על גבי השיש',
    planTag: 'plan-A',
    imageSrc: `${import.meta.env.BASE_URL}reference_media/achinoam_plan_a_wide_open.jpg`,
    featuresHe: [
      'רחבה מרכזית פתוחה ומרווחת ללא שולחן – תנועה חופשית מקסימלית',
      'נישה בשרית 268 ס"מ: כיריים אינדוקציה 80 ס"מ בימין, צמודות לעמוד הבטון',
      'קיר אחורי חלבי 317 ס"מ: משטח שיש רציף עד הפינה, ועליו ארון מכשירים נשלף',
      'נישת כניסה: מקפיא ומקררים בקו 0 מושלם עם קיר הכניסה ללא חסימת הפתח',
      'ארונות פסח עליונים הרמטיים עד תקרת 246 ס"מ – ניצול מלוא נפח החלל'
    ],
    notesHe: 'הדמיה פוטוריאליסטית המציגה את התאורה החמה, ניגודיות אלון מושחר ואבן גרניט-פורצלן, ומשטחי עבודה רחבים.'
  },
  {
    id: 'render-plan-b',
    titleHe: "תוכנית ב' | מתחם בישול וקוביה מעל קוביה",
    subtitleHe: 'נישה 3: מקפיא תחתון ומעליו ארון מכשירים, כיריים בימין ומגדל אפייה בכניסה',
    planTag: 'plan-B',
    imageSrc: `${import.meta.env.BASE_URL}reference_media/achinoam_plan_b_cooking_stack.jpg`,
    featuresHe: [
      'נישה 3 אחורית: קוביה מעל קוביה – מקפיא תחתון מובנה ומעליו ארון מכשירים לתריס',
      'המשך משטח שיש רצוף ב-ר\' המתחבר ישירות לקיר האחורי החלבי',
      'נישה 2 בשרית: כיריים 80 ס"מ בימין, יחידת תבלינים 43 ס"מ וכיור בשרי 85 ס"מ',
      'נישת כניסה: 2 מקררים רחבים + מגדל אפייה 60 ס"מ בצמוד לעמוד הבטון',
      'חלל מרכזי חופשי לחלוטין מתנועת עומס'
    ],
    notesHe: 'סידור ארגונומי המאפשר עבודה מקבילה של 3 אנשים במטבח – בשרי, חלבי ואפייה בנפרד.'
  },
  {
    id: 'render-overview',
    titleHe: "אחינועם מטבחים | תצוגת פרימיום פוטוריאליסטית",
    subtitleHe: 'מטבח כשר מודרני מותאם אישית למשפחת אור (לקוח 3155)',
    planTag: 'overview',
    imageSrc: `${import.meta.env.BASE_URL}reference_media/achinoam_kitchen_render_1.jpg`,
    featuresHe: [
      'הפרדה מוחלטת והלכתית מהודרת בין בשרי (ימין) לחלבי (קיר אחורי)',
      'חזיתות נאנו בגימור קשמיר מט משי ופרופילי ידית אינטגרלית שחורה',
      'עמודי בטון קונסטרוקטיביים 89×25 ס"מ משולבים באלגנטיות בתכנון הנגרות',
      'תאורת לד עקיפה חמה תחת כל הארונות העליונים ומשטחי העבודה',
      'איטום עליון הרמטי מלא לפסח ללא רווח של מילימטר לתקרה'
    ],
    notesHe: 'תכנון מדויק המשלב אסתטיקה בינלאומית עם דרישות הכשרות והאירוח היהודי.'
  },
  {
    id: 'render-comparison-gemini',
    titleHe: "תחקיר פורנזי | כשל ג'מיני מול הדיוק ההנדסי",
    subtitleHe: 'ההדמיה השגויה שייצרה חלון פיקטיבי בקיר אטום ומחקה עמודי בטון',
    planTag: 'comparison',
    imageSrc: `${import.meta.env.BASE_URL}reference_media/gemini_failed_render_0.jpg`,
    featuresHe: [
      '❌ כשל ג\'מיני: המצאת חלון ענק עם גינה בתוך קיר בטון אטום לחלוטין',
      '❌ כשל ג\'מיני: מחיקת שני עמודי בטון 89×25 ס"מ הנושאים את הבניין',
      '❌ כשל ג\'מיני: סיבוב ארונות ב-90 מעלות ומידות בלתי אפשריות לביצוע',
      '✔️ התיקון שלנו: אכיפת מידות CAD מדויקות במ"מ על פי צילומי השטח האמיתיים'
    ],
    notesHe: 'במערכת אחינועם מטבחים אין הזיות AI – כל רכיב מתוכנן בהתאמה של 100% לתוכנית האדריכלית.'
  }
];

export const PhotorealisticGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const current = RENDERS[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % RENDERS.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + RENDERS.length) % RENDERS.length);
    setZoomLevel(1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = current.imageSrc;
    link.download = `Achinoam-Kitchen-Or-${current.id}.jpg`;
    link.click();
  };

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col overflow-hidden select-none">
      {/* Top Gallery Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              גלריית הדמיות פוטוריאליסטיות בחדות גבוהה (Photorealistic 3D Renders)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                לקוח 3155
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              תצוגת המחשה ריאליסטית של תוכניות א' ו-ב' לפי כל דרישות המפרט והמידות המדויקות
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {RENDERS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIdx(idx);
                setZoomLevel(1);
              }}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                activeIdx === idx
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {idx === 0 ? "תוכנית א'" : idx === 1 ? "תוכנית ב'" : idx === 2 ? "תצוגת פרימיום" : "השוואת כשל"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Main: High-Res Image Viewport */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4">
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-auto transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={current.imageSrc}
              alt={current.titleHe}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-slate-800"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl backdrop-blur-sm transition-all"
            title="הדמיה קודמת"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl backdrop-blur-sm transition-all"
            title="הדמיה הבאה"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Floating Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-white shadow-2xl">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.2))}
              className="p-1.5 hover:bg-slate-800 rounded-full transition-colors"
              title="הקטן תצוגה"
            >
              <ZoomOut className="w-4 h-4 text-slate-300" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
              className="p-1.5 hover:bg-slate-800 rounded-full transition-colors"
              title="הגדל תצוגה"
            >
              <ZoomIn className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-slate-800 rounded-full transition-colors"
              title="איפוס זום"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
            </button>
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full text-xs shadow-md transition-colors"
              title="הורד תמונה בחדות גבוהה"
            >
              <Download className="w-3.5 h-3.5" />
              הורדת תמונה
            </button>
          </div>
        </div>

        {/* Right Panel: Architectural Specs & Features */}
        <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-r border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  current.planTag === 'plan-A'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : current.planTag === 'plan-B'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {current.planTag === 'plan-A' ? "תוכנית א' מאושרת" : current.planTag === 'plan-B' ? "תוכנית ב' מאושרת" : "סטודיו אחינועם"}
                </span>
                <span className="text-[11px] text-slate-400">
                  הדמיה {activeIdx + 1} מתוך {RENDERS.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {current.titleHe}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {current.subtitleHe}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                דגשי יישום אדריכליים
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {current.featuresHe.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forensic / Quality Note */}
            <div className="bg-blue-950/30 p-3 rounded-lg border border-blue-900/40 text-xs text-blue-200/90 leading-relaxed">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                <Info className="w-3.5 h-3.5" />
                הערת מהנדס נגרות
              </div>
              {current.notesHe}
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-4 gap-2">
            {RENDERS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setZoomLevel(1);
                }}
                className={`relative rounded-md overflow-hidden border-2 transition-all aspect-video ${
                  activeIdx === idx ? 'border-amber-400 ring-2 ring-amber-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.imageSrc}
                  alt={item.titleHe}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
