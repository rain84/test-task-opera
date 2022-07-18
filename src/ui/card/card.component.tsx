import type { ReactNode } from 'react'

export type CardProps = {
  className?: string
  title?: string
  label?: string
  children?: ReactNode
}

export const Card = ({ className = '', title, label, children }: CardProps) => (
  <div
    className={`flex flex-col items-center justify-center first:ml-[28px] mr-[34px] last:mr-[28px] ${className}`.trimEnd()}
  >
    {children}
    {title && <p className="text-subtitle-bold">{title}</p>}
    {label && <p className="text-body whitespace-nowrap opacity-40">{label}</p>}
  </div>
)
