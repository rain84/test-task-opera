import { ButtonRoom, type OnClick, type Color } from 'ui'
import { Card, type CardProps } from '..'
import type { ReactNode } from 'react'

export type CardRoomProps = CardProps & {
  icon: ReactNode
  color: Color
  temperature: number
  pressed?: boolean
  onClick?: OnClick
}

export const CardRoom = ({
  icon: Icon,
  temperature,
  color,
  label,
  onClick,
}: CardRoomProps) => {
  return (
    <Card
      title={`${temperature}°C`}
      label={label}
      className="first:ml-[28px] mr-[34px] last:mr-[28px]"
    >
      <ButtonRoom
        color={color}
        onClick={onClick}
        data-label={label}
        className="mb-2"
      >
        {Icon}
      </ButtonRoom>
    </Card>
  )
}
