import React, { useState } from 'react';
import './Navbar.css';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">DEVOPS-SOLUTION</div>
      <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <a href="front.js">Home</a>
        <li>Explore</li>
        <li>About</li>
        <li className="nav-contact">Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
