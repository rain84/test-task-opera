import { Routes, Route, Navigate } from 'react-router-dom'

import { Home } from 'layout'

export const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<DefaultRoute />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<DefaultRoute />} />
    </Route>
  </Routes>
)

function DefaultRoute() {
  return <Navigate to={'/home'} replace={true} />
}
