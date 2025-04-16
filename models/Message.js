const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
  },
  receiverId: {
    type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
  },
  encryptedText: String,
  seen: {
    type: Boolean,
    default: false
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
