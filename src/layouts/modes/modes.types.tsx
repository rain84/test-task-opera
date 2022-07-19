import type { ReactNode } from 'react'
import type { Color, OnClick } from 'ui/button'

export type ModesProps = {
  color: Color
  temperature: number
  label: string
  Icon: ReactNode
  onClick: OnClick
}
