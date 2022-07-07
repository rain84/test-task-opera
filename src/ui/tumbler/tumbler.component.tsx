import { useRef, useEffect } from 'react'
import trottle from 'lodash/throttle'
import { SvgElement } from 'utils/svg'
import { ReactComponent as Svg } from './tumbler.svg'
import { ReactComponent as SvgBg } from './bg.svg'
import './style.sass'

export type TumblerProps = Component & {
  dash?: number
  r?: number
  strokeWidth?: number
  onChange?: (value: number) => void
}

export const Tumbler = ({
  dash = 0,
  r = 100,
  strokeWidth = 10,
}: TumblerProps) => {
  const node = useRef<MaybeNull<SVGSVGElement>>(null)
  const size = r * 2
  const circleLength = 2 * Math.PI * r
  const step = circleLength / 100

  useEffect(() => {
    const nodes = {
      ctx: node.current,
      circleBgOuter: node?.current?.querySelector('circle.bg-outer'),
      filterBg: node?.current?.querySelector('#filter0_i_2_801'),
      // bgInner: node?.current?.querySelector('circle.bg-inner'),
      // arc: node?.current?.querySelector('circle.arc'),
    }
    if (!Object.values(nodes).every((val) => val)) return

    const svg = {
      ctx: new SvgElement(node.current),
      circleBgOuter: new SvgElement<SVGCircleElement>(
        nodes.circleBgOuter as SVGCircleElement
      ),
      filterBg: new SvgElement(nodes.filterBg as SVGElement),
      // arc: new SvgElement<SVGCircleElement>(nodes.arc as SVGCircleElement),
    }

    const size = 140
    svg.ctx.attrs = {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
    }
    svg.circleBgOuter.attrs = {
      cx: size / 2,
      cy: size / 2,
    }
    svg.filterBg.attrs = {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
    }
    // drawBackground(svg.bg, size, r, strokeWidth)

    // svg.arc.attrs = {
    //   cx: r,
    //   cy: r,
    //   transform: `rotate(-90, ${r}, ${r})`,
    //   r: r - 6,
    //   'stroke-dasharray': `${dash * step} ${100000}`,
    //   'stroke-width': 12,
    //   width: size,
    //   height: size,
    // }
  }, [strokeWidth, r, size, dash, step, circleLength])

  return (
    <div>
      {/* <Svg ref={node} /> */}
      <SvgBg className="border border-black" ref={node} />
    </div>

    // <div
    //   className={`w-[${size}px] h-[${size}px] rounded-full border border-black elevation-inner box-content`}
    // >
    // </div>
  )
}

// function drawArc(
//   svg: SvgElement<SVGCircleElement>,
//   r: number,
//   strokeWidth: number,
//   dash: number,
//   step: number,
//   width: number,
//   size: number
// ) {
//   svg.attrs = {
//     cx: r,
//     cy: r,
//     transform: `rotate(-90, ${r}, ${r})`,
//     r: r,
//     'stroke-dasharray': `${dash * step} ${100000}`,
//     'stroke-width': width,
//     width: size,
//     height: size,
//   }
// }
