import { useCallback, useState } from 'react'
import { Button, IconMenu, User } from 'ui'

export const Header = () => {
  const [focus, setFocus] = useState(true)
  const onClick = useCallback(() => setFocus(false), [])

  return (
    <header className="h-[var(--app-header-height)] flex justify-between items-center p-[var(--app-padding)]">
      <Button>
        <IconMenu className="icon-black hover:bg-selected" />
      </Button>
      <h1 className="text-left text-app-title grow">Household</h1>
      <User focus={focus} onClick={onClick} />
    </header>
  )
}
