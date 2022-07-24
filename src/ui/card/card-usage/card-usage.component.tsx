import { omit } from 'utils/misc'
import { ButtonUsage, type OnClick } from 'ui'
import { Card, type CardProps } from '..'

export type CardUsageProps = CardProps & {
  icon: Function
  'data-label': string
  pressed?: boolean
  onClick?: OnClick
}

export const CardUsage = ({ icon: Icon, ...props }: CardUsageProps) => {
  return (
    <Card {...props}>
      <ButtonUsage {...omit(props, 'className')}>
        <Icon className="group-hover:fill-primary fill-medium-emphasis" />
      </ButtonUsage>
    </Card>
  )
}
