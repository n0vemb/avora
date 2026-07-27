# AVORA Homepage — Component Architecture

**Status:** Ready for Implementation
**Version:** 1.0
**Date:** 2026-06-27
**Based on:** TASK_002_HOMEPAGE.md

---

## 0. Homepage Component Tree

```
Homepage (page.tsx)
│
├─ HeroSection
│   ├─ Container
│   └─ SplitLayout
│       ├─ HeroContent          ← 标题 · 副标题 · 双CTA
│       └─ HeroImage            ← 产品图 (Next/Image)
│
├─ CollectionsSection
│   ├─ Container
│   ├─ SectionHeader           ← 标题 · 副标题
│   └─ CollectionGrid
│       └─ CollectionCard ×5   ← 系列卡片 (整体可点)
│
├─ FeaturedProductsSection
│   ├─ Container
│   ├─ SectionHeader
│   ├─ ProductGrid
│   │   └─ ProductCard ×4      ← 产品卡片
│   └─ SectionCTA              ← "View All Wheels →"
│
├─ VehicleGallerySection
│   ├─ Container
│   ├─ SectionHeader
│   ├─ GalleryGrid
│   │   └─ GalleryCard ×8      ← 装车卡片
│   └─ SectionCTA              ← "View All Builds →"
│
├─ BrandStatementSection
│   ├─ Container (Narrow)
│   ├─ BlockQuote              ← 引语
│   └─ Separator               ← 装饰线
│
├─ WhyAvoraSection
│   ├─ Container
│   ├─ SectionHeader
│   └─ WhyGrid
│       └─ WhyCard ×6          ← 优势卡片 (图标+序号+标题+说明)
│
├─ JournalSection
│   ├─ Container
│   ├─ SectionHeader
│   ├─ ArticleGrid
│   │   └─ ArticleCard ×3      ← 文章卡片
│   └─ SectionCTA              ← "View All Articles →"
│
└─ CTASection
    ├─ Container (Narrow)
    └─ CtaRow
        └─ CtaColumn ×2        ← 主CTA · 副CTA
```

---

## 1. HeroSection

### 组件树

```
HeroSection
├─ Container
│   └─ SplitLayout (variant="hero")
│       ├─ HeroContent
│       │   ├─ <h1> heading
│       │   ├─ <p> subheading
│       │   └─ <div> actions
│       │       ├─ <Button variant="primary" size="lg">  primaryCta.label
│       │       └─ <Button variant="secondary" size="lg"> secondaryCta.label
│       └─ HeroImage
│           └─ <OptimizedImage> (priority=true)
```

### 1.1 Props 定义

```typescript
// HeroSection
interface HeroSectionProps {
  heading: string                    // "DESIGN WHEELS FOR SELF EXPRESSION."
  subheading: string                 // "Premium forged wheels engineered for..."
  primaryCta: CtaLink
  secondaryCta: CtaLink
  image: HeroImageData
}

interface CtaLink {
  label: string                      // "Explore Wheels"
  href: string                       // "/wheels"
  variant: 'primary' | 'secondary'
}

interface HeroImageData {
  src: string                        // CDN URL
  alt: string                        // "AVORA Forged Wheel — Front 45° View"
  width: number                      // 2560
  height: number                     // 1440
  srcMobile?: string                 // 移动端专用图 URL (1080×1920)
}

// HeroContent
interface HeroContentProps {
  heading: string
  subheading: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
}

// HeroImage
interface HeroImageProps {
  image: HeroImageData
  priority?: boolean                 // true (首屏 LCP)
}
```

### 1.2 数据结构

```typescript
// 从 Strapi Global Settings 获取
// GET /api/global-setting?populate[hero][populate]=*
interface StrapiHeroResponse {
  data: {
    attributes: {
      heroSection: {
        heading: string
        subheading: string
        primaryCtaLabel: string
        primaryCtaLink: string       // relative URL, e.g. "/wheels"
        secondaryCtaLabel: string
        secondaryCtaLink: string      // "/gallery"
        heroImage: {
          data: StrapiImage           // 桌面图
        }
        heroImageMobile?: {
          data: StrapiImage           // 移动图 (nullable)
        }
      }
    }
  }
}
```

### 1.3 组件职责

