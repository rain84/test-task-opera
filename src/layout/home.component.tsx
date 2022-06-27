import { useCallback, useState } from 'react'
import { Button, IconMenu, User } from 'ui'
import { Header } from 'features'

export const Home = () => {
  return (
    <div className="page">
      <Header />
      <main className="flex-1 border-2 border-red">
        <p>Main</p>
      </main>
      <footer className="border-2 border-green-600">
        <p>Footer</p>
      </footer>
    </div>
  )
}
