import React, { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Upload from './component/Upload';
import Profile from './pages/profile';
import Dashboard from './pages/Dashboard'; // Make sure this exists
import Recommendation from './pages/Recommendation';
import Insights from './component/Insights';
import Userpref from './pages/Userpref';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

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
      case 'insights' :
        return <Insights />;
      case 'userpref':
        return <Userpref />; // Assuming this is the user preference page
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar onSectionChange={setActiveSection} />
      {renderSection()}
    </div>
  );
}

export default App;