
const express = require('express');
const postController = require('../controllers/postsandtimeline');
const commentController=require('../controllers/comment');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

// CRUD operations for posts
router.post('/create', isAuth, postController.createpost);  //done
router.get('/timeline', isAuth, postController.getTimelinePosts);
router.put('/update', isAuth, postController.Editpost);  //done
router.delete('/delete', isAuth, postController.removepost);  //done


router.post('/reactPost',isAuth,postController.reactPost);  //done
router.get('/getPostReactions',isAuth,postController.getPostReactions);  //done

router.get('/comment',isAuth,postController.getcomments);  //done

router.post('/comment',isAuth,commentController.commentonpost); //done
//router.get('/comment/:id',isAuth,commentController);
 
router.delete('/comment',isAuth,commentController.removeComment);
router.post('/comment/react',isAuth,commentController.reactToComment); //done
router.get('/comment/react',isAuth,commentController.getCommentReactions) //done
module.exports = router;
