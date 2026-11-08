import React, { useState } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { X, Image, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';

interface MediaItem {
  id: string;
  titleHe: string;
  category: 'handdrawn' | 'measurement' | 'site_photo' | 'forensic';
  fileName: string;
  notesHe: string;
  verifiedTruthHe: string;
}

const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'plan_a',
    titleHe: "תוכנית א' המקורית בכתב יד (דף IMG_0785)",
    category: 'handdrawn',
    fileName: 'plan_a_handdrawn.jpg',
    notesHe: 'סקיצה מקורית שנרשמה ביד: קיר ימין (מקפיא 60 + 2 מקררים 90), נישה בשרית 2.68 מ\', נישה אחורית 1.24 מ\', קיר אחורי חלבי 3.17 מ\' עם ארון מכשירים בשמאל, קיר שמאל תנורים כפולים 1.60 מ\' ומזווה 0.80 מ\'.',
    verifiedTruthHe: 'אומת: קירור מרוכז בכניסה, אפייה ומזווה בקיר שמאל, פינת אוכל ל-6 סועדים.'
  },
  {
    id: 'plan_b',
    titleHe: "תוכנית ב' המקורית בכתב יד (דף IMG_0787)",
    category: 'handdrawn',
    fileName: 'plan_b_handdrawn.jpg',
    notesHe: 'סקיצה נקייה בעט כחול: נישת כניסה (2 מקררים 90 + מגדל אפייה 60), נישה בשרית 2.68 מ\', נישה 3 (מקפיא 65 + ארון מכשירים), קיר אחורי שיש רציף המסתובב ב-ר\' לקיר שמאל + מזווה בלבד.',
    verifiedTruthHe: 'אומת: מקסום פינת האוכל ליותר מ-2.80 מטר פנויים לשולחן שבת ענק!'
  },
  {
    id: 'room_measurements',
    titleHe: "דף המדידות הראשוני של הדירה (סבב 2)",
    category: 'measurement',
    fileName: 'room_measurements_original.jpg',
    notesHe: 'דף המידות המקורי: גובה תקרה נטו 2.46 מ\', קיר כניסה 44 ס"מ, נישה קדמית 2.63 מ\', שני עמודים בעומק 89 ס"מ ורוחב 25 ס"מ, נישה 2.68 מ\', נישה 1.24 מ\', קיר אחורי 3.17 מ\'.',
    verifiedTruthHe: 'אומת: שני עמודי בטון קבועים בעומק 89 ס"מ – ללא שום אפשרות הריסה.'
  },
  {
    id: 'existing_right_niches',
    titleHe: "צילום השטח: עמודי הבטון בעומק 89 ס\"מ בימין",
    category: 'site_photo',
    fileName: 'existing_right_niches.jpg',
    notesHe: 'צילום אמיתי מתוך המטבח המוכיח בבירור את העמודים הבולטים 89 ס"מ החוצצים בין נישת הכניסה לנישה הבשרית המרכזית.',
    verifiedTruthHe: 'אומת: עומק 89 ס"מ בולע במלואו את המקררים (75-80 ס"מ) כך שהם אינם בולטים למעבר.'
  },
  {
    id: 'existing_back_left_corner',
    titleHe: "צילום השטח: הקיר האחורי והפינה השמאלית",
    category: 'site_photo',
    fileName: 'existing_back_left_corner.jpg',
    notesHe: 'צילום מהדירה המוכיח שקיר 3.17 מ\' הוא קיר בטון אטום לחלוטין ללא שום חלון ("אין חלון ואין נעליים"), והחלון הקטן משמאל שכעת מנוטרל וסגור.',
    verifiedTruthHe: 'אומת: שחרור 100% מהקירות לארונות עליונים רצופים עד 246 ס"מ לפסח (+1.8 מ"ק אחסון!).'
  },
  {
    id: 'existing_full_view',
    titleHe: "צילום השטח: מבט מלא מחלל המטבח",
    category: 'site_photo',
    fileName: 'existing_full_view.jpg',
    notesHe: 'צילום של החלל הקיים, מיקום הריצוף, והמרחב הפנוי לפינת האוכל מול המעבר המרכזי.',
    verifiedTruthHe: 'אומת: מעבר מרכזי רחב במיוחד (168-192 ס"מ נטו) המאפשר תנועה דו-סטרית מרווחת.'
  },
  {
    id: 'designer_screen',
    titleHe: "כשל המעצבת: מחיקת שני עמודי ה-89 ס\"מ",
    category: 'forensic',
    fileName: 'designer_3d_screen.jpg',
    notesHe: 'מסך התלת-ממד של מעצבת המטבחים שמחקה לחלוטין את שני עמודי הבטון והציגה קיר שטוח דמיוני באורך 555.2 ס"מ שאינו ניתן לביצוע בדירה.',
    verifiedTruthHe: 'תוקן: המערכת שלנו בונה את העמודים כגופים קשיחים ואוכפת את מידותיהם במ"מ.'
  },
  {
    id: 'gemini_failed_render',
    titleHe: "כשל ג'מיני סבב 12: המצאת חלון עם עצים בקיר אטום",
    category: 'forensic',
    fileName: 'gemini_failed_render_0.jpg',
    notesHe: 'הדמיית AI של ג\'מיני בסבב 12 שהמציאה חלון ענק עם עצים בקיר האחורי האטום, מחקה את העמודים וסובבה ארונות ב-90 מעלות.',
    verifiedTruthHe: 'תוקן: מודל CAD פרמטרי מוחלט – אפס הזיות ואפס עיוותים גיאומטריים!'
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
            <Image className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="font-bold text-sm md:text-base">ארכיון מסמכי מקור, צילומי שטח ותחקיר פורנזי</h2>
              <p className="text-xs text-slate-400">הצלבה משולשת של כל המידות והשרטוטים מול המציאות בדירה</p>
            </div>
          </div>
          <button
            onClick={() => setActiveDialog('none')}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Split: Thumbnail List & High-Res Viewer */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-800 overflow-hidden">
          {/* Thumbnails Sidebar */}
          <div className="p-3 overflow-y-auto space-y-2 bg-slate-950/60">
            {MEDIA_GALLERY.map(item => {
              const isSelected = item.id === selectedItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-blue-950/70 border-blue-500 shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={`/reference_media/${item.fileName}`}
                    alt={item.titleHe}
                    className="w-14 h-14 object-cover rounded bg-black shrink-0 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white leading-tight mb-1">{item.titleHe}</h4>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      item.category === 'forensic' ? 'bg-amber-900/60 text-amber-300' :
                      item.category === 'site_photo' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-blue-900/60 text-blue-300'
                    }`}>
                      {item.category === 'forensic' ? 'כשל שזוהה ותוקן' :
                       item.category === 'site_photo' ? 'צילום מהדירה' : 'מסמך מקור'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Res Image Preview & Explanations */}
          <div className="md:col-span-2 flex flex-col bg-slate-900 overflow-y-auto p-4 space-y-4">
            <div className="flex-1 bg-black/40 rounded-xl border border-slate-800 p-2 flex items-center justify-center min-h-[340px]">
              <img
                src={`/reference_media/${selectedItem.fileName}`}
                alt={selectedItem.titleHe}
                className="max-h-[460px] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{selectedItem.titleHe}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedItem.notesHe}</p>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/80 flex items-start gap-2 text-xs">
                {selectedItem.category === 'forensic' ? (
                  <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="text-white">אמת המידה ההנדסית: </strong>
                  <span className="text-slate-200">{selectedItem.verifiedTruthHe}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
