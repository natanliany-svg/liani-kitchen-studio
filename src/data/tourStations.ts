import { TourStation } from '../types/kitchen';

export const TOUR_STATIONS: TourStation[] = [
  {
    id: 'entrance-flush',
    nameHe: 'מבואת הכניסה וקו 0 במקררים',
    stationNumber: 1,
    camPos: [160, 158, 30],
    targetPos: [70, 140, 130],
    descriptionHe: 'פתח כניסה רחב 110 ס"מ עם מרווח אוורור פתוח 23 ס"מ. מקררים ומקפיא בקו 0 מושלם הנבלעים בעומק הנישה ללא בליטה למעבר.',
    badgeHe: 'נישה 1 (263 ס"מ)'
  },
  {
    id: 'meat-zone',
    nameHe: 'מתחם בישול והכנה בשרי',
    stationNumber: 2,
    camPos: [150, 158, 310],
    targetPos: [45, 115, 360],
    descriptionHe: 'כיריים אינדוקציה 80 ס"מ בימין צמודות לעמוד, משטח תבלינים נשלף 43 ס"מ וכיור בשרי 85 ס"מ בהתקנה שטוחה ורציפה.',
    badgeHe: 'נישה 2 בשרית (268 ס"מ)'
  },
  {
    id: 'corner-shabbat',
    nameHe: 'פינה אחורית ועמדת שבת',
    stationNumber: 3,
    camPos: [155, 158, 510],
    targetPos: [45, 120, 620],
    descriptionHe: 'משטח שיש רצוף ב-ר\' 124 ס"מ ייעודי לפלטת שבת ומיחם, כולל מתקן פינה נשלף LeMans ושקעי כוח לשעון שבת.',
    badgeHe: 'נישה 3 אחורית (124 ס"מ)'
  },
  {
    id: 'dairy-wall',
    nameHe: 'קיר אחורי חלבי רציף (317 ס"מ)',
    stationNumber: 4,
    camPos: [160, 158, 540],
    targetPos: [150, 115, 680],
    descriptionHe: 'קיר אטום ללא חלונות עם משטח שיש חלבי רציף מקיר לקיר, כיור חלבי רחב 80 ס"מ וארונות עליונים המשאירים מרחב פתוח ומאוורר.',
    badgeHe: 'קיר חלבי 317 ס"מ'
  },
  {
    id: 'appliance-garage',
    nameHe: 'עמודת ארון מכשירים קשתית (Tambour)',
    stationNumber: 5,
    camPos: [195, 158, 560],
    targetPos: [275, 135, 665],
    descriptionHe: 'עמודה קשתית מונוליטית מלאה מהשיש ועד התקרה (156 ס"מ) עם תריס נגלל עגול, תאורת לד פנימית ועמדת מיקסר KitchenAid מובנית.',
    badgeHe: 'עמדת מכשירים קשתית'
  },
  {
    id: 'baking-pantry',
    nameHe: 'מגדל אפייה כפול ומזווה Space Tower',
    stationNumber: 6,
    camPos: [160, 158, 470],
    targetPos: [275, 140, 440],
    descriptionHe: 'שני תנורים בגובה מותניים לצד מיקרוגל ומגירות אחסון, בצמוד לארון מזווה Space Tower גבוה 80 ס"מ בעל 6 מגירות נשיאה כבדות.',
    badgeHe: 'קיר שמאל (240 ס"מ)'
  },
  {
    id: 'open-panorama',
    nameHe: 'פנורמה מרכזית פתוחה ומרחב תנועה',
    stationNumber: 7,
    camPos: [160, 158, 200],
    targetPos: [160, 130, 560],
    descriptionHe: 'מרחב מטבח מרווח ללא שולחן חוסם – מעבר תנועה דו-סטרי רחב (מעל 168 ס"מ) המאפשר עבודה נוחה ומשותפת של מספר אנשים בו-זמנית.',
    badgeHe: 'רחבה מרכזית פתוחה'
  }
];
