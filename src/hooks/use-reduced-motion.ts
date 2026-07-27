'use client'

import { useEffect, useState } from 'react'

/**
 * Respects `prefers-reduced-motion` media query.
 * When true, all transform/opacity animations degrade to static or opacity-only.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}
