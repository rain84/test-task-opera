export interface Props {
  children?: ReactNode
  reloadable?: boolean
}

export interface State {
  errorStack?: string
  key?: boolean
  someProp?: string
}

export type ErrorProps = {
  stack: string
  reloadable: boolean
  onClick: () => void
}

export type ComponentType<P extends {}> = {
  (props: P): Exclude<React.ReactNode, undefined>
  displayName?: string
}
