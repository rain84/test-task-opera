declare type MaybeNull<T> = T | null
declare type MaybeUndefined<T> = T | undefined
declare type Maybe<T> = MaybeNull<MaybeUndefined<T>>
declare type Component = {
  className?: string
  children?: React.ReactNode
  key?: string
}

declare type ExtendArgs<F extends (...args: any) => any, T extends any[]> = (
  ...args: [...Parameters<F>, ...T]
) => ReturnType<F>
