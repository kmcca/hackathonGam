export type Speaker = 'narrator' | 'mark'

export interface Beat {
  speaker: Speaker
  /** {name} is replaced with the player's name. */
  text: string
}

/** The opening of the tale. The name screen comes first, then these beats in order. */
export const INTRO_BEATS: Beat[] = [
  {
    speaker: 'narrator',
    text: 'Once upon a time, in the Veracafe, a hallowed huddle gathered around a stack of bound books. Someone had brought a bottle that glowed a grotesque green.',
  },
  {
    speaker: 'narrator',
    text: '{name} took a sip. The sip was spewed. The beer splashed the books, and the gleaming grimoires gyrated and burst open with a boom.',
  },
  {
    speaker: 'narrator',
    text: 'Fierce fiends and fairy fables flew from the folios. And one page, hungry for a hero, swung wide and swallowed {name} whole.',
  },
  {
    speaker: 'mark',
    text: 'Well. That was not supposed to happen.',
  },
  {
    speaker: 'mark',
    text: 'A creature was meant to be pulled out, {name}, and instead you were pulled in. The page took you in its place.',
  },
  {
    speaker: 'mark',
    text: 'I cannot reach in to fetch you, but I can speak from the edge of the page. And I know how books work: every story hides a key.',
  },
  {
    speaker: 'mark',
    text: 'Find the key, forge it, and the book will let you go. Bring your wits, your creativity and whatever you know of the world you have landed in.',
  },
  {
    speaker: 'mark',
    text: 'First things first: which story are you standing in?',
  },
]

export function fillName(text: string, name: string): string {
  return text.replaceAll('{name}', name)
}
