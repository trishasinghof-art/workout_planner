import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header2() {
  const { user, logout } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-green">Body</span><span>Sync</span>
        </div>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link >Workout Library</Link>
          <Link >Diet</Link>
          <Link to="/profile">Profile</Link>
          {!user ? (
            <>
              <Link to="/signin" className="btn-outline">Login</Link>
            </>
          ) : (
            <>
              <button type="button" className="btn-outline" onClick={logout}>Logout</button>
            </>
          )}
        </nav>

        <button type="button" className="hamburger" aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Header2;