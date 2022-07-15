import { useState } from 'react'
import type { MouseEventHandler } from 'react'

import { type ButtonProps } from './button.types'

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
  const handleClick: MouseEventHandler = (e) => {
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
