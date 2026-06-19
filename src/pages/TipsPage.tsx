import { tips } from '../data/tips'

export function TipsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-forest-900">המלצות כלליות וטיפים למסע</h1>
        <p className="mt-1 text-sm text-forest-600">
          כל מה שכדאי לדעת לפני ובמהלך מסע קרוואן בן חודשיים בצפון-מזרח ארה"ב ובקוויבק.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tips.map((sec) => (
          <section key={sec.id} className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-forest-800">
              <span className="text-2xl">{sec.icon}</span>
              {sec.title}
            </h2>
            <ul className="space-y-2">
              {sec.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
                  <span className="mt-1 text-forest-400">◂</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <b>הערה חשובה:</b> הנתונים באפליקציה (טלפונים, מחירים, חוות דעת) נאספו ממקורות ציבוריים לצורכי תכנון, ומיועדים
        כנקודת פתיחה. אמתו תמיד זמינות, מחיר ומדיניות קרוואנים מול האתר הרשמי או בטלפון לפני הזמנה.
      </div>
    </div>
  )
}