| 组件 | 职责 |
|---|---|
| **HeroSection** | 组合 SplitLayout + HeroContent + HeroImage，不持任何子组件逻辑 |
| **SplitLayout** | 纯布局：左右分列（桌面）— 上下堆叠（移动）。接受 `left` / `right` slot |
| **HeroContent** | 渲染主标题(H1) + 副标题(P) + 双按钮。不控制任何布局 |
| **HeroImage** | 封装 Next.js `<Image>`：priority 加载（LCP 优化），响应式 srcSet，桌面/移动图切换 |
| **Container** | 最大宽度 1440px 居中，水平内边距跟随断点 |

---

## 2. CollectionsSection

### 组件树

```
CollectionsSection
├─ Container
│   ├─ <SectionHeader>
│   │   ├─ <h2> heading
│   │   └─ <p> subheading
│   └─ <CollectionGrid>
│       ├─ {collections.map(c => <CollectionCard key={c.slug} collection={c} />)}
│       └─ 桌面 5列 / 平板 3+2 / 移动 2+2+1
```

### 2.1 Props 定义

```typescript
// CollectionsSection
interface CollectionsSectionProps {
  heading: string                    // "Explore Our Collections"
  subheading: string                 // "Five distinct visual identities..."
  collections: CollectionCardData[]
}

// CollectionCard
interface CollectionCardData {
  slug: string                       // "volt"
  name: string                       // "VOLT"
  tagline: string                    // "Performance Series"
  accentColor: string                // "#CCFF00"
  coverImage: MediaImage             // 卡片背景图
  productCount: number               // "6 Products" → 从 CMS 关系取
  href: string                       // "/wheels/volt"
}

// CollectionCard
interface CollectionCardProps {
  collection: CollectionCardData
}

// CollectionGrid
interface CollectionGridProps {
  collections: CollectionCardData[]
}
```

### 2.2 数据结构

```typescript
// CollectionCardData — 从 Strapi Collection API 获取
// GET /api/collections?populate=coverImage&sort=sortOrder:asc
interface StrapiCollectionResponse {
  data: {
    id: number
    attributes: {
      slug: string
      name: string                    // "Volt"
      tagline: string                 // "Performance Series"
      accentColor: string             // "#CCFF00"
      coverImage: {
        data: StrapiImage
      }
      products: {
        data: { id: number }[]        // 只取 count，无需 populate
      }
    }
  }[]
}
```

### 2.3 组件职责

| 组件 | 职责 |
|---|---|
| **CollectionsSection** | 持有 section 文案，将 collections 数组传给 Grid |
| **CollectionGrid** | 响应式网格布局。桌面 5 列 flex-wrap，平板 3+2，移动 2+2+1。仅负责布局，不关心里面渲染什么 |
| **CollectionCard** | 渲染单张系列卡片：背景图 (CoverImage) + 蒙层 + 系列名 + 副标题 + 强调色装饰线。整个卡片为 `<Link>` |
| **SectionHeader** | 渲染区块标题 (H2) + 副标题 (P)。所有 Section 共用 |

---

## 3. FeaturedProductsSection

### 组件树

```
FeaturedProductsSection
├─ Container
│   ├─ <SectionHeader>
│   │   ├─ <h2> heading
│   │   └─ <p> subheading
│   └─ <ProductGrid>
│   │   ├─ {products.map(p => <ProductCard key={p.slug} product={p} />)}
│   │   └─ 桌面 4列 / 平板 2列 / 移动 Carousel (每屏1.2张)
│   └─ <SectionCTA href="/wheels" label="View All Wheels →" />
```

### 3.1 Props 定义

```typescript
// FeaturedProductsSection
interface FeaturedProductsSectionProps {
  heading: string                    // "Featured Wheels"
  subheading: string                 // "Discover our most sought-after..."
  products: ProductCardData[]
  ctaLabel: string                   // "View All Wheels →"
  ctaHref: string                    // "/wheels"
}

// ProductCard
interface ProductCardData {
  slug: string                       // "af-10"
  name: string                       // "AF-10"
  collection: {
    slug: string                     // "volt"
    name: string                     // "VOLT"
    accentColor: string              // "#CCFF00"
  }
  diameterRange: string              // "18\" – 24\""
  thumbnail: MediaImage              // 产品浮空主图
  href: string                       // "/wheels/volt/af-10"
}

// ProductCard
interface ProductCardProps {
  product: ProductCardData
  variant?: 'grid' | 'carousel'     // 网格模式 / 横向滑动模式
}

// ProductGrid
interface ProductGridProps {
  products: ProductCardData[]
}
```

