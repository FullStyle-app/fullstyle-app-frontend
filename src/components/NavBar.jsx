import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <button>
              <FontAwesomeIcon icon={faHome} />
              Home
            </button>
          </Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/signup">
              <button>
                <FontAwesomeIcon icon={faUser} />
                Sign Up
              </button>
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login">
              <button>
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </button>
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </li>
        )}
        <li>
          <Link to="/about">
            <button>
              <FontAwesomeIcon icon={faInfoCircle} />
              About
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
