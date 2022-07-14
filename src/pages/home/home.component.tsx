import { Header, Rooms } from 'layouts'

export const Home = () => (
  <div className="page">
    <Header />
    <main className="flex-1 border-2 border-red">
      <Rooms />
    </main>
    <footer className="border-2 border-green-600">
      <p>Footer</p>
    </footer>
  </div>
)
