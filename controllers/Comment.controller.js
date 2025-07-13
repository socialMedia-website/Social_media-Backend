const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
const { authenticateUser } = require('../middleware/is-Auth');
//const { handleImageUpload } = require('../middlewares/imageUploadMiddleware');


class CommentController {
  constructor({ commentService }) {
    this.commentService = commentService;
  }

  // create comment  done
  commentonpost = async (req, res, next) => {
    try {
      const userId = req.userId;
      const postId = req.params.id;
      const { content } = req.body;
      const comment = await this.commentService.addComment(userId, postId, content);
      res.status(200).json({ message: "Comment is created.", comment });
    } catch (err) {
      next(err);
    }
  };

  getcommentById = async (req, res, next) => {
    try {
      const commentId = req.params.CommentId;
      const comment = await this.commentService.getCommentById(commentId);
      res.status(200).json({ message: "Comment retrieved successfully", comment });
    } catch (err) {
      next(err);
    }
  };

  //get post all comments
  getcomments = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const comments = await this.commentService.getPostComments(postId);
      res.status(200).json({ message: "Post comments retrieved successfully", comments });
    } catch (err) {
      next(err);
    }
  };

  //remove comment from the post
  removeComment = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const commentId = req.params.CommentId;
      await this.commentService.removeComment(postId, commentId);
      res.status(200).json({ message: "Comment and its reactions are deleted successfully!" });
    } catch (err) {
      next(err);
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const commentId = req.params.CommentId;
      const { content } = req.body;
      await this.commentService.updateComment(commentId, content);
      res.status(200).json({ message: "Comment is updated successfully!" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentController;