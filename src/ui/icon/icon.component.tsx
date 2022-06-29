type RC = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>

type Props = { className?: string; disabled?: boolean }

export const Icon = (Component: RC) => {
  const HOC = ({ className }: Props) => (
    <Component className={`icon ${className}`} />
  )
  HOC.displayName = 'Icon'

  return HOC
}
