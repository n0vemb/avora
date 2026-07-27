'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getSiteConfig } from '@/features/strapi/fetchers'

const FALLBACK_SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const [socialLinks, setSocialLinks] = useState(FALLBACK_SOCIAL_LINKS)

  useEffect(() => {
    let mounted = true
    const fetchConfig = async () => {
      try {
        const config = await getSiteConfig()
        if (mounted && config.socialLinks?.length) {
          setSocialLinks(config.socialLinks.filter(l => l.href).map(l => ({ label: l.label, href: l.href })))
        }
      } catch (e) {
        // use fallback
      }
    }
    fetchConfig()
    return () => { mounted = false }
  }, [])

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">AVORA</div>
            <p style={{ marginTop: '25px', color: '#999', maxWidth: '360px' }}>
              Premium forged wheels for drivers who value craftsmanship,
              performance and individuality.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <Link key="fw" href="/wheels">Forged Wheels</Link>
            <Link key="merch" href="/merch">Merch</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/dealers">Dealers</Link>
          </div>

          <div>
            <h4>Support</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Shipping</Link>
            <Link href="/warranty">Warranty</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <h4>Follow</h4>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} AVORA. All Rights Reserved.</span>
          <span>Designed with Passion.</span>
        </div>
      </div>
    </footer>
  )
}
