import { Header, Rooms, Modes } from 'layouts'

export const Home = () => (
  <div className="page">
    <Header />
    <main className="flex-1 border-2 border-red">
      <Rooms />
      <Modes />
    </main>
    <footer className="border-2 border-green-600">
      <p>Footer</p>
    </footer>
  </div>
)
