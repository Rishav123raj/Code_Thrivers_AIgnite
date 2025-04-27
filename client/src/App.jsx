import React, { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Signup from './component/SignUp';  
import Login from './component/Login';
import Upload from './component/Upload';
import Profile from './pages/profile';
import Dashboard from './pages/Dashboard'; // Make sure this exists
import Recommendation from './pages/Recommendation';
import Insights from './component/Insights';
import Userpref from './pages/Userpref';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'profile':
        return <Profile />;
      case 'recommendations':
        return <Recommendation />;
      case 'insights':
        return <Insights />;
      case 'userpref':
        return <Userpref />;
      case 'signup':
        return (
          <Signup
            onSignupSuccess={() => setActiveSection('login')}
            onGoToLogin={() => setActiveSection('login')}
          />
        );
      case 'login':
        return (
          <Login
            onLoginSuccess={() => {
              setActiveSection('dashboard');
              setIsAuthenticated(true); // Update authentication status
            }}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar onSectionChange={setActiveSection} isAuthenticated={isAuthenticated} /> {/* Pass the auth status */}
      {renderSection()}
    </div>
  );
}

export default App;
