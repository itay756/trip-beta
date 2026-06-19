import { useState } from 'react'
import { Nav, type ViewId } from './components/Nav'
import { DetailModal } from './components/DetailModal'
import { MapPage } from './pages/MapPage'
import { RoutesPage } from './pages/RoutesPage'
import { ItineraryPage } from './pages/ItineraryPage'
import { CampgroundsPage } from './pages/CampgroundsPage'
import { AttractionsPage } from './pages/AttractionsPage'
import { TipsPage } from './pages/TipsPage'
import type { Attraction, Campground } from './lib/types'

type Selection =
  | { kind: 'campground'; data: Campground }
  | { kind: 'attraction'; data: Attraction }
  | null

export default function App() {
  const [view, setView] = useState<ViewId>('map')
  const [routeId, setRouteId] = useState('route-a')
  const [selection, setSelection] = useState<Selection>(null)

  const selectCamp = (c: Campground) => setSelection({ kind: 'campground', data: c })
  const selectAttr = (a: Attraction) => setSelection({ kind: 'attraction', data: a })

  return (
    <div className="flex h-screen flex-col">
      <Nav view={view} onChange={setView} />

      <main className="min-h-0 flex-1 overflow-y-auto">
        {view === 'map' && (
          <div className="h-full">
            <MapPage
              routeId={routeId}
              setRouteId={setRouteId}
              onSelectCampground={selectCamp}
              onSelectAttraction={selectAttr}
            />
          </div>
        )}
        {view === 'routes' && <RoutesPage routeId={routeId} setRouteId={setRouteId} goTo={setView} />}
        {view === 'itinerary' && (
          <ItineraryPage
            routeId={routeId}
            setRouteId={setRouteId}
            onSelectCampground={selectCamp}
            onSelectAttraction={selectAttr}
          />
        )}
        {view === 'campgrounds' && <CampgroundsPage onSelect={selectCamp} />}
        {view === 'attractions' && <AttractionsPage onSelect={selectAttr} />}
        {view === 'tips' && <TipsPage />}
      </main>

      <DetailModal selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}
