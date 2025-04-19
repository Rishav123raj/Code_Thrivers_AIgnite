import React, { useState } from 'react';
import axios from 'axios';
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

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, opt => opt.value);
    setProfile({ ...profile, categoryPriorities: options });
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

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>User Profile Setup</h2>

        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />

        <select name="shoppingFrequency" onChange={handleChange} required>
          <option value="">Shopping Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <select name="dietaryPreference" onChange={handleChange} required>
          <option value="">Dietary Preference</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Vegan">Vegan</option>
        </select>

        <input type="number" name="budget" placeholder="Budget in ₹" onChange={handleChange} />

        <label className="label-multi">Category Priorities</label>
        <select multiple name="categoryPriorities" onChange={handleMultiSelect}>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Dairy">Dairy</option>
        </select>

        <select name="packaging" onChange={handleChange} required>
          <option value="">Preferred Packaging</option>
          <option value="Eco-Friendly">Eco-Friendly</option>
          <option value="Plastic">Plastic</option>
          <option value="No Preference">No Preference</option>
        </select>

        <button type="submit">Save Profile</button>
      </form>

      {isProfileSaved && (
        <button onClick={handleRecommendShopping} disabled={isFetchingRecommendation} className="recommend-btn">
          {isFetchingRecommendation ? 'Fetching Recommendation...' : geminiResponse ? 'Recommendation Fetched' : 'Recommend Shopping Behavior'}
        </button>
      )}

      {geminiResponse && (
        <div className="recommendation-response">
          <h3>Recommended Shopping Behavior:</h3>
          <pre>{geminiResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default Userpref;