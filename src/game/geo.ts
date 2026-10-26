export interface Point {
  x: number
  y: number
}

export type Compass = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

export interface Bearing {
  compass: Compass
  /** Clockwise from north, snapped to a multiple of 45. */
  degrees: number
  /** Spoken form, for example "north-east". */
  label: string
}

export type ProximityBand = 'found' | 'veryClose' | 'close' | 'far' | 'veryFar'

export interface Proximity {
  band: ProximityBand
  label: string
  /** 0-4 filled pips, so closeness never depends on colour alone. */
  pips: number
}

const COMPASS: { compass: Compass; label: string }[] = [
  { compass: 'N', label: 'north' },
  { compass: 'NE', label: 'north-east' },
  { compass: 'E', label: 'east' },
  { compass: 'SE', label: 'south-east' },
  { compass: 'S', label: 'south' },
  { compass: 'SW', label: 'south-west' },
  { compass: 'W', label: 'west' },
  { compass: 'NW', label: 'north-west' },
]

/**
 * Distance between two map points in leagues.
 * Pins use fractions of width and height, so the vertical offset is rescaled by
 * the image aspect ratio (width / height) to keep distances isotropic.
 */
export function distanceInLeagues(a: Point, b: Point, aspect: number, leaguesAcross: number): number {
  const dx = b.x - a.x
  const dy = (b.y - a.y) / aspect
  return Math.round(Math.hypot(dx, dy) * leaguesAcross)
}

/** Eight-way compass bearing from one point to another. North is up the map. */
export function bearing(from: Point, to: Point, aspect: number): Bearing {
  const dx = (to.x - from.x) * aspect
  const dy = to.y - from.y
  const radians = Math.atan2(dx, -dy)
  const degrees = (radians * 180) / Math.PI
  const index = Math.round(((degrees % 360) + 360) % 360 / 45) % 8
  const entry = COMPASS[index]
  return { compass: entry.compass, degrees: index * 45, label: entry.label }
}

/** Buckets a distance, as a share of the map width, into a named band. */
export function proximity(leagues: number, leaguesAcross: number): Proximity {
  if (leagues <= 0) return { band: 'found', label: 'You found it', pips: 5 }
  const share = leagues / leaguesAcross
  if (share < 0.08) return { band: 'veryClose', label: 'Very close', pips: 4 }
  if (share < 0.2) return { band: 'close', label: 'Close', pips: 3 }
  if (share < 0.38) return { band: 'far', label: 'Far', pips: 2 }
  return { band: 'veryFar', label: 'Very far', pips: 1 }
}
