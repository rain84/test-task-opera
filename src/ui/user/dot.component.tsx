type Props = { className?: string }

export const Dot = ({ className = 'bg-red' }: Props) => (
  <>
    <div
      className={`rounded-full w-[14px] h-[14px] top-0 right-0 absolute z-10 bg-white`}
    />
    <div
      className={`rounded-full w-[8px] h-[8px] top-[3px] right-[3px] absolute z-10 animate-pulse ${className}`}
    />
  </>
)
