import { useState, useCallback } from 'react'

import { ButtonMode, type OnClick } from 'ui'
import { Card, type CardProps } from '../'

export type CardModeProps = CardProps & {
  icon: Function
  onClick?: OnClick
}

export const CardMode = ({ onClick, icon: Icon, ...props }: CardModeProps) => {
  const [pressed, setPressed] = useState(false)
  const cb: OnClick = useCallback(
    (e, state) => {
      setPressed(state.pressed ?? false)
      onClick?.(e, state)
    },
    [onClick]
  )

  return (
    <Card {...props} label={pressed ? 'On' : 'Off'}>
      <ButtonMode onClick={cb} className="mb-2 group" pressed>
        <Icon className="group-hover:fill-primary" />
      </ButtonMode>
    </Card>
  )
}
