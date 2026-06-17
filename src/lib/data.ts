export interface Product {
  id: string
  name: string
  origin: string
  price: number
  dimensions: string
  material: string
  age: string
  description: string
  longDescription: string
  image: string
  featured: boolean
  tag?: string
}

export const products: Product[] = [
  {
    id: 'kashan-rose-medallion',
    name: 'Kashan Rose Medallion',
    origin: 'Kashan, Iran',
    price: 4800,
    dimensions: '200 × 300 cm',
    material: 'Hand-knotted wool on cotton',
    age: 'Circa 1940s',
    description: 'An antique Kashan carpet featuring a classic rose medallion in blush and ivory tones, woven with exceptional density and refinement.',
    longDescription: 'This mid-century Kashan carpet embodies the pinnacle of Persian weaving tradition. The central medallion radiates in soft blush rose against an ivory field, surrounded by intricate palmette borders. Woven in the renowned workshops of Kashan — a city synonymous with carpet excellence since the Safavid era — each knot reflects generations of mastery. The wool pile retains its silky sheen, and the natural dyes have mellowed to a palette of extraordinary depth and warmth.',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    featured: true,
    tag: 'Antique',
  },
  {
    id: 'tabriz-garden-blue',
    name: 'Tabriz Garden Blue',
    origin: 'Tabriz, Iran',
    price: 6200,
    dimensions: '250 × 350 cm',
    material: 'Hand-knotted wool and silk on cotton',
    age: 'Circa 1960s',
    description: 'A majestic Tabriz carpet depicting a formal Persian garden in deep indigo and ivory, with fine silk highlights throughout.',
    longDescription: 'Tabriz sits at the crossroads of civilizations, and this carpet reflects that heritage. The garden design — known as chahar bagh — divides the field into quadrants representing the four rivers of paradise. Rendered in a palette of midnight indigo, cream, and terracotta with delicate silk highlights that catch the light, this piece commands any room. The weave count of 70 raj (knots per 7 cm) speaks to the exceptional skill of the atelier.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: true,
    tag: 'Vintage',
  },
  {
    id: 'isfahan-hunting-scene',
    name: 'Isfahan Hunting Scene',
    origin: 'Isfahan, Iran',
    price: 8900,
    dimensions: '180 × 270 cm',
    material: 'Hand-knotted silk on silk',
    age: 'Circa 1920s',
    description: 'A rare Isfahan silk carpet depicting royal hunting scenes amid flowering arabesques, in warm saffron and ivory tones.',
    longDescription: 'Among the most prestigious of Persian carpet traditions, Isfahan silk pieces were historically reserved for royal courts. This extraordinary example depicts the ancient Persian hunt — horsemen, deer, and hounds amid swirling arabesques and flowering vines — in a palette of warm saffron, ivory, and forest green. The all-silk construction creates a lustrous surface that shifts with the light. An heirloom of incomparable quality.',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    featured: true,
    tag: 'Rare',
  },
  {
    id: 'qom-floral-cream',
    name: 'Qom Floral Cream',
    origin: 'Qom, Iran',
    price: 5400,
    dimensions: '160 × 240 cm',
    material: 'Hand-knotted silk on silk',
    age: 'Contemporary',
    description: 'A contemporary Qom silk carpet in cream and gold tones with an all-over floral pattern of exceptional fineness.',
    longDescription: 'Qom (Qum) has risen to prominence in the 20th century as the center of fine silk carpet production. This all-silk carpet achieves a knot density of over 100 raj, creating an image of painterly precision. The cream and gold palette is both timeless and versatile, lending itself equally to traditional and modern interiors. The floral lattice design draws from classical Persian botanical manuscripts, translated here into fiber with remarkable fidelity.',
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
    featured: false,
    tag: 'Silk',
  },
  {
    id: 'heriz-geometric-rust',
    name: 'Heriz Geometric Rust',
    origin: 'Heriz, Azerbaijan, Iran',
    price: 3200,
    dimensions: '220 × 320 cm',
    material: 'Hand-knotted wool on cotton',
    age: 'Circa 1950s',
    description: 'A bold Heriz carpet with angular medallion in deep rust and navy on a warm terracotta field — built to last generations.',
    longDescription: 'Heriz carpets are the great survivors of the Persian tradition — woven with robust village wool in geometric patterns that grow more beautiful with age. This mid-century example features the characteristic large angular medallion in deep rust and navy, set against a warm terracotta field. The bold geometric border frames the composition with authority. Heriz carpets are prized for their durability: the coarser, more resilient village wool holds up to the demands of daily life while developing a magnificent patina.',
    image: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=800&q=80',
    featured: false,
  },
  {
    id: 'nain-ivory-medallion',
    name: 'Nain Ivory Medallion',
    origin: 'Nain, Iran',
    price: 7100,
    dimensions: '200 × 300 cm',
    material: 'Hand-knotted wool and silk on cotton',
    age: 'Circa 1970s',
    description: 'A pristine Nain carpet in ivory with cobalt blue accents, featuring silk highlights and an elegant central medallion.',
    longDescription: 'The workshops of Nain emerged as a significant center in the 1930s, attracting master weavers from across the region. This fine example features a classic ivory field with intricate arabesques in cobalt blue and terracotta, silk-highlighted to create a surface of extraordinary luminosity. The central medallion is drawn with architectural precision, and the layered borders echo the complexity of Safavid palace decoration. A carpet of this quality is woven over several years by a family working in concert.',
    image: 'https://images.unsplash.com/photo-1584467735871-8e4e4c14a891?w=800&q=80',
    featured: false,
    tag: 'Fine Weave',
  },
]

export const getProduct = (id: string): Product | undefined =>
  products.find((p) => p.id === id)

export const getFeatured = (): Product[] =>
  products.filter((p) => p.featured)

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)
