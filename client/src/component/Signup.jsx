import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = ({ onSignupSuccess, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/user/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
      }));
      setError('');
      setIsSignedUp(true);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (isSignedUp) {
      onSignupSuccess();
    }
  }, [isSignedUp, onSignupSuccess]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Join EcoShop 🌿</h2>
        <p>Create your account to start your sustainable journey!</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="already-account">
          Already have an account?{' '}
          <span className="login-link" onClick={onGoToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
