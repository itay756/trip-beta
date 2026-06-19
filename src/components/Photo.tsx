import { useState } from 'react'
import { gradientFor } from '../lib/ui'

interface PhotoProps {
  src?: string
  seed: string
  emoji?: string
  label?: string
  className?: string
}

// מציג תמונה אמיתית אם קיימת ונטענת, אחרת תחליף מדורג ומעוצב.
export function Photo({ src, seed, emoji, label, className }: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed

  return (
    <div
      className={`relative overflow-hidden bg-cover bg-center ${className ?? ''}`}
      style={!showImg ? { background: gradientFor(seed) } : undefined}
    >
      {showImg ? (
        <img
          src={src}
          alt={label ?? ''}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-3 text-center text-white">
          <span className="text-3xl drop-shadow">{emoji ?? '📷'}</span>
          {label && <span className="text-sm font-semibold drop-shadow">{label}</span>}
        </div>
      )}
    </div>
  )
}
