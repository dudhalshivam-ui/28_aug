export interface Chapter {
  number: string;
  title: string;
  songTitle: string;
  artist: string;
  quote: string;
  note: string;
  photoCount: number;
}

export const chapters: Chapter[] = [
  {
    number: '01',
    title: 'The Beginning',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'One of my favorite memories of you.',
    note: 'Where it all started.',
    photoCount: 3,
  },
  {
    number: '02',
    title: 'That Beautiful Smile',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Some moments deserve to be remembered forever.',
    note: 'Your smile changes everything.',
    photoCount: 3,
  },
  {
    number: '03',
    title: 'Adventures Together',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Every place feels magical when you are beside me.',
    note: 'Wherever we go, it becomes a story.',
    photoCount: 3,
  },
  {
    number: '04',
    title: 'Little Pieces of You',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Another little piece of you that I love.',
    note: 'The small things matter most.',
    photoCount: 3,
  },
  {
    number: '05',
    title: 'Our Quiet Moments',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Even in silence, everything feels right.',
    note: 'Calm and warm — just like you.',
    photoCount: 3,
  },
  {
    number: '06',
    title: 'The Way You Laugh',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Your laughter is my favorite sound in the world.',
    note: 'Nothing compares to that laugh.',
    photoCount: 3,
  },
  {
    number: '07',
    title: 'When We Are Together',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Wherever you are feels like home.',
    note: 'Us against the world.',
    photoCount: 3,
  },
  {
    number: '08',
    title: 'All the In-Betweens',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'It is the little moments I will always cherish.',
    note: 'The ordinary becomes extraordinary.',
    photoCount: 3,
  },
  {
    number: '09',
    title: 'The Way You See the World',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'You make everything more beautiful just by being in it.',
    note: 'Through your eyes, everything is brighter.',
    photoCount: 3,
  },
  {
    number: '10',
    title: 'You & Me, Always',
    songTitle: 'Song Title',
    artist: 'Artist Name',
    quote: 'Here is to every chapter ahead of us.',
    note: 'Forever grateful for you.',
    photoCount: 3,
  },
];

export type GalleryCategory = 'all' | 'her' | 'us' | 'favorite' | 'special';

export interface GalleryPhoto {
  id: number;
  category: Exclude<GalleryCategory, 'all'>;
  caption: string;
  size: 'sm' | 'md' | 'lg';
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: 1, category: 'her', caption: 'A moment to remember.', size: 'lg' },
  { id: 2, category: 'us', caption: 'Us.', size: 'md' },
  { id: 3, category: 'favorite', caption: 'A favorite memory.', size: 'sm' },
  { id: 4, category: 'her', caption: '', size: 'md' },
  { id: 5, category: 'us', caption: 'Together.', size: 'lg' },
  { id: 6, category: 'special', caption: 'A special day.', size: 'sm' },
  { id: 7, category: 'favorite', caption: 'Golden hour.', size: 'md' },
  { id: 8, category: 'her', caption: '', size: 'sm' },
  { id: 9, category: 'us', caption: 'My favorite photo.', size: 'md' },
  { id: 10, category: 'special', caption: 'This day was perfect.', size: 'lg' },
  { id: 11, category: 'her', caption: 'Simply you.', size: 'sm' },
  { id: 12, category: 'favorite', caption: '', size: 'md' },
  { id: 13, category: 'us', caption: 'Somewhere beautiful.', size: 'sm' },
  { id: 14, category: 'special', caption: 'A moment I never want to forget.', size: 'md' },
  { id: 15, category: 'her', caption: '', size: 'lg' },
  { id: 16, category: 'us', caption: 'Laughing together.', size: 'sm' },
  { id: 17, category: 'favorite', caption: 'My favorite.', size: 'md' },
  { id: 18, category: 'special', caption: 'Always.', size: 'sm' },
];
