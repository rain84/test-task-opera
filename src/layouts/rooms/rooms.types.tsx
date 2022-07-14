import type { ReactNode, SyntheticEvent } from 'react'
import type { Color, ButtonState } from 'ui/button'

export type OnClick = Fn<SyntheticEvent, ButtonState>
export type RoomProps = {
  color: Color
  temperature: number
  label: string
  Icon: ReactNode
  onClick: OnClick
}
