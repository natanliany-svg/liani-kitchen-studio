import { TourStation } from '../types/kitchen';

export const TOUR_STATIONS: TourStation[] = [
  {
    id: 'entrance-flush',
    nameHe: 'מבואת הכניסה וקו 0',
    stationNumber: 1,
    camPos: [160, 155, 35],
    targetPos: [45, 135, 95],
    descriptionHe: 'מרווח 23 ס"מ פתוח בכניסה, מקררים ומקפיא בקו 0 נקי צמודים לעמוד הבטון – נבלעים במלואם בעומק הנישה (89 ס"מ) עם פתח כניסה רחב 110 ס"מ ללא שום בליטה.',
    badgeHe: 'נישה 1 (263 ס"מ)'
  },
  {
    id: 'meat-zone',
    nameHe: 'מתחם בישול בשרי',
    stationNumber: 2,
    camPos: [150, 155, 335],
    targetPos: [30, 105, 340],
    descriptionHe: 'כיריים אינדוקציה 80 ס"מ בימין בצמוד לעמוד הבטון, משטח תבלינים נשלף 43 ס"מ וכיור בשרי רחב 85 ס"מ בהתקנה שטוחה.',
    badgeHe: 'נישה 2 בשרית (268 ס"מ)'
  },
  {
    id: 'corner-shabbat',
    nameHe: 'פינה אחורית ועמדת שבת',
    stationNumber: 3,
    camPos: [150, 155, 570],
    targetPos: [35, 115, 630],
    descriptionHe: 'משטח שיש רצוף ב-ר\' ייעודי לפלטת שבת ומיחם, עם ארונות עליונים ב-ר\' המתחברים רציף לקיר האחורי.',
    badgeHe: 'נישה 3 אחורית (124 ס"מ)'
  },
  {
    id: 'dairy-wall',
    nameHe: 'קיר אחורי חלבי (317 ס"מ)',
    stationNumber: 4,
    camPos: [160, 155, 520],
    targetPos: [160, 110, 705],
    descriptionHe: 'משטח שיש חלבי רציף מקיר לקיר (קיר אטום ללא חלון), כיור חלבי רחב 80 ס"מ, וארונות עליונים שנעצרים מעל הכיור ליצירת מרחב פתוח.',
    badgeHe: 'קיר חלבי 317 ס"מ'
  },
  {
    id: 'appliance-garage',
    nameHe: 'ארון מכשירים על גבי השיש',
    stationNumber: 5,
    camPos: [205, 145, 590],
    targetPos: [280, 130, 675],
    descriptionHe: 'ארון מכשירים יוקרתי היושב ישירות על פלטת השיש, עם תריס נגלל קשתי בחצי עיגול (Tambour) לנצילות מקסימלית ואפס התנגשות עם דלתות.',
    badgeHe: 'עמדת מיקסר ומכשירים'
  },
  {
    id: 'baking-pantry',
    nameHe: 'מתחם אפייה ומזווה Space Tower',
    stationNumber: 6,
    camPos: [150, 155, 450],
    targetPos: [290, 135, 450],
    descriptionHe: 'מגדל אפייה כפול 160 ס"מ מוצמד ישירות לשיש החלבי, וארון מזווה Space Tower גבוה 80 ס"מ עם 6 מגירות נשיאה כבדות.',
    badgeHe: 'קיר שמאל (240 ס"מ)'
  },
  {
    id: 'open-panorama',
    nameHe: 'מרחב מרכזי פתוח ומרווח',
    stationNumber: 7,
    camPos: [160, 155, 230],
    targetPos: [160, 120, 580],
    descriptionHe: 'חלל מטבח פתוח ומשוחרר ללא שולחן חוסם – מעבר תנועה דו-סטרי רחב ומזמין לכל המשפחה.',
    badgeHe: 'רחבה מרכזית פתוחה'
  }
];
