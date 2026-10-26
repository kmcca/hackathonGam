import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import type { Proximity } from '../game/geo'
import type { Pin, World } from '../worlds'
import { ProximityShape } from './icons'

export interface PinResult {
  pin: Pin
  proximity: Proximity
}

interface StoryMapProps {
  world: World
  /** Show the labelled map instead of the plain one. */
  labelled?: boolean
  /** Pins are drawn and tappable only when this is set. */
  pins?: {
    results: PinResult[]
    onTap: (pin: Pin) => void
    /** Pin id that pulses as a last-resort hint. */
    pulseId?: string
    disabled?: boolean
  }
  /** Bumps to replay the reveal animation. */
  revealKey?: string
}

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

const DIRECTION_VECTORS: Record<Direction, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
}

/** Picks the pin nearest to a direction from the current one, or null if nothing lies that way. */
export function neighbourInDirection(pins: Pin[], from: Pin, key: Direction, aspect: number): Pin | null {
  const [vx, vy] = DIRECTION_VECTORS[key]
  let best: Pin | null = null
  let bestScore = Infinity
  for (const pin of pins) {
    if (pin.id === from.id) continue
    const dx = (pin.x - from.x) * aspect
    const dy = pin.y - from.y
    const distance = Math.hypot(dx, dy)
    const along = (dx * vx + dy * vy) / distance
    if (along < 0.5) continue // Outside a 60-degree cone.
    const score = distance * (2 - along)
    if (score < bestScore) {
      bestScore = score
      best = pin
    }
  }
  return best
}

export function StoryMap({ world, labelled, pins, revealKey }: StoryMapProps) {
  const scroller = useRef<HTMLDivElement>(null)
  const aspect = world.maps.width / world.maps.height
  const interactive = Boolean(pins)

  // On narrow screens the map is wider than the viewport. Start in the middle.
  useEffect(() => {
    const el = scroller.current
    if (el && interactive) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [interactive, world.id])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!pins || !(event.key in DIRECTION_VECTORS)) return
    const current = world.pins.find((pin) => pin.id === (event.target as HTMLElement).dataset.pin)
    if (!current) return
    const next = neighbourInDirection(world.pins, current, event.key as Direction, aspect)
    if (!next) return
    event.preventDefault()
    const button = scroller.current?.querySelector<HTMLButtonElement>(`[data-pin="${next.id}"]`)
    button?.focus()
  }

  const resultFor = (id: string) => pins?.results.find((result) => result.pin.id === id)

  return (
    <figure className="map">
      <div className="map__scroll" ref={scroller} tabIndex={-1}>
        <div
          className={['map__canvas', interactive && 'map__canvas--wide', revealKey && 'map__canvas--reveal']
            .filter(Boolean)
            .join(' ')}
          style={{ aspectRatio: `${world.maps.width} / ${world.maps.height}` }}
          key={revealKey}
          onKeyDown={onKeyDown}
        >
          <div className="map__reveal">
            <img
              className="map__image"
              src={world.maps.unlabelled}
              alt={labelled ? '' : 'An unlabelled map of the world you have landed in'}
              width={world.maps.width}
              height={world.maps.height}
              draggable={false}
            />
            <img
              className={labelled ? 'map__image map__image--labelled map__image--on' : 'map__image map__image--labelled'}
              src={world.maps.labelled}
              alt={labelled ? 'The same map, with its places labelled' : ''}
              width={world.maps.width}
              height={world.maps.height}
              draggable={false}
              loading="lazy"
            />
            <div className="map__glow" aria-hidden="true" />
          </div>
          {pins &&
            world.pins.map((pin) => {
              const result = resultFor(pin.id)
              const found = result?.proximity.band === 'found'
              // Only the latest guess is labelled, so long names do not pile up. Others label on hover or focus.
              const latest = pins.results[pins.results.length - 1]?.pin.id === pin.id
              const classes = ['pin']
              if (result) classes.push(`pin--${result.proximity.band}`, 'pin--tried')
              if (pins.pulseId === pin.id) classes.push('pin--pulse')
              return (
                <button
                  key={pin.id}
                  type="button"
                  data-pin={pin.id}
                  className={classes.join(' ')}
                  style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
                  disabled={pins.disabled && !result}
                  aria-disabled={Boolean(result)}
                  aria-label={
                    result
                      ? `${pin.name}, ${result.proximity.label.toLowerCase()}`
                      : pins.pulseId === pin.id
                        ? 'Unexplored place, lit by Mark’s lantern'
                        : 'Unexplored place'
                  }
                  onClick={() => !result && pins.onTap(pin)}
                >
                  <span className="pin__mark">
                    {result ? <ProximityShape band={result.proximity.band} size="1.25rem" /> : <span className="pin__dot" />}
                  </span>
                  {result && (
                    <span className={['pin__label', found && 'pin__label--found', (latest || found) && 'pin__label--show'].filter(Boolean).join(' ')}>
                      {pin.name}
                    </span>
                  )}
                </button>
              )
            })}
        </div>
      </div>
      {interactive && <figcaption className="map__hint">Scroll the map sideways if it does not fit. Arrow keys move between places.</figcaption>}
    </figure>
  )
}
