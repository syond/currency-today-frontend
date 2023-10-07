import Navbar from "./Navbar"

export default function Layout({ children }) {
    return <div className="h-screen">
        <header></header>

        <Navbar />

        <main className="mb-auto">
            {children}
        </main>

        <footer className="fixed left-0 bottom-0 bg-purple-600 w-full h-16 flex justify-center items-center
            text-neutral font-medium">
            All rights reserver - 2023
        </footer>
    </div>
}