const User = require('../models/user');

class AuthRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }
  async create(userData) {
    return User.create(userData);
  }
  async findByResetToken(token) {
    return User.findOne({
      passwordResetToken: token,
      tokenExpiration: { $gt: Date.now() }
    });
  }
  async save(user) {
    return user.save();
  }
}

module.exports = AuthRepository;