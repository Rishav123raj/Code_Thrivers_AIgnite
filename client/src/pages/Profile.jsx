import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Assuming you're managing active tabs

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      <div className="profile-tabs">
        <button className={activeTab === 'profile' ? 'active-tab' : ''} onClick={() => setActiveTab('profile')}>👤 Profile</button>
        <button className={activeTab === 'preferences' ? 'active-tab' : ''} onClick={() => setActiveTab('preferences')}>⚙️ Preferences</button>
        <button className={activeTab === 'goals' ? 'active-tab' : ''} onClick={() => setActiveTab('goals')}>🎯 Goals</button>
        <button className={activeTab === 'alerts' ? 'active-tab' : ''} onClick={() => setActiveTab('alerts')}>🔔 Alerts</button>
      </div>

      <div className="profile-sections">
        {/* Profile Section */}
        {activeTab === 'profile' && (
  <div className="profile-sections">
    {/* Left Card: Account Summary */}
    <div className="profile-card">
      <h2>👤 Your Account</h2>
      <div className="avatar"></div>
      <h3>Alex Johnson</h3>
      <p className="subtext">Member since April 2025</p>

      <div className="level-info">
        <div className="level-label">
          <span>EcoShop Level</span>
          <span className="level-badge silver">Silver</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className="account-stats">
        <p><strong>Total Receipts Scanned:</strong> 24</p>
        <p><strong>Total Items Analyzed:</strong> 356</p>
        <p><strong>Carbon Footprint Reduced:</strong> 142 kg</p>
      </div>

      <button className="settings-btn">⚙️ Account Settings</button>
    </div>

    {/* Right Card: Personal Information */}
    <div className="profile-card">
      <h2>📋 Personal Information</h2>
      <p className="subtext">Update your personal details</p>

      <form className="profile-form">
        <label>Full Name</label>
        <input type="text" defaultValue="Alex Johnson" />

        <label>Email Address</label>
        <input type="email" defaultValue="alex.johnson@example.com" />

        <label>Phone Number</label>
        <input type="tel" defaultValue="(555) 123-4567" />

        <label>Password</label>
        <input type="password" value="********" readOnly />
        <p className="small-note">
          Last changed 30 days ago. <a href="#">Change password</a>
        </p>
      </form>

      <div className="account-actions">
        <button className="btn save">💾 Save Changes</button>
        <button className="btn export">📤 Export My Data</button>
        <button className="btn delete">⚠️ Delete Account</button>
      </div>
    </div>
  </div>
)}

        {/* Preferences Section */}
        {activeTab === 'preferences' && (
  <div className="profile-card">
    <h2>⚙️ Shopping Preferences</h2>
    <p className="subtext">Customize your preferences to get better recommendations</p>

    {/* Food Preferences */}
    <div className="preference-section">
      <label><strong>Food Preferences & Dietary Restrictions</strong></label>
      <input type="text" defaultValue="Mostly vegetarian, no dairy" />
    </div>

    {/* Preferred Stores */}
    <div className="preference-section">
      <label><strong>Preferred Store Locations</strong></label>
      <div className="store-tags">
        <span className="store-tag">Whole Foods ×</span>
        <span className="store-tag">Trader Joe's ×</span>
        <span className="store-tag">Safeway ×</span>
        <span className="store-tag add">+ Add Store</span>
      </div>
    </div>

    {/* Sustainability Preferences */}
    <div className="preference-section">
      <label><strong>Sustainability Priorities</strong></label>

      <div className="toggle-level">
        <div className="toggle-label">
          <input type="checkbox" defaultChecked />
          <span>Prioritize Organic Products</span>
        </div>
        <span className="level">High</span>
      </div>

      <div className="toggle-level">
        <div className="toggle-label">
          <input type="checkbox" defaultChecked />
          <span>Prefer Local Products</span>
        </div>
        <span className="level">High</span>
      </div>

      <div className="toggle-level">
        <div className="toggle-label">
          <input type="checkbox" />
          <span>Minimize Packaging</span>
        </div>
        <span className="level">Medium</span>
      </div>

      <div className="toggle-level">
        <div className="toggle-label">
          <input type="checkbox" />
          <span>Low Carbon Footprint</span>
        </div>
        <span className="level">Low</span>
      </div>
    </div>

    {/* Price Sensitivity */}
    <div className="preference-section">
      <label><strong>Price Sensitivity</strong></label>
      <p className="subtext">Balance between saving money and sustainability</p>
      <input type="range" min="1" max="3" defaultValue="2" className="slider" />
      <div className="slider-labels">
        <span>Save Money</span>
        <span>Balance</span>
        <span>Sustainability</span>
      </div>
    </div>

    <button className="btn save" style={{ marginTop: '20px' }}>💾 Save Preferences</button>
  </div>
)}

