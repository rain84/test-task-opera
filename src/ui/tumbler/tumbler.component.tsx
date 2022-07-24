import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type MouseEventHandler,
} from 'react'
import { SvgElement } from 'utils/svg'
import { canProcess } from 'utils/misc'
import { SvgComponent } from './svg.component'
import type { TumblerProps } from './tumbler.types'

const QUARTER_RAD = Math.PI / 2
const PI_2 = 2 * Math.PI
const SIZE = 140
const BORDER_WIDTH = 12

//	TODO: add ability to scale with "transform: scale"
//	TODO: implement dragging with the mouse
export const Tumbler = ({
  initialValue = 0,
  min = 0,
  max = 100,
  step = 1,

  className,

  children,
  onChange,
}: TumblerProps) => {
  if (min >= max || step <= 0 || step >= max)
    throwError(`Wrong props. min: ${min}, max: ${max}, step: ${step}`)

  const [value, setValue] = useState(adjustValue(initialValue, step))

  const cx = SIZE / 2
  const cy = SIZE / 2
  // let isCapturing = useRef(false)
  let isSliderClicked = useRef(false)

  const ref = useRef({
    ctx: useRef<SVGSVGElement>(null),
    backgroundOuter: useRef<SVGCircleElement>(null),
    backgroundInner: useRef<SVGCircleElement>(null),
    arcOuter: useRef<SVGCircleElement>(null),
    arcInner: useRef<SVGCircleElement>(null),
  }).current

  let pt = useRef<DOMPoint>()

  const onClick = useCallback<MouseEventHandler<SVGCircleElement>>(
    (event): void => {
      const ctx = ref.ctx.current

      if (!ctx) return
      if (!pt.current) pt.current = ctx.createSVGPoint()

      const e = event as unknown as MouseEvent
      pt.current.x = e.clientX
      pt.current.y = e.clientY

      const point = pt.current.matrixTransform(ctx.getScreenCTM()?.inverse())
      const r = Math.sqrt(
        Math.abs(point.x - cx) ** 2 + Math.abs(point.y - cy) ** 2
      )
      isSliderClicked.current = (SIZE - 2) / 2 - r <= BORDER_WIDTH

      if (!isSliderClicked.current) return

      const adjacent = Math.abs(point.x - cx)
      let angle = Math.acos(adjacent / r)

      if (point.x >= cx && point.y <= cy) angle = QUARTER_RAD - angle
      else if (point.x >= cx && point.y >= cy) angle += QUARTER_RAD
      else if (point.x <= cx && point.y >= cy) angle = 3 * QUARTER_RAD - angle
      else if (point.x <= cx && point.y <= cy) angle += 3 * QUARTER_RAD

      const length = (angle * max) / PI_2
      const next = adjustValue(length, step)
      setValue(next)
      onChange?.(next)
    },
    [cx, cy, max, onChange, ref.ctx, step, pt]
  )

  /*	TODO: implement later
  const onMouseDown = useRef(() => {
    isCapturing.current = true
    console.log('onMouseDown')
  }).current

  const onMouseUp = useRef(() => {
    console.log('onMouseUp')

    isCapturing.current = false
    isSliderClicked.current = false
  }).current

  const onMouseMove = useCallback(
    (event: Event): void => {
      const ctx = ref.ctx.current
      console.log('onMouseMove')

      if (!isCapturing.current || !ctx || !pt) return

      const e = event as unknown as MouseEvent
      pt.x = e.clientX
      pt.y = e.clientY

      const point = pt.matrixTransform(ctx.getScreenCTM()?.inverse())
      console.log('isSliderClicked', isSliderClicked.current)

      const r = Math.sqrt(
        Math.abs(point.x - cx) ** 2 + Math.abs(point.y - cy) ** 2
      )
      if (!isSliderClicked.current) return

      const adjacent = Math.abs(point.x - cx)
      let angle = Math.acos(adjacent / r)

      if (point.x >= cx && point.y <= cy) angle = QUARTER_RAD - angle
      else if (point.x >= cx && point.y >= cy) angle += QUARTER_RAD
      else if (point.x <= cx && point.y >= cy) angle = 3 * QUARTER_RAD - angle
      else if (point.x <= cx && point.y <= cy) angle += 3 * QUARTER_RAD

      const length = (angle * max) / PI_2
      const next = adjustValue(length, step)
      console.log(`next`, next)
      setValue(next)
      onChange?.(next)
    },
    [cx, cy, max, onChange, ref.ctx, step, pt]
  )
 */

  useEffect(() => {
    if (!canProcess(ref)) throwError('Missing nodes')

    const svg = {
      ctx: new SvgElement(ref.ctx.current),
      backgroundOuter: new SvgElement(ref.backgroundOuter.current),
      backgroundInner: new SvgElement(ref.backgroundInner.current),
      arcOuter: new SvgElement(ref.arcOuter.current),
      arcInner: new SvgElement(ref.arcInner.current),
    }

    svg.ctx.attrs = {
      width: SIZE,
      height: SIZE,
      viewBox: `0 0 ${SIZE} ${SIZE}`,
    }
    svg.ctx.style = `box-sizing: content-box`

    svg.backgroundOuter.attrs = { cx, cy }
    svg.backgroundInner.attrs = { cx, cy, r: SIZE / 2 - BORDER_WIDTH }

    const arc = {
      outer: { width: 4, length: 0, r: 0, step: 0 },
      inner: { width: 10, length: 0, r: 0, step: 0 },
    }

    arc.outer.r = (SIZE - arc.outer.width) / 2
    arc.outer.length = 2 * Math.PI * arc.outer.r
    arc.outer.step = arc.outer.length / max

    arc.inner.r = (SIZE - arc.inner.width - 4) / 2
    arc.inner.length = 2 * Math.PI * arc.inner.r
    arc.inner.step = arc.inner.length / max

    svg.arcOuter.attrs = {
      cx,
      cy,
      transform: `rotate(-90, ${cx}, ${cy})`,
      r: arc.outer.r,
      'stroke-dasharray': `${value * arc.outer.step} 9999`,
      'stroke-width': arc.outer.width,
      width: SIZE,
      height: SIZE,
    }

    svg.arcInner.attrs = {
      cx,
      cy,
      transform: `rotate(-90, ${cx}, ${cy})`,
      r: arc.inner.r,
      'stroke-dasharray': `${value * arc.inner.step} 9999`,
      'stroke-width': arc.inner.width,
      width: SIZE,
      height: SIZE,
    }

    /* 		TODO: implement later
    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseup', onMouseUp)
    return () => {
      document.body.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseup', onMouseUp)
    }
 */
  }, [step, cx, cy, max, onClick, value, ref])

  return (
    <section
      className={`flex items-center justify-center w-[140px] h-[140px] ${className}`.trimEnd()}
    >
      <SvgComponent
        {...ref}
        className="absolute tumbler"
        onClick={onClick}
        // onMouseDown={onMouseDown}
      />
      <div className="z-10">{children}</div>
    </section>
  )
}

function adjustValue(value: number, step: number) {
  return step * Math.ceil(value / step)
}

function throwError(message: string) {
  throw new Error(`<Thumbler/>: ${message}`)
}
