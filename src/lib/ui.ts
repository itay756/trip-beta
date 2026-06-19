import type { AttractionCategory, CampType, Interest } from './types'

export const interestLabels: Record<Interest, string> = {
  hiking: 'הליכות וטבע',
  water: 'אגמים ומים',
  scenic: 'נופים ודרכי נוף',
  culture: 'עיירות, אוכל ותרבות',
}

export const categoryLabels: Record<AttractionCategory, string> = {
  hiking: 'הליכה וטבע',
  water: 'מים',
  scenic: 'נוף',
  culture: 'תרבות',
  town: 'עיירה ואוכל',
}

export const categoryEmoji: Record<AttractionCategory, string> = {
  hiking: '🥾',
  water: '💧',
  scenic: '🏔️',
  culture: '🎭',
  town: '🍽️',
}

export const categoryColor: Record<AttractionCategory, string> = {
  hiking: '#2d6e37',
  water: '#1d6fb8',
  scenic: '#8a5a2d',
  culture: '#7c3aed',
  town: '#c8893a',
}

export const campTypeLabels: Record<CampType, string> = {
  national: 'פארק לאומי',
  provincial: 'פארק מחוזי',
  state: 'פארק מדינה',
  private: 'מתחם פרטי',
  koa: 'KOA',
}

export const campTypeColor: Record<CampType, string> = {
  national: '#2d6e37',
  provincial: '#1d6fb8',
  state: '#3d8a47',
  private: '#c8893a',
  koa: '#d4763a',
}

// תחליף תמונה דטרמיניסטי ויפה כשאין/נכשלת תמונה אמיתית
const gradients = [
  ['#2d6e37', '#8fc795'],
  ['#1d6fb8', '#7fc4e8'],
  ['#8a5a2d', '#d6bb86'],
  ['#3d6b8a', '#9ec9d6'],
  ['#4a7a3d', '#bcd99a'],
  ['#7c3aed', '#c4a8f0'],
]

export function gradientFor(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const [a, b] = gradients[h % gradients.length]
  return `linear-gradient(135deg, ${a}, ${b})`
}

export function stars(rating: number): string {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
