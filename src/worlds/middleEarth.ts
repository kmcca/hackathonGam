import unlabelled from '../../map_images/middleEarth_unlabelled.jpeg'
import labelled from '../../map_images/middleEarth_labelled.jpeg'
import type { World } from './types'

export const middleEarth: World = {
  id: 'middleEarth',
  name: 'Middle-earth',
  aliases: [
    'middle-earth',
    'middle earth',
    'middleearth',
    'lord of the rings',
    'the lord of the rings',
    'lotr',
    'the hobbit',
    'tolkien',
  ],
  maps: { unlabelled, labelled, width: 1408, height: 768 },
  leaguesAcross: 800,
  pins: [
    { id: 'grey-havens', name: 'The Grey Havens', x: 0.165, y: 0.27 },
    { id: 'hobbiton', name: 'Hobbiton', x: 0.24, y: 0.37 },
    { id: 'bree', name: 'Bree', x: 0.345, y: 0.29 },
    { id: 'rivendell', name: 'Rivendell', x: 0.477, y: 0.27 },
    { id: 'moria', name: 'Moria', x: 0.5, y: 0.38 },
    { id: 'fangorn', name: 'Fangorn Forest', x: 0.525, y: 0.5 },
    { id: 'edoras', name: 'Edoras', x: 0.45, y: 0.6 },
    { id: 'minas-tirith', name: 'Minas Tirith', x: 0.535, y: 0.66 },
    { id: 'lothlorien', name: 'Lothlórien', x: 0.625, y: 0.31 },
    { id: 'erebor', name: 'Erebor', x: 0.78, y: 0.2 },
    { id: 'mount-doom', name: 'Mount Doom', x: 0.69, y: 0.615 },
    { id: 'barad-dur', name: 'Barad-dûr', x: 0.849, y: 0.64 },
    { id: 'osgiliath', name: 'Osgiliath', x: 0.645, y: 0.78 },
    { id: 'sea-of-rhun', name: 'Sea of Rhûn', x: 0.865, y: 0.43 },
  ],
  targetId: 'mount-doom',
  worldClues: [
    'A ring of power, a company of nine, and a very small hero with large, hairy feet.',
    'A wizard in grey, a dark tower topped with an eye, and a long walk to a mountain of fire.',
    'Frodo, Gandalf and Aragorn all walk these lands, where the One Ring was forged.',
  ],
  locationClues: [
    'The way out lies in the far east, where the sky is stained with ash.',
    'It is a smoking mountain in the darkest land, west of the Dark Tower.',
    'Look for the volcano in the east, with the black tower to its right.',
  ],
  trivia: [
    {
      id: 'destroy',
      prompt: 'What must be destroyed in the fires of Mount Doom?',
      options: ['The Arkenstone', 'The Palantír', 'The One Ring', 'A Silmaril'],
      answer: 2,
      hint: 'One to rule them all.',
    },
    {
      id: 'bearer',
      prompt: 'Who carries the Ring all the way to Mount Doom?',
      options: ['Bilbo Baggins', 'Frodo Baggins', 'Gimli', 'Boromir'],
      answer: 1,
      hint: 'A hobbit from the Shire, helped by his loyal gardener Sam.',
    },
    {
      id: 'land',
      prompt: 'Which dark land surrounds Mount Doom?',
      options: ['Rohan', 'Gondor', 'Mordor', 'The Shire'],
      answer: 2,
      hint: 'One does not simply walk into it.',
    },
    {
      id: 'forger',
      prompt: 'Which Dark Lord forged the One Ring?',
      options: ['Saruman', 'Sauron', 'Smaug', 'Gollum'],
      answer: 1,
      hint: 'He watches from a tower as a great burning eye.',
    },
  ],
}
