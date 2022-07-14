import { useRef } from 'react'
import type { ReactNode, SyntheticEvent } from 'react'

import { ButtonRoom, type Color } from 'ui/button'
import { IconSofa, IconPot, IconBulb, IconBathtub } from 'ui/icon'
import { getParentDatasetProp } from 'utils/misc'

export const Rooms = () => {
  const onClick = useRef((e: SyntheticEvent) => {
    const label =
      (e?.currentTarget as HTMLElement)?.dataset?.label ??
      getParentDatasetProp(e, 'label') ??
      'Button'
    alert(`${label} clicked`)
  }).current

  return (
    <section className="flex py-2 overflow-x-scroll overscroll-contain scrollbar">
      {
        //	prettier-ignore
        [
        	item( 'cyan', 19, 'Living room', <IconSofa className="fill-white" />, onClick),
        	item( 'blue', 21, 'Kitchen', <IconPot className="fill-white" />, onClick),
        	item( 'orange', 19, 'Bedroom', <IconBulb className="fill-white" />, onClick),
        	item( 'magenta', 22, 'Bathroom', <IconBathtub className="fill-white" />, onClick),
        	item( 'cyan', 19, 'Living room', <IconSofa className="fill-white" />, onClick),
        	item( 'blue', 21, 'Kitchen', <IconPot className="fill-white" />, onClick),
        	item( 'orange', 19, 'Bedroom', <IconBulb className="fill-white" />, onClick),
        	item( 'magenta', 22, 'Bathroom', <IconBathtub className="fill-white" />, onClick),
				].map((props, i) => <Room {...props} key={props.label + i} />)
      }
    </section>
  )
}

type RoomProps = {
  color: Color
  temperature: number
  label: string
  Icon: ReactNode
  onClick: Fn<SyntheticEvent>
}

function Room({ color, temperature, label, Icon, onClick }: RoomProps) {
  return (
    <div className="flex flex-col items-center justify-center first:ml-[28px] mr-[34px] last:mr-[28px]">
      <ButtonRoom
        color={color}
        onClick={onClick}
        className="mb-2"
        data-label={label}
      >
        {Icon}
      </ButtonRoom>
      <p className="text-subtitle-bold">{temperature}°C</p>
      <p className="text-body whitespace-nowrap">{label}</p>
    </div>
  )
}

function item(...args: [Color, number, string, ReactNode, Fn<SyntheticEvent>]) {
  const [color, temperature, label, Icon, onClick] = args
  //	prettier-ignore
  return { color, temperature, label, Icon, onClick, }
}
