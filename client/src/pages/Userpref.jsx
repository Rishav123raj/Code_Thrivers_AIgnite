import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './Userpref.css';

const Userpref = () => {
  const [profile, setProfile] = useState({
    name: '',
    shoppingFrequency: '',
    dietaryPreference: '',
    budget: '',
    categoryPriorities: [],
    packaging: ''
  });

  const [geminiResponse, setGeminiResponse] = useState('');
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isFetchingRecommendation, setIsFetchingRecommendation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleCategoryToggle = (category) => {
    const updated = profile.categoryPriorities.includes(category)
      ? profile.categoryPriorities.filter(c => c !== category)
      : [...profile.categoryPriorities, category];
    setProfile({ ...profile, categoryPriorities: updated });
  };

  const handleDownloadPDF = () => {
      const doc = new jsPDF();
      const lines = response.split('\n');
      let y = 10;
    
      doc.setFont('courier', 'normal');
      doc.setFontSize(12);
    
      lines.forEach((line, index) => {
        if (y > 280) { // Prevent text from overflowing page
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 7;
      });
    
      doc.save('receipt_analysis.pdf');
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/profile', profile);
      alert('Profile saved!');
      setIsProfileSaved(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    }
  };

  const handleRecommendShopping = async () => {
    setIsFetchingRecommendation(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/recommend', profile);
      setGeminiResponse(response.data.geminiResponse);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Failed to get recommendations');
    } finally {
      setIsFetchingRecommendation(false);
    }
  };

  const renderOptionButtons = (name, options) => (
    <div className="button-group">
      {options.map(option => (
        <button
          type="button"
          key={option}
          className={profile[name] === option ? 'option-button selected' : 'option-button'}
          onClick={() => setProfile({ ...profile, [name]: option })}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="userpref-container">
      {/* Left: User Profile Form */}
      <div className="user-form-box">
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Set Your Preferences & Explore Nature-Inspired Shopping Picks</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={profile.name}
            required
          />

          <label>Shopping Frequency</label>
          {renderOptionButtons('shoppingFrequency', ['Daily', 'Weekly', 'Monthly'])}

          <label>Dietary Preference</label>
          {renderOptionButtons('dietaryPreference', ['Veg', 'Non-Veg', 'Vegan'])}

          <label>Budget (in ₹)</label>
          <input
            type="number"
            name="budget"
            placeholder="Enter Budget"
            onChange={handleChange}
            value={profile.budget}
          />

          <label>Preferred Packaging</label>
          {renderOptionButtons('packaging', ['Minimal', 'Reusable', 'Biodegradable'])}

          <label>Category Priorities</label>
          <div className="category-options">
            {['Organic', 'Local', 'Fair-Trade', 'Eco-Friendly'].map(category => (
              <button
                key={category}
                type="button"
                className={profile.categoryPriorities.includes(category) ? 'option-button selected' : 'option-button'}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit">Save Profile</button>
            <button
              type="button"
              onClick={handleRecommendShopping}
              disabled={!isProfileSaved || isFetchingRecommendation}
            >
              {isFetchingRecommendation ? 'Fetching...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
      </div>

      {/* Right: Gemini Recommendations */}
      <div className="recommendation-box">
        <h2>Shopping Recommendations</h2>
        <div className="recommendation-output">
          {isFetchingRecommendation ? (
            <p>Generating personalized recommendations...</p>
          ) : (
            <pre>{geminiResponse || "No recommendations yet. Submit your profile to get started!"}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userpref;
