
const express = require('express');
const postController = require('../controllers/postsandtimeline');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

// CRUD operations for posts
router.post('/create', isAuth, postController.createpost);
router.get('/timeline', isAuth, postController.getTimelinePosts);
router.put('/update/:id', isAuth, postController.Editpost);
router.delete('/delete/:id', isAuth, postController.removepost);

// Like and comment on posts
router.post('/like/:id', isAuth, postController.likePost);
router.post('/comment/:id', isAuth, postController.commentonpost);

module.exports = router;
