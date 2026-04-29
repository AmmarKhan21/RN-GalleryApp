const seedImages = [
  {
    id: '1',
    title: 'Golden Hour in the Alps',
    author: 'Elena Voronova',
    description:
      'A breathtaking panoramic view captured at golden hour in the Swiss Alps. The warm amber light cascades over snow-capped peaks, painting the sky in shades of orange and pink while the valley below rests in a peaceful twilight.',
    imageUrl: 'https://picsum.photos/seed/alps/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/alps/400/300',
    likes: 847,
  },
  {
    id: '2',
    title: 'Midnight in Tokyo',
    author: 'Kenji Watanabe',
    description:
      'The neon-lit streets of Shinjuku come alive after midnight. Layers of kanji signs and LED billboards create an electric tapestry of colour and energy, capturing the relentless pulse of one of the world\'s most vibrant cities.',
    imageUrl: 'https://picsum.photos/seed/tokyo/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/tokyo/400/300',
    likes: 1203,
  },
  {
    id: '3',
    title: 'Sahara at Dawn',
    author: 'Amara Diallo',
    description:
      'The first light of dawn transforms the Sahara into a canvas of shifting reds and purples. Endless dunes cast long dramatic shadows while silence reigns over the largest hot desert on Earth.',
    imageUrl: 'https://picsum.photos/seed/sahara/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/sahara/400/300',
    likes: 632,
  },
  {
    id: '4',
    title: 'Amazon Rainforest Canopy',
    author: 'Lucas Ferreira',
    description:
      'Shot from a canopy walkway deep in the Amazon basin, this image reveals an unbroken sea of green stretching to the horizon. Shafts of sunlight pierce the foliage, illuminating a world teeming with hidden life.',
    imageUrl: 'https://picsum.photos/seed/amazon/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/amazon/400/300',
    likes: 978,
  },
  {
    id: '5',
    title: 'Northern Lights, Iceland',
    author: 'Sigrid Björnsson',
    description:
      'Vivid curtains of green and violet aurora borealis dance over a frozen Icelandic lake, perfectly mirrored in the glassy surface below. A rare double-display that took three nights of waiting in sub-zero temperatures to capture.',
    imageUrl: 'https://picsum.photos/seed/aurora/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/aurora/400/300',
    likes: 2154,
  },
  {
    id: '6',
    title: 'Venice at High Tide',
    author: 'Marco Rossi',
    description:
      'Acqua alta transforms the Piazza San Marco into a surreal mirror, reflecting the golden mosaics of the Basilica. Venetians navigate the flooded square on raised walkways as the city lives its centuries-old relationship with the sea.',
    imageUrl: 'https://picsum.photos/seed/venice/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/venice/400/300',
    likes: 541,
  },
  {
    id: '7',
    title: 'Bonsai Garden, Kyoto',
    author: 'Hana Nakamura',
    description:
      'An ancient collection of bonsai trees in a private Kyoto garden, some specimens over three hundred years old. Each miniature tree is a living sculpture, expressing the Japanese philosophy of wabi-sabi — beauty in imperfection.',
    imageUrl: 'https://picsum.photos/seed/bonsai/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/bonsai/400/300',
    likes: 389,
  },
  {
    id: '8',
    title: 'Cliffs of Moher',
    author: 'Ciarán O\'Sullivan',
    description:
      'The dramatic Cliffs of Moher rise 214 metres above the Atlantic Ocean on Ireland\'s wild west coast. Captured during a rare break in the clouds, the emerald headlands and sea-spray create a scene of raw, elemental beauty.',
    imageUrl: 'https://picsum.photos/seed/moher/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/moher/400/300',
    likes: 714,
  },
  {
    id: '9',
    title: 'Patagonia Storm',
    author: 'Valentina Cruz',
    description:
      'A wall of cloud rolls in over the Torres del Paine massif in Chilean Patagonia. The granite towers are briefly illuminated by a last ray of sunlight before the storm erases them from view, a spectacle of nature\'s raw power.',
    imageUrl: 'https://picsum.photos/seed/patagonia/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/patagonia/400/300',
    likes: 1087,
  },
  {
    id: '10',
    title: 'Zanzibar Coastline',
    author: 'Fatima Al-Rashid',
    description:
      'Crystal-clear turquoise waters meet a pristine white sand beach on the east coast of Zanzibar. A lone dhow glides silently past a backdrop of swaying palms in a scene unchanged for centuries.',
    imageUrl: 'https://picsum.photos/seed/zanzibar/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/zanzibar/400/300',
    likes: 893,
  },
  {
    id: '11',
    title: 'New York Skyline at Dusk',
    author: 'James O\'Brien',
    description:
      'The Manhattan skyline transitions from day to night in a twenty-minute magic hour window. Thousands of office windows catch the last sunlight while street-level traffic trails create rivers of red and white light below.',
    imageUrl: 'https://picsum.photos/seed/newyork/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/newyork/400/300',
    likes: 1456,
  },
  {
    id: '12',
    title: 'Lavender Fields, Provence',
    author: 'Sophie Beaumont',
    description:
      'Rows of purple lavender stretch to the horizon under a bright Provençal sky near Valensole. The heady fragrance, even in a photograph, seems to emanate from the dense, perfectly geometric furrows of bloom.',
    imageUrl: 'https://picsum.photos/seed/lavender/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/lavender/400/300',
    likes: 762,
  },
  {
    id: '13',
    title: 'Mongolian Steppes',
    author: 'Batjargal Dorj',
    description:
      'A lone horseman crosses the vast, treeless expanse of the Mongolian steppe at dusk. The immensity of sky and land reduces the rider to a tiny silhouette, evoking centuries of nomadic life on the world\'s largest grassland.',
    imageUrl: 'https://picsum.photos/seed/mongolia/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/mongolia/400/300',
    likes: 481,
  },
  {
    id: '14',
    title: 'Great Barrier Reef',
    author: 'Olivia Chen',
    description:
      'An underwater panorama of the Great Barrier Reef reveals a world of impossible colour. Brain corals and staghorns host clownfish, parrotfish and sea turtles in a biodiversity hotspot now racing against the effects of warming oceans.',
    imageUrl: 'https://picsum.photos/seed/reef/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/reef/400/300',
    likes: 1330,
  },
  {
    id: '15',
    title: 'Saharan Star Trails',
    author: 'Nour Hassan',
    description:
      'A two-hour long-exposure from the Algerian desert captures the rotation of the night sky. The Milky Way arches over a sea of dunes while star trails form concentric arcs around the celestial south pole.',
    imageUrl: 'https://picsum.photos/seed/startrails/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/startrails/400/300',
    likes: 1698,
  },
  {
    id: '16',
    title: 'Autumn in Kyoto',
    author: 'Yuki Tanaka',
    description:
      'The ancient precincts of Tofuku-ji temple erupt in a blaze of autumn colour. Hundreds of Japanese maple trees paint the hillside in every shade of red, orange and gold, drawing pilgrims and photographers alike.',
    imageUrl: 'https://picsum.photos/seed/kyotofall/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/kyotofall/400/300',
    likes: 925,
  },
  {
    id: '17',
    title: 'Norwegian Fjord',
    author: 'Anders Eriksen',
    description:
      'A ferry glides through the mirror-flat waters of Nærøyfjord, the narrowest fjord in the world. Sheer 1400-metre cliffs rise on either side while cascading waterfalls catch the pale northern light.',
    imageUrl: 'https://picsum.photos/seed/fjord/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/fjord/400/300',
    likes: 1112,
  },
  {
    id: '18',
    title: 'Atacama Geysers',
    author: 'Rodrigo Villanueva',
    description:
      'At 4500 metres elevation in the Atacama desert, El Tatio\'s geysers erupt in the freezing pre-dawn air. Steam columns rise fifteen metres high while the first sunlight turns the volcanic plateau gold.',
    imageUrl: 'https://picsum.photos/seed/atacama/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/atacama/400/300',
    likes: 558,
  },
  {
    id: '19',
    title: 'Lofoten Islands Winter',
    author: 'Frida Haugen',
    description:
      'A cluster of red wooden fishermen\'s cabins — called rorbuer — stand on stilts above an ice-blue fjord in the Lofoten archipelago. Snow-covered peaks rise behind the village in a quintessentially Arctic winter scene.',
    imageUrl: 'https://picsum.photos/seed/lofoten/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/lofoten/400/300',
    likes: 834,
  },
  {
    id: '20',
    title: 'Serengeti Migration',
    author: 'Amani Osei',
    description:
      'A vast river of wildebeest and zebra stretches to the horizon during the Great Migration across the Serengeti plain. Over a million animals make this annual journey, one of the last truly wild spectacles on Earth.',
    imageUrl: 'https://picsum.photos/seed/serengeti/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/serengeti/400/300',
    likes: 1567,
  },
  {
    id: '21',
    title: 'Machu Picchu at Sunrise',
    author: 'Isabel Quispe',
    description:
      'The Inca citadel of Machu Picchu emerges from a sea of morning clouds at 2430 metres above sea level. The terraced ruins glow amber as the first rays of sunlight touch the ancient stonework, revealing the genius of a civilisation lost to time.',
    imageUrl: 'https://picsum.photos/seed/machupicchu/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/machupicchu/400/300',
    likes: 2310,
  },
  {
    id: '22',
    title: 'Dubai Skyline by Night',
    author: 'Khalid Al Mansoori',
    description:
      'The Burj Khalifa and its neighbours blaze against the desert night sky. The illuminated towers are reflected in the still waters of the Dubai Canal, creating a double cityscape of light and geometry.',
    imageUrl: 'https://picsum.photos/seed/dubai/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/dubai/400/300',
    likes: 1874,
  },
  {
    id: '23',
    title: 'Cherry Blossom, Tokyo',
    author: 'Aiko Mori',
    description:
      'A tunnel of cherry blossoms lines the Meguro River in Tokyo during peak hanami season. Thousands of pink petals drift in the warm spring breeze, covering the water with a carpet of pale flowers.',
    imageUrl: 'https://picsum.photos/seed/sakura/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/sakura/400/300',
    likes: 3040,
  },
  {
    id: '24',
    title: 'Scottish Highlands',
    author: 'Ewan MacGregor',
    description:
      'Moody storm clouds roll over the vast moorlands of the Scottish Highlands. A single stone bothy stands desolate against the dramatic sky, its whitewashed walls a stark contrast to the purple heather stretching in every direction.',
    imageUrl: 'https://picsum.photos/seed/scotland/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/scotland/400/300',
    likes: 942,
  },
  {
    id: '25',
    title: 'Namib Desert Dunes',
    author: 'Thandi Dlamini',
    description:
      'The towering red dunes of Sossusvlei in the Namib Desert rise up to 325 metres, among the tallest in the world. Dead camel thorn trees stand bleached white in the ancient clay pan below, survivors of a landscape that receives almost no rain.',
    imageUrl: 'https://picsum.photos/seed/namib/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/namib/400/300',
    likes: 1124,
  },
  {
    id: '26',
    title: 'Blue Lagoon, Iceland',
    author: 'Björk Sigurdardóttir',
    description:
      'Steam rises from the milky-blue geothermal waters of the Blue Lagoon against a backdrop of black lava fields and a pale Arctic sky. The silica-rich water glows an otherworldly turquoise at temperatures of 37–40°C.',
    imageUrl: 'https://picsum.photos/seed/bluelagoon/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/bluelagoon/400/300',
    likes: 1789,
  },
  {
    id: '27',
    title: 'Angkor Wat at Dusk',
    author: 'Sovannarith Pich',
    description:
      'The five towers of Angkor Wat are reflected in the long reservoir at dusk, their silhouettes framed by fiery orange clouds. Built in the twelfth century, the temple complex remains the largest religious monument ever constructed.',
    imageUrl: 'https://picsum.photos/seed/angkor/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/angkor/400/300',
    likes: 2045,
  },
  {
    id: '28',
    title: 'Santorini Caldera',
    author: 'Nikos Papadopoulos',
    description:
      'Iconic white-domed churches and blue-shuttered houses cling to the volcanic cliffs of Oia above the Santorini caldera. The afternoon light turns the Aegean Sea a deep sapphire while cruise ships drift far below.',
    imageUrl: 'https://picsum.photos/seed/santorini/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/santorini/400/300',
    likes: 2756,
  },
  {
    id: '29',
    title: 'Borneo Rainforest',
    author: 'Lim Wei Xian',
    description:
      'A proboscis monkey perches in the mangroves along the Kinabatangan River in Sabah, Borneo. The forest behind teems with pygmy elephants, orangutans and over three hundred bird species in one of the most biodiverse habitats on the planet.',
    imageUrl: 'https://picsum.photos/seed/borneo/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/borneo/400/300',
    likes: 673,
  },
  {
    id: '30',
    title: 'Cappadocia Balloons',
    author: 'Ayşe Yıldız',
    description:
      'Dozens of hot-air balloons drift over the surreal fairy-chimney landscape of Cappadocia at first light. The soft dawn colours illuminate the tufa rock formations while the balloons cast long shadows across the valley below.',
    imageUrl: 'https://picsum.photos/seed/cappadocia/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/cappadocia/400/300',
    likes: 3182,
  },
  {
    id: '31',
    title: 'Niagara Falls in Winter',
    author: 'Claire Fontaine',
    description:
      'Ice formations encase the rocks at the base of Horseshoe Falls during a bitter Niagara winter. The thundering water continues to fall even as ice sculptures of impossible beauty grow along the banks, nature\'s own cathedral.',
    imageUrl: 'https://picsum.photos/seed/niagara/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/niagara/400/300',
    likes: 988,
  },
  {
    id: '32',
    title: 'Halong Bay, Vietnam',
    author: 'Nguyen Thi Thu',
    description:
      'Thousands of limestone karst islands rise from the emerald waters of Halong Bay, their bases hollowed by millennia of wave action. Traditional Vietnamese junks with red sails navigate between the formations in soft morning mist.',
    imageUrl: 'https://picsum.photos/seed/halong/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/halong/400/300',
    likes: 1643,
  },
  {
    id: '33',
    title: 'Mount Fuji at Sunrise',
    author: 'Takeshi Yamamoto',
    description:
      'Japan\'s sacred mountain, perfectly symmetrical and snow-capped, rises above a sea of cloud at sunrise. The iconic silhouette, revered in Japanese art for centuries, is captured in a fleeting fifteen-minute window of perfect light.',
    imageUrl: 'https://picsum.photos/seed/fuji/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/fuji/400/300',
    likes: 2890,
  },
  {
    id: '34',
    title: 'Zhangjiajie Pillars',
    author: 'Chen Xiaoming',
    description:
      'The towering sandstone pillars of Zhangjiajie National Forest Park, the inspiration for the floating mountains of Pandora in Avatar, pierce the cloud layer in the early morning. Bridges connect some peaks while others remain forever isolated.',
    imageUrl: 'https://picsum.photos/seed/zhangjiajie/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/zhangjiajie/400/300',
    likes: 2214,
  },
  {
    id: '35',
    title: 'Bora Bora Lagoon',
    author: 'Tetuanui Maeva',
    description:
      'Overwater bungalows extend above the impossibly clear lagoon of Bora Bora. The ancient volcanic cone of Mount Otemanu rises in the background while the water below reveals coral gardens and manta rays gliding in the shallows.',
    imageUrl: 'https://picsum.photos/seed/borabora/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/borabora/400/300',
    likes: 3455,
  },
  {
    id: '36',
    title: 'Antelope Canyon Light Beams',
    author: 'Navajo Lightworks',
    description:
      'Shafts of sunlight pierce the narrow slot canyon of Upper Antelope Canyon in Arizona, illuminating the swirling sandstone walls in shades of amber, orange and burgundy. The beams are visible for only a few weeks each year around the summer solstice.',
    imageUrl: 'https://picsum.photos/seed/antelope/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/antelope/400/300',
    likes: 2678,
  },
  {
    id: '37',
    title: 'Prague Old Town Square',
    author: 'Lucie Nováková',
    description:
      'The spires of the Church of Our Lady before Týn and the medieval astronomical clock frame Prague\'s Old Town Square on a misty autumn morning. Horse-drawn carriages and cobblestones complete a scene that feels pulled from the pages of a fairy tale.',
    imageUrl: 'https://picsum.photos/seed/prague/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/prague/400/300',
    likes: 1102,
  },
  {
    id: '38',
    title: 'Lake Baikal Ice',
    author: 'Irina Sorokina',
    description:
      'Massive transparent ice plates on Lake Baikal fracture into geometric patterns in the Siberian winter. The world\'s deepest lake holds twenty percent of the Earth\'s unfrozen surface water beneath ice that can reach two metres thick.',
    imageUrl: 'https://picsum.photos/seed/baikal/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/baikal/400/300',
    likes: 1401,
  },
  {
    id: '39',
    title: 'Great Wall of China',
    author: 'Wang Fang',
    description:
      'The Mutianyu section of the Great Wall snakes along a mountain ridge in autumn, its crenellated battlements framed by fiery red and gold foliage. Built two thousand years ago to protect a civilisation, it remains the greatest architectural achievement in human history.',
    imageUrl: 'https://picsum.photos/seed/greatwall/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/greatwall/400/300',
    likes: 1935,
  },
  {
    id: '40',
    title: 'Tulip Fields, Netherlands',
    author: 'Marieke van den Berg',
    description:
      'Striped ribbons of red, yellow, pink and white tulips cover the Bollenstreek bulb-growing region of the Netherlands in early spring. A lone windmill stands at the end of the fields, completing a quintessentially Dutch panorama.',
    imageUrl: 'https://picsum.photos/seed/tulips/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/tulips/400/300',
    likes: 2198,
  },
];

const resolvers = {
  Query: {
    /**
     * Paginated images query.
     * page  — 1-based page number (default 1)
     * limit — items per page, capped at 50 (default 10)
     */
    images: (_parent, { page = 1, limit = 10 }) => {
      const p = Math.max(1, page);
      const l = Math.max(1, Math.min(limit, 50));
      const start = (p - 1) * l;
      const end = start + l;
      const pageImages = seedImages.slice(start, end);
      return {
        images: pageImages,
        totalCount: seedImages.length,
        hasNextPage: end < seedImages.length,
        page: p,
      };
    },
    image: (_parent, { id }) =>
      seedImages.find((img) => img.id === id) || null,
  },
};

module.exports = { resolvers };
