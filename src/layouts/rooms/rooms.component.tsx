import { useRef, type ReactNode } from 'react'

import type { Color, OnClick } from 'ui/button'
import { IconSofa, IconPot, IconBulb, IconBathtub } from 'ui/icon'
import { CardRoom } from 'ui'
import { getParentDatasetProp } from 'utils/misc'

const cards = [
  item('cyan', 19, 'Living room', <IconSofa className="fill-white" />),
  item('blue', 21, 'Kitchen', <IconPot className="fill-white" />),
  item('orange', 19, 'Bedroom', <IconBulb className="fill-white" />),
  item('magenta', 22, 'Bathroom', <IconBathtub className="fill-white" />),
  item('cyan', 19, 'Living room', <IconSofa className="fill-white" />),
  item('blue', 21, 'Kitchen', <IconPot className="fill-white" />),
  item('orange', 19, 'Bedroom', <IconBulb className="fill-white" />),
  item('magenta', 22, 'Bathroom', <IconBathtub className="fill-white" />),
]

export const Rooms = ({ className = '' }: Component) => {
  const onClick = useRef<OnClick>((e, { pressed }) => {
    const label =
      (e?.currentTarget as HTMLElement)?.dataset?.label ??
      getParentDatasetProp(e, 'label') ??
      'Button'
    alert(`${label} ${pressed ? 'pressed' : 'released'}`)
  }).current

  return (
    <section
      className={`flex py-2 overflow-x-scroll overscroll-contain scrollbar ${className}`.trimEnd()}
    >
      {cards.map((props, i) => (
        <CardRoom {...props} key={props.label + i} onClick={onClick} />
      ))}
    </section>
  )
}

function item(...args: [Color, number, string, ReactNode]) {
  const [color, temperature, label, icon] = args
  //	prettier-ignore
  return { color, temperature, label, icon, }
}
