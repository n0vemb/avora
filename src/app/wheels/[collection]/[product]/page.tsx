import { PageLayout } from '@/components/layout/page-layout'
import { Container } from '@/components/layout/container'
import { CTASection } from '@/components/cta/cta-section'
import { FAQSection } from '@/components/ui/faq-section'
import { RelatedProductsSection } from '@/components/product/related-products'
import { ProductSpecs } from '@/components/product/product-specs'
import { ProductFitment } from '@/components/product/product-fitment'
import { ProductDownloads } from '@/components/product/product-downloads'
import { ProductDetailSection } from '@/components/product/product-detail-section'
import { ProductPageClient } from '@/components/product/product-page-client'
import Link from 'next/link'
import { getProductBySlug, getCollectionBySlug } from '@/features/strapi/fetchers'
import type { ProductCardData } from '@/types/product'

const FALLBACK_PRODUCTS: Record<string, Record<string, any>> = {
  volt: {
    'af-10': {
      name: 'AF-10',
      tagline: 'Future of Electric Mobility',
      description: 'The AF-10 is our flagship electric vehicle wheel, featuring advanced aerodynamics and lightweight construction optimized for EV performance. Every aspect of this wheel has been engineered to maximize range, improve acceleration, and deliver exceptional handling for modern electric vehicles.',
      sku: 'AV-1001',
      basePrice: 1899,
      features: [
        'Optimized for electric vehicle performance',
        '20-30% weight savings vs stock wheels',
        'Advanced aerodynamic spoke design',
        'Custom offsets available at no extra cost',
        'TPMS sensor compatible',
        'Lifetime structural warranty',
      ],
      sizes: [
        { diameter: '17"', price: 0, available: true },
        { diameter: '18"', price: 100, available: true },
        { diameter: '19"', price: 200, available: true },
        { diameter: '20"', price: 300, available: true },
        { diameter: '21"', price: 400, available: true },
        { diameter: '22"', price: 500, available: true },
        { diameter: '23"', price: 700, available: false },
        { diameter: '24"', price: 900, available: false },
      ],
      specifications: [
        { label: 'Construction', value: 'Monoblock Forged' },
        { label: 'Material', value: '6061-T6 Aerospace Aluminum' },
        { label: 'Diameter', value: '17-22"' },
        { label: 'Width', value: '8.5-11"' },
        { label: 'Offset', value: 'ET25-ET45' },
        { label: 'Weight', value: '8.5-12kg' },
        { label: 'Load Rating', value: '800kg' },
        { label: 'PCD', value: '5x112, 5x120, 5x130' },
        { label: 'Center Bore', value: '66.6mm, 72.6mm, 74.1mm' },
        { label: 'Finish Options', value: '5 Standard + Custom' },
        { label: 'Warranty', value: 'Lifetime Structural' },
      ],
      finishes: [
        {
          name: 'Gloss Black',
          price: 0,
          colorCode: '#1a1a1a',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Gloss Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Gloss Silver',
          price: 0,
          colorCode: '#c0c0c0',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Gloss Silver Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Silver Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Silver Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Brushed Silver',
          price: 500,
          colorCode: '#a8a8a8',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Brushed Silver Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Brushed Silver Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Brushed Silver Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Matte Black',
          price: 0,
          colorCode: '#333333',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Matte Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Matte Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Matte Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Satin Black',
          price: 300,
          colorCode: '#2a2a2a',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Satin Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Satin Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Satin Black Back', width: 1200, height: 1200 },
          ],
        },
      ],
      gallery: [
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Front View', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Side Profile', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 on Vehicle', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Full Set', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 Detail', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA AF-10 on SUV', width: 1200, height: 1200 },
      ],
      fitment: [
        { brand: 'Tesla', model: 'Model S', year: 2024 },
        { brand: 'Tesla', model: 'Model 3', year: 2024 },
        { brand: 'Tesla', model: 'Model X', year: 2024 },
        { brand: 'Tesla', model: 'Model Y', year: 2024 },
        { brand: 'Porsche', model: 'Taycan', year: 2024 },
        { brand: 'BMW', model: 'i4', year: 2024 },
        { brand: 'Mercedes-Benz', model: 'EQE', year: 2024 },
        { brand: 'Audi', model: 'e-tron GT', year: 2024 },
      ],
      downloads: [
        { name: 'Spec Sheet (PDF)', url: '#' },
        { name: 'Fitment Guide (PDF)', url: '#' },
        { name: 'Installation Instructions (PDF)', url: '#' },
      ],
      faq: [
        { question: 'Is the AF-10 compatible with Tesla vehicles?', answer: 'Yes, the AF-10 is specifically designed for electric vehicles including Tesla Model S, Model 3, Model X, and Model Y. Custom offsets are available for perfect fitment.' },
        { question: 'What is the weight savings compared to stock wheels?', answer: 'The AF-10 typically saves 20-30% weight compared to factory cast wheels, improving acceleration and extending EV range by reducing rotational mass.' },
        { question: 'Can I get custom offsets?', answer: 'Yes, we offer custom offsets at no additional cost. Simply provide your vehicle details during the ordering process and our team will recommend the perfect fit.' },
        { question: 'Are TPMS sensors included?', answer: 'TPMS sensors are not included but the wheels are TPMS-compatible. We recommend using OEM or quality aftermarket sensors for optimal performance.' },
        { question: 'What is the warranty coverage?', answer: 'All AVORA wheels come with a lifetime structural warranty against defects in materials and workmanship, plus a 2-year finish warranty.' },
      ],
    },
  },
  bloom: {
    'bf-01': {
      name: 'BF-01',
      tagline: 'Soft Luxury Collection',
      description: 'The BF-01 embodies elegance with its flowing spoke design and premium finishes. Perfect for luxury sedans and SUVs that demand both style and performance. The curved spokes create a sense of movement while maintaining structural integrity.',
      sku: 'AV-2001',
      basePrice: 1699,
      features: [
        'Flowing curved spoke design',
        'Premium finish options including rose gold',
        'Lightweight monoblock construction',
        'Ideal for luxury sedans and SUVs',
        'Center cap included',
        '2-year finish warranty',
      ],
      sizes: [
        { diameter: '17"', price: 0, available: true },
        { diameter: '18"', price: 100, available: true },
        { diameter: '19"', price: 200, available: true },
        { diameter: '20"', price: 300, available: true },
        { diameter: '21"', price: 400, available: false },
        { diameter: '22"', price: 500, available: true },
      ],
      specifications: [
        { label: 'Construction', value: 'Monoblock Forged' },
        { label: 'Material', value: '6061-T6 Aerospace Aluminum' },
        { label: 'Diameter', value: '17-22"' },
        { label: 'Width', value: '8-10"' },
        { label: 'Offset', value: 'ET20-ET40' },
        { label: 'Weight', value: '9-13kg' },
        { label: 'Load Rating', value: '750kg' },
        { label: 'PCD', value: '5x112, 5x120' },
        { label: 'Center Bore', value: '66.6mm, 72.6mm' },
        { label: 'Finish Options', value: '4 Standard + Custom' },
        { label: 'Warranty', value: 'Lifetime Structural / 2yr Finish' },
      ],
      finishes: [
        {
          name: 'Gloss White',
          price: 0,
          colorCode: '#f5f5f5',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Gloss White Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 White Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 White Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Gloss Black',
          price: 0,
          colorCode: '#1a1a1a',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Gloss Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Champagne Gold',
          price: 800,
          colorCode: '#d4af37',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Champagne Gold Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Champagne Gold Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Champagne Gold Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Rose Gold',
          price: 1000,
          colorCode: '#b76e79',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Rose Gold Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Rose Gold Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Rose Gold Back', width: 1200, height: 1200 },
          ],
        },
      ],
      gallery: [
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Front View', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 on Vehicle', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Full Set', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Detail', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 on SUV', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA BF-01 Rose Gold', width: 1200, height: 1200 },
      ],
      fitment: [
        { brand: 'Mercedes-Benz', model: 'E-Class', year: 2024 },
        { brand: 'Mercedes-Benz', model: 'S-Class', year: 2024 },
        { brand: 'BMW', model: '5 Series', year: 2024 },
        { brand: 'BMW', model: '7 Series', year: 2024 },
        { brand: 'Audi', model: 'A6', year: 2024 },
        { brand: 'Audi', model: 'A8', year: 2024 },
        { brand: 'Lexus', model: 'ES', year: 2024 },
        { brand: 'Genesis', model: 'G80', year: 2024 },
      ],
      downloads: [
        { name: 'Spec Sheet (PDF)', url: '#' },
        { name: 'Fitment Guide (PDF)', url: '#' },
      ],
      faq: [
        { question: 'Does the BF-01 come in rose gold?', answer: 'Yes, rose gold is available as a premium finish option for an additional $1000. It features a beautiful pinkish-gold hue that complements luxury vehicles perfectly.' },
        { question: 'What vehicles does the BF-01 fit?', answer: 'The BF-01 is designed for luxury sedans and SUVs including Mercedes-Benz, BMW, Audi, Lexus, and Genesis models. Contact us for specific fitment information.' },
        { question: 'Is a center cap included?', answer: 'Yes, all BF-01 wheels come with a premium AVORA center cap featuring our logo and matching finish.' },
      ],
    },
  },
  cyber: {
    'cf-05': {
      name: 'CF-05',
      tagline: 'Future Technology Series',
      description: 'The CF-05 features a futuristic design with concave spokes and aggressive styling. Built for high-performance vehicles that demand attention and superior handling. The 2-piece construction allows for deep concave profiles and custom offsets.',
      sku: 'AV-3001',
      basePrice: 2499,
      features: [
        '2-piece forged construction',
        'Futuristic concave spoke design',
        'Carbon fiber face option available',
        'Built for high-performance vehicles',
        'Deep concave profiles',
        'Custom barrel finishes',
      ],
      sizes: [
        { diameter: '18"', price: 0, available: true },
        { diameter: '19"', price: 150, available: true },
        { diameter: '20"', price: 300, available: true },
        { diameter: '21"', price: 450, available: true },
        { diameter: '22"', price: 600, available: true },
        { diameter: '24"', price: 1000, available: true },
      ],
      specifications: [
        { label: 'Construction', value: '2-Piece Forged' },
        { label: 'Material', value: '6061-T6 Aerospace Aluminum' },
        { label: 'Diameter', value: '18-24"' },
        { label: 'Width', value: '9-12"' },
        { label: 'Offset', value: 'ET15-ET40' },
        { label: 'Weight', value: '10-14kg' },
        { label: 'Load Rating', value: '900kg' },
        { label: 'PCD', value: '5x112, 5x120, 5x130' },
        { label: 'Center Bore', value: '66.6mm, 72.6mm, 74.1mm' },
        { label: 'Finish Options', value: '3 Standard + Carbon Fiber' },
        { label: 'Warranty', value: 'Lifetime Structural' },
      ],
      finishes: [
        {
          name: 'Gloss Black',
          price: 0,
          colorCode: '#1a1a1a',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Gloss Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Brushed Silver',
          price: 500,
          colorCode: '#a8a8a8',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Brushed Silver Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Brushed Silver Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Brushed Silver Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Carbon Fiber Face',
          price: 1500,
          colorCode: '#2d2d2d',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Carbon Fiber Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Carbon Fiber Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Carbon Fiber Back', width: 1200, height: 1200 },
          ],
        },
      ],
      gallery: [
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Front View', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 on Vehicle', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Full Set', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Detail', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Side Profile', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA CF-05 Carbon Fiber Detail', width: 1200, height: 1200 },
      ],
      fitment: [
        { brand: 'Porsche', model: '911', year: 2024 },
        { brand: 'Porsche', model: 'Cayman', year: 2024 },
        { brand: 'Ferrari', model: 'F8', year: 2024 },
        { brand: 'Lamborghini', model: 'Huracan', year: 2024 },
        { brand: 'McLaren', model: '720S', year: 2024 },
        { brand: 'BMW', model: 'M3', year: 2024 },
        { brand: 'Mercedes-AMG', model: 'C63', year: 2024 },
      ],
      downloads: [
        { name: 'Spec Sheet (PDF)', url: '#' },
        { name: 'Fitment Guide (PDF)', url: '#' },
        { name: 'Technical Data (PDF)', url: '#' },
      ],
      faq: [
        { question: 'What is 2-piece construction?', answer: '2-piece wheels consist of a center disc and outer barrel that are bolted together. This allows for deep concave profiles, custom offsets, and different finishes on the center and barrel.' },
        { question: 'Is carbon fiber available?', answer: 'Yes, we offer a carbon fiber face option for the CF-05. The center disc features genuine carbon fiber weave for ultimate lightweight performance and visual impact.' },
        { question: 'Can I get different finishes on center and barrel?', answer: 'Absolutely. With 2-piece construction, you can mix and match finishes on the center disc and outer barrel for a truly custom look.' },
      ],
    },
  },
  terra: {
    'tf-02': {
      name: 'TF-02',
      tagline: 'Off-Road Adventure',
      description: 'The TF-02 is built for off-road enthusiasts with reinforced construction and aggressive styling. Designed to handle the toughest terrain while maintaining exceptional strength and durability. Perfect for trucks, SUVs, and adventure vehicles.',
      sku: 'AV-4001',
      basePrice: 2199,
      features: [
        'Reinforced construction for off-road use',
        'High load rating (1200kg)',
        'Aggressive off-road styling',
        'Multiple PCD options for SUVs and trucks',
        'Inner bead protection',
        'Locking hub compatible',
      ],
      sizes: [
        { diameter: '17"', price: 0, available: true },
        { diameter: '18"', price: 100, available: true },
        { diameter: '19"', price: 200, available: true },
        { diameter: '20"', price: 300, available: true },
        { diameter: '22"', price: 500, available: true },
        { diameter: '24"', price: 700, available: true },
      ],
      specifications: [
        { label: 'Construction', value: 'Monoblock Forged' },
        { label: 'Material', value: '6061-T6 Aerospace Aluminum' },
        { label: 'Diameter', value: '17-24"' },
        { label: 'Width', value: '9-12"' },
        { label: 'Offset', value: 'ET0-ET30' },
        { label: 'Weight', value: '12-18kg' },
        { label: 'Load Rating', value: '1200kg' },
        { label: 'PCD', value: '5x127, 6x139.7, 5x150, 8x170' },
        { label: 'Center Bore', value: '71.5mm, 106.1mm, 110mm, 125.2mm' },
        { label: 'Finish Options', value: '3 Standard' },
        { label: 'Warranty', value: 'Lifetime Structural' },
      ],
      finishes: [
        {
          name: 'Matte Black',
          price: 0,
          colorCode: '#333333',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Matte Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Matte Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Matte Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Matte Desert Sand',
          price: 500,
          colorCode: '#c2b280',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Desert Sand Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Desert Sand Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Desert Sand Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Gunmetal',
          price: 300,
          colorCode: '#696969',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Gunmetal Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Gunmetal Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Gunmetal Back', width: 1200, height: 1200 },
          ],
        },
      ],
      gallery: [
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Front View', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 on Vehicle', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Full Set', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 Detail', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 on Truck', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA TF-02 with Tire', width: 1200, height: 1200 },
      ],
      fitment: [
        { brand: 'Toyota', model: 'Land Cruiser', year: 2024 },
        { brand: 'Toyota', model: 'Tundra', year: 2024 },
        { brand: 'Mercedes-Benz', model: 'G-Class', year: 2024 },
        { brand: 'Range Rover', model: 'Sport', year: 2024 },
        { brand: 'Ford', model: 'F-150', year: 2024 },
        { brand: 'Chevrolet', model: 'Silverado', year: 2024 },
        { brand: 'Jeep', model: 'Wrangler', year: 2024 },
        { brand: 'Lexus', model: 'GX', year: 2024 },
      ],
      downloads: [
        { name: 'Spec Sheet (PDF)', url: '#' },
        { name: 'Fitment Guide (PDF)', url: '#' },
        { name: 'Off-Road Guide (PDF)', url: '#' },
      ],
      faq: [
        { question: 'Can the TF-02 handle off-road terrain?', answer: 'Absolutely. The TF-02 is specifically designed for off-road use with reinforced construction, inner bead protection, and a high load rating of 1200kg per wheel.' },
        { question: 'What is inner bead protection?', answer: 'Inner bead protection is a raised lip on the inner barrel that protects the tire bead from damage when mounting larger off-road tires or when encountering rocks and debris.' },
        { question: 'Are they compatible with locking hubs?', answer: 'Yes, the TF-02 is compatible with most factory and aftermarket locking hubs. Please specify your vehicle when ordering for proper fitment.' },
      ],
    },
  },
  luxe: {
    'lf-03': {
      name: 'LF-03',
      tagline: 'Timeless Prestige',
      description: 'The LF-03 features classic spoke design with modern engineering. Perfect for premium luxury vehicles that demand the ultimate in style and craftsmanship. Each wheel is meticulously crafted to meet the highest standards of luxury automotive design.',
      sku: 'AV-5001',
      basePrice: 2899,
      features: [
        'Classic 10-spoke design',
        'Platinum finish option for ultimate luxury',
        'Perfect for premium luxury vehicles',
        'High load rating for heavy vehicles',
        'Hand-polished finishes',
        'Custom engraving available',
      ],
      sizes: [
        { diameter: '18"', price: 0, available: true },
        { diameter: '19"', price: 150, available: true },
        { diameter: '20"', price: 300, available: true },
        { diameter: '21"', price: 450, available: true },
        { diameter: '22"', price: 600, available: true },
      ],
      specifications: [
        { label: 'Construction', value: 'Monoblock Forged' },
        { label: 'Material', value: '6061-T6 Aerospace Aluminum' },
        { label: 'Diameter', value: '18-22"' },
        { label: 'Width', value: '8.5-10.5"' },
        { label: 'Offset', value: 'ET25-ET45' },
        { label: 'Weight', value: '9-13kg' },
        { label: 'Load Rating', value: '850kg' },
        { label: 'PCD', value: '5x112, 5x120' },
        { label: 'Center Bore', value: '66.6mm, 72.6mm' },
        { label: 'Finish Options', value: '4 Standard + Platinum' },
        { label: 'Warranty', value: 'Lifetime Structural / 3yr Finish' },
      ],
      finishes: [
        {
          name: 'Gloss Silver',
          price: 0,
          colorCode: '#c0c0c0',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Gloss Silver Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Silver Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Silver Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Gloss Black',
          price: 0,
          colorCode: '#1a1a1a',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Gloss Black Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Black Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Black Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Satin Silver',
          price: 300,
          colorCode: '#a0a0a0',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Satin Silver Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Satin Silver Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Satin Silver Back', width: 1200, height: 1200 },
          ],
        },
        {
          name: 'Platinum',
          price: 1000,
          colorCode: '#e5e4e2',
          images: [
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Platinum Front', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Platinum Side', width: 1200, height: 1200 },
            { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Platinum Back', width: 1200, height: 1200 },
          ],
        },
      ],
      gallery: [
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Front View', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 on Vehicle', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Full Set', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Detail', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 on Limo', width: 1200, height: 1200 },
        { src: 'https://picsum.photos/1200/1200', alt: 'AVORA LF-03 Platinum Detail', width: 1200, height: 1200 },
      ],
      fitment: [
        { brand: 'Rolls-Royce', model: 'Ghost', year: 2024 },
        { brand: 'Rolls-Royce', model: 'Wraith', year: 2024 },
        { brand: 'Bentley', model: 'Continental', year: 2024 },
        { brand: 'Bentley', model: 'Flying Spur', year: 2024 },
        { brand: 'Mercedes-Maybach', model: 'S-Class', year: 2024 },
        { brand: 'Porsche', model: 'Panamera', year: 2024 },
        { brand: 'Audi', model: 'A8', year: 2024 },
      ],
      downloads: [
        { name: 'Spec Sheet (PDF)', url: '#' },
        { name: 'Fitment Guide (PDF)', url: '#' },
        { name: 'Customization Guide (PDF)', url: '#' },
      ],
      faq: [
        { question: 'What is platinum finish?', answer: 'Our platinum finish is a premium multi-stage finish that features a bright, silvery-white appearance with exceptional depth and clarity. It provides a luxurious look that complements high-end luxury vehicles.' },
        { question: 'Can I get custom engraving?', answer: 'Yes, we offer custom engraving services for the LF-03. You can add your initials, vehicle VIN, or custom design to the center cap or inner barrel.' },
        { question: 'What is the warranty on the LF-03?', answer: 'The LF-03 comes with a lifetime structural warranty and a 3-year finish warranty, our longest finish warranty offering.' },
      ],
    },
  },
}

