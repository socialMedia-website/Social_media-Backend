const express = require('express');
const { makeInvoker } = require('awilix-express');
const { validateComment } = require('../validations/Comment.validation');
const authenticateUser = require('../middleware/is-Auth');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.commentController);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints for managing comments on posts
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *                 description: Comment content
 *     responses:
 *       200:
 *         description: Comment is created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
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
 *         description: List of comments
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/comments/{postId}/{commentId}:
 *   get:
 *     summary: Get a specific comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment details
 *       401:
 *         description: Unauthorized
 *
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
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
 *               content:
 *                 type: string
 *                 description: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 */

router.post('/:postId', authenticateUser, validateComment, api('commentonpost'));
router.get('/:postId', authenticateUser, api('getcomments'));
router.get('/:postId/:commentId', authenticateUser, api('getcommentById'));
router.put('/:postId/:commentId', authenticateUser, validateComment, api('updateComment'));
router.delete('/:postId/:commentId', authenticateUser, api('removeComment'));

module.exports = router;