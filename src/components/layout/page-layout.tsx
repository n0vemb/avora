"use client"

import type { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="relative" style={{ zIndex: 0 }}>
      {children}
    </main>
  )
}
