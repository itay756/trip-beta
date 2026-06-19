import { useMemo, useState } from 'react'
import type { Campground, CampType } from '../lib/types'
import { campgrounds } from '../data/campgrounds'
import { regionMap } from '../data/regions'
import { campTypeColor, campTypeLabels, stars } from '../lib/ui'
import { Photo } from '../components/Photo'

const types: CampType[] = ['national', 'provincial', 'state', 'koa', 'private']

export function CampgroundsPage({ onSelect }: { onSelect: (c: Campground) => void }) {
  const [bigRig, setBigRig] = useState(false)
  const [hookups, setHookups] = useState(false)
  const [pet, setPet] = useState(false)
  const [type, setType] = useState<CampType | 'all'>('all')

  const list = useMemo(
    () =>
      campgrounds
        .filter(
          (c) =>
            (!bigRig || c.bigRigFriendly) &&
            (!hookups || c.hookups) &&
            (!pet || c.petFriendly) &&
            (type === 'all' || c.type === type),
        )
        .sort((a, b) => b.rating - a.rating),
    [bigRig, hookups, pet, type],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-2xl font-extrabold text-forest-900">חניוני לילה לקרוואן</h1>
      <p className="mb-4 text-sm text-forest-600">
        {list.length} מתוך {campgrounds.length} מתחמים · פארקים לאומיים, מחוזיים, מדינתיים ופרטיים לאורך המסלולים.
      </p>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Chip active={bigRig} onClick={() => setBigRig((v) => !v)}>קרוואן גדול</Chip>
        <Chip active={hookups} onClick={() => setHookups((v) => !v)}>חיבורי חשמל/מים</Chip>
        <Chip active={pet} onClick={() => setPet((v) => !v)}>ידידותי לכלבים 🐾</Chip>
        <span className="mx-1 h-5 w-px bg-forest-200" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CampType | 'all')}
          className="rounded-full border border-forest-200 bg-white px-3 py-1.5 text-sm font-semibold text-forest-700"
        >
          <option value="all">כל הסוגים</option>
          {types.map((t) => (
            <option key={t} value={t}>{campTypeLabels[t]}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="animate-fadeUp flex flex-col overflow-hidden rounded-2xl bg-white text-right shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Photo src={c.photos[0]} seed={c.id} emoji="🚐" label={c.name} className="h-36 w-full" />
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-forest-900">{c.name}</h2>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: campTypeColor[c.type] }}
                >
                  {campTypeLabels[c.type]}
                </span>
              </div>
              <p className="text-xs text-forest-500">{regionMap[c.regionId]?.name}</p>
              <div className="mt-1 text-sm text-amber-500" dir="ltr">
                {stars(c.rating)} <span className="text-forest-500">({c.reviewCount})</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                {c.bigRigFriendly && <Tag>קרוואן גדול</Tag>}
                {c.hookups && <Tag>חשמל/מים</Tag>}
                {c.petFriendly && <Tag>🐾</Tag>}
                <Tag>{c.priceRange}</Tag>
              </div>
              <div className="mt-3 text-sm font-semibold text-forest-600">📞 {c.phone}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active ? 'border-forest-600 bg-forest-600 text-white' : 'border-forest-200 bg-white text-forest-700 hover:bg-forest-50'
      }`}
    >
      {children}
    </button>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-forest-50 px-2 py-0.5 font-semibold text-forest-600">{children}</span>
}
