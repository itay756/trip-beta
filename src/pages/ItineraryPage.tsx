import type { Attraction, Campground } from '../lib/types'
import { routeMap, routes } from '../data/routes'
import { regionMap } from '../data/regions'
import { campgrounds } from '../data/campgrounds'
import { attractions } from '../data/attractions'

interface Props {
  routeId: string
  setRouteId: (id: string) => void
  onSelectCampground: (c: Campground) => void
  onSelectAttraction: (a: Attraction) => void
}

export function ItineraryPage({ routeId, setRouteId, onSelectCampground, onSelectAttraction }: Props) {
  const route = routeMap[routeId]
  const totalNights = route.stops.reduce((s, st) => s + st.nights, 0)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-forest-900">יומן המסע</h1>
          <p className="text-sm text-forest-600">
            {route.name} · {totalNights} לילות · ~{route.weeks} שבועות
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setRouteId(r.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                r.id === routeId ? 'text-white shadow' : 'border border-forest-200 text-forest-700 hover:bg-forest-50'
              }`}
              style={r.id === routeId ? { background: r.color } : undefined}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative space-y-4 before:absolute before:bottom-4 before:right-[19px] before:top-4 before:w-0.5 before:bg-forest-100">
        {route.stops.map((stop, i) => {
          const region = regionMap[stop.regionId]
          const camps = campgrounds.filter((c) => c.regionId === stop.regionId)
          const attrs = attractions.filter((a) => a.regionId === stop.regionId)
          return (
            <li key={stop.id} className="relative flex gap-4">
              <div
                className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow"
                style={{ background: route.color }}
              >
                {i + 1}
              </div>
              <div className="flex-1 rounded-2xl bg-white p-4 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-bold text-forest-900">{stop.name}</h2>
                  <span className="text-sm font-semibold text-forest-500">
                    {stop.nights > 0 ? `${stop.nights} לילות` : 'מעבר'}
                  </span>
                </div>
                <p className="text-xs text-forest-500">{region?.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{stop.notes}</p>

                {camps.length > 0 && (
                  <div className="mt-3">
                    <div className="mb-1 text-xs font-bold text-forest-700">חניוני לילה באזור 🚐</div>
                    <div className="flex flex-wrap gap-1.5">
                      {camps.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => onSelectCampground(c)}
                          className="rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-sand-100"
                        >
                          {c.name} · ★{c.rating.toFixed(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {attrs.length > 0 && (
                  <div className="mt-2.5">
                    <div className="mb-1 text-xs font-bold text-forest-700">לא לפספס 📸</div>
                    <div className="flex flex-wrap gap-1.5">
                      {attrs.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => onSelectAttraction(a)}
                          className="rounded-full border border-forest-200 bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-700 hover:bg-forest-100"
                        >
                          {a.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
