import { useState, type SyntheticEvent } from 'react'

export type ButtonState = {
  pressed?: boolean
  disabled?: boolean
}

export type ButtonProps = Component &
  ButtonState & {
    pressedClassName?: string
    releasedClassName?: string

    onClick?: Fn<SyntheticEvent, ButtonState>
  }

export const Button = ({
  className,
  children,
  pressed = false,
  pressedClassName = '',
  releasedClassName = '',
  onClick,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(pressed)
  const handleClick = (e: SyntheticEvent) => {
    if (disabled) return

    setIsPressed(!isPressed)
    onClick?.(e, { pressed: !isPressed, disabled })
  }

  return (
    <button
      className={`inline-flex items-center justify-center ${className} ${
        isPressed ? pressedClassName : releasedClassName
      }`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
