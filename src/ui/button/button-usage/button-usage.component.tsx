import { Button } from '../button.component'
import { type ButtonProps } from '../button.types'

export const ButtonUsage = ({ className = '', ...props }: ButtonProps) => (
  <Button
    {...props}
    className={`bg-white rounded-2xl w-[56px] h-[56px] border-solid hover:border-2 hover:border-primary ${className}`}
    pressedClassName="elevation-inner"
    releasedClassName="elevation-small"
  />
)
