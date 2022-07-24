import type { ReactNode } from 'react'

export type CardProps = {
  className?: string
  title?: string
  label?: string
  children?: ReactNode
}

export const Card = ({ className = '', title, label, children }: CardProps) => (
  <div
    className={`flex flex-col items-center justify-center ${className}`.trimEnd()}
  >
    {children}
    {title && <p className="mt-1 text-subtitle-1-bold">{title}</p>}
    {label && (
      <p className="text-body text-low-emphasis whitespace-nowrap">{label}</p>
    )}
  </div>
)
