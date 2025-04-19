const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user/profile', userController.saveUserProfile); // Existing route to save profile
router.post('/user/recommend', userController.getShoppingRecommendations); // New route for recommendations

module.exports = router;
