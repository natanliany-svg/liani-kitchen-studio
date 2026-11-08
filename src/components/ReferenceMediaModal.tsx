import React, { useState } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { X, Image, FileText, CheckCircle2 } from 'lucide-react';

interface MediaItem {
  id: string;
  titleHe: string;
  category: 'handdrawn' | 'measurement' | 'site_photo';
  fileName: string;
  notesHe: string;
  verifiedTruthHe: string;
}

const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'plan_a',
    titleHe: "תוכנית א' המקורית בכתב יד",
    category: 'handdrawn',
    fileName: 'plan_a_handdrawn.jpg',
    notesHe: 'סקיצה מקורית שנרשמה ביד: קיר ימין (מקפיא 60 + 2 מקררים 90), נישה בשרית 2.68 מ\', נישה אחורית 1.24 מ\', קיר אחורי חלבי 3.17 מ\' עם ארון מכשירים בשמאל, קיר שמאל תנורים כפולים 1.60 מ\' ומזווה 0.80 מ\'.',
    verifiedTruthHe: 'תכנון מאושר: קירור מרוכז בכניסה, אפייה ומזווה בקיר שמאל, משטח שיש רציף עד הפינה.'
  },
  {
    id: 'plan_b',
    titleHe: "תוכנית ב' המקורית בכתב יד",
    category: 'handdrawn',
    fileName: 'plan_b_handdrawn.jpg',
    notesHe: 'סקיצה נקייה בעט כחול: נישת כניסה (2 מקררים 90 + מגדל אפייה 60), נישה בשרית 2.68 מ\', נישה 3 (מקפיא תחתון ומעליו ארון מכשירים - קוביה מעל קוביה), קיר אחורי שיש רציף המסתובב ב-ר\' לקיר שמאל + מזווה בלבד.',
    verifiedTruthHe: 'תכנון מאושר: מקסום מרחב התנועה המרכזי עם מעל 2.80 מטר פנויים!'
  },
  {
    id: 'room_measurements',
    titleHe: "דף המדידות ההנדסי של הדירה",
    category: 'measurement',
    fileName: 'room_measurements_original.jpg',
    notesHe: 'דף המידות המקורי: גובה תקרה נטו 2.46 מ\', נישה קדמית 2.63 מ\', שני עמודי בטון קונסטרוקטיביים בעומק 89 ס"מ ורוחב 25 ס"מ, נישה 2.68 מ\', נישה 1.24 מ\', קיר אחורי 3.17 מ\'.',
    verifiedTruthHe: 'אימות מבני: עמודי הבטון משולבים במדויק בנגרות ללא חריגות.'
  },
  {
    id: 'existing_right_niches',
    titleHe: "צילום השטח: עמודי הבטון בעומק 89 ס\"מ בימין",
    category: 'site_photo',
    fileName: 'existing_right_niches.jpg',
    notesHe: 'צילום אמיתי מתוך המטבח המוכיח בבירור את העמודים הבולטים 89 ס"מ החוצצים בין נישת הכניסה לנישה הבשרית המרכזית.',
    verifiedTruthHe: 'אימות שטח: עומק 89 ס"מ בולע במלואו את המקררים (75 ס"מ) כך שהם אינם בולטים למעבר הכניסה.'
  },
  {
    id: 'existing_back_left_corner',
    titleHe: "צילום השטח: הקיר האחורי והפינה השמאלית",
    category: 'site_photo',
    fileName: 'existing_back_left_corner.jpg',
    notesHe: 'צילום מהדירה המוכיח שקיר 3.17 מ\' הוא קיר בטון אטום לחלוטין ללא שום חלון, המאפשר רצף מלא של ארונות עליונים עד התקרה.',
    verifiedTruthHe: 'אימות שטח: שחרור 100% משטח הקיר לארונות עליונים הרמטיים עד 246 ס"מ לפסח.'
  },
  {
    id: 'existing_full_view',
    titleHe: "צילום השטח: מבט מלא מחלל המטבח",
    category: 'site_photo',
    fileName: 'existing_full_view.jpg',
    notesHe: 'צילום של החלל הקיים, מיקום הריצוף, והמרחב הפנוי מול המעבר המרכזי.',
    verifiedTruthHe: 'אימות שטח: מעבר מרכזי רחב במיוחד (מעל 168 ס"מ נטו) המאפשר תנועה דו-סטרית מרווחת.'
  }
];

export const ReferenceMediaModal: React.FC = () => {
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);

  const [selectedItem, setSelectedItem] = useState<MediaItem>(MEDIA_GALLERY[0]);

  if (activeDialog !== 'media') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 select-none">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col text-white overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Image className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm md:text-base">תיק מסמכים אדריכלי וצילומי שטח | פרויקט משפחת אור</h2>
              <p className="text-xs text-slate-400">הצלבה של כל נתוני המדידה והסקיצות מול תנאי השטח בדירה</p>
            </div>
          </div>
          <button
            onClick={() => setActiveDialog('none')}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Viewer (Left/Top) */}
          <div className="flex-1 bg-black/60 flex items-center justify-center p-4 overflow-hidden relative">
            <img
              src={`${import.meta.env.BASE_URL}reference_media/${selectedItem.fileName}`}
              alt={selectedItem.titleHe}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
            />
          </div>

          {/* Sidebar Item List & Details (Right/Bottom) */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-950/70 border-t md:border-t-0 md:border-r border-slate-800 flex flex-col justify-between overflow-y-auto p-4 shrink-0">
            {/* Active Item Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  {selectedItem.category === 'handdrawn' ? 'סקיצה מקורית' :
                   selectedItem.category === 'measurement' ? 'דף מדידות' : 'צילום מהדירה'}
                </span>
                <h3 className="font-bold text-base text-white mt-2 leading-tight">
                  {selectedItem.titleHe}
                </h3>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="leading-relaxed">{selectedItem.notesHe}</p>
                <div className="pt-2 border-t border-slate-800 flex items-start gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span className="text-xs">{selectedItem.verifiedTruthHe}</span>
                </div>
              </div>
            </div>

            {/* List Selection Strip */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">בחר מסמך לעיון:</span>
              <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
                {MEDIA_GALLERY.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-2 rounded-lg text-right text-xs transition-all flex flex-col gap-1 border ${
                      selectedItem.id === item.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-semibold truncate">{item.titleHe.split(' ')[0]} {item.titleHe.split(' ')[1] || ''}</span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {item.category === 'handdrawn' ? 'סקיצה' : item.category === 'measurement' ? 'מידות' : 'צילום שטח'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
