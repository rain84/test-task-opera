import { Routes, Route, Navigate } from 'react-router-dom'

import { Home } from 'layout'
import style from './style.module.sass'

export const App = () => (
  <div className={style.app}>
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Routes>
            <Route path="/">
              <Route index element={<DefaultRoute />} />
              <Route path="home" element={<Home />} />
              <Route path="*" element={<DefaultRoute />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  </div>
)

function DefaultRoute() {
  return <Navigate to={'/home'} replace={true} />
}
