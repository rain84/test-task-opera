export const Home = () => {
  return (
    <div className="page">
      <header className="h-[var(--app-header-height)] flex justify-between items-center p-[var(--app-padding)]">
        <h1 className="text-app-title">Household</h1>
      </header>
      <main className="flex-1 border-2 border-red">
        <p>Main</p>
      </main>
      <footer className="border-2 border-green-600">
        <p>Footer</p>
      </footer>
    </div>
  )
}
