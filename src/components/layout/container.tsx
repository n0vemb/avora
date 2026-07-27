import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  variant?: 'default' | 'narrow'
  className?: string
}

export function Container({ children, variant = 'default', className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 md:px-10 lg:px-15 xl:px-20',
        variant === 'default' && 'max-w-360', // ~1440px
        variant === 'narrow' && 'max-w-200', // ~800px
        className,
      )}
    >
      {children}
    </div>
  )
}
