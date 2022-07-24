export type TumblerProps = ComponentProps & {
  initialValue?: number
  min?: number
  max?: number
  step?: number

  className?: string

  onChange?: (value: number) => void
}
