const User = require('../models/user');
const FriendRequest = require('../models/freindRequest');

class FriendRepository {
  async findUserById(id) {
    return User.findById(id);
  }

  async findFriendRequest(sender, receiver) {
    return FriendRequest.findOne({ requester: sender, recipient: receiver });
  }

  async createFriendRequest(sender, receiver) {
    return FriendRequest.create({ requester: sender, recipient: receiver });
  }

  async getFriendRequestsForUser(userId) {
    return FriendRequest.find({ recipient: userId, status: 'pending' });
  }

  async acceptFriendRequest(sender, receiver) {
    return FriendRequest.findOneAndUpdate(
      { requester: sender, recipient: receiver, status: 'pending' },
      { status: 'accepted' },
      { new: true }
    );
  }

  async removeFriendRequest(sender, receiver) {
    return FriendRequest.findOneAndDelete({ requester: sender, recipient: receiver });
  }

  async addFriend(user, friendId) {
    user.friends.push(friendId);
    return user.save();
  }

  async removeFriend(user, friendId) {
    user.friends = user.friends.filter(id => id.toString() !== friendId.toString());
    return user.save();
  }
}

module.exports = FriendRepository;