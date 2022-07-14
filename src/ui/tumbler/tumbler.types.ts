export type TumblerProps = Component & {
  initialValue?: number
  min?: number
  max?: number
  step?: number

  onChange?: (value: number) => void
}

type Arc = Record<'r' | 'length' | 'step' | 'width', number>
type Arcs = Record<'inner' | 'outer', Arc>
