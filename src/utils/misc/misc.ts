type Listner<T extends keyof SVGElementEventMap> = [
  type: T,
  listener: EventListener,
  ...nodes: MaybeUndefined<SVGElement>[]
]

export const canProcess = (obj: Record<string, Maybe<unknown>>) =>
  Object.values(obj).every((val) => val !== null && val !== undefined)

export const addEventListeners = (
  listners: Listner<'click' | 'mousedown' | 'mouseup'>[]
) => {
  listners.forEach(([type, listener, ...nodes]) =>
    nodes.forEach((node) => node?.addEventListener(type, listener))
  )
  return () =>
    listners.forEach(([type, listener, ...nodes]) =>
      nodes.forEach((node) => node?.removeEventListener(type, listener))
    )
}

export const getParentDatasetProp = (e: React.SyntheticEvent, prop: string) => {
  if (
    !(e.target instanceof HTMLElement || e.target instanceof SVGGraphicsElement)
  )
    return

  const parent = e.target.closest(`[data-${prop}]`)

  return (parent as HTMLElement)?.dataset?.[prop]
}

export const omit = (obj: Record<string, any>, ...props: string[]) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !props.includes(key))
  )
