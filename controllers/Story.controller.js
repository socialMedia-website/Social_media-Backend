const Story = require('../models/story');
const User = require('../models/user');

class StoryController {
  constructor({ storyService }) {
    this.storyService = storyService;
  }

  createStory = async (req, res, next) => {
    try {
      const userId = req.userId;
      const content = req.body.content || '';
      let image = '';
      if (req.file) {
        image = `/uploads/stories/${req.file.filename}`;
      }
      if (!content && !image) {
        return res.status(400).json({ message: 'You must provide either content or an image.' });
      }
      const story = await this.storyService.createStory(userId, content, image);
      res.status(201).json({ message: 'Story created successfully', story });
    } catch (error) {
      next(error);
    }
  };

  getFriendsStories = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { page = 1, limit = 10 } = req.query;
      const stories = await this.storyService.getFriendsStories(userId, page, limit);
      res.status(200).json({ message: 'Friends stories retrieved successfully', stories });
    } catch (error) {
      next(error);
    }
  };

  getMyStories = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { page = 1, limit = 10 } = req.query;
      const stories = await this.storyService.getMyStories(userId, page, limit);
      res.status(200).json({ message: 'Your stories retrieved successfully', stories });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = StoryController;