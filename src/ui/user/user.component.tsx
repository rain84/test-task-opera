import { Dot } from './dot.component'
import { ReactComponent as Avatar } from './avatar.svg'
import { MouseEventHandler } from 'react'

type Props = {
  className?: string
  focus?: boolean
  onClick?: MouseEventHandler
}

export const User = ({ className, focus = false, onClick }: Props) => (
  <section
    className="rounded-full border-[3px] p-0.5 border-primary relative cursor-pointer"
    onClick={onClick}
  >
    {focus && (
      <Dot className="w-[8px] h-[8px] top-1 right-1 absolute z-10 outline-4 bg-red animate-pulse" />
    )}
    <Avatar className={className} />
  </section>
)
