class PostService {
  constructor({ postRepository }) {
    this.postRepository = postRepository;
  }

  async createPost(content, authorId, image) {
    const post = await this.postRepository.create({ content, author: authorId, image });
    return post;
  }

  async editPost(postId, updateData) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new Error('Post not found');
    return this.postRepository.update(post, updateData);
  }

  async removePost(postId) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new Error('Post not found');
    await this.postRepository.deleteById(postId);
    return post;
  }

  async getTimelinePosts(userIds) {
    return this.postRepository.findTimelinePosts(userIds);
  }
}

module.exports = PostService;