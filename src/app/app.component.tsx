import { Routes, Route, Navigate } from 'react-router-dom'

import { Home } from 'layout'

export const App = () => (
  <div className="relative overflow-hidden bg-white rounded-3xl w-[var(--app-width)] h-[var(--app-height)]">
    <Routes>
      <Route path="/">
        <Route index element={<DefaultRoute />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<DefaultRoute />} />
      </Route>
    </Routes>
  </div>
)

function DefaultRoute() {
  return <Navigate to={'/home'} replace={true} />
}
