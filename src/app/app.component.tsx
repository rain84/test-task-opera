import { Routes, Route, Navigate } from 'react-router-dom'

import { withErrorBoundary } from 'features/ErrorBoundary'
import { Home } from 'layout'

const AppComponent = () => (
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

export const App = withErrorBoundary(AppComponent)
