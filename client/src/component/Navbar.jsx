import React from 'react';
import './Navbar.css';

const Navbar = ({ onSectionChange, isAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="logo">EcoShop</div>

      <div className={`nav-links ${!isAuthenticated ? 'center-links' : ''}`}>
        {isAuthenticated ? (
          <>
            <a href="#" onClick={() => onSectionChange('dashboard')}>Dashboard</a>
            <a href="#" onClick={() => onSectionChange('upload')}>Upload Receipt</a>
            <a href="#" onClick={() => onSectionChange('insights')}>Insights</a>
            <a href="#" onClick={() => onSectionChange('userpref')}>User Preferences</a>
            <a href="#" onClick={() => onSectionChange('recommendations')}>Recommendations</a>
          </>
        ) : (
          <>
            <a href="#" onClick={() => onSectionChange('about')}>About</a>
            <a href="#" onClick={() => onSectionChange('signup')}>Sign Up</a>
            <a href="#" onClick={() => onSectionChange('login')}>Login</a>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="auth-links">
          <a href="#" onClick={() => onSectionChange('profile')}>Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
