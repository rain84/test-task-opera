import { MouseEventHandler, useRef } from 'react'

import { Button, CardMode } from 'ui'
import { IconSettings, IconSnowflake, IconLeaf, IconBellOff } from 'ui/icon'
import { getParentDatasetProp } from 'utils/misc'

const cards: [string, Function, boolean][] = [
  ['Cool air', IconSnowflake, true],
  ['Eco', IconLeaf, false],
  ['Silent', IconBellOff, false],
]

export const Modes = ({ className = '' }: ComponentProps) => {
  const onClick = useRef<MouseEventHandler>((e) => {
    const label =
      (e?.currentTarget as HTMLElement)?.dataset?.label ??
      getParentDatasetProp(e, 'label') ??
      'Button'
    alert(`${label} clicked`)
  }).current

  return (
    <section
      className={`flex flex-col items-stretch pt-[14px] px-[24px] pb-[22px] bg-bluegray ${className}`.trimEnd()}
    >
      <div className="flex justify-between mb-[14px]">
        <h1 className="flex-grow text-app-title opacity-60">Modes</h1>
        <Button
          className="flex-shrink-0"
          data-label="Settings"
          onClick={onClick}
        >
          <IconSettings className="cursor-pointer bg-selected" />
        </Button>
      </div>
      <div className="flex justify-between">
        {cards.map(([title, Icon, pressed]) => (
          <CardMode
            title={title}
            icon={Icon}
            key={title}
            onClick={(_, state) => alert(JSON.stringify(state, null, ' '))}
            className="mr-[34px] last:mr-0"
            pressed={pressed}
          />
        ))}
      </div>
    </section>
  )
}
