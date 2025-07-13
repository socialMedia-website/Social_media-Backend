class ReactionController {
  constructor({ reactionService }) {
    this.reactionService = reactionService;
  }

  reactToPost = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { postId } = req.params;
      const { type } = req.body;
      const reaction = await this.reactionService.reactToPost(userId, postId, type);
      res.status(201).json({ message: 'Reacted to post', reaction });
    } catch (err) {
      next(err);
    }
  };

  getPostReactions = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const reactions = await this.reactionService.getPostReactions(postId);
      res.status(200).json({ reactions });
    } catch (err) {
      next(err);
    }
  };

  reactToComment = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { commentId } = req.params;
      const { type } = req.body;
      const reaction = await this.reactionService.reactToComment(userId, commentId, type);
      res.status(201).json({ message: 'Reacted to comment', reaction });
    } catch (err) {
      next(err);
    }
  };

  getCommentReactions = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const reactions = await this.reactionService.getCommentReactions(commentId);
      res.status(200).json({ reactions });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ReactionController;