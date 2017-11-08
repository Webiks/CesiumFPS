import { CharacterData } from '../../types';

export const PLAYER_CHARACTERS: CharacterData[] = [
  {
    name: 'Wolverine',
    scale: 0.009,
    model: '/assets/models/v2/wolverine/scene.gltf',
    description: 'Blue Team',
    team: 'BLUE',
    imageUrl: '/assets/characters/wolverine.png',
    portraitUrl: '/assets/characters/wolverine_portrait.png',
    iconUrl: '/assets/icons/captain-america-mark.png',
    iconDeadUrl: '/assets/icons/captain-america-dead-mark.png',
  },
  {
    name: 'Anthony Stark',
    scale: 1.0,
    model: '/assets/models/ironman.gltf',
    description: 'Blue Team',
    team: 'BLUE',
    imageUrl: '/assets/characters/ironman.png',
    portraitUrl: '/assets/characters/ironman_portrait.png',
    iconUrl: '/assets/icons/ironman-mark.png',
    iconDeadUrl: '/assets/icons/ironman-dead-mark.png',
  },
  {
    name: 'The Flash',
    scale: 0.9,
    model: '/assets/models/v2/the-flash/scene.gltf',
    description: 'Red Team',
    team: 'RED',
    imageUrl: '/assets/characters/flash.png',
    portraitUrl: '/assets/characters/flash_portrait.png',
    iconUrl: '/assets/icons/spiderman-mark.png',
    iconDeadUrl: '/assets/icons/spiderman-dead-mark.png',
  },
  {
    name: 'Bruce Wayne',
    scale: 1.00,
    model: '/assets/models/v2/batman/scene.gltf',
    description: 'Red Team',
    team: 'RED',
    imageUrl: '/assets/characters/batman.png',
    portraitUrl: '/assets/characters/batman_portrait.png',
    iconUrl: '/assets/icons/batman-mark.png',
    iconDeadUrl: '/assets/icons/batman-dead-mark.png',
  },
  {
    name: 'car',
    model: '/assets/models/car.gltf',
    scale: 1,
    description: null,
    team: null,
    imageUrl: null,
    portraitUrl: null,
    iconUrl: '/assets/icons/car-mark.png',
    iconDeadUrl: '/assets/icons/car-dead-mark.png',
  },
  {
    name: 'grandpa',
    model: '/assets/models/grandpa.gltf',
    scale: 0.035,
    description: null,
    team: null,
    imageUrl: null,
    portraitUrl: null,
    iconUrl: '/assets/icons/grandmother-mark.png',
    iconDeadUrl: '/assets/icons/grandmother-dead-mark.png',
  },
];