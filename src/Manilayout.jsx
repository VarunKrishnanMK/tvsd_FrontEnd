import { Outlet } from 'react-router'
import Header from './components/Header'

export default function Mainlayout() {
    return (
        <div>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}
