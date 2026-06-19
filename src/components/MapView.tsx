import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Attraction, Campground, Route } from '../lib/types'
import { categoryColor, categoryEmoji } from '../lib/ui'

function stopIcon(color: string, n: number) {
  return L.divIcon({
    className: 'route-pin',
    html: `<div style="background:${color};color:#fff;width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;border:2px solid #fff;"><span style="transform:rotate(45deg);font-weight:700;font-size:13px;">${n}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
  })
}

function emojiIcon(emoji: string, color: string) {
  return L.divIcon({
    className: 'route-pin',
    html: `<div style="background:#fff;border:2px solid ${color};width:30px;height:30px;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:15px;">${emoji}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (points.length) {
      map.fitBounds(L.latLngBounds(points), { padding: [50, 50] })
    }
  }, [points, map])
  return null
}

interface MapViewProps {
  route: Route
  campgrounds: Campground[]
  attractions: Attraction[]
  showRoute: boolean
  showCampgrounds: boolean
  showAttractions: boolean
  onSelectCampground: (c: Campground) => void
  onSelectAttraction: (a: Attraction) => void
}

export function MapView({
  route,
  campgrounds,
  attractions,
  showRoute,
  showCampgrounds,
  showAttractions,
  onSelectCampground,
  onSelectAttraction,
}: MapViewProps) {
  const linePoints = useMemo<[number, number][]>(
    () => route.stops.map((s) => [s.lat, s.lng]),
    [route],
  )

  return (
    <MapContainer
      center={[45, -71]}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: '#dDe9e3' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showRoute && (
        <>
          <Polyline positions={linePoints} pathOptions={{ color: route.color, weight: 4, opacity: 0.85 }} />
          {route.stops.map((s, i) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={stopIcon(route.color, i + 1)}>
              <Tooltip direction="top" offset={[0, -24]}>
                <div style={{ direction: 'rtl', textAlign: 'right' }}>
                  <b>{i + 1}. {s.name}</b>
                  {s.nights > 0 && <div>{s.nights} לילות</div>}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </>
      )}

      {showCampgrounds &&
        campgrounds.map((c) => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={emojiIcon('🚐', '#c8893a')}
            eventHandlers={{ click: () => onSelectCampground(c) }}
          >
            <Tooltip direction="top" offset={[0, -16]}>
              <div style={{ direction: 'rtl', textAlign: 'right' }}>
                <b>{c.name}</b>
                <div>★ {c.rating.toFixed(1)} · לחצו לפרטים</div>
              </div>
            </Tooltip>
          </Marker>
        ))}

      {showAttractions &&
        attractions.map((a) => (
          <Marker
            key={a.id}
            position={[a.lat, a.lng]}
            icon={emojiIcon(categoryEmoji[a.category], categoryColor[a.category])}
            eventHandlers={{ click: () => onSelectAttraction(a) }}
          >
            <Tooltip direction="top" offset={[0, -16]}>
              <div style={{ direction: 'rtl', textAlign: 'right' }}>
                <b>{a.name}</b>
                <div>★ {a.rating.toFixed(1)} · לחצו לפרטים</div>
              </div>
            </Tooltip>
          </Marker>
        ))}

      <FitBounds points={showRoute ? linePoints : []} />
    </MapContainer>
  )
}
