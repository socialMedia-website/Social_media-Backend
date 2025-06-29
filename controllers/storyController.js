const Story = require('../models/story');
const User = require('../models/user');

exports.createStory = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const { content, image } = req.body;

        const story = new Story({
            content,
            image,
            creator: userId,
            createdAt: Date.now(),
        });

        await story.save();

        res.status(201).json({ message: 'Story created successfully', story });
    } catch (error) {
        next(error);
    }
};

exports.getFriendsStories = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const { page = 1, limit = 10 } = req.query;

        const user = await User.findById(userId).populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friendsIds = user.friends.map((friend) => friend._id);

        const stories = await Story.find({
            creator: { $in: friendsIds },
            createdAt: { $gte: Date.now() - 24 * 60 * 60 * 1000 }, 
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({ message: 'Friends stories retrieved successfully', stories });
    } catch (error) {
        next(error);
    }
};