import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SplitLayoutProps {
  left: ReactNode
  right: ReactNode
  className?: string
}

export function SplitLayout({ left, right, className }: SplitLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-10 md:gap-16 xl:flex-row xl:gap-20',
        className,
      )}
    >
      <div className="flex w-full shrink-0 flex-col justify-center xl:w-1/2">{left}</div>
      <div className="flex w-full shrink-0 items-center justify-center xl:w-1/2">{right}</div>
    </div>
  )
}
