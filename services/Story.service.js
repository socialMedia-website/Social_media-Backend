class StoryService {
  constructor({ storyRepository, userRepository }) {
    this.storyRepository = storyRepository;
    this.userRepository = userRepository;
  }

  async createStory(userId, content, image) {
    return this.storyRepository.create({
      content,
      image,
      creator: userId,
      createdAt: Date.now(),
    });
  }

  async getFriendsStories(userId, page, limit) {
    const user = await this.userRepository.findById(userId).populate('friends');
    if (!user) throw new Error('User not found');
    const friendsIds = user.friends.map(friend => friend._id);
    return this.storyRepository.findFriendsStories(friendsIds, page, limit);
  }
}

module.exports = StoryService;