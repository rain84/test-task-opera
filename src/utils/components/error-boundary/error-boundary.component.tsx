import { Component, ErrorInfo, Fragment } from 'react'
import type { ErrorProps, Props, State, ComponentType } from './error-boundary'

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    errorStack: [],
    key: true,
  }

  static getDerivedStateFromError(error: Error): State {
    return { errorStack: [error.stack] }
  }

  componentDidMount() {
    window.addEventListener('error', this.onError, true)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.onError)
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('<ErrorBoundary/>. Uncaught error:', error, errorInfo)
  }

  reload = () => {
    this.setState((prev) => ({ errorStack: [], key: !prev.key }))
  }

  onError = (e: ErrorEvent) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    this.setState((prev) => ({
      ...prev,
      errorStack: [...(prev.errorStack ?? []), e?.error.stack],
    }))
  }

  render() {
    const { reloadable = true } = this.props
    const { errorStack, key } = this.state

    return errorStack?.length ? (
      <Error stack={errorStack} onClick={this.reload} reloadable={reloadable} />
    ) : (
      <Fragment key={Number(key)}>{this.props.children}</Fragment>
    )
  }
}

const Error = ({ stack, reloadable = true, onClick }: ErrorProps) => (
  <section className="flex flex-col items-center justify-start p-20 max-w-fit">
    <div className="flex items-center self-stretch justify-between">
      <h1 className="text-2xl font-extrabold">Error Stack</h1>
      {reloadable && (
        <button
          onClick={onClick}
          className="p-3 border rounded-lg bottom-1 bg-primary "
        >
          Reload
        </button>
      )}
    </div>
    <div className="mt-4">
      {stack?.map?.((str) => (
        <pre className="mb-4 break-words whitespace-pre-wrap last:mb-0">
          {str}
        </pre>
      ))}
    </div>
  </section>
)

export function withErrorBoundary<P extends {}>(
  component: ComponentType<P>,
  reloadable?: boolean,
  displayName?: string
) {
  const HOC = (props: P) => (
    <ErrorBoundary reloadable={reloadable}>{component(props)}</ErrorBoundary>
  )

  const name = displayName ?? component.displayName ?? component.name ?? ''
  HOC.displayName = `HOC(${name})`

  return HOC
}
