import { useState } from 'react'
import { MAX_SCORE, rankTitle } from '../game/scoring'
import { buildShareText, copyText } from '../game/share'
import type { GameState, Scores } from '../game/state'
import { getWorld } from '../worlds'
import { ActionBar } from './Layout'

interface ResultCardProps {
  state: GameState
  scores: Scores
  onReplay: () => void
}

/** The last page of the book, now carrying the player's name. */
export function ResultCard({ state, scores, onReplay }: ResultCardProps) {
  const world = getWorld(state.worldId)
  const [copied, setCopied] = useState<'idle' | 'ok' | 'failed'>('idle')
  const shareText = buildShareText(state, scores)

  const share = async () => setCopied((await copyText(shareText)) ? 'ok' : 'failed')

  return (
    <article className="page result" aria-labelledby="result-title">
      <p className="result__intro">And so the last page was written:</p>
      <h2 id="result-title" className="result__name">
        {state.playerName}
      </h2>
      <p className="result__story">
        turned the key, stepped out of {world.name}, and found their own name waiting at the end of the tale.
      </p>
      <p className="result__rank">
        <span className="result__rank-label">Rank</span> {rankTitle(scores.total)}
      </p>
      <table className="result__scores">
        <caption className="visually-hidden">Score for each page of the tale</caption>
        <tbody>
          <tr>
            <th scope="row">Which story</th>
            <td>{scores.world}</td>
          </tr>
          <tr>
            <th scope="row">Where the way out lay</th>
            <td>{scores.location}</td>
          </tr>
          <tr>
            <th scope="row">Forging the key</th>
            <td>{scores.trivia}</td>
          </tr>
          <tr className="result__total">
            <th scope="row">Total</th>
            <td>
              {scores.total} of {MAX_SCORE}
            </td>
          </tr>
        </tbody>
      </table>
      <ActionBar
        secondary={
          <button type="button" className="button button--secondary" onClick={share}>
            Copy my result
          </button>
        }
        primary={
          <button type="button" className="button button--primary" onClick={onReplay}>
            Read another tale
          </button>
        }
      />
      <p className="result__copied" role="status">
        {copied === 'ok' && 'Copied. Paste it wherever you share your tales.'}
        {copied === 'failed' && 'Your browser blocked copying. Select the text below and copy it yourself.'}
      </p>
      {copied === 'failed' && (
        <textarea className="result__fallback" readOnly rows={5} value={shareText} onFocus={(event) => event.target.select()} />
      )}
    </article>
  )
}
