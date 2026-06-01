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
    id: 'eth-1-abebe-bikila',
    title: 'Abebe Bikila',
    artist: 'Photography',
    year: '1960',
    description: 'The legendary Ethiopian marathon runner who won the 1960 Rome Olympics marathon barefoot. He was the first sub-Saharan African to win an Olympic gold medal and remains a global icon of endurance.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Abebe_Bikila_1960.jpg',
    position: [0, 2.5, -9.5],
    rotation: [0, 0, 0]
  },
  {
    id: 'eth-2-tewodros-ii',
    title: 'Emperor Tewodros II',
    artist: 'Historical Illustration',
    year: 'r. 1855-1868',
    description: 'A visionary unifier of Ethiopia who sought to modernize the country and defend its sovereignty. His reign marked a crucial turning point in Ethiopian history as he worked to centralize authority and resist colonial pressure.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Emperor_Tewodros_II.jpg',
    position: [-9.5, 2.5, 5],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'eth-3-menelik-ii',
    title: 'Emperor Menelik II',
    artist: 'Historical Photograph',
    year: 'r. 1889-1913',
    description: 'The founder of modern Ethiopia, known for his decisive victory at the Battle of Adwa in 1896. This victory preserved Ethiopian independence during the "Scramble for Africa" and made him a symbol of anti-colonial resistance.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Menelik_II_of_Ethiopia.jpg',
    position: [9.8, 2.5, 10],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'eth-4-taytu-betul',
    title: 'Empress Taytu Betul',
    artist: 'Historical Photograph',
    year: 'c. 1900',
    description: 'A brilliant diplomat and military strategist who played a crucial role in the Battle of Adwa. As the wife of Menelik II, she was a powerful leader in her own right, often overseeing governance and defense strategy.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Empress_Taytu_Betul.jpg',
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
  },
  {
    id: 'art-11-klimt-kiss',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    year: '1907-1908',
    description: 'A masterpiece of the Early Modern period, depicting a couple embraced in a field of flowers. Klimt\'s use of gold leaf and intricate patterns creates a sense of luxury and eternal romance.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Klimt_-_The_Kiss.jpg',
    position: [-9.5, 2.5, 10],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-12-hokusai-wave',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: '1831',
    description: 'One of the most recognizable works of Japanese art, this woodblock print depicts a towering wave threatening boats near Mount Fuji. It represents the power of nature and the resilience of humanity.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg',
    position: [-9.5, 2.5, 30],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-13-wood-gothic',
    title: 'American Gothic',
    artist: 'Grant Wood',
    year: '1930',
    description: 'An iconic depiction of 20th-century rural America, featuring a farmer and his daughter standing before a Gothic Revival house. It has become a symbol of the American pioneer spirit and stoic endurance.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
    position: [-9.5, 2.5, 40],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-14-van-gogh-cafe',
    title: 'Cafe Terrace at Night',
    artist: 'Vincent van Gogh',
    year: '1888',
    description: 'A vibrant nocturnal scene of a café in Arles. Van Gogh\'s use of contrasting colors and swirling stars creates a warm, inviting atmosphere under the southern French sky.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Vincent_van_Gogh_-_Cafe_Terrace_at_Night_%281888%29.jpg',
    position: [9.8, 2.5, 40],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'art-15-friedrich-wanderer',
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    year: '1818',
    description: 'A cornerstone of Romanticism, depicting a man standing on a rocky precipice overlooking a misty landscape. It encapsulates the sublime power of nature and the individual\'s place within it.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
    position: [0, 2.5, 49.5],
    rotation: [0, 0, 0]
  },
  {
    id: 'art-16-whistler-mother',
    title: "Whistler's Mother",
    artist: 'James Abbott McNeill Whistler',
    year: '1871',
    description: 'Formally titled "Arrangement in Grey and Black No. 1," this portrait is an exercise in tonal harmony and composition, becoming one of the most famous American works outside of the United States.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Whistlers_Mother.jpg',
    position: [-9.5, 2.5, 60],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-17-delacroix-liberty',
    title: 'Liberty Leading the People',
    artist: 'Eugène Delacroix',
    year: '1830',
    description: 'A monumental work commemorating the July Revolution of 1830. Liberty is personified as a woman leading the people over the barricades, symbolizing the spirit of freedom and defiance.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
    position: [9.8, 2.5, 60],
    rotation: [0, -Math.PI / 2, 0]
  },
  {
    id: 'art-18-michelangelo-adam',
    title: 'The Creation of Adam',
    artist: 'Michelangelo',
    year: '1512',
    description: 'A world-famous fresco from the Sistine Chapel ceiling, depicting the biblical narrative of God breathing life into Adam. The near-touching fingers are one of the most iconic images in art history.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    position: [0, 2.5, 69.5],
    rotation: [0, 0, 0]
  },
  {
    id: 'art-19-velazquez-meninas',
    title: 'Las Meninas',
    artist: 'Diego Velázquez',
    year: '1656',
    description: 'A complex and enigmatic composition that raises questions about reality and illusion. It depicts the Spanish Infanta Margaret Theresa surrounded by her entourage in the Royal Alcázar of Madrid.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
    position: [-9.5, 2.5, 20],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    id: 'art-20-millais-ophelia',
    title: 'Ophelia',
    artist: 'John Everett Millais',
    year: '1851-1852',
    description: 'A Pre-Raphaelite masterpiece depicting the death of Ophelia from Shakespeare\'s Hamlet. Millais used meticulous detail to capture the natural beauty and tragic pathos of the scene.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg',
    position: [9.8, 2.5, 20],
    rotation: [0, -Math.PI / 2, 0]
  }
];