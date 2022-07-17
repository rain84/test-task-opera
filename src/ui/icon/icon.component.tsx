type RC = React.FunctionComponent<React.SVGProps<SVGSVGElement>> & {
  render?: {
    name?: string
  }
}
type Props = { className?: string }

export const Icon = (Component: RC) => {
  const HOC = ({ className = '' }: Props) => (
    <Component className={`icon ${className}`.trim()} />
  )
  HOC.displayName = `Icon${Component.render?.name?.replace(/svg/i, '') ?? ''}`

  return HOC
}
