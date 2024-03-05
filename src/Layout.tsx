import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <nav className="navbar">
                <NavLink to='/home' className={({isActive}) => "nav-link" + (isActive ? "selected": "")}>Home</NavLink>{'  '}
                <NavLink to='/login' className={({isActive}) => "nav-link" + (isActive ? "selected": "")}>Login</NavLink>{'  '}
                <NavLink to='/register' className={({isActive}) => "nav-link" + (isActive ? "selected": "")}>Register</NavLink>{'  '}
                <NavLink to='/foodlist' className={({isActive}) => "nav-link" + (isActive ? "selected": "")}>Food</NavLink>{'  '}
                <NavLink to='/foodcreate' className={({isActive}) => "nav-link" + (isActive ? "selected": "")}>Add Food</NavLink>{'  '}
            </nav>
            <div className="main">
                <Outlet />
            </div>
        </>
    )
}

export default Layout