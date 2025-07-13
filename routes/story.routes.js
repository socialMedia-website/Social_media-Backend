const express = require('express');
const { makeInvoker } = require('awilix-express');
const { validateCreateStory } = require('../validations/Story.validation');
const authenticateUser = require('../middleware/is-Auth');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.storyController);

/**
 * @swagger
 * tags:
 *   name: Stories
 *   description: Endpoints for creating and viewing stories
 */

/**
 * @swagger
 * /api/stories/create:
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Story content
 *               image:
 *                 type: string
 *                 description: Image URL (optional)
 *     responses:
 *       201:
 *         description: Story created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 * /api/stories/friends:
 *   get:
 *     summary: Get friends' stories (last 24 hours)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of stories per page
 *     responses:
 *       200:
 *         description: Friends' stories retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/create', authenticateUser, validateCreateStory, api('createStory'));
router.get('/friends', authenticateUser, api('getFriendsStories'));

module.exports = router;