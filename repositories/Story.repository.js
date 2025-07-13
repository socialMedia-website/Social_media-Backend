const Story = require('../models/story');

class StoryRepository {
  async create(data) {
    return Story.create(data);
  }

  async findFriendsStories(friendsIds, page = 1, limit = 10) {
    return Story.find({
      creator: { $in: friendsIds },
      createdAt: { $gte: Date.now() - 24 * 60 * 60 * 1000 },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  }
}

module.exports = StoryRepository;