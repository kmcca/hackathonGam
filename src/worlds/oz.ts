import unlabelled from '../../map_images/oz_unlabelled.jpg'
import labelled from '../../map_images/oz_labelled.jpg'
import type { World } from './types'

export const oz: World = {
  id: 'oz',
  name: 'Oz',
  aliases: [
    'oz',
    'the land of oz',
    'land of oz',
    'the wizard of oz',
    'wizard of oz',
    'the wonderful wizard of oz',
  ],
  maps: { unlabelled, labelled, width: 1408, height: 768 },
  leaguesAcross: 300,
  pins: [
    { id: 'emerald-city', name: 'Emerald City', x: 0.497, y: 0.46 },
    { id: 'west-witch-castle', name: "Wicked Witch of the West's Castle", x: 0.206, y: 0.47 },
    { id: 'east-witch-house', name: "Wicked Witch of the East's House", x: 0.81, y: 0.46 },
    { id: 'poppy-field', name: 'The Deadly Poppy Field', x: 0.62, y: 0.265 },
    { id: 'yellow-brick-road', name: 'The Yellow Brick Road', x: 0.73, y: 0.5 },
    { id: 'gillikin-village', name: 'Gillikin Village', x: 0.505, y: 0.27 },
    { id: 'gillikin-hills', name: 'Gillikin Hills', x: 0.433, y: 0.316 },
    { id: 'munchkinland', name: 'Munchkinland', x: 0.625, y: 0.43 },
    { id: 'winkie-country', name: 'Winkie Country', x: 0.284, y: 0.57 },
    { id: 'quadling-country', name: 'Quadling Country', x: 0.49, y: 0.8 },
    { id: 'glinda', name: "Glinda's Palace", x: 0.52, y: 0.63 },
    { id: 'sandy-desert', name: 'The Great Sandy Desert', x: 0.17, y: 0.8 },
  ],
  targetId: 'emerald-city',
  worldClues: [
    'A girl, her little dog, and a house that fell from the sky in a great storm.',
    'A scarecrow, a tin woodman and a cowardly lion all walk a road paved in gold.',
    'Follow the yellow brick road to see the Wizard. There is no place like home.',
  ],
  locationClues: [
    'The way out lies in the very heart of the land, where all four countries meet.',
    'Every road leads there, and you will know it by its green shine.',
    'Look for the green castle in the middle of the map, with a ribbon beneath it.',
  ],
  trivia: [
    {
      id: 'road',
      prompt: 'What is the road to the Emerald City paved with?',
      options: ['Silver cobbles', 'Yellow bricks', 'Emerald tiles', 'Red sand'],
      answer: 1,
      hint: 'You follow it, follow it, follow it.',
    },
    {
      id: 'ruler',
      prompt: 'Who rules the Emerald City from behind a curtain?',
      options: ['Glinda', 'The Wicked Witch of the West', 'The Wizard', 'The Mayor of Munchkinland'],
      answer: 2,
      hint: 'Pay no attention to the man behind the curtain.',
    },
    {
      id: 'scarecrow',
      prompt: 'What does the Scarecrow hope the Wizard will give him?',
      options: ['A heart', 'Courage', 'A ride home', 'A brain'],
      answer: 3,
      hint: 'He has straw where it ought to be.',
    },
    {
      id: 'arrival',
      prompt: 'How did Dorothy travel to Oz?',
      options: ['A hot air balloon', 'A tornado', 'A rainbow', 'A magic carpet'],
      answer: 1,
      hint: 'A great grey wind came out of Kansas.',
    },
  ],
}
