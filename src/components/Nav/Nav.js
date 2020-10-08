import React from "react"
import {Link, withRouter} from "react-router-dom"

const Nav = (props) => {
    return (
        <nav className="nav">
            <div className="container">
                <ul className="nav__listing">
                    <li className={`nav__listing-item ${props.location.pathname === '/' ? 'active' : ''}`} ><Link to={'/'}>Top</Link></li>
                    <li className={`nav__listing-item ${props.location.pathname === '/new' ? 'active' : ''}`}><Link to={'/new'}>New</Link></li>
                    <li className="nav__listing-item">
                        <button>🔦</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Nav);