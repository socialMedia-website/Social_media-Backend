const express = require('express');
const { createStory, getFriendsStories } = require('../controllers/storyController');
const { validateCreateStory } = require('../validations/storyValidation');
const authenticateUser = require('../middleware/is-Auth');

const router = express.Router();

// Create a story
router.post('/create', authenticateUser, validateCreateStory, createStory);

// Get friends' stories with pagination
router.get('/friends', authenticateUser, getFriendsStories);

module.exports = router;