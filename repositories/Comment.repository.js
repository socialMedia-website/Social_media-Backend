const Comment = require('../models/comment');
const Post = require('../models/post');
const React = require('../models/react');

class CommentRepository {
  async createComment(data) {
    return Comment.create(data);
  }

  async findById(id) {
    return Comment.findById(id).populate('reactions');
  }

  async findPostById(id) {
    return Post.findById(id);
  }

  async saveComment(comment) {
    return comment.save();
  }

  async addCommentToPost(post, commentId) {
    post.comments.push(commentId);
    return post.save();
  }

  async getPostComments(postId) {
    const post = await Post.findById(postId).populate('comments');
    return post ? post.comments : [];
  }

  async deleteComment(commentId) {
    return Comment.findByIdAndDelete(commentId);
  }

  async removeCommentFromPost(postId, commentId) {
    return Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }, { new: true });
  }

  async deleteReactionsByComment(commentId) {
    return React.deleteMany({ comment: commentId });
  }

  async updateCommentContent(comment, content) {
    comment.content = content;
    return comment.save();
  }
}

module.exports = CommentRepository;