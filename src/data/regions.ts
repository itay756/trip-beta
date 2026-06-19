import type { Region } from '../lib/types'

export const regions: Region[] = [
  {
    id: 'hudson',
    name: 'עמק ההדסון והקטסקילז',
    nameEn: 'Hudson Valley & Catskills',
    blurb:
      'נקודת היציאה מניו יורק: עמק נהר ירוק עם אחוזות היסטוריות, מפלים והרי הקטסקיל. רוגע ירוק במרחק שעות ספורות מהעיר.',
    interests: ['scenic', 'hiking', 'culture'],
  },
  {
    id: 'adirondacks',
    name: 'הרי האדירונדק',
    nameEn: 'Adirondacks',
    blurb:
      'הפארק הגדול ביותר בארה"ב היבשתית — 2.4 מיליון הקטר של אגמים, פסגות ויערות. לייק פלסיד ולייק ג׳ורג׳ הם לב הפעילות.',
    interests: ['hiking', 'water', 'scenic'],
  },
  {
    id: 'vermont',
    name: 'ורמונט ואגם שמפליין',
    nameEn: 'Vermont & Lake Champlain',
    blurb:
      'הרים ירוקים, חוות גבינה ומייפל, וכפרים ציוריים. אגם שמפליין הענק מציע שחייה, קיאקים ושקיעות מרהיבות.',
    interests: ['scenic', 'water', 'culture'],
  },
  {
    id: 'montreal',
    name: 'מונטריאול',
    nameEn: 'Montréal',
    blurb:
      'מטרופולין צרפתי תוסס — העיר העתיקה המרוצפת, שווקים, מטבח עשיר וחיי לילה. תחנת התרבות הראשונה בקנדה.',
    interests: ['culture'],
  },
  {
    id: 'quebec',
    name: 'העיר קוויבק',
    nameEn: 'Québec City',
    blurb:
      'העיר המבוצרת היחידה בצפון אמריקה (אתר מורשת עולמית). סמטאות אבן, שאטו פרונטנק ואווירה אירופית מובהקת.',
    interests: ['culture', 'scenic'],
  },
  {
    id: 'charlevoix',
    name: 'שרלבואה, הפיורד והלווייתנים',
    nameEn: 'Charlevoix & Saguenay',
    blurb:
      'נוף הררי שצלל אל נהר סן-לורן, כפרי אמנים, והפיורד של סאגנה. בטדוסאק צופים בלווייתנים כחולים ולווייתני זנב.',
    interests: ['water', 'scenic', 'hiking'],
  },
  {
    id: 'gaspe',
    name: 'חצי האי גספה',
    nameEn: 'Gaspé Peninsula',
    blurb:
      'הקצה הפראי של קוויבק: צוקי ים, סלע פֶּרְסֶה המפורסם, מושבת הסולות הגדולה בעולם ופארק פוריון. דרך חוף עוצרת נשימה.',
    interests: ['scenic', 'water', 'hiking'],
  },
  {
    id: 'newbrunswick',
    name: 'ניו-ברונסוויק ומפרץ פאנדי',
    nameEn: 'New Brunswick & Bay of Fundy',
    blurb:
      'בית לגאות הגבוהה בעולם (עד 16 מ׳!). סלעי הופוול, פארק פאנדי הלאומי ויערות צפופים על קו החוף.',
    interests: ['water', 'hiking', 'scenic'],
  },
  {
    id: 'maine',
    name: 'חוף מיין ואקדיה',
    nameEn: 'Maine Coast & Acadia',
    blurb:
      'מגדלורים, כפרי דייגים ולובסטר טרי. פארק אקדיה הלאומי משלב הרי גרניט שצוללים לאוקיינוס עם דרכי נוף קלאסיות.',
    interests: ['scenic', 'hiking', 'water'],
  },
  {
    id: 'whitemtns',
    name: 'ההרים הלבנים, ניו-המפשייר',
    nameEn: 'White Mountains, NH',
    blurb:
      'פסגות הגרניט הגבוהות של ניו-אינגלנד, ובהן הר וושינגטון. מעברי הרים דרמטיים, מפלים ומסילת ההר ההיסטורית.',
    interests: ['hiking', 'scenic'],
  },
  {
    id: 'fingerlakes',
    name: 'אגמי האצבעות',
    nameEn: 'Finger Lakes',
    blurb:
      'אחת-עשרה אצבעות מים ארוכות, יקבים מעוטרים, ומפלים בלב הערוצים. ווטקינס גלן הוא פנינת מפלים אמיתית.',
    interests: ['water', 'scenic', 'culture'],
  },
  {
    id: 'niagara',
    name: 'מפלי הניאגרה ואלפי האיים',
    nameEn: 'Niagara & Thousand Islands',
    blurb:
      'אחד המפלים המפורסמים בעולם, ובהמשך נהר סן-לורן עם 1,800 איים מנוקדי טירות. עוצמה ושלווה זו לצד זו.',
    interests: ['water', 'scenic'],
  },
  {
    id: 'newengland',
    name: 'חופי ניו-אינגלנד וקייפ קוד',
    nameEn: 'Coastal New England & Cape Cod',
    blurb:
      'חופי חול לבן, עיירות נופש קלאסיות ומגדלורים. קייפ קוד נשיונל סיישור משתרע על קילומטרים של דיונות פתוחות.',
    interests: ['water', 'scenic', 'culture'],
  },
  {
    id: 'berkshires',
    name: 'הרי הברקשייר',
    nameEn: 'The Berkshires',
    blurb:
      'גבעות מעוגלות, פסטיבלי מוזיקה ואמנות (טנגלווד), ויערות נשירים. חזרה רכה ותרבותית אל ניו יורק.',
    interests: ['culture', 'scenic', 'hiking'],
  },
]

export const regionMap: Record<string, Region> = Object.fromEntries(
  regions.map((r) => [r.id, r]),
)
