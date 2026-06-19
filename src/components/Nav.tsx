export type ViewId = 'map' | 'routes' | 'itinerary' | 'campgrounds' | 'attractions' | 'tips'

const items: { id: ViewId; label: string; icon: string }[] = [
  { id: 'map', label: 'מפה', icon: '🗺️' },
  { id: 'routes', label: 'מסלולים', icon: '🛣️' },
  { id: 'itinerary', label: 'יומן מסע', icon: '📅' },
  { id: 'campgrounds', label: 'חניוני לילה', icon: '🚐' },
  { id: 'attractions', label: 'אטרקציות', icon: '📸' },
  { id: 'tips', label: 'המלצות', icon: '💡' },
]

export function Nav({ view, onChange }: { view: ViewId; onChange: (v: ViewId) => void }) {
  return (
    <header className="sticky top-0 z-[500] border-b border-forest-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚐</span>
          <div className="leading-tight">
            <div className="font-display text-lg font-extrabold text-forest-800">מסע צפוני</div>
            <div className="text-[11px] text-forest-500">קרוואן · צפון-מזרח ארה"ב וקוויבק</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-1">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                view === it.id
                  ? 'bg-forest-600 text-white shadow'
                  : 'text-forest-700 hover:bg-forest-50'
              }`}
            >
              <span>{it.icon}</span>
              <span>{it.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
