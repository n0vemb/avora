'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileMenu } from '@/components/global/mobile-menu'
import { NAV_COLLECTIONS } from '@/components/global/nav-collections'

const navLinks = [
  { label: 'Wheels', href: '/wheels' },
  { label: 'Merch', href: '/merch' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

interface NavCollection {
  slug: string
  name: string
  tagline: string
  accentColor: string
}

interface NavbarProps {
  collections?: NavCollection[]
}

export function Navbar({ collections }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [wheelsOpen, setWheelsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header style={{ height: scrolled ? '74px' : '90px' }}>
      <div className="container header-inner">
        <a href="/" className="logo">
          <Image
            src="/avora-logow.svg"
            alt="AVORA Logo"
            width={180}
            height={38}
          />
        </a>

        <nav>
          {navLinks.map((link, index) => {
            if (link.href === '/wheels') {
              return (
                <div
                  key={`${link.label}-${index}`}
                  className={`nav-item-with-dropdown${wheelsOpen ? ' is-open' : ''}`}
                  onMouseEnter={() => setWheelsOpen(true)}
                  onMouseLeave={() => setWheelsOpen(false)}
                >
                  <a href={link.href}>{link.label}</a>
                  <div className="nav-dropdown">
                    {(collections || NAV_COLLECTIONS).map((c) => (
                      <a
                        key={c.slug}
                        href={`/wheels/${c.slug}`}
                        className="nav-dropdown-card"
                      >
                        <span
                          className="nav-dropdown-dot"
                          style={{ background: c.accentColor }}
                        />
                        <span className="nav-dropdown-name">{c.name}</span>
                        <span className="nav-dropdown-tag">{c.tagline}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <a key={`${link.label}-${index}`} href={link.href}>
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="header-right">
          <span>Search</span>
          <span>Account</span>
          <span>Cart(0)</span>
        </div>
        <MobileMenu collections={collections} />
      </div>
    </header>
  )
}
