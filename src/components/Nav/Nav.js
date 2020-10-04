import React from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <ul>
                    <li><Link to={'/'}>Top</Link></li>
                    <li><Link to={'/new'}>New</Link></li>
                    <li>
                        <button>🔦</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;