class CommentService {
  constructor({ commentRepository }) {
    this.commentRepository = commentRepository;
  }

  async addComment(userId, postId, content) {
    const post = await this.commentRepository.findPostById(postId);
    if (!post) throw new Error("Post not found");
    const comment = await this.commentRepository.createComment({ content, creator: userId, post: postId });
    await this.commentRepository.addCommentToPost(post, comment._id);
    return comment;
  }

  async getCommentById(commentId) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async getPostComments(postId) {
    return this.commentRepository.getPostComments(postId);
  }

  async removeComment(postId, commentId) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    await this.commentRepository.removeCommentFromPost(postId, commentId);
    await this.commentRepository.deleteReactionsByComment(commentId);
    await this.commentRepository.deleteComment(commentId);
    return true;
  }

  async updateComment(commentId, content) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    return this.commentRepository.updateCommentContent(comment, content);
  }
}

module.exports = CommentService;