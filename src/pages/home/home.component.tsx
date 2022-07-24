import { Header, Rooms, Modes, Usage } from 'layouts'

export const Home = () => (
  <div className="page">
    <Header />
    <main className="flex-1">
      <Rooms />
      <Usage />
      {/* <Modes /> */}
    </main>
    {/* <footer className="">
      <p>Footer</p>
    </footer> */}
  </div>
)
