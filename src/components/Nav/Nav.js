import React from "react"
import {Link, withRouter} from "react-router-dom"
import {ThemeConsumer} from "../../context/Theme"

const Nav = (props) => {
    return (
        <ThemeConsumer>
            {(value) => ( 
                <nav className={`nav ${value.theme === 'dark' ? 'dark-theme' : ''}`}>
                    <div className="container">
                        <ul className="nav__listing">
                            <li className={`nav__listing-item ${props.location.pathname === '/' ? 'active' : ''}`} ><Link to={'/'}>Top</Link></li>
                            <li className={`nav__listing-item ${props.location.pathname === '/new' ? 'active' : ''}`}><Link to={'/new'}>New</Link></li>
                            <li className="nav__listing-item">
                                {
                                    value.theme === 'light' ? <button onClick={() => value.themeChange()}>🔦</button> : <button onClick={() => value.themeChange()}>💡</button>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </ThemeConsumer>
    )
}

export default withRouter(Nav);