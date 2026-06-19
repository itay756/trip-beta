import { useMemo, useState } from 'react'
import type { Attraction, AttractionCategory, Campground } from '../lib/types'
import { routeMap, routes } from '../data/routes'
import { campgrounds } from '../data/campgrounds'
import { attractions } from '../data/attractions'
import { categoryEmoji, categoryLabels } from '../lib/ui'
import { MapView } from '../components/MapView'

const allCats: AttractionCategory[] = ['hiking', 'water', 'scenic', 'culture', 'town']

interface Props {
  routeId: string
  setRouteId: (id: string) => void
  onSelectCampground: (c: Campground) => void
  onSelectAttraction: (a: Attraction) => void
}

export function MapPage({ routeId, setRouteId, onSelectCampground, onSelectAttraction }: Props) {
  const route = routeMap[routeId]
  const [showRoute, setShowRoute] = useState(true)
  const [showCamps, setShowCamps] = useState(true)
  const [showAttr, setShowAttr] = useState(true)
  const [cats, setCats] = useState<Set<AttractionCategory>>(new Set(allCats))
  const [bigRigOnly, setBigRigOnly] = useState(false)
  const [hookupsOnly, setHookupsOnly] = useState(false)

  const toggleCat = (c: AttractionCategory) => {
    setCats((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  const visibleAttractions = useMemo(
    () => attractions.filter((a) => cats.has(a.category)),
    [cats],
  )
  const visibleCampgrounds = useMemo(
    () =>
      campgrounds.filter(
        (c) => (!bigRigOnly || c.bigRigFriendly) && (!hookupsOnly || c.hookups),
      ),
    [bigRigOnly, hookupsOnly],
  )

  return (
    <div className="flex h-full flex-col-reverse md:flex-row">
      {/* פאנל בקרה */}
      <aside className="w-full overflow-y-auto border-forest-100 bg-white p-4 md:w-80 md:border-s">
        <h2 className="font-display mb-1 text-lg font-extrabold text-forest-800">בחירת מסלול</h2>
        <div className="mb-4 space-y-2">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setRouteId(r.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-right transition ${
                r.id === routeId
                  ? 'border-transparent text-white shadow'
                  : 'border-forest-100 bg-white hover:bg-forest-50'
              }`}
              style={r.id === routeId ? { background: r.color } : undefined}
            >
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: r.id === routeId ? '#fff' : r.color }} />
              <span className="flex-1">
                <span className="block text-sm font-bold">{r.name}</span>
                <span className={`block text-xs ${r.id === routeId ? 'text-white/80' : 'text-forest-500'}`}>
                  {r.tagline} · {r.distanceKm.toLocaleString('he-IL')} ק"מ
                </span>
              </span>
            </button>
          ))}
        </div>

        <h3 className="mb-2 font-bold text-forest-800">שכבות</h3>
        <div className="mb-4 space-y-1.5 text-sm">
          <Toggle checked={showRoute} onChange={setShowRoute} label="מסלול ועצירות" dot={route.color} />
          <Toggle checked={showCamps} onChange={setShowCamps} label="חניוני לילה 🚐" />
          <Toggle checked={showAttr} onChange={setShowAttr} label="אטרקציות 📸" />
        </div>

        {showAttr && (
          <>
            <h3 className="mb-2 font-bold text-forest-800">סוגי אטרקציות</h3>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {allCats.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCat(c)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                    cats.has(c)
                      ? 'border-forest-600 bg-forest-600 text-white'
                      : 'border-forest-200 bg-white text-forest-600'
                  }`}
                >
                  {categoryEmoji[c]} {categoryLabels[c]}
                </button>
              ))}
            </div>
          </>
        )}

        {showCamps && (
          <>
            <h3 className="mb-2 font-bold text-forest-800">סינון חניונים</h3>
            <div className="space-y-1.5 text-sm">
              <Toggle checked={bigRigOnly} onChange={setBigRigOnly} label="מתאים לקרוואן גדול בלבד" />
              <Toggle checked={hookupsOnly} onChange={setHookupsOnly} label="עם חיבורי חשמל/מים בלבד" />
            </div>
          </>
        )}

        <p className="mt-4 rounded-xl bg-forest-50 p-3 text-xs leading-relaxed text-forest-600">
          טיפ: לחצו על סמן במפה כדי לראות ביקורות, טלפון ותמונות. הרחפה מציגה שם ודירוג.
        </p>
      </aside>

      {/* מפה */}
      <div className="relative h-72 flex-1 md:h-auto">
        <MapView
          route={route}
          campgrounds={visibleCampgrounds}
          attractions={visibleAttractions}
          showRoute={showRoute}
          showCampgrounds={showCamps}
          showAttractions={showAttr}
          onSelectCampground={onSelectCampground}
          onSelectAttraction={onSelectAttraction}
        />
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
  dot,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  dot?: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-forest-600"
      />
      {dot && <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />}
      <span className="text-forest-700">{label}</span>
    </label>
  )
}
