import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';
import { AuthContext } from '../context/auth.context';
import logo from '../img/logo.png';

function Navbar() {
  const { isLoggedIn, logOutUser,  user  } = useContext(AuthContext);

  return (
    <nav className="navbar">
       <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-links">
     
     

        <li>
          <Link to="/">
            <button>
              <FontAwesomeIcon icon={faHome} style={{ color: 'orange' }} />
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button>
              <FontAwesomeIcon icon={faInfoCircle} style={{ color: 'orange' }} />
              About Us
            </button>
          </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup">
                <button>
                  <FontAwesomeIcon icon={faUser} style={{ color: 'orange' }} />
                  Sign Up
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button>
                  <FontAwesomeIcon icon={faSignInAlt} style={{ color: 'orange' }} />
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
                <FontAwesomeIcon icon={faUser} style={{ color: 'orange' }} />
                {user.username}
              </button>
            </Link>
          </li>
        )}
         {isLoggedIn && (
          <li>
            <button onClick={logOutUser}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'orange' }} />
              Logout
            </button>
          </li>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
