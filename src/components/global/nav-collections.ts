export interface NavCollection {
  slug: string
  name: string
  tagline: string
  accentColor: string
}

export const NAV_COLLECTIONS: NavCollection[] = [
  { slug: 'bloom', name: 'BLOOM', tagline: 'Soft Luxury', accentColor: '#FFB8C1' },
  { slug: 'volt', name: 'VOLT', tagline: 'Performance Series', accentColor: '#CCFF00' },
  { slug: 'cyber', name: 'CYBER', tagline: 'Future Technology', accentColor: '#00FFFF' },
  { slug: 'terra', name: 'TERRA', tagline: 'Off-Road Adventure', accentColor: '#D8B68C' },
  { slug: 'luxe', name: 'LUXE', tagline: 'Timeless Prestige', accentColor: '#D9D9D9' },
]
