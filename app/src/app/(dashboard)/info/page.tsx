'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  AlertTriangle,
  Bug,
  Pill,
  Smile,
  Scissors,
  Heart,
  Activity,
  Droplets,
  Shield,
  ChevronDown,
  ChevronUp,
  Phone,
} from 'lucide-react'

interface InfoCategory {
  id: string
  icon: React.ReactNode
  color: string
  title: string
  description: string
  content: string[]
  emergency?: boolean
}

const infoCategories: InfoCategory[] = [
  {
    id: 'snake_bite',
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'from-red-500 to-red-600',
    title: 'הכשת נחש',
    description: 'מה לעשות במקרה של הכשת נחש',
    emergency: true,
    content: [
      '🚨 הכשת נחש היא מצב חירום! יש לפנות מיד לווטרינר',
      'נסו להרגיע את החיה ולמנוע ממנה תנועה מיותרת',
      'אל תנסו לשאוב את הארס או לחתוך את מקום ההכשה',
      'אם אפשר, נסו לזהות או לצלם את הנחש (משמרחוק בטוח)',
      'הניחו את החיה במנוחה והביאו אותה לקליניקה בהקדם האפשרי',
      'סימנים: נפיחות, כאב, חולשה, הקאות, קשיי נשימה',
    ],
  },
  {
    id: 'ticks',
    icon: <Bug className="w-6 h-6" />,
    color: 'from-amber-500 to-amber-600',
    title: 'קרציות',
    description: 'מניעה וטיפול בקרציות',
    content: [
      'קרציות יכולות להעביר מחלות מסוכנות כמו ארליכיה ובבזיה',
      'יש להשתמש בתכשיר מניעה באופן קבוע (טיפות, קולר, או כדורים)',
      'בדקו את החיה לאחר כל טיול בטבע',
      'להסרה: השתמשו בפינצטה מיוחדת, סובבו ומשכו בעדינות',
      'אל תמעכו את הקרציה ואל תשתמשו בשמן או אש',
      'פנו לווטרינר אם נשאר חלק מהקרציה או מופיעים סימני מחלה',
    ],
  },
  {
    id: 'deworming',
    icon: <Pill className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    title: 'תילוע',
    description: 'לוח זמנים ומידע על תילוע',
    content: [
      'גורים: תילוע כל שבועיים עד גיל 3 חודשים',
      'מגיל 3 חודשים עד שנה: תילוע חודשי',
      'חיות בוגרות: תילוע כל 3-4 חודשים',
      'סימנים לנוכחות תולעים: ירידה במשקל, בטן נפוחה, שלשולים, הקאות',
      'חשוב לתלע גם נגד תולעי לב (באזורים מסוימים)',
      'התייעצו עם הווטרינר לגבי סוג התכשיר המתאים',
    ],
  },
  {
    id: 'park_worm',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    title: 'תולעת הפארק',
    description: 'מידע על תולעת הפארק (ספירוצרקה)',
    content: [
      'תולעת הפארק מועברת דרך צואת חיפושיות גללים',
      'הסימנים: קשיי בליעה, הקאות, ירידה במשקל, נפיחויות',
      'אבחון: בדיקת צואה או אנדוסקופיה',
      'מניעה: הרחקת הכלב מצואה של כלבים אחרים',
      'טיפול: תרופות ייעודיות שנקבעות על ידי הווטרינר',
      'חשוב לטפל מוקדם - המחלה יכולה להיות מסוכנת',
    ],
  },
  {
    id: 'oral_health',
    icon: <Smile className="w-6 h-6" />,
    color: 'from-cyan-500 to-cyan-600',
    title: 'בריאות הפה והלסת',
    description: 'טיפול בשיניים וחניכיים',
    content: [
      'צחצוח שיניים יומי הוא הדרך הטובה ביותר למניעת בעיות',
      'השתמשו במשחת שיניים ייעודית לחיות (לא אנושית!)',
      'סימנים לבעיות: ריח רע, חניכיים אדומות, קושי באכילה',
      'מומלץ ניקוי שיניים מקצועי אחת לשנה',
      'חטיפים דנטליים יכולים לעזור בשמירה על השיניים',
      'בעיות שיניים לא מטופלות יכולות לגרום למחלות לב וכליות',
    ],
  },
  {
    id: 'grooming',
    icon: <Scissors className="w-6 h-6" />,
    color: 'from-pink-500 to-pink-600',
    title: 'טיפוח הפרווה',
    description: 'הדרכה לטיפוח נכון',
    content: [
      'סירוק יומי מונע קשרים ומפזר שמנים טבעיים',
      'רחצה: כלבים כל 4-6 שבועות, חתולים בדרך כלל לא צריכים',
      'השתמשו בשמפו ייעודי לחיות מחמד',
      'בדקו אוזניים שבועית ונקו בעדינות',
      'גזירת ציפורניים כל 2-4 שבועות',
      'שימו לב לשינויים בפרווה: נשירה מוגברת, קשקשים, אדמומיות',
    ],
  },
  {
    id: 'allergies',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-rose-500 to-rose-600',
    title: 'אלרגיות',
    description: 'זיהוי וטיפול באלרגיות',
    content: [
      'סוגי אלרגיות: מזון, סביבתיות (אבקנים, אבק), פרעושים',
      'סימנים: גירוד, ליקוק יתר, אוזניים אדומות, בעיות עור',
      'אלרגיית מזון: עשויה לדרוש דיאטת אלימינציה',
      'אלרגיות סביבתיות: ניתן לטפל בתרופות או חיסוני רגישות',
      'אל תתנו תרופות אנושיות ללא אישור וטרינר',
      'ניהול ארוך טווח דורש מעקב וטרינרי קבוע',
    ],
  },
  {
    id: 'tumors',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-indigo-500 to-indigo-600',
    title: 'גידולים שפירים',
    description: 'מידע על גידולים ובליטות',
    content: [
      'לא כל גוש הוא סרטני - רבים שפירים לחלוטין',
      'ליפומות (גושי שומן) נפוצות בכלבים מבוגרים',
      'כל גוש חדש צריך להיבדק על ידי וטרינר',
      'אבחון: ביופסיה או שאיבה במחט דקה',
      'גידולים שפירים בדרך כלל לא דורשים טיפול',
      'עקבו אחרי שינויים בגודל, צורה או צבע',
    ],
  },
  {
    id: 'urinary',
    icon: <Droplets className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    title: 'מערכת השתן והכליות',
    description: 'בריאות מערכת השתן',
    content: [
      'שתייה מספקת חיונית לבריאות הכליות',
      'סימני בעיה: שתייה מוגברת, שתן תכוף, דם בשתן',
      'זיהומים בדרכי השתן נפוצים יותר בנקבות',
      'אבנים בשלפוחית יכולות לגרום לחסימה מסכנת חיים',
      'חתולים זקנים צריכים בדיקות דם שנתיות לתפקוד כליות',
      'תזונה מתאימה יכולה לעזור במניעת בעיות',
    ],
  },
  {
    id: 'neutering',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-teal-500 to-teal-600',
    title: 'סירוס/עיקור',
    description: 'מידע על סירוס ועיקור',
    content: [
      'גיל מומלץ: 6-12 חודשים (תלוי בגזע ובמין)',
      'יתרונות בריאותיים: הפחתת סיכון לסרטן, זיהומים',
      'יתרונות התנהגותיים: הפחתת תוקפנות, סימון טריטוריה',
      'ההליך בטוח ומתבצע תחת הרדמה מלאה',
      'זמן החלמה: כ-10-14 ימים',
      'לאחר הניתוח: מנוחה, קולר מגן, ומעקב אחר התפרים',
    ],
  },
]

export default function InfoPage() {
  const t = useTranslations('info')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">מידע חשוב והכוונה לבעלי חיות מחמד</p>
        </div>
      </div>

      {/* Emergency Banner */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">מקרה חירום?</h3>
              <p className="text-red-100">אנחנו זמינים 24/7 למקרי חירום</p>
            </div>
            <a
              href="tel:*6789"
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              *6789
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Info Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoCategories.map((category) => (
          <Card
            key={category.id}
            className={`overflow-hidden transition-all duration-300 ${
              expandedId === category.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <button
              onClick={() => toggleExpand(category.id)}
              className="w-full text-right"
            >
              <div className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{category.title}</h3>
                    {category.emergency && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        חירום
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                {expandedId === category.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {expandedId === category.id && (
              <CardContent className="pt-0 pb-4 px-4">
                <div className="border-t border-gray-100 pt-4">
                  <ul className="space-y-2">
                    {category.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
