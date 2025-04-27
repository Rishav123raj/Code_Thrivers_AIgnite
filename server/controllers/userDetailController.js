const UserDetails = require('../models/UserDetails');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register new user
// @route   POST /api/signup
// @access  Public
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserDetails({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).send('Server Error');
  }
};


// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserDetails.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // JWT Token creation
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        message: 'Login successful!',
        token, // sending token
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = { signupUser, loginUser };