export async function generateStaticParams() {
  const params: { collection: string; product: string }[] = []
  Object.entries(FALLBACK_PRODUCTS).forEach(([collection, products]) => {
    Object.keys(products).forEach(product => {
      params.push({ collection, product })
    })
  })
  return params
}

async function getData(collectionSlug: string, productSlug: string) {
  const collectionNames: Record<string, string> = {
    bloom: 'BLOOM',
    volt: 'VOLT',
    cyber: 'CYBER',
    terra: 'TERRA',
    luxe: 'LUXE',
  }

  const collectionAccentColors: Record<string, string> = {
    bloom: '#FFB8C1',
    volt: '#CCFF00',
    cyber: '#00FFFF',
    terra: '#D8B68C',
    luxe: '#D9D9D9',
  }

  const collectionData = FALLBACK_PRODUCTS[collectionSlug]
  const fallbackProduct = collectionData?.[productSlug]

  let strapiData = null
  try {
    strapiData = await getProductBySlug(collectionSlug, productSlug)
  } catch (error) {
    console.warn('Strapi API unavailable, using fallback data:', error)
  }

  if (!fallbackProduct) {
    return strapiData || null
  }

  if (!strapiData) {
    return {
      product: {
        ...fallbackProduct,
        seo: { metaTitle: `${fallbackProduct.name} | AVORA Wheels`, metaDescription: fallbackProduct.description },
      },
      collection: {
        slug: collectionSlug,
        name: collectionNames[collectionSlug] || collectionSlug.toUpperCase(),
        accentColor: collectionAccentColors[collectionSlug] || '#ffffff',
      },
    }
  }

  const hasGalleryImages = strapiData.product.gallery && strapiData.product.gallery.length > 0
  const hasFinishImages = strapiData.product.finishes.some(f => f.images && f.images.length > 0)

  if (!hasGalleryImages || !hasFinishImages) {
    console.warn('Strapi product data missing images, using fallback images')
  }

  return {
    product: {
      ...fallbackProduct,
      ...strapiData.product,
      name: strapiData.product.name || fallbackProduct.name,
      tagline: strapiData.product.tagline || fallbackProduct.tagline,
      description: strapiData.product.description || fallbackProduct.description,
      basePrice: strapiData.product.basePrice || fallbackProduct.basePrice,
      gallery: hasGalleryImages ? strapiData.product.gallery : fallbackProduct.gallery,
      finishes: strapiData.product.finishes.length > 0 
        ? strapiData.product.finishes.map((strapiFinish, index) => ({
            ...(fallbackProduct.finishes[index] || {}),
            ...strapiFinish,
            previewImage: strapiFinish.previewImage || fallbackProduct.finishes[index]?.previewImage || null,
            images: (strapiFinish.images && strapiFinish.images.length > 0) 
              ? strapiFinish.images 
              : (fallbackProduct.finishes[index]?.images || []),
          }))
        : fallbackProduct.finishes,
      sizes: strapiData.product.sizes.length > 0 ? strapiData.product.sizes : fallbackProduct.sizes,
      features: strapiData.product.features.length > 0 ? strapiData.product.features : fallbackProduct.features,
      specifications: strapiData.product.specifications.length > 0 ? strapiData.product.specifications : fallbackProduct.specifications,
      fitment: strapiData.product.fitment.length > 0 ? strapiData.product.fitment : fallbackProduct.fitment,
      downloads: strapiData.product.downloads.length > 0 ? strapiData.product.downloads : fallbackProduct.downloads,
      faq: strapiData.product.faq.length > 0 ? strapiData.product.faq : fallbackProduct.faq,
    },
    collection: {
      ...strapiData.collection,
      name: strapiData.collection.name || collectionNames[collectionSlug] || collectionSlug.toUpperCase(),
      accentColor: strapiData.collection.accentColor || collectionAccentColors[collectionSlug] || '#ffffff',
    },
  }
}

