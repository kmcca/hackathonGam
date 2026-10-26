import type { ReactNode } from 'react'

interface ClueLadderProps {
  /** Heading for the group, for example "Mark's clues". */
  title: string
  clues: string[]
  used: number
  /** Points the next clue costs, or null once none are left. */
  nextCost: number | null
  onAsk: () => void
  disabled?: boolean
  /** Rendered after the last clue, for a final hint such as the labelled map. */
  extra?: ReactNode
}

/** Clues in escalating order. Each has a visible cost before it is taken. */
export function ClueLadder({ title, clues, used, nextCost, onAsk, disabled, extra }: ClueLadderProps) {
  return (
    <section className="clues" aria-labelledby="clues-title">
      <h2 id="clues-title">{title}</h2>
      <ol className="clues__list">
        {clues.map((clue, index) => {
          const taken = index < used
          const next = index === used
          return (
            <li key={index} className={taken ? 'clue clue--taken' : next ? 'clue clue--next' : 'clue clue--locked'}>
              <span className="clue__index">Clue {index + 1}</span>
              {taken && <q className="clue__text">{clue}</q>}
              {next && !disabled && nextCost !== null && (
                <button type="button" className="button button--secondary" onClick={onAsk}>
                  Ask Mark for this clue (−{nextCost} points)
                </button>
              )}
              {!taken && !(next && !disabled) && <span className="clue__locked">Not yet asked</span>}
            </li>
          )
        })}
      </ol>
      {extra}
    </section>
  )
}
