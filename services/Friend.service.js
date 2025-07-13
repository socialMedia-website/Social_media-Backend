class FriendService {
  constructor({ friendRepository }) {
    this.friendRepository = friendRepository;
  }

  async sendFriendRequest(sender, receiver) {
    const recipientUser = await this.friendRepository.findUserById(receiver);
    if (!recipientUser) throw new Error('Recipient not found');
    if (recipientUser.friends.includes(sender)) throw new Error('Already friends');
    const existingRequest = await this.friendRepository.findFriendRequest(sender, receiver);
    if (existingRequest) throw new Error('Request already sent');
    return this.friendRepository.createFriendRequest(sender, receiver);
  }

  async acceptFriendRequest(receiver, sender) {
    const receiverUser = await this.friendRepository.findUserById(receiver);
    const senderUser = await this.friendRepository.findUserById(sender);
    if (!receiverUser || !senderUser) throw new Error('User not found');
    const request = await this.friendRepository.acceptFriendRequest(sender, receiver);
    if (!request) throw new Error('No friend request found');
    await this.friendRepository.addFriend(receiverUser, senderUser._id);
    await this.friendRepository.addFriend(senderUser, receiverUser._id);
    return true;
  }

  async removeFriendRequest(sender, receiver) {
    return this.friendRepository.removeFriendRequest(sender, receiver);
  }

  async removeFriend(userId, friendId) {
    const user = await this.friendRepository.findUserById(userId);
    const friend = await this.friendRepository.findUserById(friendId);
    if (!user || !friend) throw new Error('User not found');
    await this.friendRepository.removeFriend(user, friendId);
    await this.friendRepository.removeFriend(friend, userId);
    return true;
  }

  async getFriends(userId) {
    const user = await this.friendRepository.findUserById(userId);
    if (!user) throw new Error('User not found');
    return user.populate('friends', '_id firstName lastName');
  }

  async getFriendById(friendId) {
    const user = await this.friendRepository.findUserById(friendId);
    if (!user) throw new Error('Friend not found');
    user.password = undefined;
    return user;
  }
}

module.exports = FriendService;