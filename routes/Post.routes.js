const express = require('express');
const { makeInvoker } = require('awilix-express');
const isAuth = require('../middleware/is-Auth');
const validateObjectIds = require('../middleware/validateId');
const { validatePost } = require('../validations/Post.validation');

const router = express.Router();
const api = makeInvoker((cradle) => cradle.postController);

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

router.post('/', isAuth, validatePost, api('createpost'));
router.get('/timeline', isAuth, api('getTimelinePosts'));

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

router.put('/:id', isAuth, validateObjectIds, api('Editpost'));

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

router.delete('/:id', isAuth, validateObjectIds, api('removepost'));

module.exports = router;