### 3.2 数据结构

```typescript
// ProductCardData — 从 Strapi Product API 获取 (featured=true)
// GET /api/products?filters[featured][$eq]=true&populate=thumbnail,collection
interface StrapiProductResponse {
  data: {
    id: number
    attributes: {
      slug: string
      name: string
      collection: {
        data: {
          attributes: {
            slug: string
            name: string
            accentColor: string
          }
        }
      }
      // specs 需要解析出 diameter range
      specifications: {
        label: string                // "Diameter"
        value: string                // "18\" – 24\""
      }[]
      gallery: {
        data: StrapiImage[]          // 取第一张作为 thumbnail
      }
    }
  }[]
}
```

### 3.3 组件职责

| 组件 | 职责 |
|---|---|
| **FeaturedProductsSection** | 组合 SectionHeader + ProductGrid + SectionCTA |
| **ProductGrid** | 响应式网格。桌面 4 列 grid-cols-4，平板 2 列，移动 1 列横滑 (scroll-snap) |
| **ProductCard** | 渲染：产品浮空图 (60% 面积) + 系列标签 + 产品名 + 规格 Teko + "Explore →" Ghost CTA。整体为 `<Link>` |
| **SectionCTA** | 区块底部 CTA 链接。"View All →" 统一风格 |

---

## 4. VehicleGallerySection

### 组件树

```
VehicleGallerySection
├─ Container
│   ├─ <SectionHeader>
│   │   ├─ <h2> heading           ← "AVORA in the Wild"
│   │   └─ <p> subheading
│   └─ <GalleryGrid>
│   │   ├─ {items.map(g => <GalleryCard key={g.slug} item={g} />)}
│   │   └─ 桌面 4列 / 平板 2列 / 移动 1列
│   └─ <SectionCTA href="/gallery" label="View All Builds →" />
```

### 4.1 Props 定义

```typescript
// VehicleGallerySection
interface VehicleGallerySectionProps {
  heading: string
  subheading: string
  items: GalleryCardData[]
  ctaLabel: string
  ctaHref: string
}

// GalleryCard
interface GalleryCardData {
  slug: string                       // "bmw-m3-g80-volt-af10"
  image: MediaImage                  // 装车实拍图
  vehicleYear: number                // 2024
  vehicleBrand: string               // "BMW"
  vehicleModel: string               // "M3 G80"
  wheelName: string                  // "VOLT AF-10"
  wheelFinish: string                // "Gloss Black"
  wheelSize: string                  // "20x10"
  href: string                       // "/gallery/bmw-m3-g80-volt-af10"
}

// GalleryCard
interface GalleryCardProps {
  item: GalleryCardData
}

// GalleryGrid
interface GalleryGridProps {
  items: GalleryCardData[]
  limit?: number                     // 首页限制显示数量 (8)
}
```

### 4.2 数据结构

```typescript
// GalleryCardData — 从 Strapi GalleryItem API 获取
// GET /api/gallery-items?pagination[limit]=8&sort=createdAt:desc&populate=*
interface StrapiGalleryResponse {
  data: {
    attributes: {
      slug: string
      images: { data: StrapiImage[] }  // 取第一张
      vehicle: {
        data: {
          attributes: {
            brand: string
            model: string
            generation: string
            yearFrom: number
          }
        }
      }
      wheelModel: {
        data: {
          attributes: {
            name: string
            collection: {
              data: { attributes: { name: string } }
            }
          }
        }
      }
      wheelFinish: string
      wheelSize: string
    }
  }[]
}
```

### 4.3 组件职责

| 组件 | 职责 |
|---|---|
| **VehicleGallerySection** | 组合 SectionHeader + GalleryGrid + SectionCTA |
| **GalleryGrid** | 桌面 4 列 / 平板 2 列 / 移动 1 列。接受 `limit` 限制显示数量 |
| **GalleryCard** | 图片 + 悬浮叠加层 (车型·产品·Finish·尺寸)。整体为 `<Link>`。图片为 4:3 比例 |

