import { type MouseEventHandler } from 'react'

export type ButtonState = {
  pressed?: boolean
  disabled?: boolean
}

export type OnClick = ExtendArgs<MouseEventHandler, [ButtonState]>

export type ButtonProps = ComponentProps &
  ButtonState & {
    pressedClassName?: string
    releasedClassName?: string

    onClick?: OnClick
  }
