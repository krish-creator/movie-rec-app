import './Navbar.css'
import logo from '../../assets/clapperboard.png'
import searchIcon from '../../assets/search.png'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}>
                    <img src={logo} alt="movieR Logo" className='nav-logo' />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown nav-title" >
                            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Movies
                            </NavLink>
                            <ul className="dropdown-menu">
                                <NavLink className="dropdown-item" to={'popular'}>Popular</NavLink>
                                <NavLink className="dropdown-item" to={'now-playing'}>Now Playing</NavLink>
                                <NavLink className="dropdown-item" to={'upcoming'}>Upcoming</NavLink>
                                <NavLink className="dropdown-item" to={'top-rated'}>Top Rated</NavLink>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn" type="submit" onClick={() => { navigate('search') }}><img src={searchIcon} alt="search-icon" className='search-btn' /></button>
                    </form>
                    <button type="button" className="btn" id='login-btn' onClick={() => { navigate('login') }}>Login</button>
                    <button type="button" className="btn" id='signup-btn' onClick={() => { navigate('register') }}>Register</button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar