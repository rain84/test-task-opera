export interface Props {
  children?: ReactNode
  reloadable?: boolean
}

type ErrorStack = MaybeUndefined<string>[]

export interface State {
  errorStack?: ErrorStack
  key?: boolean
  someProp?: string
}

export type ErrorProps = {
  stack: ErrorStack
  reloadable: boolean
  onClick: () => void
}

export type ComponentType<P extends {}> = {
  (props: P): Exclude<React.ReactNode, undefined>
  displayName?: string
}
