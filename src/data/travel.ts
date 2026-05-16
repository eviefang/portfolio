import iceland from '../../assets/travel/iceland.jpg';
import menton from '../../assets/travel/menton.jpg';
import florence from '../../assets/travel/florence.jpg';
import england from '../../assets/travel/england.jpg';
import vienna from '../../assets/travel/vienna.jpg';

export interface TravelPhoto {
  id: number;
  img: string | null;
  caption: string;
  color: string;
  rotate: number;
  scale: number;
  /** width / height of the source image */
  ratio: number;
}

// Hero floating cards — 8 slots. Real photos fill first, placeholders show subtle outline.
// Ratios match real image dimensions so each card preserves its natural shape.
export const travelPhotos: TravelPhoto[] = [
  { id: 1, img: iceland,  caption: 'Iceland',     color: '#00A2E8', rotate: -3,  scale: 1.15, ratio: 0.75 },
  { id: 2, img: menton,   caption: 'Menton',      color: '#FF7F27', rotate: 6,   scale: 1.0,  ratio: 0.56 },
  { id: 3, img: florence, caption: 'Florence',    color: '#E0221E', rotate: -10, scale: 1.05, ratio: 0.73 },
  { id: 4, img: england,  caption: 'England',     color: '#4ECDC4', rotate: 12,  scale: 1.0,  ratio: 0.75 },
  { id: 5, img: vienna,   caption: 'Vienna',      color: '#AA88EE', rotate: -7,  scale: 1.0,  ratio: 0.75 },
  // Placeholders — drop a file in assets/travel/ and add it here when ready
  { id: 6, img: null, caption: 'Coming Soon', color: '#0044BA', rotate: 14,  scale: 0.9,  ratio: 0.75 },
  { id: 7, img: null, caption: 'Coming Soon', color: '#F59E0B', rotate: -14, scale: 0.9,  ratio: 0.75 },
  { id: 8, img: null, caption: 'Coming Soon', color: '#000000', rotate: 5,   scale: 0.85, ratio: 0.75 },
];
