import { render, screen } from 'config/testing-library'
import { App } from 'app'

xtest('renders Home caption', () => {
  render(<App />)
  const linkElement = screen.getByText(/Home/i)
  expect(linkElement).toBeInTheDocument()
})
