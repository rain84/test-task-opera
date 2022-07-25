import { Dot } from './dot.component'
import { ReactComponent as Avatar } from './avatar.min.svg'
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
    {focus && <Dot className="bg-red" />}
    <Avatar className={className} />
  </section>
)
