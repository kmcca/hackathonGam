export interface Matchable {
  name: string
  aliases: string[]
}

/** Lowercases, strips accents and punctuation, and drops a leading "the". */
export function normalize(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/^the\s+/, '')
    .replace(/\s+/g, ' ')
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost)
    }
    previous = current
  }
  return previous[b.length]
}

/** How many typos to forgive: none for short names, where one slip changes the word. */
export function tolerance(length: number): number {
  if (length < 5) return 0
  if (length < 9) return 1
  return 2
}

export function matches(input: string, candidate: Matchable): boolean {
  const query = normalize(input)
  if (!query) return false
  return [candidate.name, ...candidate.aliases].some((name) => {
    const target = normalize(name)
    return levenshtein(query, target) <= tolerance(target.length)
  })
}

/** Returns the first candidate that the input names, or null. */
export function findMatch<T extends Matchable>(input: string, candidates: T[]): T | null {
  return candidates.find((candidate) => matches(input, candidate)) ?? null
}

/**
 * Autocomplete over every candidate, decoys included. Names that start with the
 * query come before names that merely contain it.
 */
export function suggest(input: string, candidates: Matchable[], limit = 6): string[] {
  const query = normalize(input)
  if (!query) return []
  const starts: string[] = []
  const contains: string[] = []
  for (const candidate of candidates) {
    const names = [candidate.name, ...candidate.aliases].map(normalize)
    if (names.some((n) => n.startsWith(query))) starts.push(candidate.name)
    else if (names.some((n) => n.includes(query))) contains.push(candidate.name)
  }
  return [...starts, ...contains].slice(0, limit)
}
