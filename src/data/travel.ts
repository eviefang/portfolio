export interface TravelPhoto {
  id: number;
  img: string | null;
  caption: string;
  color: string;
  rotate: number;
  scale: number;
  ratio: number;
}

//   Front row : [1] left   [2] left-mid   [3] CENTER   [4] right-mid   [5] right
//   Back row  :     [6] back-left           [7] back-center         [8] back-right
export const travelPhotos: TravelPhoto[] = [
  { id: 1, img: '/assets/travel/eze.jpg',      caption: 'Èze',      color: '#00A2E8', rotate: -7,  scale: 1.0,  ratio: 0.75 },
  { id: 2, img: '/assets/travel/florence.jpg', caption: 'Florence', color: '#E0221E', rotate: 6,   scale: 1.0,  ratio: 0.73 },
  { id: 3, img: '/assets/travel/england.jpg',  caption: 'England',  color: '#4ECDC4', rotate: -3,  scale: 1.15, ratio: 0.75 },
  { id: 4, img: '/assets/travel/iceland.jpg',  caption: 'Iceland',  color: '#0044BA', rotate: -10, scale: 1.05, ratio: 0.75 },
  { id: 5, img: '/assets/travel/menton.jpg',   caption: 'Menton',   color: '#FF7F27', rotate: 12,  scale: 1.0,  ratio: 0.56 },
  { id: 6, img: '/assets/travel/paris.jpg',    caption: 'Paris',    color: '#AA88EE', rotate: 14,  scale: 0.95, ratio: 0.75 },
  { id: 7, img: '/assets/travel/tuscany.jpg',  caption: 'Tuscany',  color: '#55C16A', rotate: -14, scale: 0.95, ratio: 0.75 },
  { id: 8, img: '/assets/travel/vienna.jpg',   caption: 'Vienna',   color: '#F59E0B', rotate: 5,   scale: 0.9,  ratio: 0.75 },
];
