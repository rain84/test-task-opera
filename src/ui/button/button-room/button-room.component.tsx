import { Button, type ButtonProps } from '../button'

export type Color = 'cyan' | 'blue' | 'orange' | 'magenta'
export type ButtonColouredProps = ButtonProps & {
  color: Color
}

const CLASSNAMES = {
  cyan: 'gradient-cyan',
  blue: 'gradient-blue',
  orange: 'gradient-orange',
  magenta: 'gradient-magenta',
}

export const ButtonRoom = ({
  children,
  className = '',
  color,
  ...props
}: ButtonColouredProps) => (
  <Button
    {...props}
    className={`bg-white rounded-2xl ${className}`}
    pressedClassName="elevation-inner"
    releasedClassName="elevation-small"
  >
    <div
      className={`flex items-center justify-center m-[10px] w-[44px] h-[44px] rounded-lg ${CLASSNAMES[color]}`}
    >
      {children}
    </div>
  </Button>
)
