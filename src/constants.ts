import { ArtworkData } from './types';

// Import local images using URL constructor for Vite compatibility
const picassoFemmes = new URL('./asset/Picasso-Femmes-Algers-930x775.webp', import.meta.url).href;
const giacomettiBronze = new URL('./asset/Giacometti-bronze.webp', import.meta.url).href;
const klimtPortrait = new URL('./asset/an-art-handler-stands-in-front-of-bildnis-elisabeth-lederer-news-photo-1763599300.avif', import.meta.url).href;

export const MUSEUM_CONFIG = {
  WALL_HEIGHT: 10, // Further increased height for a grander, more spacious museum feel
  WALL_COLOR: '#fafaf9',
  FLOOR_COLOR: '#f1f5f9',
  CEILING_COLOR: '#ffffff'
};

export const ARTWORKS: ArtworkData[] = [
  {
    id: 'art-1-vermeer-pearl',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: '1665',
    description: 'A captivating portrait of a young woman with an enigmatic gaze, wearing a luminous pearl earring against a dark background. This masterpiece exemplifies Vermeer\'s mastery of light and shadow, characteristic of Dutch Golden Age portraiture.',
    url: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?q=80&w=1000&auto=format&fit=crop',
    position: [0, 2.5, -9.5],
    rotation: [0, 0, 0]
  },
  {
    id: 'art-2-rembrandt-lacemaker',
    title: 'The Lace Maker',
    artist: 'Johannes Vermeer',
    year: '1669',
    description: 'A delicate study of domestic life and light, showcasing a woman intently focused on her lacework. This painting exemplifies the quiet intimacy and masterful use of natural light that defines Vermeer\'s legacy.',
    url: 'https://images.unsplash.com/photo-1578321272176-b7bac0429b5a?q=80&w=1000&auto=format&fit=crop',
    position: [-9.5, 2.5, 5],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-3-rembrandt-young-woman',
    title: 'A Young Woman at Her Toilet',
    artist: 'Rembrandt',
    year: '1667',
    description: 'An intimate domestic scene bathed in golden baroque light. Rembrandt\'s masterful handling of chiaroscuro transforms a simple moment of preparation into a meditation on beauty and transience.',
    url: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?q=80&w=1000&auto=format&fit=crop',
    position: [9.8, 2.5, 10],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'art-4-van-gogh-self',
    title: 'Self-Portrait with Grey Hat',
    artist: 'Vincent van Gogh',
    year: '1887',
    description: 'Van Gogh\'s penetrating self-examination rendered in bold brushstrokes and vivid colors. This portrait captures both the technical mastery and emotional intensity that defined the Post-Impressionist movement.',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
    position: [9.8, 2.5, 30],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'art-5-night-watch',
    title: 'The Night Watch',
    artist: 'Rembrandt',
    year: '1642',
    description: 'A monumental baroque masterpiece depicting a militia company in dramatic action. Rembrandt\'s revolutionary use of chiaroscuro creates an atmosphere of mystery and grandeur, transforming a simple group portrait into an epic narrative.',
    url: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?q=80&w=1400&auto=format&fit=crop',
    position: [0, 2.5, 39.5],
    rotation: [0, Math.PI, 0]
  },
  {
    id: 'art-6-rubens-graces',
    title: 'The Three Graces',
    artist: 'Peter Paul Rubens',
    year: '1635',
    description: 'A baroque celebration of feminine beauty and grace, rendered with Rubens\' signature voluptuous figures and luminous skin tones. This mythological composition exemplifies the opulence and sensuality of Counter-Reformation art.',
    url: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?q=80&w=1000&auto=format&fit=crop',
    position: [-9.5, 2.5, 50],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-7-nightscape-dix',
    title: 'Nightscape with Prostitutes',
    artist: 'Otto Dix',
    year: '1927',
    description: 'A striking Expressionist urban scene capturing the nightlife and social underbelly of Weimar Germany. Dix\'s sharp lines and acid colors reflect both technical precision and emotional intensity.',
    url: 'https://images.unsplash.com/photo-1578926078328-123456789?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3',
    position: [9.8, 2.5, 50],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'art-8-ancient-sculpture',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: '1485',
    description: 'A Renaissance masterpiece depicting the goddess Venus emerging from the sea on a shell. This iconic composition celebrates beauty and classical mythology with ethereal grace and flowing lines.',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop',
    position: [0, 2.5, 59.5],
    rotation: [0, Math.PI, 0]
  },
  {
    id: 'art-9-scholar',
    title: 'A Scholar in His Study',
    artist: 'Rembrandt',
    year: '1634',
    description: 'A contemplative baroque interior featuring a learned man surrounded by books and scientific instruments. Rembrandt\'s warm golden light imbues the scene with intellectual gravitas and peaceful solitude.',
    url: 'https://images.unsplash.com/photo-1549887534-7d845b1dcb5c?q=80&w=1000&auto=format&fit=crop',
    position: [-9.5, 2.5, 70],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-10-caravaggio',
    title: 'The Calling of Saint Matthew',
    artist: 'Caravaggio',
    year: '1599-1600',
    description: 'A baroque masterpiece featuring dramatic chiaroscuro lighting as Christ calls Matthew to discipleship. Caravaggio\'s revolutionary use of light and shadow creates an atmosphere of divine intervention in an ordinary tavern setting.',
    url: 'https://images.unsplash.com/photo-1578321272176-b7bac0429b5a?q=80&w=1000&auto=format&fit=crop',
    position: [9.8, 2.5, 70],
    rotation: [0, -Math.PI / 2, 0]
  }
];