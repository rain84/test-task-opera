import { BrowserRouter } from 'react-router-dom'
import { render, type RenderOptions } from '@testing-library/react'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }
export * from '@testing-library/react'
