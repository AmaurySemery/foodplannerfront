import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <nav className="navbar">
                <NavLink to='/home'>Home</NavLink>{'  '}
                <NavLink to='/login'>Login</NavLink>{'  '}
                <NavLink to='/register'>Register</NavLink>{'  '}
                <NavLink to='/foodlist'>Food</NavLink>{'  '}
                <NavLink to='/food-create'>Add Food</NavLink>{'  '}
            </nav>
            <div className="main">
                <Outlet />
            </div>
        </>
    )
}

export default Layout