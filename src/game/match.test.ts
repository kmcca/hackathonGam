import { describe, expect, it } from 'vitest'
import { decoys, worlds } from '../worlds'
import { findMatch, levenshtein, matches, normalize, suggest } from './match'

describe('normalize', () => {
  it('ignores case, punctuation, accents and a leading "the"', () => {
    expect(normalize('  The   Lórd of the Rings! ')).toBe('lord of the rings')
    expect(normalize('Middle-earth')).toBe('middle earth')
  })
})

describe('levenshtein', () => {
  it('counts single edits', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3)
    expect(levenshtein('oz', 'oz')).toBe(0)
  })
})

describe('matches', () => {
  const westeros = worlds.find((w) => w.id === 'westeros')!
  const oz = worlds.find((w) => w.id === 'oz')!

  it('accepts the name, aliases and sloppy casing', () => {
    expect(matches('Westeros', westeros)).toBe(true)
    expect(matches('game of thrones', westeros)).toBe(true)
    expect(matches('GAME OF THRONES', westeros)).toBe(true)
    expect(matches('the seven kingdoms', westeros)).toBe(true)
  })

  it('forgives a small typo in longer names', () => {
    expect(matches('Westoros', westeros)).toBe(true)
    expect(matches('wizard of os', oz)).toBe(true)
  })

  it('does not forgive typos in very short names', () => {
    expect(matches('ox', oz)).toBe(false)
  })

  it('rejects other stories and empty input', () => {
    expect(matches('Narnia', westeros)).toBe(false)
    expect(matches('', westeros)).toBe(false)
    expect(matches('   ', westeros)).toBe(false)
  })

  it('never lets one world accept another world\'s name', () => {
    for (const a of worlds) {
      for (const b of worlds) {
        if (a.id !== b.id) {
          expect(findMatch(b.name, [a])).toBeNull()
          for (const alias of b.aliases) expect(findMatch(alias, [a])).toBeNull()
        }
      }
    }
  })

  it('never lets a decoy name win a real world', () => {
    for (const decoy of decoys) {
      expect(findMatch(decoy.name, worlds)).toBeNull()
    }
  })
})

describe('suggest', () => {
  const all = [...worlds, ...decoys]

  it('returns nothing for empty input', () => {
    expect(suggest('', all)).toEqual([])
  })

  it('includes decoys so suggestions never give the answer away', () => {
    expect(suggest('n', all)).toContain('Narnia')
    expect(suggest('n', all).length).toBeGreaterThan(1)
  })

  it('puts prefix matches ahead of looser matches', () => {
    const result = suggest('w', all)
    expect(result[0]).toBe('Westeros')
  })

  it('finds a world through its alias', () => {
    expect(suggest('lord of', all)).toContain('Middle-earth')
  })

  it('respects the limit', () => {
    expect(suggest('e', all, 3).length).toBeLessThanOrEqual(3)
  })
})
