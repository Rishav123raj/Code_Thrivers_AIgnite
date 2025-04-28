const express = require('express');
const router = express.Router();

const { signupUser, loginUser, updateUser } = require('../controllers/userDetailController'); 

// Route for signup
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);
router.put('/user/update', updateUser);

module.exports = router;
