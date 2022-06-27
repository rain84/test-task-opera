type Props = {
  className?: string
  children: React.ReactNode
  onClick?: () => {}
}

export const Button = ({ className, children, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