async function getRelatedProducts(collectionSlug: string, currentProductSlug: string): Promise<ProductCardData[]> {
  try {
    const data = await getCollectionBySlug(collectionSlug)
    if (data) {
      return data.products.filter(p => p.slug !== currentProductSlug)
    }
  } catch (error) {
    console.warn('Strapi API unavailable for related products:', error)
  }
  return []
}

export default async function ProductPage({ params }: { params: Promise<{ collection: string; product: string }> }) {
  const { collection, product } = await params
  const data = await getData(collection, product)
  const relatedProducts = await getRelatedProducts(collection, product)

  if (!data) {
    return (
      <PageLayout>
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Product Not Found</h1>
            <Link href={`/wheels/${collection}`} className="text-[var(--border-strong)] hover:underline">
              Back to {collection} Collection
            </Link>
          </div>
        </Container>
      </PageLayout>
    )
  }

  const breadcrumbs = [
    { label: 'Wheels', href: '/wheels' },
    { label: data.collection.name, href: `/wheels/${collection}` },
  ]

  return (
    <PageLayout>
      <section className="relative bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-base)] py-10 md:py-16">
        <Container>
          <ProductPageClient
            breadcrumbs={breadcrumbs}
            name={data.product.name}
            tagline={data.product.tagline}
            description={data.product.description}
            basePrice={data.product.basePrice || 0}
            sizes={data.product.sizes || []}
            finishes={data.product.finishes || []}
            defaultImages={data.product.gallery || []}
          />
        </Container>
      </section>

      <ProductSpecs specs={data.product.specifications} />

      <ProductDetailSection
        description={data.product.description}
        features={data.product.features}
      />

      <ProductFitment vehicles={data.product.fitment} productName={data.product.name} />

      {data.product.downloads.length > 0 && (
        <section className="bg-[var(--bg-surface)] py-20 md:py-28">
          <div className="container">
            <ProductDownloads downloads={data.product.downloads} />
          </div>
        </section>
      )}

      {data.product.faq.length > 0 && (
        <section className="bg-[var(--bg-base)] py-20 md:py-28">
          <Container>
            <FAQSection faqs={data.product.faq} />
          </Container>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <RelatedProductsSection products={relatedProducts} />
      )}

      <CTASection
        heading="Ready to Build Your Wheels?"
        ctas={[
          { label: 'Request a Custom Quote', description: `Get personalized pricing for the ${data.product.name}.`, href: '/contact', variant: 'primary' },
          { label: 'View Collection', description: `Explore the full ${data.collection.name} collection.`, href: `/wheels/${collection}`, variant: 'secondary' },
        ]}
      />
    </PageLayout>
  )
}