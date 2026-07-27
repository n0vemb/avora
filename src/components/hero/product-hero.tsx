export interface ProductHeroProps {
  slug: string;
  name: string;
  series: {
    slug: string;
    name: string;
    accentColor: string;
  };
  tagline: string;
  description: string;
  heroSubheading: string;
}

export function ProductHero({
  slug,
  name,
  series,
  tagline,
  description,
  heroSubheading,
}: ProductHeroProps) {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
      <div className="relative h-full flex items-center justify-center z-20">
        <div className="text-center px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${series.accentColor}20`, color: series.accentColor }}
            >
              {series.name}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">Product</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {name}
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="text-lg text-gray-200 mb-8">
            {heroSubheading}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Request a Quote
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
        <div className="flex items-center justify-center gap-8 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">18"-24</div>
            <div className="text-xs">Diameter Range</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8J-14J</div>
            <div className="text-xs">Width Range</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12.8kg</div>
            <div className="text-xs">Weight</div>
          </div>
        </div>
      </div>
    </section>
  );
}
