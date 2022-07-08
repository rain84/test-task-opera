export type TumblerProps = Component & {
  value?: number
  min?: number
  max?: number
  step?: number

  size?: number
  borderWidth?: number

  onChange?: (value: number) => void
}

type Circle = SVGCircleElement
type Arc = Record<'r' | 'length' | 'step' | 'width', number>
type Arcs = Record<'inner' | 'outer', Arc>

type Listner<T extends keyof SVGElementEventMap> = [
  type: T,
  listener: EventListener,
  ...nodes: MaybeUndefined<SVGElement>[]
]

interface E extends Event, MouseEvent, SVGElementEventMap {}
