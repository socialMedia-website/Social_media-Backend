class ReactionService {
  constructor({ reactionRepository }) {
    this.reactionRepository = reactionRepository;
  }

  async reactToPost(userId, postId, type) {
    return this.reactionRepository.addReactionToPost({ type, author: userId, post: postId });
  }

  async reactToComment(userId, commentId, type) {
    return this.reactionRepository.addReactionToComment({ type, author: userId, comment: commentId });
  }

  async getPostReactions(postId) {
    return this.reactionRepository.getReactionsByPost(postId);
  }

  async getCommentReactions(commentId) {
    return this.reactionRepository.getReactionsByComment(commentId);
  }
}

module.exports = ReactionService;