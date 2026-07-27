export const strapiContentTypes = {
  collection: {
    apiId: 'api::collection.collection',
    attributes: {
      slug: { type: 'uid', required: true },
      name: { type: 'string', required: true },
      tagline: { type: 'string', required: true },
      accentColor: { type: 'string' },
      description: { type: 'text' },
      heroImage: { type: 'media', multiple: false, required: true },
      heroVideo: { type: 'media', multiple: false },
      coverImage: { type: 'media', multiple: false, required: true },
      products: { type: 'relation', relation: 'oneToMany', target: 'api::product.product' },
      seo: { type: 'component', repeatable: false, component: 'common.seo-data' },
      sortOrder: { type: 'integer', required: true, default: 0 },
    },
  },
  product: {
    apiId: 'api::product.product',
    attributes: {
      slug: { type: 'uid', required: true },
      name: { type: 'string', required: true },
      sku: { type: 'string', required: true },
      collection: { type: 'relation', relation: 'manyToOne', target: 'api::collection.collection' },
      tagline: { type: 'string' },
      description: { type: 'text' },
      specifications: { type: 'component', repeatable: true, component: 'product.spec-row' },
      finishes: { type: 'component', repeatable: true, component: 'product.finish' },
      gallery: { type: 'media', multiple: true, required: true },
      videos: { type: 'media', multiple: true },
      fitment: { type: 'relation', relation: 'manyToMany', target: 'api::vehicle.vehicle' },
      downloads: { type: 'component', repeatable: true, component: 'product.download' },
      faq: { type: 'component', repeatable: true, component: 'product.faq-item' },
      seo: { type: 'component', repeatable: false, component: 'common.seo-data' },
      featured: { type: 'boolean', default: false },
      status: { type: 'enumeration', enum: ['draft', 'published', 'archived'], default: 'draft' },
      launchDate: { type: 'date' },
    },
  },
  galleryItem: {
    apiId: 'api::gallery-item.gallery-item',
    attributes: {
      slug: { type: 'uid', required: true },
      vehicle: { type: 'relation', relation: 'manyToOne', target: 'api::vehicle.vehicle' },
      wheelModel: { type: 'relation', relation: 'manyToOne', target: 'api::product.product' },
      wheelFinish: { type: 'string', required: true },
      wheelSize: { type: 'string', required: true },
      images: { type: 'media', multiple: true, required: true },
      videos: { type: 'media', multiple: true },
      buildNotes: { type: 'text' },
      tags: { type: 'string', multiple: true },
      featured: { type: 'boolean', default: false },
      seo: { type: 'component', repeatable: false, component: 'common.seo-data' },
    },
  },
  article: {
    apiId: 'api::article.article',
    attributes: {
      slug: { type: 'uid', required: true },
      title: { type: 'string', required: true },
      excerpt: { type: 'text' },
      coverImage: { type: 'media', multiple: false, required: true },
      category: {
        type: 'enumeration',
        enum: ['buying-guides', 'fitment-guides', 'wheel-technology', 'vehicle-guides', 'industry-news', 'product-releases', 'brand-stories', 'events'],
        required: true,
      },
      content: { type: 'richText', required: true },
      tags: { type: 'string', multiple: true },
      authorName: { type: 'string' },
      authorAvatar: { type: 'media', multiple: false },
      readTime: { type: 'integer', required: true },
      publishDate: { type: 'date', required: true },
      featured: { type: 'boolean', default: false },
      seo: { type: 'component', repeatable: false, component: 'common.seo-data' },
    },
  },
  vehicle: {
    apiId: 'api::vehicle.vehicle',
    attributes: {
      brand: { type: 'string', required: true },
      model: { type: 'string', required: true },
      generation: { type: 'string' },
      yearFrom: { type: 'integer', required: true },
      yearTo: { type: 'integer' },
      pcd: { type: 'string' },
      centerBore: { type: 'string' },
      images: { type: 'media', multiple: true },
    },
  },
  globalSetting: {
    apiId: 'api::global-setting.global-setting',
    attributes: {
      heroSection: { type: 'component', repeatable: false, component: 'global.hero-section' },
      brandStatement: { type: 'component', repeatable: false, component: 'global.brand-statement' },
      whyAvoraReasons: { type: 'component', repeatable: true, component: 'global.why-avora-reason' },
      manufacturingSteps: { type: 'component', repeatable: true, component: 'global.manufacturing-step' },
      finalCtas: { type: 'component', repeatable: false, component: 'global.final-ctas' },
      globalSeo: { type: 'component', repeatable: false, component: 'common.seo-data' },
    },
  },
}

export const strapiComponents = {
  'common.seo-data': {
    attributes: {
      metaTitle: { type: 'string', required: true },
      metaDescription: { type: 'text', required: true },
      keywords: { type: 'string' },
      ogImage: { type: 'media', multiple: false },
      canonicalUrl: { type: 'string' },
    },
  },
  'product.spec-row': {
    attributes: {
      label: { type: 'string', required: true },
      value: { type: 'string', required: true },
    },
  },
  'product.finish': {
    attributes: {
      name: { type: 'string', required: true },
      colorCode: { type: 'string', required: true },
      previewImage: { type: 'media', multiple: false },
    },
  },
  'product.faq-item': {
    attributes: {
      question: { type: 'string', required: true },
      answer: { type: 'text', required: true },
    },
  },
  'product.download': {
    attributes: {
      name: { type: 'string', required: true },
      url: { type: 'string', required: true },
      size: { type: 'string' },
    },
  },
  'global.hero-section': {
    attributes: {
      heading: { type: 'string', required: true },
      subheading: { type: 'text', required: true },
      primaryCtaLabel: { type: 'string', required: true },
      primaryCtaLink: { type: 'string', required: true },
      secondaryCtaLabel: { type: 'string', required: true },
      secondaryCtaLink: { type: 'string', required: true },
      heroImage: { type: 'media', multiple: false, required: true },
      heroImageMobile: { type: 'media', multiple: false },
    },
  },
  'global.brand-statement': {
    attributes: {
      quote: { type: 'string', required: true },
      body: { type: 'text', required: true },
    },
  },
  'global.why-avora-reason': {
    attributes: {
      icon: { type: 'string', required: true },
      title: { type: 'string', required: true },
      description: { type: 'text', required: true },
      sortOrder: { type: 'integer', required: true },
    },
  },
  'global.manufacturing-step': {
    attributes: {
      number: { type: 'string', required: true },
      title: { type: 'string', required: true },
      description: { type: 'text', required: true },
      image: { type: 'media', multiple: false, required: true },
      sortOrder: { type: 'integer', required: true },
    },
  },
  'global.final-ctas': {
    attributes: {
      heading: { type: 'string', required: true },
      ctas: { type: 'component', repeatable: true, component: 'global.cta-item' },
    },
  },
  'global.cta-item': {
    attributes: {
      label: { type: 'string', required: true },
      description: { type: 'text', required: true },
      href: { type: 'string', required: true },
      variant: { type: 'enumeration', enum: ['primary', 'secondary'], default: 'primary' },
    },
  },
}