{activeTab === 'goals' && (
  <div className="profile-card">
    <h2>🎯 Shopping & Sustainability Goals</h2>
    <p className="subtext">Set targets to improve your shopping habits</p>

    {/* Budget Goal */}
    <div className="goal-section">
      <label><strong>Monthly Budget Goal</strong></label>
      <input type="range" min="100" max="1000" step="50" defaultValue="350" className="slider" />
      <div className="slider-labels">
        <span>$100</span>
        <span>$1000</span>
      </div>
      <p><strong>Current Monthly Spend:</strong> $346.75</p>
      <p className="goal-status success">
        ✅ You're currently spending $3.25 less than your budget goal.
      </p>
    </div>

    {/* Waste Reduction Goal */}
    <div className="goal-section">
      <label><strong>Waste Reduction Goal</strong></label>
      <input type="range" min="0" max="100" step="5" defaultValue="75" className="slider" />
      <div className="slider-labels">
        <span>0%</span>
        <span>100%</span>
      </div>
      <p><strong>Current Waste Reduction:</strong> 64%</p>
      <p className="goal-status warning">
        ⚠️ You're currently not meeting your waste reduction goal. Improve by 11% to reach your target.
      </p>
    </div>

    {/* Additional Goals */}
    <div className="goal-section">
      <label><strong>Additional Goals</strong></label>

      <div className="toggle-item">
        <input type="checkbox" defaultChecked />
        <span>Increase organic purchases by 20%</span>
      </div>

      <div className="toggle-item">
        <input type="checkbox" />
        <span>Support more local producers</span>
      </div>

      <div className="toggle-item">
        <input type="checkbox" defaultChecked />
        <span>Buy more seasonal produce</span>
      </div>
    </div>

    <button className="btn save" style={{ marginTop: '20px' }}>💾 Update Goals</button>
  </div>
)}

        {/* Notification Preferences Section */}
        {activeTab === 'alerts' && (
          <div className="profile-card">
            <h2>🔔 Notification Preferences</h2>
            <p className="subtext">Manage how and when you receive alerts</p>

            <div className="notification-section">
              <div className="toggle-group">
                <label>
                  Shopping Reminders
                  <span className="description">Get notified when it's time to stock up</span>
                </label>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="toggle-group">
                <label>
                  Price Alerts
                  <span className="description">Notifications for price drops on favorite items</span>
                </label>
                <input type="checkbox" />
              </div>

              <div className="toggle-group">
                <label>
                  Food Expiration Alerts
                  <span className="description">Reminders to use items before they expire</span>
                </label>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="toggle-group">
                <label>
                  Eco Tips
                  <span className="description">Weekly sustainability tips and advice</span>
                </label>
                <input type="checkbox" />
              </div>

              <div className="toggle-group">
                <label>
                  Budget Alerts
                  <span className="description">Warnings when approaching your budget limit</span>
                </label>
                <input type="checkbox" />
              </div>

              <div className="toggle-group">
                <label>
                  Marketing Communications
                  <span className="description">Updates, new features, and offers</span>
                </label>
                <input type="checkbox" defaultChecked />
              </div>
            </div>

            <h3 style={{ marginTop: '24px' }}>Notification Methods</h3>
            <div className="notification-methods">
              <div className="toggle-group">
                <label>Email Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="toggle-group">
                <label>Push Notifications</label>
                <input type="checkbox" />
              </div>
              <div className="toggle-group">
                <label>SMS Notifications</label>
                <input type="checkbox" />
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button className="btn save">💾 Save Notification Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
