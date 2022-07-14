declare type MaybeNull<T> = T | null
declare type MaybeUndefined<T> = T | undefined
declare type Maybe<T> = MaybeNull<MaybeUndefined<T>>
declare type Component = {
  className?: string
  children?: React.ReactNode
  key?: string
}
declare type Fn<T = SyntheticEvent> = (props: T) => void
