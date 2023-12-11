import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div>
            <Link className="navbar-brand" to={'/sign-in'}>
              Event Management
            </Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default NavBar;