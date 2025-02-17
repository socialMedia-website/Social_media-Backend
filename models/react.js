const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Like', 'Love', 'Angry', 'Sad', 'Care'],
    default: 'Like',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Link to the Post model
    required: true, // Ensure that a post ID is always provided
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', // Link to the Comment model (optional)
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('React', likeschema);
