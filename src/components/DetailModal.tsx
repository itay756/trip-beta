import { useEffect } from 'react'
import type { Attraction, Campground } from '../lib/types'
import { regionMap } from '../data/regions'
import {
  campTypeColor,
  campTypeLabels,
  categoryColor,
  categoryEmoji,
  categoryLabels,
  stars,
} from '../lib/ui'
import { Photo } from './Photo'

type Selection =
  | { kind: 'campground'; data: Campground }
  | { kind: 'attraction'; data: Attraction }

function gmaps(lat: number, lng: number, q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}(${encodeURIComponent(q)})`
}

export function DetailModal({ selection, onClose }: { selection: Selection | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!selection) return null
  const { kind, data } = selection
  const region = regionMap[data.regionId]

  const isCamp = kind === 'campground'
  const camp = isCamp ? (data as Campground) : null
  const attr = !isCamp ? (data as Attraction) : null

  const accent = isCamp ? campTypeColor[camp!.type] : categoryColor[attr!.category]
  const emoji = isCamp ? '🚐' : categoryEmoji[attr!.category]
  const photos = data.photos.length ? data.photos : [undefined]

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-fadeUp flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* גלריית תמונות */}
        <div className="relative">
          <div className="flex gap-1 overflow-x-auto">
            {photos.map((p, i) => (
              <Photo
                key={i}
                src={p}
                seed={data.id + i}
                emoji={emoji}
                label={data.name}
                className="h-52 w-full shrink-0 sm:h-64"
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-forest-800 shadow hover:bg-white"
            aria-label="סגירה"
          >
            ✕
          </button>
          <span
            className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-sm font-semibold text-white shadow"
            style={{ background: accent }}
          >
            {isCamp ? campTypeLabels[camp!.type] : categoryLabels[attr!.category]}
          </span>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="mb-1 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-forest-900">{data.name}</h2>
              <p className="text-sm text-forest-600">
                {data.nameEn} · {region?.name}
              </p>
            </div>
            <div className="shrink-0 text-left">
              <div className="text-lg font-bold text-amber-500" dir="ltr">
                {stars(data.rating)}
              </div>
              <div className="text-sm text-forest-600">{data.rating.toFixed(1)} / 5</div>
            </div>
          </div>

          {attr && <p className="mt-2 leading-relaxed text-gray-700">{attr.blurb}</p>}

          {/* פרטי מתחם */}
          {camp && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Fact label="חיבורי חשמל/מים" value={camp.hookups ? 'כן ✅' : 'לא ❌'} />
              <Fact label="מתאים לקרוואן גדול" value={camp.bigRigFriendly ? 'כן ✅' : 'מוגבל ⚠️'} />
              <Fact label="ידידותי לכלבים" value={camp.petFriendly ? 'כן 🐾' : 'לא'} />
              <Fact label="טווח מחיר" value={camp.priceRange} />
              <Fact label="דירוג" value={`★ ${camp.rating.toFixed(1)} (${camp.reviewCount})`} />
              <Fact label="אימות פרטים" value={camp.verified ? 'מאומת' : 'לאמת לפני הזמנה'} />
            </div>
          )}

          {/* ביקורות */}
          <div className="mt-4">
            <h3 className="mb-2 font-bold text-forest-800">תקציר חוות דעת</h3>
            <ul className="space-y-2">
              {data.reviews.map((r, i) => (
                <li key={i} className="rounded-xl bg-forest-50 p-3 text-sm leading-relaxed text-gray-700">
                  <span className="text-amber-500">★</span> {r}
                </li>
              ))}
            </ul>
            {camp && !camp.verified && (
              <p className="mt-2 text-xs text-amber-700">
                ⚠️ הטלפון והמחיר נאספו ממקורות ציבוריים — אמתו מול האתר הרשמי לפני ההזמנה.
              </p>
            )}
          </div>

          {/* פעולות */}
          <div className="mt-5 flex flex-wrap gap-2">
            {camp && (
              <a
                href={`tel:${camp.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-700"
              >
                📞 {camp.phone}
              </a>
            )}
            {(camp?.website || attr?.website) && (
              <a
                href={camp?.website || attr?.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-forest-300 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-50"
              >
                🌐 אתר רשמי
              </a>
            )}
            <a
              href={gmaps(data.lat, data.lng, data.nameEn)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-forest-300 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-50"
            >
              🧭 פתח ב-Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-forest-100 bg-white p-2">
      <div className="text-xs text-forest-500">{label}</div>
      <div className="text-sm font-semibold text-forest-800">{value}</div>
    </div>
  )
}
