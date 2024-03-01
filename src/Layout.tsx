import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <nav className="navbar">
                <NavLink to='/home'>Home</NavLink>{'  '}
                <NavLink to='/login'>Login</NavLink>{'  '}
            </nav>
            <div className="main">
                <Outlet />
            </div>
        </>
    )
}

export default Layout