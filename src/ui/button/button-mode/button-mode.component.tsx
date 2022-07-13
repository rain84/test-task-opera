import { Button, type ButtonProps } from '../button.component'

export const ButtonMode = ({ className = '', ...props }: ButtonProps) => (
  <Button
    {...props}
    className={`rounded-2xl elevation-big w-[80px] h-[80px] border-solid hover:border-2 hover:border-primary ${className}`}
    pressedClassName="elevation-inner"
    releasedClassName="elevation-small"
  />
)
