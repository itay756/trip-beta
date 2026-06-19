export type Interest = 'hiking' | 'water' | 'scenic' | 'culture'

export interface Region {
  id: string
  name: string
  nameEn: string
  blurb: string
  interests: Interest[]
}

export type CampType = 'national' | 'provincial' | 'state' | 'private' | 'koa'

export interface Campground {
  id: string
  name: string
  nameEn: string
  lat: number
  lng: number
  regionId: string
  type: CampType
  hookups: boolean
  bigRigFriendly: boolean
  petFriendly: boolean
  phone: string
  website: string
  priceRange: string
  rating: number
  reviewCount: number
  reviews: string[]
  photos: string[]
  verified: boolean
}

export type AttractionCategory = 'hiking' | 'water' | 'scenic' | 'culture' | 'town'

export interface Attraction {
  id: string
  name: string
  nameEn: string
  lat: number
  lng: number
  regionId: string
  category: AttractionCategory
  blurb: string
  rating: number
  reviews: string[]
  photos: string[]
  website?: string
}

export interface RouteStop {
  id: string
  regionId: string
  name: string
  lat: number
  lng: number
  nights: number
  notes: string
}

export interface Route {
  id: string
  name: string
  tagline: string
  summary: string
  distanceKm: number
  weeks: number
  vibe: string
  color: string
  highlights: string[]
  stops: RouteStop[]
}

export interface TipSection {
  id: string
  title: string
  icon: string
  items: string[]
}
