import Sidebar from "./Sidebar"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto">
        {children}
      </main>
    </div>
  )
}
