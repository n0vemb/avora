import { Container } from '@/components/layout/container'

interface FeatureItem {
  icon?: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  features?: FeatureItem[]
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: 'star',
    title: 'PREMIUM FORGED',
    description: '6061-T6 aerospace aluminum',
  },
  {
    icon: 'zap',
    title: 'LIGHTWEIGHT',
    description: 'Up to 30% lighter\nthan cast wheels',
  },
  {
    icon: 'globe',
    title: 'TAILORED FOR YOU',
    description: 'Custom fit for your\nvehicle',
  },
  {
    icon: 'ship',
    title: 'GLOBAL SHIPPING',
    description: 'Worldwide delivery\nwith care',
  },
  {
    icon: 'check-circle',
    title: 'STREET READY',
    description: 'Urban aesthetics meets\nperformance',
  },
]

const iconMap: Record<string, React.ReactNode> = {
  star: (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="#fff" strokeWidth="1.5"/>
      <path d="M23 11L27 20H36L29 25L32 34L23 29L14 34L17 25L10 20H19L23 11Z" stroke="#fff" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  zap: (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="#fff" strokeWidth="1.5"/>
      <path d="M16 30L30 16" stroke="#fff" strokeWidth="1.5"/>
      <path d="M18 16H30V28" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
  globe: (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="23" cy="23" r="7" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
  ship: (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="#fff" strokeWidth="1.5"/>
      <path d="M14 23H32" stroke="#fff" strokeWidth="1.5"/>
      <path d="M23 14V32" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
  'check-circle': (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="#fff" strokeWidth="1.5"/>
      <path d="M14 23L19 27L32 14" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
}

export function FeaturesSection({ features = defaultFeatures }: FeaturesSectionProps) {
  return (
    <section className="features">
      <Container>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <div className="feature-icon">{iconMap[feature.icon || 'star'] || iconMap.star}</div>
              <div className="feature-text">
                <h4>{feature.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: feature.description }}></p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
