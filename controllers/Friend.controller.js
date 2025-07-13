const User = require('../models/user');

class FriendController {
  constructor({ friendService }) {
    this.friendService = friendService;
  }

  sendfriendrequest = async (req, res, next) => {
    try {
      const sender = req.userId;
      const receiver = req.params._id;
      await this.friendService.sendFriendRequest(sender, receiver);
      res.status(200).json({ message: "Friend request sent." });
    } catch (err) {
      next(err);
    }
  };

  acceptfriendrequest = async (req, res, next) => {
    try {
      const receiver = req.userId;
      const sender = req.params._id;
      await this.friendService.acceptFriendRequest(receiver, sender);
      res.status(200).json({ message: "Friend request is accepted" });
    } catch (err) {
      next(err);
    }
  };

  removefriendrequestIReceived = async (req, res, next) => {
    try {
      const receiver = req.userId;
      const sender = req.params._id;
      await this.friendService.removeFriendRequest(sender, receiver);
      res.status(200).json({ message: "Friend request is deleted." });
    } catch (err) {
      next(err);
    }
  };

  removefriendrequestISent = async (req, res, next) => {
    try {
      const sender = req.userId;
      const receiver = req.params._id;
      await this.friendService.removeFriendRequest(sender, receiver);
      res.status(200).json({ message: "Friend request is deleted." });
    } catch (err) {
      next(err);
    }
  };

  removefriend = async (req, res, next) => {
    try {
      const remover = req.userId;
      const friend = req.params._id;
      await this.friendService.removeFriend(remover, friend);
      res.status(200).json({ message: "Friend is deleted." });
    } catch (err) {
      next(err);
    }
  };

  getFriends = async (req, res, next) => {
    try {
      const user = await this.friendService.getFriends(req.userId);
      res.status(200).json({ friends: user.friends });
    } catch (err) {
      next(err);
    }
  };

  getFriendbyId = async (req, res, next) => {
    try {
      const friendId = req.params._id;
      const user = await this.friendService.getFriendById(friendId);
      res.status(200).json({ friend: user });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FriendController;