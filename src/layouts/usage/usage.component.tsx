import { useRef, useState } from 'react'

import { ButtonUsage, type OnClick } from 'ui/button'
import { IconThermometer, IconDrop, IconLeaf } from 'ui/icon'
import { Tumbler, CardUsage } from 'ui'
import { getParentDatasetProp } from 'utils/misc'

export const Usage = ({ className = '' }: ComponentProps) => {
  const onClick = useRef<OnClick>((e, { pressed }) => {
    const label =
      (e?.currentTarget as HTMLElement)?.dataset?.label ??
      getParentDatasetProp(e, 'label') ??
      'Button'
    alert(`${label} ${pressed ? 'pressed' : 'released'}`)
  }).current

  const [energyConsumption, setEnergyConsumption] = useState(14)

  return (
    <section
      className={`flex flex-col pt-[15px] py-[25px] after:elevation-big ${className}`.trimEnd()}
    >
      <h1 className="pb-5 text-center text-subtitle text-medium-emphasis">
        Current usage
      </h1>
      <div className="flex justify-between px-6">
        <CardUsage
          title="21°C"
          icon={IconThermometer}
          data-label="Thermometer"
          onClick={onClick}
        />
        <Tumbler
          initialValue={energyConsumption}
          max={30}
          min={0}
          onChange={setEnergyConsumption}
          step={1}
          className="flex items-center p-2 space-x-4"
        >
          <div className="flex flex-col items-center justify-between">
            <IconLeaf className="fill-primary" />
            <span className="text-subtitle-bold text-high-emphasis">
              {energyConsumption} kWh
            </span>
            <span className="text-body">€ 1.25</span>
          </div>
        </Tumbler>
        <CardUsage
          title="58%"
          icon={IconThermometer}
          data-label="WaterDrop"
          onClick={onClick}
        />
      </div>
    </section>
  )
}