---

## 5. BrandStatementSection

### 组件树

```
BrandStatementSection
├─ Container (variant="narrow")    ← max-width 800px
│   ├─ <BlockQuote>
│   │   ├─ <p> quoteText
│   │   └─ <hr> decorativeLine
│   └─ <p> bodyText
```

### 5.1 Props 定义

```typescript
// BrandStatementSection
interface BrandStatementSectionProps {
  quote: string                      // ""We believe a wheel is not a component..."
  body: string                       // "AVORA forged wheels are built for those..."
}

// BlockQuote — 纯展示组件
interface BlockQuoteProps {
  text: string
}
```

### 5.2 数据结构

```typescript
// 从 Strapi Global Settings 获取
// GET /api/global-setting?populate=brandStatement
interface StrapiBrandStatementResponse {
  data: {
    attributes: {
      brandStatement: {
        quote: string
        body: string
      }
    }
  }
}
```

### 5.3 组件职责

| 组件 | 职责 |
|---|---|
| **BrandStatementSection** | 居中窄容器排版。纯文字。黑底。无图片 |
| **BlockQuote** | 渲染引语 + 细装饰线 (1px × 100px #222222) |
| **Container (narrow)** | 最大宽度 800px，居中 |

---

## 6. WhyAvoraSection

### 组件树

```
WhyAvoraSection
├─ Container
│   ├─ <SectionHeader>
│   │   ├─ <h2> heading           ← "Why AVORA"
│   │   └─ <p> subheading         ← "Six reasons..."
│   └─ <WhyGrid>
│       ├─ {reasons.map(r => <WhyCard key={r.id} reason={r} />)}
│       └─ 桌面 3×2 / 平板 2×3 / 移动 1×6
```

### 6.1 Props 定义

```typescript
// WhyAvoraSection
interface WhyAvoraSectionProps {
  heading: string
  subheading: string
  reasons: WhyReason[]
}

// WhyCard
interface WhyReason {
  id: number
  iconName: string                   // Lucide icon name, e.g. "Hammer"
  number: string                     // "01"
  title: string                      // "Monoblock Forged"
  description: string                // "6061-T6 aerospace aluminum..."
}

// WhyCard
interface WhyCardProps {
  reason: WhyReason
}

// WhyGrid
interface WhyGridProps {
  reasons: WhyReason[]
}
```

### 6.2 数据结构

```typescript
// WhyReason[] — 从 Strapi Global Settings 获取
// GET /api/global-setting?populate=whyAvoraReasons
interface StrapiWhyResponse {
  data: {
    attributes: {
      whyAvoraReasons: {
        id: number
        icon: string                 // Lucide icon identifier
        title: string
        description: string
        sortOrder: number
      }[]
    }
  }
}
```

### 6.3 组件职责

| 组件 | 职责 |
|---|---|
| **WhyAvoraSection** | 组合 SectionHeader + WhyGrid |
| **WhyGrid** | 响应式网格：3×2 → 2×3 → 1×6 |
| **WhyCard** | 渲染：Lucide 图标 (24px) + 序号 (Teko 40px #333333) + 标题 (Space Grotesk SemiBold 24px) + 说明 (Inter 16px) |

---

## 7. JournalSection

### 组件树

```
JournalSection
├─ Container
│   ├─ <SectionHeader>
│   │   ├─ <h2> heading           ← "From the Journal"
│   │   └─ <p> subheading
│   ├─ <ArticleGrid>
│   │   └─ {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
│   └─ <SectionCTA href="/journal" label="View All Articles →" />
```

### 7.1 Props 定义

```typescript
// JournalSection
interface JournalSectionProps {
  heading: string
  subheading: string
  articles: ArticleCardData[]
  ctaLabel: string
  ctaHref: string
}

// ArticleCard
interface ArticleCardData {
  slug: string                       // "best-forged-wheels-bmw-m3-2025"
  title: string                      // "Best Forged Wheels for BMW M3 2025"
  category: ArticleCategory          // "buying-guides"
  categoryLabel: string              // "BUYING GUIDES"
  coverImage: MediaImage             // 封面图 16:9
  readTime: number                   // 6 (分钟)
  excerpt: string                    // 摘要 (最多3行截断)
  href: string                       // "/journal/buying-guides/best-forged..."
}

type ArticleCategory = 
  | 'buying-guides' 
  | 'fitment-guides' 
  | 'wheel-technology'

// ArticleCard
interface ArticleCardProps {
  article: ArticleCardData
}

// ArticleGrid
interface ArticleGridProps {
  articles: ArticleCardData[]
}
```

### 7.2 数据结构

```typescript
// ArticleCardData — 从 Strapi Article API 获取
// GET /api/articles?filters[homepageFeatured][$eq]=true&pagination[limit]=3&sort=publishDate:desc&populate=coverImage
interface StrapiArticleResponse {
  data: {
    attributes: {
      slug: string
      title: string
      category: ArticleCategory
      excerpt: string
      coverImage: {
        data: StrapiImage
      }
      readTime: number               // CMS 计算或手动填
      publishDate: string
    }
  }[]
}
```

### 7.3 组件职责

| 组件 | 职责 |
|---|---|
| **JournalSection** | 组合 SectionHeader + ArticleGrid + SectionCTA |
| **ArticleGrid** | 响应式：桌面 3 列 / 平板 2 列（展示前 2）+ "View All" / 移动 1 列（展示前 2）+ "View All" |
| **ArticleCard** | 渲染：16:9 封面图 + 分类标签 (Inter Medium 11px 全大写) + 标题 (Space Grotesk SemiBold 24px) + 阅读时间 (Inter 13px #808080)。整体为 `<Link>` |

---

## 8. CTASection

### 组件树

```
CTASection
├─ Container (variant="narrow")
│   ├─ <h2> heading                ← "Ready to Elevate Your Vehicle Build?"
│   └─ <div> ctaRow
│       ├─ CtaColumn
│       │   ├─ <p> description     ← "Browse our full forged wheel catalog."
│       │   └─ <Button variant="primary"> primaryCta.label
│       └─ CtaColumn
│           ├─ <p> description     ← "Get a custom quote for your..."
│           └─ <Button variant="secondary"> secondaryCta.label
```

### 8.1 Props 定义

```typescript
// CTASection
interface CTASectionProps {
  heading: string                    // "Ready to Elevate Your Vehicle Build?"
  ctas: FinalCta[]
}

interface FinalCta {
  label: string                      // "Explore All Wheels"
  description: string                // "Browse our full forged wheel catalog."
  href: string                       // "/wheels"
  variant: 'primary' | 'secondary'
}
```

### 8.2 数据结构

```typescript
// FinalCta[] — 从 Strapi Global Settings 获取
// GET /api/global-setting?populate=finalCtas
interface StrapiCtaResponse {
  data: {
    attributes: {
      finalCtas: {
        id: number
        heading: string
        ctas: {
          label: string
          description: string
          href: string
          variant: 'primary' | 'secondary'
        }[]
      }
    }
  }
}
```

### 8.3 组件职责

| 组件 | 职责 |
|---|---|
| **CTASection** | 居中窄容器。渲染标题 + 双列 CTA |
| **CtaColumn** | 单个 CTA 列：描述文字 + 按钮。桌面 2 列水平，移动纵向堆叠 |

---

## 9. 共享组件

### 9.1 横切组件 Props 汇总

```typescript
// SectionHeader — 所有 Section 共用
interface SectionHeaderProps {
  heading: string
  subheading?: string
  className?: string
}

// SectionCTA — 区块底部 CTA 链接
interface SectionCTAProps {
  label: string                      // "View All Wheels →"
  href: string
  className?: string
}

// Container — 页面级容器
interface ContainerProps {
  children: React.ReactNode
  variant?: 'default' | 'narrow'     // default: max-w-[1440px], narrow: max-w-[800px]
  className?: string
}

// SplitLayout — 左右分列 (Hero 专用)
interface SplitLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
  variant?: 'hero'                   // Hero 专用: 左50% 右50% 桌面
  className?: string
}

// OptimizedImage — Next/Image 封装
interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  sizes?: string                     // 响应式 sizes 属性
  className?: string
}
```

### 9.2 全局类型

```typescript
// 所有 page.tsx 中复用
interface StrapiImage {
  id: number
  attributes: {
    url: string                      // Cloudflare R2 CDN URL
    alternativeText?: string
    width: number
    height: number
    formats?: {
      thumbnail?: { url: string; width: number; height: number }
      small?:    { url: string; width: number; height: number }
      medium?:   { url: string; width: number; height: number }
      large?:    { url: string; width: number; height: number }
    }
  }
}

interface MediaImage {
  src: string                        // 规范化后的 URL
  alt: string
  width: number
  height: number
}

// 首页完整数据结构
interface HomePageData {
  hero: HeroSectionProps
  collections: CollectionsSectionProps
  featuredProducts: FeaturedProductsSectionProps
  vehicleGallery: VehicleGallerySectionProps
  brandStatement: BrandStatementSectionProps
  whyAvora: WhyAvoraSectionProps
  journal: JournalSectionProps
  finalCta: CTASectionProps
}
```

---

## 10. page.tsx 数据获取

### 10.1 首页 Server Component 职责

```typescript
// page.tsx 的职责：
// 1. 调用 fetchers 获取首页所需全部数据
// 2. 将 Strapi 响应转换为页面 Props
// 3. 按顺序渲染 8 个 Section 组件

// 数据获取方式：
// - getHomePageData() → Promise<HomePageData>
//   ├─ getHeroData()
//   ├─ getCollections()
//   ├─ getFeaturedProducts()
//   ├─ getGalleryItems(limit: 8)
//   ├─ getBrandStatement()
//   ├─ getWhyAvoraReasons()
//   ├─ getFeaturedArticles(limit: 3)
//   └─ getFinalCtas()
```

### 10.2 页面渲染伪代码

```typescript
export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <>
      <HeroSection {...data.hero} />
      <CollectionsSection {...data.collections} />
      <FeaturedProductsSection {...data.featuredProducts} />
      <VehicleGallerySection {...data.vehicleGallery} />
      <BrandStatementSection {...data.brandStatement} />
      <WhyAvoraSection {...data.whyAvora} />
      <JournalSection {...data.journal} />
      <CTASection {...data.finalCta} />
    </>
  )
}
```

---

## 附录：文件创建清单 (按开发顺序)

| 序号 | 文件路径 | 类型 | 说明 |
|---|---|---|---|
| 1 | `src/app/(marketing)/page.tsx` | Page | 首页主文件 |
| 2 | `src/components/layout/container.tsx` | Component | 通用容器 |
| 3 | `src/components/layout/section-header.tsx` | Component | Section 标题 |
| 4 | `src/components/layout/section-cta.tsx` | Component | Section CTA |
| 5 | `src/components/layout/split-layout.tsx` | Component | 左右分列 |
| 6 | `src/components/media/optimized-image.tsx` | Component | Next/Image 封装 |
| 7 | `src/components/hero/hero-section.tsx` | Component | Hero |
| 8 | `src/components/hero/hero-content.tsx` | Component | Hero 文字区 |
| 9 | `src/components/hero/hero-image.tsx` | Component | Hero 图片区 |
| 10 | `src/components/collection/collection-section.tsx` | Component | Collections |
| 11 | `src/components/collection/collection-card.tsx` | Component | 系列卡片 |
| 12 | `src/components/product/product-section.tsx` | Component | Featured Products |
| 13 | `src/components/product/product-card.tsx` | Component | 产品卡片 |
| 14 | `src/components/gallery/gallery-section.tsx` | Component | Gallery |
| 15 | `src/components/gallery/gallery-card.tsx` | Component | Gallery 卡片 |
| 16 | `src/components/layout/brand-statement-section.tsx` | Component | Brand Statement |
| 17 | `src/components/why-avora/why-avora-section.tsx` | Component | Why AVORA |
| 18 | `src/components/why-avora/why-card.tsx` | Component | 优势卡片 |
| 19 | `src/components/article/article-section.tsx` | Component | Journal |
| 20 | `src/components/article/article-card.tsx` | Component | 文章卡片 |
| 21 | `src/components/cta/cta-section.tsx` | Component | Final CTA |
| 22 | `src/types/homepage.d.ts` | Types | 首页所有类型 |
| 23 | `src/features/strapi/fetchers.ts` | Feature | 8 个数据获取函数 |
