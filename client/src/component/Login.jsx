import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post('http://localhost:5000/api/user/login', loginData);
      console.log('Login successful:', res.data);

      // Save token
      localStorage.setItem('token', res.data.token);

      // Save user info (name + email) locally
      localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));

      setError('');
      onLoginSuccess();  // Trigger onLoginSuccess to update authentication state
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 🌿</h2>

        {error && <div className="error">{error}</div>}

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
