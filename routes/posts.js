
const express = require('express');
const postController = require('../controllers/postsandtimeline');
const commentController=require('../controllers/comment');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();


/**
 * @swagger
 * /api/posts/:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
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
 *               image:
 *                 type: string
 *                 description: URL of the image
 *     responses:
 *       201:
 *         description: Post is created successfully
 *       500:
 *         description: Server error
 */

router.post('/', isAuth, postController.createpost); 
router.get('/timeline', isAuth, postController.getTimelinePosts);
/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: URL of the image
 *     responses:
 *       200:
 *         description: Post is updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.put('/:id', isAuth, postController.Editpost); 
/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', isAuth, postController.removepost); 

/**
 * @swagger
 * /api/posts/{id}/comment:
 *   post:
 *     summary: Create a comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
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
 *         description: Comment is created successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.post('/:id/comment',isAuth,commentController.commentonpost);
 
/**
 * @swagger
 * /api/posts/{id}/comment/{CommentId}:
 *   get:
 *     summary: Get comment by ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: CId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Get comment successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:id/comment/:CommentId',isAuth,commentController.getcommentById)
/**
 * @swagger
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:id/comment',isAuth,commentController.getcomments);  
/**
 * @swagger
 * /api/posts/{id}/comment/{CommentId}:
 *   put:
 *     summary: Update comment content
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: CId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.put('/:id/comment/:CommentId',isAuth,commentController.updateComment); 
 /**
 * @swagger
 * /api/posts/{id}/comment/{CommentId}:
 *   delete:
 *     summary: Remove comment from post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: CId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.delete('/:id/comment/:CommentId',isAuth,commentController.removeComment);
/**
 * @swagger
 * /api/posts/{id}/react:
 *   post:
 *     summary: React to a post
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "like"
 *     responses:
 *       200:
 *         description: Reaction updated successfully
 *       401:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.post('/:id/react/',isAuth,postController.reactPost); 
/**
 * @swagger
 * /api/posts/{id}/react:
 *   get:
 *     summary: Get all reactions for a specific post
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Successfully retrieved reactions summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reactionsSummary:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:id/react/',isAuth,postController.getPostReactions);  
/**
 * @swagger
 * /api/posts/{id}/comment/{CommentId}/react:
 *   post:
 *     summary: React to comment
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: CId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: like
 *     responses:
 *       200:
 *         description: Reaction updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.post('/:id/comment/:CommentId/react',isAuth,commentController.reactToComment); 
/**
 * @swagger
 * /api/posts/{id}/comment/{CommentId}/react:
 *   get:
 *     summary: Get all comment reactions
 *     tags: [Reactions]  
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: CId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Reactions summary
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.get('/:id/comment/:CommentId/react',isAuth,commentController.getCommentReactions) 
module.exports = router;
