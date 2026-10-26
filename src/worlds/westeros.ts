import unlabelled from '../../map_images/westeros_unlabelled.jpeg'
import labelled from '../../map_images/westeros_labelled.jpeg'
import type { World } from './types'

export const westeros: World = {
  id: 'westeros',
  name: 'Westeros',
  aliases: [
    'westeros',
    'game of thrones',
    'a song of ice and fire',
    'song of ice and fire',
    'asoiaf',
    'the seven kingdoms',
    'seven kingdoms',
  ],
  maps: { unlabelled, labelled, width: 1376, height: 768 },
  leaguesAcross: 900,
  pins: [
    { id: 'wall', name: 'The Wall', x: 0.52, y: 0.105 },
    { id: 'winterfell', name: 'Winterfell', x: 0.483, y: 0.222 },
    { id: 'pyke', name: 'Pyke', x: 0.378, y: 0.456 },
    { id: 'eyrie', name: 'The Eyrie', x: 0.567, y: 0.455 },
    { id: 'riverrun', name: 'Riverrun', x: 0.474, y: 0.465 },
    { id: 'casterly-rock', name: 'Casterly Rock', x: 0.42, y: 0.56 },
    { id: 'kings-landing', name: "King's Landing", x: 0.556, y: 0.585 },
    { id: 'storms-end', name: "Storm's End", x: 0.605, y: 0.722 },
    { id: 'highgarden', name: 'Highgarden', x: 0.44, y: 0.742 },
    { id: 'oldtown', name: 'Oldtown', x: 0.36, y: 0.8 },
    { id: 'sunspear', name: 'Sunspear', x: 0.638, y: 0.849 },
    { id: 'pentos', name: 'Pentos', x: 0.76, y: 0.46 },
    { id: 'vaes-dothrak', name: 'Vaes Dothrak', x: 0.82, y: 0.61 },
    { id: 'meereen', name: 'Meereen', x: 0.77, y: 0.79 },
  ],
  targetId: 'winterfell',
  worldClues: [
    'I hear whispers of a throne made of swords, and nobody sits on it comfortably.',
    'Seven kingdoms, one iron seat, and a wall of ice that keeps old horrors at bay. Mind the direwolves.',
    'There is a Mother of Dragons, a Hand of the King, and a very long winter that is always coming.',
  ],
  locationClues: [
    'The way out lies in the cold north, far above the Neck.',
    'It is the seat of a great house, set among dark pines in the upper north.',
    'Look just below the Wall for a castle in the woods, with a shield above it.',
  ],
  trivia: [
    {
      id: 'words',
      prompt: 'What are the words of House Stark?',
      options: ['Hear Me Roar', 'Winter Is Coming', 'Ours Is the Fury', 'Fire and Blood'],
      answer: 1,
      hint: 'Think of the season that haunts the North.',
    },
    {
      id: 'sigil',
      prompt: 'Which animal is the sigil of House Stark?',
      options: ['A lion', 'A stag', 'A direwolf', 'A kraken'],
      answer: 2,
      hint: 'It howls in the Wolfswood.',
    },
    {
      id: 'wall',
      prompt: 'What towering barrier guards the realm from the dangers beyond Winterfell?',
      options: ['The Narrow Sea', 'The Wall', 'The Reach', 'The Neck'],
      answer: 1,
      hint: 'It is very tall, very icy and very old.',
    },
    {
      id: 'ned',
      prompt: 'Who is Lord of Winterfell when the tale begins?',
      options: ['Tywin Lannister', 'Robert Baratheon', 'Eddard Stark', 'Jon Snow'],
      answer: 2,
      hint: 'His sword is named Ice.',
    },
  ],
}
