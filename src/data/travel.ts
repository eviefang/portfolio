import eze from '../../assets/travel/eze.jpg';
import florence from '../../assets/travel/florence.jpg';
import england from '../../assets/travel/england.jpg';
import iceland from '../../assets/travel/iceland.jpg';
import menton from '../../assets/travel/menton.jpg';
import paris from '../../assets/travel/paris.jpg';
import tuscany from '../../assets/travel/tuscany.jpg';
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

// Hero floating cards. Slots are arranged in visual order, front row first
// (left → right), then back row (left → right). To move a photo to a
// different slot, just swap its position in this array.
//
//   Front row : [1] left   [2] left-mid   [3] CENTER   [4] right-mid   [5] right
//   Back row  :     [6] back-left           [7] back-center         [8] back-right
//
export const travelPhotos: TravelPhoto[] = [
  // 1 — front, far left
  { id: 1, img: eze,      caption: 'Èze',      color: '#00A2E8', rotate: -7,  scale: 1.0,  ratio: 0.75 },
  // 2 — front, left-mid
  { id: 2, img: florence, caption: 'Florence', color: '#E0221E', rotate: 6,   scale: 1.0,  ratio: 0.73 },
  // 3 — front, CENTER (main visual anchor)
  { id: 3, img: england,  caption: 'England',  color: '#4ECDC4', rotate: -3,  scale: 1.15, ratio: 0.75 },
  // 4 — front, right-mid
  { id: 4, img: iceland,  caption: 'Iceland',  color: '#0044BA', rotate: -10, scale: 1.05, ratio: 0.75 },
  // 5 — front, far right
  { id: 5, img: menton,   caption: 'Menton',   color: '#FF7F27', rotate: 12,  scale: 1.0,  ratio: 0.56 },
  // 6 — back, far left
  { id: 6, img: paris,    caption: 'Paris',    color: '#AA88EE', rotate: 14,  scale: 0.95, ratio: 0.75 },
  // 7 — back, center
  { id: 7, img: tuscany,  caption: 'Tuscany',  color: '#55C16A', rotate: -14, scale: 0.95, ratio: 0.75 },
  // 8 — back, far right
  { id: 8, img: vienna,   caption: 'Vienna',   color: '#F59E0B', rotate: 5,   scale: 0.9,  ratio: 0.75 },
];
