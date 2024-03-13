
import React from 'react';
import { useAuth } from '../context/auth.context';

function Logout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
