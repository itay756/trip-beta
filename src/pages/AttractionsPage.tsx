import { useMemo, useState } from 'react'
import type { Attraction, AttractionCategory } from '../lib/types'
import { attractions } from '../data/attractions'
import { regionMap } from '../data/regions'
import { categoryColor, categoryEmoji, categoryLabels, stars } from '../lib/ui'
import { Photo } from '../components/Photo'

const cats: AttractionCategory[] = ['hiking', 'water', 'scenic', 'culture', 'town']

export function AttractionsPage({ onSelect }: { onSelect: (a: Attraction) => void }) {
  const [cat, setCat] = useState<AttractionCategory | 'all'>('all')

  const list = useMemo(
    () =>
      attractions
        .filter((a) => cat === 'all' || a.category === cat)
        .sort((a, b) => b.rating - a.rating),
    [cat],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-2xl font-extrabold text-forest-900">אטרקציות ונקודות עניין</h1>
      <p className="mb-4 text-sm text-forest-600">
        {list.length} מתוך {attractions.length} אתרים לאורך המסלולים — הליכות, מים, נופים ותרבות.
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <CatChip active={cat === 'all'} onClick={() => setCat('all')}>הכל</CatChip>
        {cats.map((c) => (
          <CatChip key={c} active={cat === c} onClick={() => setCat(c)}>
            {categoryEmoji[c]} {categoryLabels[c]}
          </CatChip>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a)}
            className="animate-fadeUp flex flex-col overflow-hidden rounded-2xl bg-white text-right shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative">
              <Photo src={a.photos[0]} seed={a.id} emoji={categoryEmoji[a.category]} label={a.name} className="h-40 w-full" />
              <span
                className="absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[11px] font-bold text-white shadow"
                style={{ background: categoryColor[a.category] }}
              >
                {categoryEmoji[a.category]} {categoryLabels[a.category]}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-bold text-forest-900">{a.name}</h2>
              <p className="text-xs text-forest-500">{regionMap[a.regionId]?.name}</p>
              <div className="mt-1 text-sm text-amber-500" dir="ltr">
                {stars(a.rating)} <span className="text-forest-500">{a.rating.toFixed(1)}</span>
              </div>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{a.blurb}</p>
              <span className="mt-3 text-sm font-semibold text-forest-600">פרטים, ביקורות ותמונות ←</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
