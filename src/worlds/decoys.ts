/**
 * Stories that are not playable worlds. They appear in the autocomplete so the
 * suggestions never give away the answer.
 */
export interface Decoy {
  name: string
  aliases: string[]
}

export const decoys: Decoy[] = [
  { name: 'Narnia', aliases: ['the chronicles of narnia'] },
  { name: 'Wonderland', aliases: ['alice in wonderland'] },
  { name: 'Neverland', aliases: ['never land', 'peter pan'] },
  { name: 'Earthsea', aliases: ['a wizard of earthsea'] },
  { name: 'Discworld', aliases: ['disc world'] },
  { name: 'Hogwarts', aliases: ['harry potter', 'the wizarding world'] },
  { name: 'Camelot', aliases: ['king arthur'] },
  { name: 'Fantasia', aliases: ['the neverending story'] },
  { name: 'Prydain', aliases: ['the chronicles of prydain'] },
  { name: 'Lilliput', aliases: ['gullivers travels'] },
  { name: 'The Hundred Acre Wood', aliases: ['winnie the pooh'] },
  { name: 'Terabithia', aliases: ['bridge to terabithia'] },
]
