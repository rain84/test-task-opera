import { RefObject, type MouseEventHandler } from 'react'

type Props = Component &
  Record<
    'ctx' | 'backgroundOuter' | 'backgroundInner' | 'arcOuter' | 'arcInner',
    RefObject<SVGSVGElement | SVGCircleElement>
  > & {
    onClick?: MouseEventHandler<SVGCircleElement>
    onMouseDown?: MouseEventHandler<SVGCircleElement>
    onMouseUp?: MouseEventHandler<SVGCircleElement>
    onMouseMove?: MouseEventHandler<SVGCircleElement>
  }

const noop = () => {}
export const SvgComponent = ({
  ctx,
  backgroundOuter,
  backgroundInner,
  arcInner,
  arcOuter,
  className,
  onClick = noop,
  onMouseDown = noop,
}: Props) => {
  const handlers = {
    onClick,
    onMouseDown,
  }
  return (
    /* prettier-ignore */
    <svg ref={ctx as RefObject<SVGSVGElement>} className={className} width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#inset-shadow)">
				<circle ref={backgroundOuter as RefObject<SVGCircleElement>} cx="0" cy="68" r="68" fill="white" className='cursor-pointer bg bg-outer' {...handlers}/>
			</g>
			<circle ref={backgroundInner as RefObject<SVGCircleElement>} className='cursor-pointer bg bg-inner drop-shadow-[0_4px_5px_rgba(190,200,216,.3)]' cx="0" cy="68" r="68" fill="white"/>
			<circle ref={arcOuter as RefObject<SVGCircleElement>} className="cursor-pointer arc arc-outer transition-[stroke-dasharray] duration-500" cx="100" cy="100" r="100" strokeWidth="1" stroke="#00D2DF" fill="none"
				strokeDasharray="0 0" {...handlers}/>
			<circle ref={arcInner as RefObject<SVGCircleElement>} className="cursor-pointer arc arc-inner transition-[stroke-dasharray] duration-500" cx="100" cy="100" r="100" strokeWidth="1" stroke="#00D2DF" opacity=".2" fill="none"
				strokeDasharray="0 0" {...handlers}/>
			<defs>
				<filter id='inset-shadow'>
					<feOffset dx="0" dy="4" />
					<feGaussianBlur stdDeviation='5' result='offset-blur' />
					<feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse' />
					<feFlood floodColor='#BEC8D8' floodOpacity='.5' result='color' />
					<feComposite operator='in' in='color' in2='inverse' result='shadow' />
					<feComposite operator='over' in='shadow' in2='SourceGraphic' />
				</filter>
			</defs>
		</svg>
  )
}
