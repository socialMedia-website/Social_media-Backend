const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
const { authenticateUser } = require('../middleware/is-Auth');
//const { handleImageUpload } = require('../middlewares/imageUploadMiddleware');
class PostController {
  constructor({ postService }) {
    this.postService = postService;
  }

  createpost = async (req, res, next) => {
    try {
      const { content, image } = req.body;
      const authorId = req.userId;
      const post = await this.postService.createPost(content, authorId, image);
      res.status(201).json({ message: "Post is created successfully!", post });
    } catch (err) {
      next(err);
    }
  };

  //done
  Editpost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      const post = await this.postService.editPost(postId, updateData);
      res.status(200).json({ message: "Post is Updated successfully!", post });
    } catch (err) {
      next(err);
    }
  };

  removepost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      await this.postService.removePost(postId);
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
      next(err);
    }
  };

  getTimelinePosts = async (req, res, next) => {
    try {
      // You need to get the user's following IDs here
      // Example: const user = await User.findById(req.userId).populate('following');
      // const userIds = user.following.map(f => f._id);
      // For now, just use the user's own ID:
      const userIds = [req.userId];
      const posts = await this.postService.getTimelinePosts(userIds);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostController;
