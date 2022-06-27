type Props = { className?: string }

export const Dot = ({ className }: Props) => (
  <>
    <div
      className={`z-10 rounded-full outline-offset-0 outline-white outline ${className} animate-none bg-white`}
    ></div>
    <div
      className={`rounded-full outline-offset-0 outline-white outline ${className}`}
    ></div>
  </>
)
