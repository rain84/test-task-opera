import { useState } from 'react'

export type ButtonProps = Component & {
  pressed?: boolean
  pressedClassName?: string
  releasedClassName?: string

  disabled?: boolean
  onClick?: () => void
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
  const handleClick = () => {
    if (disabled) return

    setIsPressed(!isPressed)
    onClick?.()
  }

  return (
    <button
      className={`max-w-fit inline-flex items-center justify-center ${className} ${
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
