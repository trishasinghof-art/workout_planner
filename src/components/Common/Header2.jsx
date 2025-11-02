import React from 'react';
import { Link } from 'react-router-dom';


function Header2() {
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
          <Link >Profile</Link>
        </nav>

        <button type="button" className="hamburger" aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Header2;