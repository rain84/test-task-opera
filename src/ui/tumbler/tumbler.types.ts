export type TumblerProps = Component & {
  initialValue?: number
  min?: number
  max?: number
  step?: number

  className?: string

  onChange?: (value: number) => void
}
