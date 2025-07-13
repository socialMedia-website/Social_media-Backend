const React = require('../models/react');

class ReactionRepository {
  async addReactionToPost({ type, author, post }) {
    return React.create({ type, author, post });
  }

  async addReactionToComment({ type, author, comment }) {
    return React.create({ type, author, comment });
  }

  async getReactionsByPost(postId) {
    return React.find({ post: postId });
  }

  async getReactionsByComment(commentId) {
    return React.find({ comment: commentId });
  }
}

module.exports = ReactionRepository;