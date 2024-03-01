import { NavLink } from "react-router-dom"

function Layout() {
    return (
        <>
            <nav className="navbar">
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </nav>
        </>
    )
}

export default Layout