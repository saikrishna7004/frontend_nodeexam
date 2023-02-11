import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCog, faSignIn, faSignOut, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link, useLocation } from "react-router-dom";
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/collapse'

const Navbar = ({ token, setToken }) => {

    const location = useLocation()
    const [hideNavbar, setHideNavbar] = useState(false)

    useEffect(() => {
        if (location.pathname === '/exampage') {
            setHideNavbar(true)
        } else {
            setHideNavbar(false)
        }
    }, [location])


    return (<>
        {!hideNavbar && <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">College Exam</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/exam">Exam Page</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/results">Results</NavLink>
                        </li>
                        {
                            token && <><li className="nav-item">
                                <NavLink className="nav-link" to="/upload">Upload</NavLink>
                            </li><li className="nav-item">
                                    <NavLink className="nav-link" to="/admin">Admin</NavLink>
                                </li></>
                        }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faCog} />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-2">
                                {
                                    token && <><li><Link className='dropdown-item' to='/'><FontAwesomeIcon icon={faUserEdit} /> Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li></>
                                }
                                {
                                    !token && <li><Link className='dropdown-item' to='/login'><FontAwesomeIcon icon={faSignIn} /> Login</Link></li>
                                }
                                {
                                    token && <li><Link className='dropdown-item' to='/logout'><FontAwesomeIcon icon={faSignOut} /> Logout</Link></li>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>}
    </>
    )
}

export default Navbar