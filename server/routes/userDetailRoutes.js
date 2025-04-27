const express = require('express');
const router = express.Router();

const { signupUser, loginUser} = require('../controllers/userDetailController'); 

// Route for signup
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);

module.exports = router;
