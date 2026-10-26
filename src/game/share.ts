import { getWorld } from '../worlds'
import { MAX_SCORE, rankTitle } from './scoring'
import type { GameState, Scores } from './state'

export function buildShareText(state: GameState, scores: Scores): string {
  const world = getWorld(state.worldId)
  return [
    '📖 Page Break · Hackathon 28',
    `${state.playerName} escaped ${world.name} and earned the rank of ${rankTitle(scores.total)}.`,
    `Which story: ${scores.world}. Where: ${scores.location}. The key: ${scores.trivia}.`,
    `Total: ${scores.total} of ${MAX_SCORE}.`,
  ].join('\n')
}

/** Copies text with the Clipboard API, falling back to a hidden textarea. Resolves true on success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to the textarea route, which works without clipboard permission.
  }
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}
