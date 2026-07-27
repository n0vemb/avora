'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { NAV_COLLECTIONS } from '@/components/global/nav-collections'

const navLinks = [
  { label: 'Wheels', href: '/wheels' },
  { label: 'Merch', href: '/merch' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

interface NavCollection {
  slug: string
  name: string
  tagline: string
  accentColor: string
}

interface MobileMenuProps {
  collections?: NavCollection[]
}

export function MobileMenu({ collections }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <>
      {/* Trigger */}
      <button
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:text-gray-300 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md transform bg-black transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/avora-logow.svg"
                alt="AVORA Logo"
                width={140}
                height={30}
              />
            </Link>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:text-gray-300"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col px-5 pt-8">
            {navLinks.map((link, index) => {
              if (link.href === '/wheels') {
                const isOpen = expanded === 'wheels'
                return (
                  <div key={`${link.label}-${index}`} className="border-b border-white/10">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-5 text-2xl font-semibold text-white transition-colors hover:text-gray-300 [font-family:var(--font-display),sans-serif]"
                      onClick={() => setExpanded(isOpen ? null : 'wheels')}
                      aria-expanded={isOpen}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {isOpen && (
                      <div className="flex flex-col gap-1 pb-4 pl-4">
                        {(collections || NAV_COLLECTIONS).map((c) => (
                          <Link
                            key={c.slug}
                            href={`/wheels/${c.slug}`}
                            className="flex items-center gap-3 py-3 text-base font-medium text-gray-300 transition-colors hover:text-white"
                            onClick={() => {
                              setOpen(false)
                              setExpanded(null)
                            }}
                          >
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ background: c.accentColor }}
                            />
                            <span className="font-semibold uppercase tracking-wider">{c.name}</span>
                            <span className="text-xs text-gray-500">{c.tagline}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.href}
                  className="border-b border-white/10 py-5 text-2xl font-semibold text-white transition-colors hover:text-gray-300 [font-family:var(--font-display),sans-serif]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-5 py-8">
            <p className="text-xs text-gray-500 [font-family:var(--font-body),sans-serif]">
              DESIGN WHEELS FOR SELF EXPRESSION.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
