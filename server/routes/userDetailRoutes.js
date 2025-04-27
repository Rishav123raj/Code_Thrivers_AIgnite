const express = require('express');
const router = express.Router();

const { signupUser } = require('../controllers/userDetailController'); 

// Route for signup
router.post('/user/signup', signupUser);

module.exports = router;
