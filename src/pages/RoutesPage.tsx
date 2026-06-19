import { routes } from '../data/routes'
import type { ViewId } from '../components/Nav'

interface Props {
  routeId: string
  setRouteId: (id: string) => void
  goTo: (v: ViewId) => void
}

export function RoutesPage({ routeId, setRouteId, goTo }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="font-display text-3xl font-extrabold text-forest-900">שלושה מסלולים, מסע אחד בלתי נשכח</h1>
        <p className="mx-auto mt-2 max-w-2xl text-forest-600">
          כל המסלולים יוצאים מניו יורק וחוזרים אליה, מתוכננים לקרוואן גדול בקצב רגוע למשך כחודשיים (יולי–אוגוסט).
          בחרו מסלול, צפו בו במפה, או שלבו קטעים לפי הטעם שלכם.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        {routes.map((r) => {
          const active = r.id === routeId
          const nights = r.stops.reduce((s, st) => s + st.nights, 0)
          return (
            <article
              key={r.id}
              className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition ${
                active ? 'ring-2 ring-offset-2' : ''
              }`}
              style={active ? { '--tw-ring-color': r.color } as React.CSSProperties : undefined}
            >
              <div className="p-1.5" style={{ background: r.color }}>
                <div className="px-2 py-1 text-center text-xs font-bold text-white">{r.tagline}</div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl font-extrabold text-forest-900">{r.name}</h2>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-600">
                  <span>📏 {r.distanceKm.toLocaleString('he-IL')} ק"מ</span>
                  <span>🗓️ ~{r.weeks} שבועות</span>
                  <span>🛏️ {nights} לילות</span>
                </div>
                <p className="mt-1 text-xs font-semibold" style={{ color: r.color }}>{r.vibe}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">{r.summary}</p>

                <div className="mt-4">
                  <h3 className="mb-1.5 text-sm font-bold text-forest-800">שיאי המסלול</h3>
                  <ul className="space-y-1">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span style={{ color: r.color }}>◆</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => {
                      setRouteId(r.id)
                      goTo('map')
                    }}
                    className="flex-1 rounded-full px-4 py-2 text-sm font-bold text-white shadow"
                    style={{ background: r.color }}
                  >
                    הצג במפה 🗺️
                  </button>
                  <button
                    onClick={() => {
                      setRouteId(r.id)
                      goTo('itinerary')
                    }}
                    className="rounded-full border border-forest-200 px-4 py-2 text-sm font-bold text-forest-700 hover:bg-forest-50"
                  >
                    יומן 📅
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
