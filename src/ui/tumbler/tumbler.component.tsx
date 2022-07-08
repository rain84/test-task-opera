import { useRef, useEffect, useDeferredValue, useState } from 'react'
import { SvgElement } from 'utils/svg'
import { ReactComponent as Svg } from './tumbler.svg'
import './style.sass'

import type { Circle, TumblerProps, Listner } from './tumbler'

const QUARTER_RAD = Math.PI / 2
const PI2 = 2 * Math.PI

export const Tumbler = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 140,
  borderWidth = 12,
  children,
  onChange,
}: TumblerProps) => {
  if (min >= max || step <= 0 || step >= max) throwError('Wrong props')

  const [val, setVal] = useState(value)

  const cx = size / 2
  const cy = size / 2

  let pt: DOMPoint

  const node = useRef<MaybeNull<SVGSVGElement>>(null)

  const onClick: EventListener = useDeferredValue((event): void => {
    const svg = node.current
    const e: MouseEvent = event as MouseEvent

    if (!svg) return
    if (!pt) pt = svg.createSVGPoint()

    pt.x = e.clientX
    pt.y = e.clientY

    const point = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    const r = Math.sqrt(
      Math.abs(point.x - cx) ** 2 + Math.abs(point.y - cy) ** 2
    )
    const isSliderClicked = (size - 2) / 2 - r <= borderWidth

    if (!isSliderClicked) return

    const adjacent = Math.abs(point.x - cx)
    let angle = Math.acos(adjacent / r)

    if (point.x >= cx && point.y <= cy) angle = QUARTER_RAD - angle
    else if (point.x >= cx && point.y >= cy) angle += QUARTER_RAD
    else if (point.x <= cx && point.y >= cy) angle = 3 * QUARTER_RAD - angle
    else if (point.x <= cx && point.y <= cy) angle += 3 * QUARTER_RAD

    const next = (angle / PI2) * max
    setVal(next)
    onChange?.(next)
  })

  const onMousedown: EventListener = useDeferredValue((event): void => {
    const svg = node.current
    const e: MouseEvent = event as MouseEvent

    if (!svg) return
    if (!pt) pt = svg.createSVGPoint()

    pt.x = e.clientX
    pt.y = e.clientY

    const point = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    const r = Math.sqrt(
      Math.abs(point.x - cx) ** 2 + Math.abs(point.y - cy) ** 2
    )
    const isSliderClicked = (size - 2) / 2 - r <= borderWidth

    if (!isSliderClicked) return

    const adjacent = Math.abs(point.x - cx)
    let angle = Math.acos(adjacent / r)

    if (point.x >= cx && point.y <= cy) angle = QUARTER_RAD - angle
    else if (point.x >= cx && point.y >= cy) angle += QUARTER_RAD
    else if (point.x <= cx && point.y >= cy) angle = 3 * QUARTER_RAD - angle
    else if (point.x <= cx && point.y <= cy) angle += 3 * QUARTER_RAD

    const next = (angle / PI2) * max
    setVal(next)
    onChange?.(next)
  })

  useEffect(() => {
    const nodes = {
      ctx: node.current,
      backgroundOuter: node?.current?.querySelector('circle.bg-outer'),
      backgroundInner: node?.current?.querySelector('circle.bg-inner'),
      arcOuter: node?.current?.querySelector('circle.arc-outer'),
      arcInner: node?.current?.querySelector('circle.arc-inner'),
    }

    if (!canProcess(nodes)) throwError('Missing nodes')

    const svg = {
      ctx: new SvgElement(node.current),
      backgroundOuter: new SvgElement<Circle>(nodes.backgroundOuter as Circle),
      backgroundInner: new SvgElement<Circle>(nodes.backgroundInner as Circle),
      arcOuter: new SvgElement<Circle>(nodes.arcOuter as Circle),
      arcInner: new SvgElement<Circle>(nodes.arcInner as Circle),
    }

    svg.ctx.attrs = {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
    }
    svg.ctx.style = `box-sizing: content-box`

    svg.backgroundOuter.attrs = { cx, cy }
    svg.backgroundInner.attrs = { cx, cy, r: size / 2 - borderWidth }

    const arc = {
      outer: { width: 4, length: 0, r: 0, step: 0 },
      inner: { width: 8, length: 0, r: 0, step: 0 },
    }

    arc.outer.r = (size - arc.outer.width) / 2
    arc.outer.length = 2 * Math.PI * arc.outer.r
    arc.outer.step = arc.outer.length / 100

    arc.inner.r = (size - arc.inner.width - 4) / 2
    arc.inner.length = 2 * Math.PI * arc.inner.r
    arc.inner.step = arc.inner.length / 100

    svg.arcOuter.attrs = {
      cx,
      cy,
      transform: `rotate(-90, ${cx}, ${cy})`,
      r: arc.outer.r,
      'stroke-dasharray': `${val * arc.outer.step} 9999`,
      'stroke-width': arc.outer.width,
      width: size,
      height: size,
    }

    svg.arcInner.attrs = {
      cx,
      cy,
      transform: `rotate(-90, ${cx}, ${cy})`,
      r: arc.inner.r,
      'stroke-dasharray': `${val * arc.inner.step} 9999`,
      'stroke-width': arc.inner.width,
      width: size,
      height: size,
    }

    //  prettier-ignore
    return addEventListeners([
			[
				'click', onClick,
				svg.backgroundOuter.node, svg.backgroundInner.node, svg.arcOuter.node, svg.arcInner.node,
			],
			[
				'mousedown', onClick,
				svg.backgroundOuter.node, svg.backgroundInner.node, svg.arcOuter.node, svg.arcInner.node,
			],
		])
  }, [size, val, borderWidth])

  return (
    <section
      className={`flex items-center justify-center w-[${size}px] h-[${size}px]`}
    >
      <Svg className="absolute tumbler" ref={node} />
      <div className="z-10">{children}</div>
    </section>
  )
}

function canProcess(obj: Record<string, Maybe<unknown>>) {
  return Object.values(obj).every((val) => val)
}

function throwError(message: string) {
  throw new Error(`<Thumbler/>: ${message}`)
}

function addEventListeners(
  listners: Listner<'click' | 'mousedown' | 'mouseup'>[]
) {
  listners.forEach(([type, listener, ...nodes]) =>
    nodes.forEach((node) => node?.addEventListener(type, listener))
  )
  return () =>
    listners.forEach(([type, listener, ...nodes]) =>
      nodes.forEach((node) => node?.removeEventListener(type, listener))
    )
}
