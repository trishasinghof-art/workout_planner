import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-green">Body</span><span>Sync</span>
        </div>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/trainers">Trainers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/signin" className="btn-outline">Signin</Link>
        </nav>

        <button type="button" className="hamburger" aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
