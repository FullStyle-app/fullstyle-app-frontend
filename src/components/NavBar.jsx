// Navbar.jsx

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faSignOutAlt, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';
import { AuthContext } from '../context/auth.context';
import logo from '../img/logo.png';

function Navbar() {
  const { isLoggedIn, logOutUser,  user  } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      {!showMenu && ( // Render the hamburger icon only when the menu is not shown
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} style={{ color: "#FFC159" }} />
        </div>
      )}
      <ul ref={menuRef} className={`nav-links ${showMenu ? 'show-menu' : ''}`}>
        <li>
          <Link to="/">
            <button>
              <FontAwesomeIcon icon={faHome} style={{ color:  "#FFC159" }} />
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button>
              <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#FFC159" }} />
              About Us
            </button>
          </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup">
                <button>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#FFC159" }} />
                  Sign Up
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button>
                  <FontAwesomeIcon icon={faSignInAlt} style={{ color: "#FFC159" }} />
                  Login
                </button>
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && user && (
          <li>
            <Link to={`/creators/${user._id}`}>
              <button>
                <FontAwesomeIcon icon={faUser} style={{ color:"#FFC159"}} />
                {user.username}
              </button>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logOutUser}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#FFC159" }} />
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
