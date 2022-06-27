import { ReactComponent as MenuSvg } from './svg/menu.svg'
import { ReactComponent as BathtubSvg } from './svg/bathtub.svg'
import { ReactComponent as BellOffSvg } from './svg/bell-off.svg'
import { ReactComponent as BulbSvg } from './svg/bulb.svg'
import { ReactComponent as CogSvg } from './svg/cog.svg'
import { ReactComponent as DropSvg } from './svg/drop.svg'
import { ReactComponent as LeafSvg } from './svg/leaf.svg'
import { ReactComponent as PodiumSvg } from './svg/podium.svg'
import { ReactComponent as PotSvg } from './svg/pot.svg'
import { ReactComponent as SnowflakeSvg } from './svg/snowflake.svg'
import { ReactComponent as SofaSvg } from './svg/sofa.svg'
import { ReactComponent as ThermometerSvg } from './svg/thermometer.svg'
import { ReactComponent as TorchereSvg } from './svg/torchere.svg'
import { ReactComponent as Tuning_knobSvg } from './svg/tuning_knob.svg'

type RC = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>

type Props = { className?: string; onClick?: () => {} }
const Icon = (Component: RC) => {
  const HOC = ({ className, onClick }: Props) => (
    <Component className={`icon ${className}`} onClick={onClick} />
  )
  HOC.displayName = 'Icon'

  return HOC
}

export const Menu = Icon(MenuSvg)
export const Bathtub = Icon(BathtubSvg)
export const BellOff = Icon(BellOffSvg)
export const Bulb = Icon(BulbSvg)
export const Cog = Icon(CogSvg)
export const Drop = Icon(DropSvg)
export const Leaf = Icon(LeafSvg)
export const Podium = Icon(PodiumSvg)
export const Pot = Icon(PotSvg)
export const Snowflake = Icon(SnowflakeSvg)
export const Sofa = Icon(SofaSvg)
export const Thermometer = Icon(ThermometerSvg)
export const Torchere = Icon(TorchereSvg)
export const Tuning_knob = Icon(Tuning_knobSvg)
