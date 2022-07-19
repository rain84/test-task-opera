import { ButtonRoom, type OnClick, type Color } from 'ui'
import { Card, type CardProps } from '..'
import type { ReactNode } from 'react'

export type CardRoomProps = CardProps & {
  icon: ReactNode
  color: Color
  pressed?: boolean
  onClick?: OnClick
}

export const CardRoom = ({
  icon: Icon,
  className = '',
  ...props
}: CardRoomProps) => {
  return (
    <Card
      {...props}
      className={`first:ml-[28px] mr-[34px] last:mr-[28px] ${className}`.trimEnd()}
    >
      <ButtonRoom {...props} data-label={props.label} className="mb-2">
        {Icon}
      </ButtonRoom>
    </Card>
  )
}
