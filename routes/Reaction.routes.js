const express = require('express');
const { makeInvoker } = require('awilix-express');
const authenticateUser = require('../middleware/is-Auth');
const { validateReaction } = require('../validations/Reaction.validation');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.reactionController);

/**
 * @swagger
 * tags:
 *   name: Reactions
 *   description: Endpoints for reacting to posts and comments
 */

/**
 * @swagger
 * /api/reactions/post/{postId}:
 *   post:
 *     summary: React to a post
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Like, Love, Angry, Sad, Care]
 *                 description: Reaction type
 *     responses:
 *       201:
 *         description: Reacted to post
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all reactions for a post
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: List of reactions
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reactions/comment/{commentId}:
 *   post:
 *     summary: React to a comment
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Like, Love, Angry, Sad, Care]
 *                 description: Reaction type
 *     responses:
 *       201:
 *         description: Reacted to comment
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all reactions for a comment
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: List of reactions
 *       401:
 *         description: Unauthorized
 */

router.post('/post/:postId', authenticateUser, validateReaction, api('reactToPost'));
router.get('/post/:postId', authenticateUser, api('getPostReactions'));

// Comment reactions
router.post('/comment/:commentId', authenticateUser, validateReaction, api('reactToComment'));
router.get('/comment/:commentId', authenticateUser, api('getCommentReactions'));

module.exports = router;