import type { Metadata } from 'next'
import { Space_Grotesk, Bebas_Neue } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Navbar } from '@/components/global/navbar'
import { Footer } from '@/components/global/footer'
import { getNavCollections } from '@/features/strapi/fetchers'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — AVORA',
    default: 'AVORA — Premium Forged Wheels for Self Expression',
  },
  description:
    'AVORA designs premium forged wheels that combine engineering precision with individual expression. Explore the Bloom, Volt, Cyber, Terra and Luxe collections.',
  metadataBase: new URL('https://avora.com'),
  openGraph: {
    siteName: 'AVORA',
    title: 'AVORA — Premium Forged Wheels',
    description:
      'Premium forged wheels engineered for performance and individuality.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@avorawheels',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const collections = await getNavCollections().catch(() => undefined)

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/geist" rel="stylesheet" />
      </head>
      <body
        className="min-h-screen bg-white text-[#111] font-[var(--font-body)]"
        suppressHydrationWarning
      >
        <Navbar collections={collections} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
