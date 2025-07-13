const Post = require('../models/post');

class PostRepository {
  async create(data) {
    return Post.create(data);
  }
  async findById(id) {
    return Post.findById(id);
  }
  async update(post, updateData) {
    Object.assign(post, updateData);
    return post.save();
  }
  async deleteById(id) {
    return Post.findByIdAndDelete(id);
  }
  async findTimelinePosts(userIds) {
    return Post.find({ author: { $in: userIds } }).populate('author');
  }
}

module.exports = PostRepository;